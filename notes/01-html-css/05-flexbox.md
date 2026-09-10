# Flexbox

Flexbox (the CSS Flexible Box Layout) is a one-dimensional layout model for arranging items in a row or a column, distributing space between them, and aligning them within a container. It's the go-to tool for component-level layout — navbars, card rows, centering content — where items flow along a single axis.

## Enabling Flexbox

Flexbox activates on a container via `display: flex`, which turns its direct children into **flex items**:

```css
.container {
  display: flex;
}
```

## Main Axis and Cross Axis

Flexbox layout is built around two axes. The **main axis** is the direction items are laid out along, controlled by `flex-direction` (default `row`). The **cross axis** runs perpendicular to it. Most flexbox properties align items along one axis or the other, so knowing which axis is "main" for a given container is essential to predicting how `justify-content` and `align-items` behave.

```css
.container {
  flex-direction: row; /* row | row-reverse | column | column-reverse */
}
```

## Container Properties

```css
.container {
  display: flex;
  justify-content: space-between; /* aligns items along the main axis */
  align-items: center; /* aligns items along the cross axis */
  flex-wrap: wrap; /* allows items to wrap to new lines */
  gap: 16px; /* spacing between items */
}
```

`justify-content` common values: `flex-start`, `flex-end`, `center`, `space-between` (equal gaps between items, none at the edges), `space-around` (equal gaps around each item), `space-evenly` (fully equal gaps including edges).

`align-items` common values: `flex-start`, `flex-end`, `center`, `stretch` (default — items fill the cross-axis size).

## Item Properties

Individual flex items can control their own sizing behavior:

```css
.item {
  flex-grow: 1; /* how much this item grows relative to others to fill space */
  flex-shrink: 1; /* how much this item shrinks relative to others when space is tight */
  flex-basis: 200px; /* the item's starting size before growing/shrinking */
}

/* shorthand */
.item {
  flex: 1 1 200px;
}
```

A common pattern, `flex: 1`, means "grow to fill available space, shrink if needed, starting from an automatic size" — it makes items share space equally.

`align-self` overrides `align-items` for one specific item:

```css
.item {
  align-self: flex-end;
}
```

## Centering with Flexbox

The classic centering pattern:

```css
.container {
  display: flex;
  justify-content: center; /* horizontal, if main axis is row */
  align-items: center; /* vertical */
}
```

## Practice Questions

1. What's the difference between the main axis and the cross axis, and what determines which is which?
2. What does `flex: 1` mean, and what happens if every item in a container has it?
3. How would you center a single div both horizontally and vertically inside its parent using flexbox?
4. What's the difference between `space-between` and `space-around` in `justify-content`?
5. If a flex item has `flex-shrink: 0`, what happens to it when the container is too narrow to fit all items?
