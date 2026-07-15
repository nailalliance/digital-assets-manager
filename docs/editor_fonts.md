# Canvas Editor Fonts

The asset canvas editor does not accept user-uploaded font files. All editor
fonts must be committed to the repository under `assets/fonts/`.

## Supported file types

Use static `.ttf` or `.otf` files.

Do not use:

- Variable font files such as `VariableFont_wght.ttf`
- `.woff` or `.woff2` files
- User-specific local font uploads

## Where to place files

Put font files anywhere inside `assets/fonts/`. Nested folders are allowed.

Examples:

```text
assets/fonts/Inter/Inter-Regular.ttf
assets/fonts/Inter/Inter-Bold.ttf
assets/fonts/DMSerifText/DMSerifText-Regular.ttf
assets/fonts/DMSerifText/DMSerifText-Italic.ttf
```

## Naming recommendations

The editor infers the font family, weight, and style from the file name, so use
clear static file names from Google Fonts or a similar source.

Recommended patterns:

- `FamilyName-Regular.ttf`
- `FamilyName-Italic.ttf`
- `FamilyName-Bold.ttf`
- `FamilyName-BoldItalic.ttf`

Examples:

- `RobotoMono-Regular.ttf`
- `RobotoMono-BoldItalic.ttf`
- `DMSerifText-Regular.ttf`

The editor converts names like `RobotoMono` into `Roboto Mono` in the font
picker automatically.

## How the system uses these fonts

Fonts discovered in `assets/fonts/` are used in all of these places:

- Browser preview inside the dedicated asset editor
- Single-image editor downloads
- Script replay during "Apply Script to Bag"

That keeps editor previews and bag exports aligned as long as the same font
files are deployed with the application.

## Deployment notes

When you add or remove only font files, the application discovers them at
runtime. A Webpack rebuild is not required just for the font files themselves.

You still need to deploy the updated repository contents so the new files under
`assets/fonts/` are present on the server.
