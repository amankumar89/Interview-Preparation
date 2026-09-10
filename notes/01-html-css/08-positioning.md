# Positioning

The CSS `position` property controls how an element is placed in the document, determining whether it follows the normal document flow or is removed from it and placed using explicit coordinates (`top`, `right`, `bottom`, `left`).

## Static

`position: static` is the default for every element — it sits in the normal document flow, and `top`/`right`/`bottom`/`left` have no effect on it.

```css
.box {
  position: static;
}
```

## Relative

`position: relative` keeps the element in normal flow (it still occupies its original space), but allows it to be visually offset from that position using `top`/`right`/`bottom`/`left`. Other elements are laid out as if it hadn't moved.

```css
.box {
  position: relative;
  top: 10px;
  left: 20px;
}
```

A key secondary use of `relative` is that it establishes a **positioning context** for any absolutely positioned descendant.

## Absolute

`position: absolute` removes the element from normal flow entirely — surrounding elements behave as if it isn't there — and positions it relative to its nearest **positioned ancestor** (any ancestor with a `position` other than `static`). If no such ancestor exists, it positions relative to the initial containing block (effectively the page).

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}
```

This pattern — a `relative` parent with an `absolute` child — is one of the most common in CSS, used for things like badges, tooltips, and overlay icons pinned to a corner of a container.

## Fixed

`position: fixed` removes the element from flow and positions it relative to the browser viewport, so it stays in place even when the page scrolls. Common uses include sticky headers and floating action buttons.

```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
}
```

## Sticky

`position: sticky` is a hybrid: the element behaves like `relative` until the viewport scrolls past a threshold (set via `top`, for example), at which point it behaves like `fixed` within the bounds of its parent container.

```css
.section-heading {
  position: sticky;
  top: 0;
}
```

Once the user scrolls past the parent container, the sticky element scrolls away with it — it's constrained to its containing block, unlike `fixed`.

## Stacking Context and z-index

When positioned elements overlap, `z-index` controls which one appears on top — higher values stack above lower ones. `z-index` only has an effect on elements with a `position` value other than `static`. Stacking is actually governed by **stacking contexts**, which can nest: a `z-index` only competes against sibling elements within the same stacking context, not globally across the whole page.

```css
.modal {
  position: fixed;
  z-index: 1000;
}
```

## Practice Questions

1. What's the difference between `relative` and `absolute` positioning in terms of document flow?
2. Why does an `absolute` child ignore its parent's boundaries unless the parent has `position: relative` (or similar)?
3. How is `sticky` different from `fixed`?
4. Why might setting `z-index: 999` on an element sometimes fail to bring it above another element with a lower `z-index`?
5. Name a common real-world UI pattern that relies on a `relative` parent and an `absolute` child.
