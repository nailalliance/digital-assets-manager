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
