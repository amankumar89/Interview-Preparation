# Flexbox

> Interview Preparation Notes

---

## 1. Overview

Flexbox (Flexible Box Layout) is a one-dimensional CSS layout model designed to distribute space among items in a container along a single axis — either a row or a column. It solves problems that older layout techniques (floats, table layout, absolute positioning) handled awkwardly: vertical centering, equal-height columns, and dynamic space distribution.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Before Flexbox, common layout needs (vertical centering, equal-width columns,
space distribution) required hacks: floats, clearfix, negative margins, table-cell display
   ↓
Limitations of float-based layout
   ↓
Floats were designed for text wrapping around images, not full page layout —
using them for layout caused container collapse issues and fragile, hack-dependent code
   ↓
Solution
   ↓
Flexbox provides a purpose-built API for distributing space and aligning items
along one axis, with the container controlling child layout declaratively
   ↓
Benefits
   ↓
Simple vertical centering, flexible space distribution, easy reordering, responsive by default
```

---

## 3. Core Concepts

```
Flexbox
├── Flex Container (display: flex)
├── Main Axis vs Cross Axis
├── Container Properties (justify-content, align-items, flex-direction, flex-wrap)
└── Item Properties (flex-grow, flex-shrink, flex-basis, align-self, order)
```

### Main Axis vs Cross Axis

The main axis is defined by `flex-direction` (`row` = horizontal, `column` = vertical). The cross axis is always perpendicular to it. `justify-content` aligns along the main axis; `align-items`/`align-self` align along the cross axis.

### Container Properties

| Property          | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| `display: flex`   | Activates flex layout for direct children                  |
| `flex-direction`  | `row` (default), `row-reverse`, `column`, `column-reverse` |
| `justify-content` | Alignment along the main axis                              |
| `align-items`     | Alignment along the cross axis                             |
| `flex-wrap`       | Whether items wrap to new lines when they don't fit        |
| `gap`             | Spacing between items (modern, replaces margin hacks)      |

### Item Properties

| Property      | Purpose                                                             |
| ------------- | ------------------------------------------------------------------- |
| `flex-grow`   | How much an item grows relative to siblings when extra space exists |
| `flex-shrink` | How much an item shrinks relative to siblings when space is tight   |
| `flex-basis`  | The item's initial size before growing/shrinking is applied         |
| `align-self`  | Overrides `align-items` for a single item                           |
| `order`       | Visually reorders items without changing DOM order                  |

---

## 4. How It Works

```
display: flex applied to a container
   ↓
Direct children become flex items
   ↓
Browser calculates main-axis size available
   ↓
Items are laid out along the main axis based on flex-basis, flex-grow, flex-shrink
   ↓
justify-content distributes leftover space along the main axis
   ↓
align-items positions items along the cross axis
```

---

## 5. Syntax / Basic Example

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.item {
  flex: 1; /* shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
}
```

```html
<div class="container">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>
```

Here, all three items grow equally to fill available space, are evenly spaced along the main axis, and vertically centered along the cross axis.

---

## 6. Internal Working

```
Flex container's available main-axis space is computed
   ↓
Each item's hypothetical size = flex-basis (or content size if flex-basis is 'auto')
   ↓
If total size < available space → distribute extra space via flex-grow ratios
   ↓
If total size > available space → shrink items via flex-shrink ratios
   ↓
Final sizes determine layout; justify-content/align-items position the results
```

### `flex: 1` Explained

`flex: 1` expands to `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`. Setting `flex-basis: 0` means the item's starting size is treated as zero before growth is applied, so `flex: 1` on multiple siblings makes them share space **equally**, ignoring their content size as a starting point.

---

## 7. Important Concepts

### `justify-content` vs `align-items`

`justify-content` always acts on the **main axis** (whatever `flex-direction` currently is); `align-items` always acts on the **cross axis**. Flipping `flex-direction` from `row` to `column` swaps which visual direction each property affects.

### `flex-grow` Ratios

If item A has `flex-grow: 2` and item B has `flex-grow: 1`, and there's 30px of extra space, A gets 20px and B gets 10px — the ratio determines the proportional share of leftover space, not a fixed size.

### Vertical Centering (Classic Interview Trick)

```css
.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center; /* vertical */
  height: 100vh;
}
```

This single pattern replaced years of table-layout and absolute-positioning hacks for centering.

---

## 8. Real-World Usage

- **Navigation bars**: horizontal layout with items spaced via `justify-content: space-between`.
- **Card layouts**: equal-height cards in a row using `align-items: stretch` (the default).
- **Form rows**: label and input aligned on the cross axis with `align-items: center`.
- **Component internals**: buttons with icon + text commonly use `display: flex; align-items: center; gap: 8px`.

---

## 9. Best Practices

- Use `gap` instead of margin hacks for spacing between flex items — cleaner and avoids edge-item margin issues.
- Reach for Flexbox for one-dimensional layouts (a row or a column); use CSS Grid for two-dimensional layouts (rows and columns together).
- Use `flex: 1` (not just `flex-grow: 1`) when you want items to share space equally regardless of content size.
- Avoid using `order` to visually reorder content that should logically read in DOM order — it can create accessibility mismatches between visual and reading order.

---

## 10. Common Mistakes

### 1. Confusing main axis and cross axis after changing `flex-direction`

Forgetting that `justify-content` and `align-items` swap their visual effect when switching from `row` to `column`.

### 2. Using `flex-grow: 1` alone expecting equal sizing

Without `flex-basis: 0`, items with different content sizes won't end up visually equal — `flex: 1` (the shorthand) is usually what's actually wanted.

### 3. Overusing `order` for accessibility-sensitive reordering

Changing visual order via `order` without updating DOM order confuses screen reader and keyboard-tab order, which still follows the DOM.

### 4. Reaching for Flexbox for complex 2D grid layouts

Trying to force a full page grid layout using nested flex containers when CSS Grid would be simpler and more semantically appropriate.

---

## 11. Common Differences

| Concept           | vs            | Key Difference                                                                                  |
| ----------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| Flexbox           | CSS Grid      | Flexbox is one-dimensional (row or column); Grid is two-dimensional (rows and columns together) |
| `justify-content` | `align-items` | justify-content = main axis; align-items = cross axis                                           |
| `flex-grow: 1`    | `flex: 1`     | `flex: 1` also sets `flex-basis: 0`, making growth ignore content size                          |
| `align-items`     | `align-self`  | align-items sets alignment for all children; align-self overrides it for one item               |

---

## 12. Interview Questions

### Beginner

#### Q1. What problem does Flexbox solve?

**Answer:**

Flexbox provides a native, purpose-built way to distribute space and align items along a single axis — solving things like vertical centering and equal-height columns that previously required hacks with floats, tables, or absolute positioning.

#### Q2. What's the difference between the main axis and the cross axis?

**Answer:**

The main axis is defined by `flex-direction` (row = horizontal by default). The cross axis is always perpendicular to it. `justify-content` aligns along the main axis; `align-items` aligns along the cross axis.

---

### Intermediate

#### Q3. What does `flex: 1` actually do?

**Answer:**

It's shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`. Setting `flex-basis` to 0 means each item's starting size is treated as zero, so with equal `flex-grow` values, all items end up sized equally regardless of their content, sharing available space evenly.

#### Q4. How would you vertically and horizontally center a single element using Flexbox?

**Answer:**

Set `display: flex; justify-content: center; align-items: center;` on the parent container with a defined height (e.g., `height: 100vh` for full viewport centering).

---

### Advanced

#### Q5. How does the browser resolve conflicting `flex-grow` values among siblings?

**Answer:**

The browser first computes each item's hypothetical main-size (from `flex-basis` or content). If there's leftover space in the container, it's distributed proportionally according to each item's `flex-grow` value relative to the sum of all siblings' `flex-grow` values — not as a fixed amount, but as a ratio of the leftover space.

---

### Follow-Up Questions

#### Q6. When would you choose CSS Grid over Flexbox?

**Answer:**

When the layout genuinely needs two-dimensional control — aligning items along both rows and columns simultaneously, like a dashboard or photo gallery grid. Flexbox is better suited to one-dimensional flows like navbars, toolbars, or a single row/column of cards.

---

## 13. Scenario-Based Questions

### Scenario 1 — Items Not Growing Equally Despite `flex-grow: 1`

Three flex items with `flex-grow: 1` but different text content end up visually different widths.

**Approach:**

1. Check `flex-basis` — if it's `auto` (the default when using `flex-grow` alone, not the `flex: 1` shorthand), each item's starting size is based on its content, so growth is added on top of unequal starting points.
2. Switch to the `flex: 1` shorthand (which sets `flex-basis: 0`) to make items grow from an equal starting point.

### Scenario 2 — Cross-Axis Alignment Breaks After Changing `flex-direction`

A layout that centered items correctly in `row` mode looks wrong after switching to `column`.

**Approach:**

1. Recall that `justify-content` and `align-items` swap axes when `flex-direction` changes.
2. Swap the property usage accordingly — what was `align-items: center` for vertical centering in `row` mode now needs to be `justify-content: center` in `column` mode, and vice versa.

---

## 14. Practical Examples

### Example 1

Build a responsive navbar with a logo on the left and nav links on the right using `justify-content: space-between`.

### Example 2

Create a row of equal-width cards using `flex: 1` on each card, regardless of content length.

### Example 3

Build a centered loading spinner using `display: flex; justify-content: center; align-items: center; height: 100vh`.

---

## 15. Quick Revision

- Flexbox is one-dimensional layout: a single row or column.
- Main axis follows `flex-direction`; cross axis is always perpendicular.
- `justify-content` = main axis; `align-items`/`align-self` = cross axis.
- `flex: 1` sets `flex-basis: 0`, making growth ignore content size for equal sizing.
- Use `gap` for spacing instead of margin hacks.

---

## 16. Interview Cheat Sheet

| Question     | Remember                                                               |
| ------------ | ---------------------------------------------------------------------- |
| Why?         | Native solution for space distribution and alignment along one axis    |
| How?         | Container computes available space, distributes via grow/shrink ratios |
| When?        | Navbars, toolbars, single-row/column layouts, centering                |
| Alternative? | CSS Grid for two-dimensional layouts                                   |
| Production?  | Navbars, card rows, form field alignment, icon+text buttons            |
| Interview?   | Explain flex: 1 vs flex-grow: 1, and main vs cross axis                |
