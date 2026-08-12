# Ubuntu Services

Application uses Symfony Messenger; and Meilisearch in a Docker container.

To start Messenger consumer and Docker 2 services are created.

`/etc/systemd/system/mynailalliance-messenger-worker.service`

```
[Unit]
Description=MyNailAlliance DAM Messenger
Documentation=https://github.com/nailalliance/digital-assets-manager
After=network.target

[Service]
Type=simple
User=mynailalliance-library
ExecStart=/usr/bin/php /var/www/html/bin/console messenger:consume async --time-limit=3600
Restart=always

[Install]
WantedBy=multi-user.target
```

`/etc/systemd/system/mynailalliance-dam-app.service`

```
[Unit]
Description=MyNailAlliance DAM Docker Compose Application
Requires=docker.service
After=docker.service

[Service]
User=mynailalliance-library

WorkingDirectory=/var/www/html

ExecStart=/usr/bin/docker-compose --env-file .env.local up

ExecStop=/usr/bin/docker-compose --env-file .env.local down

Restart=always

[Install]
WantedBy=multi-user.target
```

To install both services, run the following command:

```shell
sudo systemctl daemon-reload
sudo systemctl enable mynailalliance-messenger-worker.service
sudo systemctl start mynailalliance-messenger-worker.service
sudo systemctl status mynailalliance-messenger-worker.service

sudo systemctl enable mynailalliance-dam-app.service
sudo systemctl start mynailalliance-dam-app.service
sudo systemctl status mynailalliance-dam-app.service
```

To view the logs, use:
```shell
sudo journalctl -u mynailalliance-dam-app.service -f
```

## Deploying application updates

Messenger workers are long-running PHP processes. They must be restarted after every application deployment so they do not keep an old compiled container in memory while loading new classes.

From `/var/www/html`, after the new code and dependencies are in place:

```shell
sudo -u mynailalliance-library php8.4 bin/console doctrine:migrations:migrate --no-interaction --env=prod
sudo -u mynailalliance-library php8.4 bin/console cache:clear --env=prod --no-debug
sudo systemctl restart mynailalliance-messenger-worker.service
sudo systemctl status mynailalliance-messenger-worker.service
```

To follow worker errors during verification:

```shell
sudo journalctl -u mynailalliance-messenger-worker.service -f
```
