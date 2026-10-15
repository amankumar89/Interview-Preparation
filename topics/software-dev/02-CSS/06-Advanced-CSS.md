# CSS — 06 Advanced CSS

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are cascade layers, and why use them?

Cascade layers let authors group rules into an explicit precedence order, reducing the need to manage specificity across large stylesheets.

```css
@layer reset, base, components, utilities;

@layer components {
  .button {
    color: white;
  }
}
```

Within the same origin and importance, later named layers take precedence over earlier layers; unlayered author rules normally take precedence over layered author rules. Important declarations have a reversed layer ordering, so layers should be designed and tested deliberately rather than used as another specificity trick.

### Q2. How do `:is()`, `:where()`, and `:has()` differ?

`:is()` matches an element against any selector in its list and takes the specificity of its most specific argument. `:where()` behaves similarly but contributes zero specificity. `:has()` selects an element based on matching relative selectors among its descendants or related elements.

```css
:where(article, section) h2 {
  margin-block-start: 0;
}
label:has(input:checked) {
  font-weight: 700;
}
```

These selectors can simplify complex rules, but broad relational selectors may be harder to reason about. Check browser support if older browsers are in scope.

### Q3. How do CSS custom properties differ from preprocessor variables?

Custom properties such as `--surface` are runtime CSS values that participate in the cascade and inherit through the DOM. They can be changed per component, theme, or state. Preprocessor variables are generally substituted during build time and do not respond to runtime cascade changes.

```css
:root {
  --surface: white;
  --text: #222;
}
.panel {
  color: var(--text);
  background: var(--surface);
}
```

Custom properties can have fallbacks with `var(--name, fallback)`. Their values are token sequences, so type and unit mistakes may only become apparent when the consuming declaration is computed.

### Q4. What creates a stacking context?

A stacking context is an isolated group of layers that is painted together relative to sibling stacking contexts. It can be created by the root element and by conditions such as positioned elements with a non-auto `z-index`, transforms, opacity below one, filters, and certain containment or isolation values.

`z-index` values are compared within their stacking context, not globally across the page. When a high `z-index` appears ineffective, inspect ancestor stacking contexts instead of continually increasing the number.

### Q5. What do `isolation: isolate` and `z-index` do together?

`isolation: isolate` creates a new stacking context for an element and its descendants. It is useful for containing component-level layering so internal `z-index` values do not compete unexpectedly with unrelated page elements. It does not itself assign a position or place the element above other stacking contexts.

### Q6. What are CSS logical properties?

Logical properties express dimensions and spacing relative to writing mode and text direction. For example, `margin-inline-start` represents the start side of the inline axis, unlike `margin-left`, which always refers to the physical left side.

```css
.notice {
  padding-block: 1rem;
  padding-inline: 1.5rem;
  border-inline-start: 4px solid teal;
}
```

They make layouts more adaptable to right-to-left languages and vertical writing modes.

### Q7. What is the difference between a transform and a positional offset?

Positioning properties such as `top` and `left` adjust an element's positioned layout location. A transform such as `translate()` changes its visual rendering without changing the space it occupies in normal flow. Transforms can also create stacking contexts and containing blocks for descendants.

Use transforms for visual movement and animation when appropriate, but account for the original layout space and possible overlap. Do not assume transforms are always faster; profile the actual page.

### Q8. What are `contain` and `content-visibility` used for?

`contain` can limit how layout, style, paint, or size effects propagate across a component boundary. `content-visibility: auto` can let the browser skip rendering work for content that is not currently relevant in the viewport.

These properties can improve performance on long or complex pages, but they change rendering behavior and may affect intrinsic sizing, focus navigation, or find-in-page behavior depending on usage. Use `contain-intrinsic-size` where appropriate to reserve space, then validate with real content and accessibility checks.

### Q9. How should CSS animations respect user preferences?

Keep motion purposeful and avoid making animation the only signal of state. Use `prefers-reduced-motion` to remove or reduce nonessential movement, and ensure that state changes remain visible without animation.

```css
.panel {
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .panel {
    transition: none;
  }
}
```

### Q10. How can CSS affect rendering performance?

Large or complex stylesheets, expensive effects, frequent layout changes, and animations of layout-affecting properties can contribute to rendering work. Prefer simple component-scoped rules, avoid unnecessary DOM and selector complexity, and animate `transform` or `opacity` when they suit the effect. These are heuristics, not guarantees: profile with browser performance tools before optimizing.

### Q11. How do you debug a CSS rule that is not taking effect?

In developer tools, select the element and inspect matching rules, crossed-out declarations, computed styles, and the cascade order. Check whether the selector matches, whether another declaration wins by origin, importance, layer, specificity, or source order, and whether the property is inherited or valid for the element. Also confirm that the stylesheet loaded and that the browser supports the syntax.

### Q12. When should `!important` be used?

Use `!important` sparingly, such as for narrowly scoped utility rules that must intentionally override normal author declarations or to accommodate external constraints. It changes cascade priority and makes future overrides harder. Prefer correcting layer order, selector scope, or component ownership instead of adding it to win a specificity contest.
