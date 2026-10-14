# Figure Realization Contract

## Reader And Authority

The learner knows CFT characters; the paper is new and other expertise is not confirmed. Each figure uses only symbols/relations available at its placement in `content/`. Source equations and scopes come from the saved arXiv:2303.04822v4 main/supplement and the manuscript's checked calculations. Do not treat an earlier generated diagram as evidence. No numerical experiment or fitted data is added.

Inspect all substantive chapters for relations a reader would otherwise assemble mentally. References is a source registry and needs no decorative figure. Existing native tables remain useful; algebra remains typeset when geometry does not add an inference. Images must show the actual selected objects, comparisons and operations, not sentences placed in boxes.

## Delivery And Typography

Use the academic-writing figures workflow, motif guide and typography contract. All words in a figure are English and all words/numbers/mathematics are actual KaTeX output, with the project's real KaTeX fonts loaded before export. Geometry may be SVG, but it contains no lettering. Transparent label overlays are typeset from exact TeX source, then exported as self-contained PNG pixels (and a compatibility SVG embedding those same pixels). Merely selecting a serif font or MathText is insufficient.

Save editable geometry/data, label inventories, renderer/font evidence and output hashes. Native width is 560 CSS pixels with default label size24–28; construct vertical panels when that keeps each inference readable after fitting a mobile column. No mandatory horizontal scrolling or decorative panels. Check actual labels' bounding boxes and the embedded exports at mobile/desktop widths and both themes.

## Figure Module Interface

Authors own disjoint files in `figure-sources/figures/`; the coordinator owns the renderer and manuscript integration. Export an array of objects:

```js
export default [{
  id: 'unique-id', width: 560, height: 600,
  svg: '<svg viewBox="0 0 560 600">...geometry only...</svg>',
  labels: [{tex: String.raw`\text{English label}`, x:280, y:30,
    fontSize:26, anchor:'center'}],
  placement: {file:'content/example.md', afterExact:'exact current paragraph'},
  caption: 'Japanese scientific caption', alt: 'Japanese accessible description',
  brief: {inference:'...', source:'...', encodings:'...', checks:'...'}
}];
```

Label positions are centers vertically. Horizontal anchors are `left`, `center` or `right`; widths are measured from typeset output, not guessed by character count. Use TeX arrays for deliberate short multiline labels. No SVG `<text>`, literal tick strings, font declarations as a typography substitute, or JavaScript-generated lettering outside the label list.

## Semantic Encodings

In geometry/state figures, teal identifies A/its physical left boundary, gray identifies B, and magenta identifies the entanglement cut/right edge. Region identity covers its whole represented extent; depth does not change identity. Periodic identifications are not physical boundaries. Partial translation moves A coordinates cyclically and leaves B fixed. Paired Schmidt basis lines denote matching indices, not physical pipes.

Complex-plane figures use the standard real/imaginary axes. Arrows encode actual complex contributions and sums, preserving phase sign, weight, zero cancellation and the distinction between raw magnitude and unit phase. Coordinate projections preserve their plotted metric. Other figure families declare their own limited color/mark scope rather than silently reusing region colors as universal meanings.

An illustrative parameter choice is identified in the figure/caption and computed exactly from the stated formula. Schematic spectra/cuts do not assert numerical data or microscopic lattice geometry. Selected integer sets are calculated from their gcd definitions. Asymptotic regime reference curves are not hard certification boundaries. Every arrow has a specified mathematical/physical operation and anchored endpoints.

## Acceptance

The coordinator records placement, source fidelity, label typography and embedded visual checks. Fresh independent reviewers get one perspective and one paragraph/attached figure or one visual relation at a time, freezing judgments before the next. Source, visual correspondence, reader availability, explanation acts, Japanese wording and production evidence remain distinct. No whole-manuscript acceptance is inferred from image counts or successful exports.
