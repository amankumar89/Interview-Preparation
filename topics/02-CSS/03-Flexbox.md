# CSS — 03 Flexbox

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What problem does Flexbox solve?

**Interview Answer:**

Flexbox is a one-dimensional layout model for arranging items along a row or column. It is useful for distributing space and aligning items within a component, such as a toolbar, navigation row, or vertically centered panel.

### Q2. What are the main and cross axes?

The main axis is defined by `flex-direction`; the cross axis is perpendicular to it. With `row`, the main axis follows the inline direction; with `column`, it follows the block direction. Writing modes can affect the physical direction, so think in terms of axes rather than assuming left, right, top, and bottom.

### Q3. How do `justify-content` and `align-items` differ?

`justify-content` distributes or aligns items along the main axis. `align-items` aligns flex items along the cross axis within the line. For multiple flex lines, `align-content` distributes the lines themselves when there is extra cross-axis space.

### Q4. What do `flex-grow`, `flex-shrink`, and `flex-basis` control?

`flex-grow` controls how an item can receive positive free space, `flex-shrink` controls how it can surrender space when items exceed the container, and `flex-basis` provides its initial main-size basis. The `flex` shorthand combines these values.

```css
.main {
  flex: 1 1 20rem;
}
.sidebar {
  flex: 0 0 16rem;
}
```

The first item can grow and shrink from a 20rem basis; the second keeps a fixed 16rem basis unless other constraints apply.

### Q5. What is the difference between `flex-basis: 0` and `flex-basis: auto`?

`0` starts the flex sizing calculation from zero main-axis basis, so free space is distributed without using the item's content size as its starting contribution. `auto` uses the main-size property when specified, or otherwise the content-based size. The shorthand `flex: 1` commonly expands to a zero basis in browsers, so compare the actual computed values when sizing looks unexpected.

### Q6. How do wrapping and `align-content` work?

`flex-wrap: wrap` allows items to form multiple flex lines instead of forcing them onto one line. `align-content` distributes those lines along the cross axis when there is extra space and more than one line; it does not align items within a single line.

Use `gap` to define consistent space between items without adding edge spacing that needs to be removed from the first or last item.

### Q7. Why might a flex item refuse to shrink?

Flex items have an automatic minimum size that can be based on their content. A long word, wide image, or nested component may therefore force the item wider than expected even when `flex-shrink` is nonzero.

```css
.flex-child {
  min-width: 0;
}
```

For a column flex container, the corresponding fix may be `min-height: 0`. Confirm that allowing the content to shrink or scroll is appropriate before applying the override.

### Q8. When should you use Flexbox instead of Grid?

Flexbox is suited to one-dimensional alignment where items primarily flow along one axis. Grid is suited to two-dimensional layouts where rows and columns need coordinated track sizing. They can be combined: Grid for the page or component structure and Flexbox for alignment inside individual regions.

### Q9. How would you build a footer that stays at the bottom on short pages?

Make the page a column flex container with at least viewport height, let the main region grow, and keep the footer in normal flow.

```css
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
```

This pushes the footer down on short pages without fixing it over content on long pages. Use a dynamic viewport unit where needed for mobile viewport behavior, while retaining a suitable fallback.

### Q10. Why should `order` and `row-reverse` be used cautiously?

They change visual order without changing source or keyboard navigation order. If the visual sequence differs from the DOM sequence, sighted keyboard users and screen-reader users can encounter content in a confusing order. Prefer an intentional source order and use visual reordering only when the reading and interaction sequence remains clear.

### Q11. How do you troubleshoot an unexpected flex layout?

Check the container's direction, wrapping, available main-axis space, item basis and grow/shrink values, automatic minimum sizes, and gaps. Inspect each flex line and computed size in developer tools. Test with the longest real content and narrow widths because empty or short labels can conceal sizing problems.
