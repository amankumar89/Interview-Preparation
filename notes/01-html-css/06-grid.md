# CSS Grid

CSS Grid is a two-dimensional layout system — it lets you control rows and columns simultaneously, unlike Flexbox's single-axis model. It's the natural choice for overall page layouts and any UI that needs alignment across both rows and columns, like a dashboard or a photo gallery.

## Enabling Grid

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}
```

`grid-template-columns` and `grid-template-rows` define the track sizes. `fr` is a **fractional unit** representing a share of the remaining available space — `1fr 1fr` splits leftover space evenly between two columns.

## The repeat() Function

Instead of writing out repeated tracks manually, `repeat()` shortens the syntax:

```css
.container {
  grid-template-columns: repeat(3, 1fr); /* three equal columns */
}
```

Combined with `minmax()` and `auto-fit` or `auto-fill`, this creates responsive grids without media queries:

```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

This fits as many 200px+ columns as will fit the container width, growing them to fill leftover space.

## Placing Items

Items placed inside a grid container automatically flow into the next available cell, but can also be positioned explicitly using line numbers:

```css
.item {
  grid-column: 1 / 3; /* start at column line 1, end at column line 3 */
  grid-row: 2 / 4;
}

/* shorthand */
.item {
  grid-area: 2 / 1 / 4 / 3; /* row-start / column-start / row-end / column-end */
}
```

Grid lines are numbered starting at 1, and `span` can be used instead of an end line: `grid-column: span 2` makes an item cover two columns from its starting position.

## Named Template Areas

`grid-template-areas` lets you lay out a grid visually in the CSS itself, then assign items to named regions:

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
}

.sidebar {
  grid-area: sidebar;
}
.header {
  grid-area: header;
}
.main {
  grid-area: main;
}
```

This is a particularly readable way to define page-level layouts, since the CSS literally sketches out the grid shape.

## Alignment

Grid supports the same alignment properties as Flexbox, applied across two dimensions:

```css
.container {
  justify-items: center; /* horizontal alignment of items within their cells */
  align-items: center; /* vertical alignment of items within their cells */
  justify-content: center; /* horizontal alignment of the whole grid within the container */
}
```

## Grid vs. Flexbox

Flexbox is one-dimensional (a row or a column at a time) and content-driven — items influence their own size. Grid is two-dimensional and layout-driven — the container defines a fixed structure that items are placed into. A common approach is to use Grid for overall page structure and Flexbox for the internal layout of individual components.

## Practice Questions

1. What does `1fr` mean, and how is it different from a percentage?
2. How would `repeat(auto-fit, minmax(200px, 1fr))` behave differently on a wide screen versus a narrow one?
3. When would you choose CSS Grid over Flexbox for a layout?
4. What does `grid-column: span 2` do to an item?
5. Write `grid-template-areas` for a layout with a header spanning the full width, a sidebar, and a main content area below the header.
