# Banner composition endpoint

The banner composition endpoint builds an image-only product scene from DAM JPEG assets. Headlines, calls to action, and other typography remain the responsibility of the frontend.

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

- `asset_ids` must contain 1–12 unique positive integer IDs. Order is significant.
- `layout` must be `desktop` or `mobile`.
- `format` may be `webp` or `jpg` and defaults to `webp`.
- `seed` is optional and must be between `0` and `2147483647`. When omitted, a stable seed is derived from the ordered asset IDs and layout.

Every source must be a readable JPEG with a usable embedded Photoshop clipping path. The endpoint never fetches external URLs and never interprets an asset ID as a filesystem path.

Example:

```bash
curl --request POST \
  --header 'X-AUTH-TOKEN: YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{"asset_ids":[123,456],"layout":"mobile","format":"webp"}' \
  --output banner-mobile.webp \
  https://mynailalliance.com/api/v2/banner-compositions
```

## Output geometry

Desktop output is `1920×600`. Products, shadows, and reflections are confined to the left staging area; the right side beginning at approximately `x=1056` remains available for HTML text.

Mobile output is `1080×1080`. It uses an art-directed crop from the right side of the rainbow-and-white-stone background. The entire top half (`y=0–539`) remains free of products for HTML text, and the product composition is confined to the bottom half.

The renderer treats the stone ledges as explicit support planes. Bottle bottoms are anchored to configured contact lines. Reflections are vertically flipped, compressed, blurred, faded, and clipped to the horizontal stone surface, while shadows use a consistent upper-left light source.

All bottles remain vertically upright, use one identical rendered height, and target 150% of the original base scale. Bottles assigned to the same platform also share one exact contact line, keeping their bottoms aligned. The foreground row sits lower on the stone surface. The placement engine reserves a positive horizontal gap between every pair of products across all platforms, so one bottle can never obscure another. At high asset counts, the complete group is proportionally fitted to the staging width instead of being overlapped.

The rainbow reference scene is illuminated from the front-left. Cast shadows therefore project toward the back-right as soft, cool-gray tapered shapes, while a restrained white specular glare extends toward the foreground. The foreground treatment is a color-bearing, vertically compressed mirror image of the bottle; only a thin, low-opacity ambient-occlusion line remains at the physical contact point. Every reflection, glare, and shadow layer is clipped a few pixels before its supporting ledge edge, so the foreground-row reflection cannot spill onto the vertical stone face.

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

The cache key includes the layout, format, seed, ordered asset metadata, background metadata, and renderer version. Conditional requests using `If-None-Match` may receive `304 Not Modified`.

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
