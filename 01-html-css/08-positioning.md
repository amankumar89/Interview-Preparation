# CSS Positioning

> Interview Preparation Notes

---

## 1. Overview

The `position` property controls how an element is placed in the document, and specifically how the `top`/`right`/`bottom`/`left` offset properties behave. Understanding positioning — especially the concept of "positioning context" — is essential for building overlays, tooltips, sticky headers, and modals correctly.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Normal document flow (elements stacking top-to-bottom, left-to-right) can't
express overlays, sticky elements, or precise offset placement
   ↓
Limitations of normal flow
   ↓
You can't place a tooltip exactly next to a button, or keep a header visible
while scrolling, using flow layout alone
   ↓
Solution
   ↓
The position property lets elements be taken out of normal flow (or partially
adjusted within it) and placed relative to different reference points
   ↓
Benefits
   ↓
Overlays, modals, tooltips, sticky headers, dropdown menus — all achievable
declaratively in CSS
```

---

## 3. Core Concepts

```
position values
├── static (default — normal flow, offsets ignored)
├── relative (offset from its own normal position, still occupies original space)
├── absolute (removed from flow, positioned relative to nearest positioned ancestor)
├── fixed (removed from flow, positioned relative to the viewport)
└── sticky (hybrid — relative until a scroll threshold, then fixed)
```

### Comparison Table

| Value      | In Normal Flow?       | Positioned Relative To      | Scrolls With Page?                 |
| ---------- | --------------------- | --------------------------- | ---------------------------------- |
| `static`   | Yes                   | N/A (offsets ignored)       | Yes                                |
| `relative` | Yes (space reserved)  | Its own default position    | Yes                                |
| `absolute` | No                    | Nearest positioned ancestor | Yes (unless ancestor is fixed)     |
| `fixed`    | No                    | Viewport                    | No                                 |
| `sticky`   | Yes (until threshold) | Nearest scrolling ancestor  | Partially (sticks after threshold) |

---

## 4. How It Works

```
Element assigned a position value
   ↓
static: normal flow, top/right/bottom/left have no effect
   ↓
relative: stays in flow, but visually offset from its natural position via top/left/etc.
   ↓
absolute: removed from flow entirely; browser searches up the ancestor chain
           for the nearest ancestor with position != static (the "positioning context")
   ↓
   If none found: positioned relative to the initial containing block (viewport, roughly)
   ↓
fixed: removed from flow; always positioned relative to the viewport (or a transformed ancestor — see below)
   ↓
sticky: behaves as relative until the specified scroll threshold is crossed, then
        behaves as fixed within its nearest scrolling container
```

---

## 5. Syntax / Basic Example

```css
.dropdown-container {
  position: relative; /* establishes positioning context for the child */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
}
```

```html
<div class="dropdown-container">
  <button>Menu</button>
  <div class="dropdown-menu">...</div>
</div>
```

This is the canonical dropdown pattern: the parent is `relative` (establishing a positioning context without visually moving), and the child is `absolute`, positioned relative to that parent rather than the whole page.

---

## 6. Internal Working

### The Positioning Context Search

When an element has `position: absolute`, the browser walks up the DOM tree looking for the nearest ancestor whose `position` is anything other than `static`. That ancestor becomes the "containing block" for offset calculations. If no such ancestor exists, the element is positioned relative to the initial containing block (effectively the viewport, accounting for document scroll).

### `fixed` Positioning Caveat

`position: fixed` is normally relative to the viewport — **except** when an ancestor has a `transform`, `filter`, `perspective`, or `will-change` property set to something other than `none`. In that case, the ancestor becomes the fixed element's containing block instead of the viewport, which is a well-known source of "why isn't my fixed element staying fixed" bugs.

### Stacking Context and `z-index`

`z-index` only has an effect on positioned elements (`position` other than `static`) or flex/grid items. It doesn't compare globally — it compares within the same **stacking context**, which can be created by properties beyond `position` (e.g., `opacity < 1`, `transform`, `will-change`). This is why a high `z-index` sometimes "doesn't work" — it's being compared within the wrong stacking context.

---

## 7. Important Concepts

### `relative` Without Offsets

`position: relative` with no `top`/`left`/etc. set has zero visual effect on the element itself — but it **is** still meaningful, because it establishes a positioning context for any `absolute`-positioned children.

### `sticky` Requires a Threshold and Scrollable Ancestor

```css
.header {
  position: sticky;
  top: 0;
}
```

This sticks the header to the top of its nearest scrolling ancestor once the page scrolls past its natural position. If any ancestor has `overflow: hidden` or a constrained height without proper scroll behavior, `sticky` can silently fail to work.

### `absolute` Removes the Element from Layout Flow

Sibling elements behave as if the `absolute` element doesn't exist for layout purposes — this is why absolutely positioned overlays don't push other content around.

---

## 8. Real-World Usage

- **Modals/overlays**: `position: fixed` covering the viewport, often combined with a semi-transparent backdrop.
- **Dropdown menus and tooltips**: `relative` parent + `absolute` child pattern.
- **Sticky headers/table headers**: `position: sticky` for headers that remain visible while scrolling content beneath them.
- **Badges/notification counters**: `absolute` positioned in a corner of a `relative` parent icon.

---

## 9. Best Practices

- Always pair `absolute` children with an explicitly `relative` (or otherwise positioned) parent, rather than relying on accidental positioning contexts further up the tree.
- Be cautious with `transform` on ancestors of `fixed` elements — it silently changes their containing block.
- Use `sticky` for headers/table headers instead of JavaScript scroll listeners where possible — it's more performant and simpler.
- Understand stacking contexts before assuming a `z-index` fix will work; sometimes the fix is restructuring the DOM or removing an unintended stacking context trigger, not raising the number further.

---

## 10. Common Mistakes

### 1. Using `absolute` without a positioned parent

Results in the element being positioned relative to the viewport/page instead of the intended container, often causing it to appear in the wrong place entirely.

### 2. Assuming `z-index` is globally comparable

Setting `z-index: 9999` and still seeing an element appear behind another, because they belong to different stacking contexts.

### 3. Forgetting the `transform`-breaks-`fixed` interaction

Adding a `transform` to a modal's ancestor for an animation and then discovering `fixed`-positioned children no longer stick to the viewport.

### 4. Expecting `sticky` to work inside an `overflow: hidden` ancestor

`sticky` silently fails (behaves like `relative`) if any ancestor between it and the scrolling container clips overflow in a way that breaks the sticky calculation.

---

## 11. Common Differences

| Concept    | vs               | Key Difference                                                                                                              |
| ---------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `relative` | `absolute`       | relative stays in flow and offsets from its own position; absolute leaves flow and offsets from nearest positioned ancestor |
| `absolute` | `fixed`          | absolute is relative to nearest positioned ancestor; fixed is relative to the viewport (usually)                            |
| `fixed`    | `sticky`         | fixed never scrolls with the page; sticky scrolls until a threshold, then sticks                                            |
| `z-index`  | Stacking context | z-index only compares within the same stacking context, not globally                                                        |

---

## 12. Interview Questions

### Beginner

#### Q1. What are the five main values of the `position` property?

**Answer:**

`static` (default, normal flow), `relative` (offset from its own position, stays in flow), `absolute` (offset from nearest positioned ancestor, removed from flow), `fixed` (offset from the viewport, removed from flow), and `sticky` (hybrid — relative until a scroll threshold, then fixed).

#### Q2. What does `position: relative` do if you don't set any offset properties?

**Answer:**

Visually nothing changes for the element itself, but it establishes a positioning context — meaning any `absolute`-positioned descendant will be positioned relative to it instead of the page.

---

### Intermediate

#### Q3. How does the browser determine the containing block for an `absolute`-positioned element?

**Answer:**

It walks up the ancestor chain looking for the nearest ancestor with a `position` value other than `static`. That ancestor becomes the containing block. If none is found, it falls back to the initial containing block (roughly the viewport/page).

#### Q4. What's the difference between `absolute` and `fixed` positioning?

**Answer:**

Both remove the element from normal document flow, but `absolute` is positioned relative to the nearest positioned ancestor, while `fixed` is positioned relative to the viewport (so it stays in place during scrolling) — unless an ancestor has a `transform`/`filter`/`will-change` property, which changes the containing block for `fixed` too.

---

### Advanced

#### Q5. Why might a high `z-index` fail to bring an element to the front?

**Answer:**

Because `z-index` only compares elements within the same stacking context. Properties like `opacity < 1`, `transform`, `filter`, or `will-change` on an ancestor create new stacking contexts, effectively isolating the `z-index` comparisons of descendants from siblings outside that ancestor — so a very high `z-index` inside one stacking context can still render behind a much lower `z-index` element in a different, higher-level stacking context.

---

### Follow-Up Questions

#### Q6. Why would a `position: fixed` modal suddenly stop covering the full screen after a parent element gets an animation added?

**Answer:**

If the animation is implemented using `transform` on an ancestor, that ancestor becomes the containing block for any `fixed`-positioned descendants instead of the viewport — so the modal ends up positioned relative to that ancestor's box instead of the full viewport.

---

## 13. Scenario-Based Questions

### Scenario 1 — Dropdown Appears in the Wrong Place

A dropdown menu built with `position: absolute` appears pinned to the top-left of the page instead of next to its trigger button.

**Approach:**

1. Check whether the dropdown's parent container has `position: relative` (or another non-static value) set.
2. If not, the browser is falling back to the initial containing block (the page), not the intended local container.
3. Add `position: relative` to the immediate parent to establish the correct positioning context.

### Scenario 2 — `z-index` Increase Doesn't Fix Overlap

Increasing a tooltip's `z-index` to `9999` still doesn't bring it above a modal.

**Approach:**

1. Inspect both elements' ancestor chains in DevTools for properties that create new stacking contexts (`opacity`, `transform`, `filter`, `will-change`, `position: fixed`).
2. Identify that the tooltip's stacking context is nested inside a lower-priority stacking context than the modal's.
3. Restructure the DOM (e.g., render the tooltip via a portal at the document root) or adjust the responsible ancestor's stacking-context-triggering property.

---

## 14. Practical Examples

### Example 1

Build a button with a dropdown menu using the `relative` parent / `absolute` child pattern.

### Example 2

Create a sticky table header that remains visible while scrolling a long table.

### Example 3

Build a full-screen modal overlay using `position: fixed`, and then intentionally add a `transform` to an ancestor to observe the containing-block change.

---

## 15. Quick Revision

- `static` = normal flow, offsets ignored (default).
- `relative` = stays in flow, offsets from its own position, establishes positioning context.
- `absolute` = removed from flow, offsets from nearest positioned ancestor.
- `fixed` = removed from flow, offsets from viewport (unless a transformed ancestor intervenes).
- `sticky` = relative until a scroll threshold, then behaves like fixed within its scroll container.
- `z-index` only compares within the same stacking context.

---

## 16. Interview Cheat Sheet

| Question     | Remember                                                                           |
| ------------ | ---------------------------------------------------------------------------------- |
| Why?         | Normal flow can't express overlays, sticky headers, or precise offsets             |
| How?         | Browser searches ancestor chain for nearest positioned element as containing block |
| When?        | Dropdowns, modals, tooltips, sticky headers, badges                                |
| Alternative? | CSS Grid/Flexbox for structural layout, not for overlay-style placement            |
| Production?  | Modals (fixed), dropdowns (relative+absolute), sticky headers                      |
| Interview?   | Explain positioning context search and stacking context vs z-index                 |
