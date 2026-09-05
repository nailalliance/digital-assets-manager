# Banner composition endpoint

The banner composition endpoint builds product scenes from DAM JPEG assets. Desktop and mobile outputs are image-only; the Open Graph output is a complete social card containing its own title and call to action.

## Request

Send an authenticated JSON request to:

```http
POST /api/v2/banner-compositions
X-AUTH-TOKEN: <DAM API token>
Content-Type: application/json
```

```json
{
  "asset_ids": [123, 456, 789],
  "layout": "desktop",
  "format": "webp",
  "seed": 12345
}
```

- `asset_ids` must contain 1–12 unique positive integer IDs. The `og` layout requires at least 2 IDs. Order is significant.
- `layout` must be `desktop`, `mobile`, or `og`.
- `format` may be `webp` or `jpg` and defaults to `webp`.
- `seed` is optional and must be between `0` and `2147483647`. When omitted, a stable seed is derived from the ordered asset IDs and layout.
- `page_title` is required for `og`, is limited to 160 characters, and should contain the campaign page title without the `| Gelish` suffix. It is ignored by the desktop and mobile layouts.

Every source must be a readable JPEG with a usable embedded Photoshop clipping path. The endpoint never fetches external URLs and never interprets an asset ID as a filesystem path.

Example:

```bash
curl --request POST \
  --header 'X-AUTH-TOKEN: YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"asset_ids":[123,456],"layout":"mobile","format":"webp"}' \
  --output banner-mobile.webp \
  https://mynailalliancedigitalassets.com/api/v2/banner-compositions
```

Open Graph example:

```bash
curl --request POST \
  --header 'X-AUTH-TOKEN: YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"asset_ids":[50062,70018],"layout":"og","format":"webp","page_title":"Your Color Plus Edit"}' \
  --output color-plus-og.webp \
  https://mynailalliancedigitalassets.com/api/v2/banner-compositions
```

## Output geometry

Desktop output is `1920×600`. Products, shadows, and reflections are confined to the left staging area; the right side beginning at approximately `x=1056` remains available for HTML text.

Mobile output is `1080×1080`. It uses an art-directed crop from the right side of the rainbow-and-white-stone background. The entire top half (`y=0–539`) remains free of products for HTML text, and the product composition is confined to the bottom half.

Open Graph output is exactly `1200×630`. It is a Gotham-set social card based on the supplied Gelish reference: the left panel contains the `Color Plus` label, a vertically centered `<page_title> | Gelish`, and a black pill-shaped `BUY NOW` button with a vertically centered label. The date and secondary event caption are intentionally omitted. The right panel uses a rounded landscape crop of the desktop product staging area without a decorative outline.

The renderer treats the stone ledges as explicit support planes. Bottle bottoms are anchored to configured contact lines. Reflections are vertically flipped, compressed, blurred, faded, and clipped to the horizontal stone surface, while shadows use a consistent upper-left light source.

All bottles remain vertically upright, use one identical rendered height, and target 150% of the original base scale. Bottles always appear from left to right in the exact order of `asset_ids` in the request. On desktop, compositions containing six or fewer products use only the upper platform. Larger compositions alternate strictly between upper and lower platforms from left to right without changing asset order. Same-level bottles retain full-body clearance; alternating tiers use the narrower cap width for safe interlocking, reducing excess horizontal distance without obscuring either bottle body. At high asset counts, the complete group is proportionally fitted to the staging width.

The rainbow reference scene is illuminated from the front-left. Cast shadows therefore project toward the back-right as soft, cool-gray tapered shapes, while a restrained white specular glare extends all the way to the foreground edge. The foreground treatment is a color-bearing, vertically compressed mirror image of the bottle; only a thin, low-opacity ambient-occlusion line remains at the physical contact point. Every reflection, glare, and shadow layer is clipped precisely at its supporting ledge edge, so no effect spills onto the vertical stone face.

## Response headers

Successful responses use inline binary image data and include:

```http
Content-Type: image/webp
Content-Disposition: inline; filename="banner-desktop.webp"
ETag: "..."
X-Banner-Seed: 12345
X-Banner-Cache: HIT
Cache-Control: private, max-age=86400
```

The cache key includes the layout, format, seed, ordered asset metadata, optional OG page title, background/font metadata, and renderer version. Conditional requests using `If-None-Match` may receive `304 Not Modified`.

## Errors

Errors are returned as JSON:

```json
{
  "error": "Asset 123 does not contain a usable clipping path."
}
```

- `400`: malformed JSON or invalid request fields.
- `403`: at least one asset is not visible to the authenticated caller.
- `404`: an asset record or its source file is missing.
- `422`: unsupported source, invalid image, or missing clipping path.
- `500`: background, cache, or Imagick rendering failure.
