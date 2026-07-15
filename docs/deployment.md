# Deployment

This project uses Webpack Encore and serves compiled frontend assets from `public/build/`.

If you deploy source code directly to the server, you must deploy the compiled
`public/build/` files together with the matching `assets/`, `templates/`, and
`src/` changes. A source-only deploy can leave the browser running stale
JavaScript and break authenticated upload flows.

## Standard deploy checklist

1. Install/update PHP and Node dependencies if needed.
2. Build frontend assets:

```bash
npm run build
```

3. Verify the compiled assets changed as expected:

```bash
ls public/build
```

4. Deploy both source and `public/build/`.
5. Clear Symfony cache on the target if your deployment process does not already
   do that.
6. Hard refresh the browser after deploy when testing frontend behavior.

## FTP deploys

For FTP-style deploys, do not rely on the server to magically rebuild assets
unless you explicitly run the build there. This repository keeps `public/build/`
trackable on purpose so the compiled bundle can be deployed with the same code
change that requires it.

## Upload/auth changes

Tus upload changes are especially sensitive to stale bundles because the client
must send the exact headers expected by the stateless upload firewall. If upload
behavior changes, always rebuild `public/build/` before deploy.

## Canvas editor fonts

Canvas editor fonts are discovered at runtime from `assets/fonts/`. Adding or
removing only `.ttf` or `.otf` files there does not require a Webpack rebuild,
but those files do need to be deployed with the rest of the application.

See `docs/editor_fonts.md` for naming and setup instructions.

## Direct share cleanup

Multi-file direct shares now keep a short-lived upload session while files are
still arriving. To clean up interrupted uploads and expired direct-share links,
run this command on a schedule:

```bash
php bin/console app:cleanup-direct-shares
```

Helpful options:

```bash
php bin/console app:cleanup-direct-shares --dry-run
php bin/console app:cleanup-direct-shares --stale-hours=24
```

Running it hourly is a good default. The command removes:

1. Expired Tus chunk metadata and orphaned partial files.
2. Incomplete direct-share sessions that have been idle longer than the stale window.
3. Expired completed direct-share links together with their stored files.

## Server diagnostics

When production behavior differs from local, collect a full runtime snapshot on
the server before changing Apache or PHP configuration:

```bash
bash bin/collect_server_diagnostics.sh /var/www/html
```

To also capture what Apache is really serving for a vhost, pass the hostname as
the third argument:

```bash
bash bin/collect_server_diagnostics.sh /var/www/html /var/www/html/var/diagnostics mynailalliancedigitalassets.com
```

The script captures:

1. Active Apache modules and vhost handler configuration.
2. `mod_php` vs `php-fpm` status and PHP/imagick versions.
3. Symfony prod environment/router details.
4. Recent Apache, FPM, and application logs.
