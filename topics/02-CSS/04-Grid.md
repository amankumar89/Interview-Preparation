# CSS — 04 Grid

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is CSS Grid, and how is it different from Flexbox?

**Interview Answer:**

CSS Grid is a two-dimensional layout system that controls rows and columns together. Flexbox primarily lays items out along one axis. Use Grid when relationships between rows and columns matter; use Flexbox when items flow and align mainly in one direction.

### Q2. What is the difference between explicit and implicit grid tracks?

Explicit tracks are defined by `grid-template-rows` and `grid-template-columns` (or the `grid-template` shorthand). Implicit tracks are created automatically when items are placed beyond the explicitly defined grid. `grid-auto-rows`, `grid-auto-columns`, and `grid-auto-flow` control aspects of implicit placement.

### Q3. What does the `fr` unit mean?

`fr` represents a fraction of the available space in a grid container after non-flexible track sizes and relevant gaps are accounted for. It is not simply a percentage of the container: intrinsic minimum sizing and track constraints also affect the final result.

```css
.layout {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 1.5rem;
}
```

### Q4. How do `minmax()`, `auto-fit`, and `auto-fill` help with responsive grids?

`minmax(min, max)` sets a track's allowed size range. `repeat()` can combine it with `auto-fit` or `auto-fill` to create a responsive number of tracks without fixed breakpoints.

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
```

`auto-fill` preserves empty tracks when there is extra space; `auto-fit` collapses empty tracks so occupied tracks can expand. Choose based on whether preserving the available column slots is useful.

### Q5. How do you place items on a grid?

Items can be placed by line numbers, named lines, named areas, or automatic placement. A grid item can span tracks with `span`.

```css
.feature {
  grid-column: 2 / span 2;
  grid-row: 1 / 3;
}
```

Line-based placement is precise, while named areas can make a high-level layout easier to read. Avoid coupling every item to fragile line numbers when the layout needs to adapt significantly.

### Q6. How do named grid areas work?

Define a text-based map with `grid-template-areas`, then assign each child a matching `grid-area` name.

```css
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "nav main"
    "footer footer";
  grid-template-columns: 14rem 1fr;
}

header {
  grid-area: header;
}
nav {
  grid-area: nav;
}
main {
  grid-area: main;
}
footer {
  grid-area: footer;
}
```

Each area must form a rectangle in the map. Different maps can be declared in media queries to change the layout at appropriate widths.

### Q7. What is the difference between `justify-items`, `align-items`, `justify-content`, and `align-content`?

`justify-items` and `align-items` align items inside their grid areas on the inline and block axes. `justify-content` and `align-content` align the grid tracks within the grid container when the tracks do not fill the available space. Logical axes depend on writing mode, so the physical direction is not always left/right or top/bottom.

### Q8. What causes a grid item to overflow its track?

Grid items have automatic minimum-size behavior that can preserve a content-based minimum. Long unbreakable content or a wide child may therefore expand a track beyond the intended size.

```css
.content-column {
  min-width: 0;
}

.grid {
  grid-template-columns: minmax(0, 1fr) 18rem;
}
```

Use `minmax(0, 1fr)` or a zero minimum on the item when content should be allowed to shrink, and separately decide how the content itself should wrap or scroll.

### Q9. What is the difference between `auto-fit` and `auto-fill` in a card layout?

Both create as many tracks as fit according to the repeated track definition. `auto-fill` keeps space for empty tracks, while `auto-fit` collapses empty tracks and distributes the resulting space among tracks containing items. With a full row of cards they can look identical; the distinction is most visible when the last row is incomplete.

### Q10. What is subgrid, and when is it useful?

`subgrid` lets a nested grid use tracks defined by its parent on a selected axis. It is useful when child content in separate nested components needs to align to the same parent rows or columns. Check target browser support and provide a layout that remains usable where subgrid is unavailable if those browsers are in scope.

### Q11. How would you debug an unexpected grid layout?

Enable the grid overlay in browser developer tools, inspect explicit and implicit tracks, track sizing functions, gaps, and item placement. Check intrinsic minimum sizes and auto-placement order. Reproduce with representative content and viewport sizes, especially when the issue occurs only for an incomplete final row or unusually long content.
