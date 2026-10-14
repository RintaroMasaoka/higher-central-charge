# Scholarly Figures

Editable geometry and English TeX label inventories live in `figures/*.mjs`.
`render_figures.mjs` typesets every label with KaTeX and its actual fonts,
then exports Chrome-rendered PNGs at twice the native dimensions. No MathText
or font-only imitation is used. Geometry itself contains no SVG lettering.

Regenerate with Node and Playwright available:

```sh
HCC_BROWSER_CHANNEL=chrome node figure-sources/render_figures.mjs
```

Set `HCC_PLAYWRIGHT_PATH` to the installed Playwright module when it is not on
the project module path. An optional figure ID selects a single export.
The renderer uses offline routes for the local KaTeX CSS and font files.
`reviews/visualization/exports/` records label bounds, loaded fonts, and
source/output hashes. `CONTRACT.md` specifies geometry, typography and gates.

The manuscript embeds PNGs. The old `partial-rotation.svg` URL remains an
SVG wrapper around the same TeX-rendered pixels. No paper image is copied.
Captions distinguish illustrative constructions from numerical measurements.
