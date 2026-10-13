# Production verification

Date:2026-10-13 (Asia/Hong_Kong).

Six config-driven manuscript routes were typechecked and prerendered successfully. Renderer math and review-extraction regression tests passed. Current visible extraction is `html-body-final/`; source hashes are in its manifests and the sequential reader transcript.

The independent sequential visible reader froze 38 PASS, zero FAIL/UNKNOWN. This is a visible-route verdict under the stated baseline, not a proof of all scientific inputs or of human learning. Japanese wording candidate bookkeeping validates, but whole-range semantic naming acceptance remains partial. Raw-source audit accounting also retains unknowns. See `README.md` in this directory.

Playwright with installed Chrome inspected all six routes at1440x1000 and390x844, in both light and dark themes (24 combinations). No KaTeX errors, page overflow, missing images or unloaded required math fonts. Details open, direct disclosure fragment, chapter navigation, theme switching/storage, reference click/pin, Escape and reference-origin navigation were exercised. `browser-results.json` is the production-prefix run. Local screenshots were inspected for the first viewport and the diagram; screenshots are ignored by Git.

The diagram was regenerated with Matplotlib3.11.2; mathematical labels are glyph paths. The final figure preserves the already-reviewed A/B and boundary relations. Build assets contain the diagram and KaTeX fonts. A reused-renderer bug prevented trailing-slash reference paths from resolving to popovers; normalization was added and inspected. Local linked dependencies initially blocked development font requests; Vite now permits the resolved dependency root. Production fonts were separately checked.

Public PDF v4 metadata and equation numbers were inspected. PDF page21 was rendered and Eq.(83) was checked at high resolution. Source/PDF formula conclusions rely on pixels, not solely on PDF text extraction.

Production bundle warns about a JS chunk exceeding500kB; this is a size advisory and did not fail the build. No numerical lattice/iDMRG reproduction was run.
