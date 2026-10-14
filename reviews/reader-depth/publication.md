# Publication Verification

- Deployed content commit: `57cf94c61ba62d881fc80ef05ba0a298c9d6d361`.
- Successful Pages build/deployment: https://github.com/RintaroMasaoka/higher-central-charge/actions/runs/38540892742
- Explanatory entry: https://rintaromasaoka.github.io/higher-central-charge/overview/#gauss-milgram
- Final local and live browser runs each passed all 24 route/viewport/theme combinations. They also verified the first-use link opens the Gauss–Milgram disclosure, its displayed relation renders, its source entry exists, and its summary closes/reopens. `../browser-results.json` contains the live run.
- Live overview returned HTTP 200 and contained the final `index-Cu-SFtWM.js` asset and disclosure ID.
- TypeScript, math-rendering/extraction, eight gate/compatibility tests and production build passed. The existing bundle-size warning remains outside this content repair.
- Both project Codex and Claude skill links expose authoring hash `839abf20cd01274847d78f1f09beb1e9c270e4fe4e8c95a3881703e4c629e85f` and reader-review hash `a5258fa020825eeb225af5d6c8512eaa4018b5967b12f63fc396431698026793`, identical to the canonical references used in isolated execution. No stock publication or unrelated skill cleanup was performed.

Delivery is verified separately from acceptance: remaining conceptual-support gaps, unopened routes and Japanese wording uncertainties in `status.md` and `learning-support.md` are not upgraded by this deployment. This verification-only follow-up is excluded from the existing Pages workflow by `reviews/**`; it leaves the deployed content unchanged.
