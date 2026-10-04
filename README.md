# DMC Homepage Concepts V4.3

## Facebook image correction

V4.1 still looked cropped because the three local prototype JPG files were themselves cropped extracts, so CSS alone could not restore missing pixels.

V4.3 corrects the source, not only the CSS:

- The three Facebook posts use the original media URLs extracted from the supplied live DMC homepage HTML.
- Images are never forced into a fixed height or aspect ratio.
- `object-fit: contain`, natural height and natural aspect ratio are enforced.
- Mobile uses the complete image at full available width.
- If a temporary Facebook CDN URL expires, the prototype falls back to the older local preview so the page does not break. In production WordPress, the Custom Facebook Feed plugin will provide fresh image URLs automatically.

For production, do not copy temporary Facebook CDN URLs into WordPress. Keep the Custom Facebook Feed plugin and apply the presentation CSS to the plugin output.

## V4.3 alignment correction
The dark Facebook rows now use `align-items: stretch` instead of `align-items: start`.
This makes the text cell as tall as the media cell, so:
- text is vertically centered against the poster,
- the vertical divider spans the full poster height,
- original Facebook image ratios remain untouched,
- no fixed image height or crop is introduced.
