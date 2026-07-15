#!/usr/bin/env bash

set -u

APP_DIR="${1:-/var/www/html}"
OUT_DIR="${2:-$APP_DIR/var/diagnostics}"
HOST_NAME="${3:-}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT_FILE="$OUT_DIR/server-diagnostics-$TIMESTAMP.txt"

mkdir -p "$OUT_DIR"

run_section() {
    local title="$1"
    shift

    {
        printf '\n========== %s ==========\n' "$title"
        printf '$ %s\n' "$*"
        "$@" 2>&1 || true
    } >>"$OUT_FILE"
}

run_shell_section() {
    local title="$1"
    local command="$2"

    {
        printf '\n========== %s ==========\n' "$title"
        printf '$ %s\n' "$command"
        bash -lc "$command" 2>&1 || true
    } >>"$OUT_FILE"
}

{
    printf 'Server diagnostics collected at %s\n' "$TIMESTAMP"
    printf 'App directory: %s\n' "$APP_DIR"
    printf 'Output file: %s\n' "$OUT_FILE"
} >"$OUT_FILE"

run_section "Identity" date -u
run_section "Host" hostnamectl
run_section "Current User" whoami
run_section "Working Directory" pwd

run_section "OS Release" lsb_release -a
run_section "Disk Usage" df -h
run_section "Memory" free -h

run_section "Apache Modules" sudo apache2ctl -M
run_section "Apache VHosts" sudo apache2ctl -S
run_shell_section "Apache PHP/FCGI Config Search" "sudo grep -R \"SetHandler\\|FilesMatch\\|ProxyPassMatch\\|fcgi://\\|php8\\.3\\|php8\\.4\" /etc/apache2/sites-enabled /etc/apache2/sites-available /etc/apache2/conf-enabled /etc/apache2/conf-available /etc/apache2/mods-enabled /etc/apache2/mods-available"
run_section "Apache Status" systemctl status apache2 --no-pager

run_section "PHP 8.3 FPM Status" systemctl status php8.3-fpm --no-pager
run_section "PHP 8.4 FPM Status" systemctl status php8.4-fpm --no-pager

run_section "Default PHP CLI" php -v
run_section "PHP 8.3 CLI" php8.3 -v
run_section "PHP 8.4 CLI" php8.4 -v

run_shell_section "PHP 8.4 FPM PHP.INI Highlights" "php-fpm8.4 -i | egrep 'Server API|Loaded Configuration File|memory_limit|post_max_size|upload_max_filesize|max_execution_time|max_input_time|session.save_path|session.save_handler|session.cookie_'"
run_shell_section "PHP 8.4 FPM Pool Config" "sudo sed -n '1,240p' /etc/php/8.4/fpm/pool.d/www.conf"

run_section "Default imagick" php --ri imagick
run_section "PHP 8.3 imagick" php8.3 --ri imagick
run_section "PHP 8.4 imagick" php8.4 --ri imagick

run_shell_section "Enabled Apache PHP/FPM Modules" "ls -la /etc/apache2/mods-enabled /etc/apache2/conf-enabled"

run_shell_section "App Directory Listing" "cd \"$APP_DIR\" && pwd && ls -la && printf '\\n--- var ---\\n' && ls -la var && printf '\\n--- public ---\\n' && ls -la public && printf '\\n--- public/build ---\\n' && ls -la public/build"
run_shell_section "Env Files" "cd \"$APP_DIR\" && find . -maxdepth 1 \\( -name '.env' -o -name '.env.local' -o -name '.env.prod' -o -name '.env.prod.local' -o -name '.env.local.php' \\) -exec ls -la {} \\;"
run_shell_section "Writable Paths" "cd \"$APP_DIR\" && ls -ld var var/cache var/log public/build files-web-cache 2>/dev/null"

run_shell_section "Symfony About Prod" "cd \"$APP_DIR\" && php bin/console about --env=prod"
run_shell_section "Symfony About Prod (PHP 8.4 CLI)" "cd \"$APP_DIR\" && php8.4 bin/console about --env=prod"
run_shell_section "Symfony Router Login/Public Image" "cd \"$APP_DIR\" && php bin/console debug:router --env=prod | egrep 'app_login|public_image|share'"
run_shell_section "Symfony Container Env Hints" "cd \"$APP_DIR\" && php bin/console debug:container --env-vars --env=prod"

run_shell_section "Session Config 8.3 Apache" "php -i | egrep 'Server API|Loaded Configuration|session.save_path|session.save_handler|session.cookie_|memory_limit|post_max_size|upload_max_filesize|max_execution_time|max_input_time'"
run_shell_section "Session Config 8.4 FPM" "php8.4 -i | egrep 'Server API|Loaded Configuration|session.save_path|session.save_handler|session.cookie_|memory_limit|post_max_size|upload_max_filesize|max_execution_time|max_input_time'"

run_shell_section "App Prod Log Tail" "cd \"$APP_DIR\" && tail -n 200 var/log/prod.log"
run_section "Apache Error Log Tail" sudo tail -n 200 /var/log/apache2/error.log
run_shell_section "PHP 8.4 FPM Log Tail" "sudo tail -n 200 /var/log/php8.4-fpm.log"
run_shell_section "Journal Apache Recent" "sudo journalctl -u apache2 -n 200 --no-pager"
run_shell_section "Journal PHP 8.4 FPM Recent" "sudo journalctl -u php8.4-fpm -n 200 --no-pager"

run_shell_section "Recent PHPInfo Marker Files" "find /var/www -maxdepth 3 -type f \\( -name '_phpinfo.php' -o -name 'phpinfo.php' \\) -ls"

if [ -n "$HOST_NAME" ]; then
    run_shell_section "Web Probe Headers" "curl -skI --resolve \"$HOST_NAME:443:127.0.0.1\" \"https://$HOST_NAME/\""
    run_shell_section "Web Probe PHPInfo" "curl -sk --resolve \"$HOST_NAME:443:127.0.0.1\" \"https://$HOST_NAME/_phpinfo.php\" | egrep -m 25 'PHP Version|Server API|Loaded Configuration File|imagick|ImageMagick|memory_limit|post_max_size|upload_max_filesize|max_execution_time|max_input_time'"
fi

{
    printf '\n========== NEXT STEP ==========\n'
    printf 'After generating this file, keep one terminal on:\\n'
    printf '  sudo tail -f /var/log/apache2/error.log\\n'
    printf 'Then hit /login once and capture the fresh exception block.\\n'
} >>"$OUT_FILE"

printf 'Diagnostics written to %s\n' "$OUT_FILE"
