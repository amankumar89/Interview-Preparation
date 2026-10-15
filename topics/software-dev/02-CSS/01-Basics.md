# CSS — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is CSS, and how does a browser apply it?

**Interview Answer:**

CSS (Cascading Style Sheets) describes how HTML elements are presented. The browser parses CSS into rules, matches selectors to elements, resolves competing declarations through the cascade, and uses the resulting styles during layout and painting.

CSS can be added through external stylesheets, `style` elements, or inline `style` attributes. External stylesheets are usually preferred because they separate presentation from content and can be cached.

### Q2. What is the CSS cascade?

**Interview Answer:**

The cascade decides which declaration wins when multiple declarations apply to the same property on an element. It considers origin and importance, cascade layer, specificity, and source order.

For declarations in the same origin, importance, layer, and specificity, the later declaration wins. Inheritance is a separate mechanism: a child receives an inherited value only when it has no winning declaration of its own.

### Q3. How does CSS specificity work?

**Interview Answer:**

Specificity compares selector weight: ID selectors outweigh class, attribute, and pseudo-class selectors, which outweigh type and pseudo-element selectors. Universal selectors and combinators add no specificity.

For example, `#menu .item` is more specific than `.item.active`, regardless of where the rules appear in the stylesheet. Avoid escalating specificity unnecessarily; a maintainable selector strategy is easier to override and debug.

### Q4. What is the difference between inheritance and the cascade?

**Interview Answer:**

The cascade selects a value from declarations that directly match an element. Inheritance passes certain computed values from a parent to a child when the child has no specified value for that property.

Properties such as `color` and `font-family` commonly inherit. Layout properties such as `margin` and `border` generally do not. The `inherit`, `initial`, `unset`, and `revert` keywords explicitly affect value resolution in different ways.

### Q5. What are combinators and common selector types?

Selectors can target elements by type (`p`), class (`.notice`), ID (`#header`), attribute (`input[required]`), state (`button:hover`), or structure. Combinators express relationships: a space selects descendants, `>` direct children, `+` the next adjacent sibling, and `~` later siblings with the same parent.

```css
nav > a {
  text-decoration: none;
}
input[aria-invalid="true"] {
  border-color: firebrick;
}
```

### Q6. What is the difference between a pseudo-class and a pseudo-element?

**Interview Answer:**

A pseudo-class selects an element in a particular state or relationship, such as `:focus-visible`, `:disabled`, or `:first-child`. A pseudo-element targets a generated part of an element, such as `::before`, `::after`, or `::first-line`.

Use pseudo-classes for interaction and structural conditions. Generated pseudo-element content should not be the only place important information is exposed, because it may not be available consistently to assistive technology.

### Q7. What CSS length units should you know?

`px` is a CSS reference pixel. `em` is relative to the element's computed font size for most properties, while `rem` is relative to the root font size. Percentages depend on the relevant property's containing dimension. Viewport units relate to the viewport, and `ch` is based on the width of the `0` glyph.

Choose units based on the relationship you need: `rem` is useful for scalable type and spacing, percentages for proportional sizing, and viewport units for viewport-related layouts. Test viewport units on mobile because browser chrome can change the visible viewport.

### Q8. What are the differences among `display: none`, `visibility: hidden`, and `opacity: 0`?

`display: none` removes the element from layout and typically from the accessibility tree. `visibility: hidden` preserves its layout space but hides it and its descendants. `opacity: 0` makes it transparent while it still occupies space and can remain focusable and interactive.

Choose a hiding method based on the desired layout, interaction, and accessibility behavior. Do not use transparency alone to hide interactive content.

### Q9. What is the difference between `position: relative`, `absolute`, `fixed`, and `sticky`?

`relative` keeps the element in normal flow and allows offsets from its normal position. `absolute` removes it from normal flow and positions it against its containing block. `fixed` is generally positioned relative to the viewport. `sticky` participates in normal flow until a scroll threshold is reached, then sticks within its scroll container.

Positioned elements can overlap other content. Set an appropriate containing block and stacking order, and ensure overlays do not obscure content or keyboard focus.

### Q10. How should CSS support keyboard users and motion preferences?

Provide a visible focus indicator, do not remove outlines without a clear replacement, and use `:focus-visible` when a keyboard-oriented focus style is desired. Respect reduced-motion preferences for nonessential animation.

```css
:focus-visible {
  outline: 3px solid #145da0;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Apply motion rules thoughtfully: essential state changes should remain understandable even when animation is reduced.
