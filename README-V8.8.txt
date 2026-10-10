DMC Homepage Final V8.8

Change from V8.7:
- Fixed sticky header in Chrome/Safari-compatible CSS.
- Root cause: html/body had overflow-x:hidden. That creates a scroll container
  (overflow-y computes to auto), so position:sticky no longer sticks to the viewport.
- Replaced overflow-x:hidden with overflow-x:clip.
- Kept position:sticky; top:0; z-index:9999.
- All page content, Facebook slider, lower sections, colors (#a6230f), and layouts
  are otherwise unchanged from V8.7.
