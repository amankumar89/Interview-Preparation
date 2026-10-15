# CSS — 02 Box Model

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the CSS box model?

**Interview Answer:**

Every element is represented by a rectangular box made up of content, padding, border, and margin. The content and padding are inside the border; margin is outside it and separates the element from neighboring boxes.

### Q2. What is the difference between `content-box` and `border-box`?

With `content-box`, declared `width` and `height` apply to the content box, so padding and borders increase the rendered dimensions. With `border-box`, the declared dimensions include content, padding, and border.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Applying `border-box` consistently makes component sizing easier to reason about. Margins are not included in either sizing model.

### Q3. How do padding and margin differ?

Padding is the space between content and border; it is part of the element's background area and box dimensions. Margin is outside the border and creates separation from other boxes. Vertical margins of block boxes can collapse in normal flow, while padding does not collapse.

### Q4. What is margin collapsing?

In normal block flow, adjacent vertical margins can combine into a single margin rather than add together. This can happen between sibling blocks and between a parent and its first or last child under specific conditions. Horizontal margins do not collapse.

Creating a new block formatting context, adding a border or padding, or using layout systems such as flexbox or grid can change the conditions that allow collapsing. Diagnose it by inspecting computed margins and the surrounding formatting context rather than adding arbitrary offsets.

### Q5. How do `width`, `min-width`, and `max-width` interact?

`width` expresses a preferred width, while `min-width` and `max-width` constrain the used size. The browser resolves these constraints together, so a minimum can override a smaller width and a maximum can cap a larger one.

```css
.content {
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
}
```

This pattern lets content shrink on narrow screens while staying readable on wide ones.

### Q6. Why can a child overflow its parent?

An element can overflow when its content or used dimensions exceed the available space. Common causes include fixed widths, long unbreakable strings, images without size constraints, flex or grid items' automatic minimum sizes, and positioned descendants.

Use `max-width: 100%` for media where appropriate, allow text to wrap when safe, and choose `overflow` deliberately. Avoid hiding overflow as a quick fix when it clips controls or content users need.

### Q7. What does the `overflow` property control?

`overflow` controls what happens when content exceeds an element's padding box. `visible` allows it to extend outside; `hidden` clips it; `auto` or `scroll` can provide scrolling. The `clip` value clips without creating a scroll container.

```css
.log-output {
  max-height: 20rem;
  overflow: auto;
}
```

Use scrollable regions only when they have a useful size and interaction. Check keyboard access and ensure important information is not silently clipped.

### Q8. What is a containing block, and why does it matter?

A containing block is the reference box used to resolve some dimensions and offsets. For a normally positioned block, it is often established by the content box of its closest block container. An absolutely positioned element is positioned relative to the padding box of its nearest ancestor that establishes a positioning context, commonly one with non-static positioning.

Transforms and some other properties can also establish containing blocks for positioned descendants. When an overlay appears in the wrong place, inspect its ancestors for positioning, transforms, and scrolling contexts.

### Q9. What is a block formatting context, and when is it useful?

A block formatting context (BFC) is a layout region whose contents are laid out independently from surrounding blocks in certain ways. It contains its floats and prevents some margin-collapsing behavior across its boundary.

Properties such as `display: flow-root` establish a BFC explicitly. Prefer `flow-root` when the goal is float containment rather than using older clearfix hacks or adding unrelated overflow behavior.

### Q10. How would you debug an element with an unexpected rendered size?

Inspect its computed `box-sizing`, width constraints, padding, border, margins, intrinsic content size, and parent layout in developer tools. Check whether percentages resolve against the expected containing block and whether flex or grid sizing is imposing a minimum. Then verify at the affected viewport and with the actual content, not just an empty placeholder.
