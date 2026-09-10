# CSS Fundamentals

CSS (Cascading Style Sheets) controls the visual presentation of HTML — colors, spacing, typography, layout — separating content (HTML) from presentation (CSS). Understanding how styles are written, applied, and combined is the foundation for everything else in CSS.

## Syntax

A CSS rule consists of a **selector** and a **declaration block**:

```css
p {
  color: blue;
  font-size: 16px;
}
```

`p` is the selector (targets all `<p>` elements), and each `property: value;` pair inside the braces is a declaration.

## Ways to Apply CSS

There are three ways to attach CSS to HTML:

```html
<!-- Inline -->
<p style="color: red;">Text</p>

<!-- Internal -->
<style>
  p {
    color: red;
  }
</style>

<!-- External -->
<link rel="stylesheet" href="styles.css" />
```

External stylesheets are the standard approach — they're cacheable, reusable across pages, and keep content and styling separate.

## Selectors

- **Type selector**: `p` matches all `<p>` elements.
- **Class selector**: `.highlight` matches any element with `class="highlight"`.
- **ID selector**: `#header` matches the element with `id="header"`.
- **Descendant selector**: `nav a` matches any `<a>` nested inside `<nav>`.
- **Child selector**: `nav > a` matches only direct `<a>` children of `<nav>`.
- **Attribute selector**: `input[type="text"]` matches inputs with that specific type.
- **Pseudo-class**: `a:hover` matches an `<a>` in a particular state.

## The Box Model

Every element is rendered as a rectangular box made of four layers, from innermost to outermost: **content**, **padding**, **border**, and **margin**.

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}
```

By default, `width`/`height` apply only to the content area, so the box's actual rendered size is content + padding + border. Setting `box-sizing: border-box;` changes this so that `width`/`height` include padding and border, which makes sizing far more predictable and is why most modern stylesheets set it globally:

```css
* {
  box-sizing: border-box;
}
```

## The Cascade and Inheritance

"Cascading" refers to how CSS resolves conflicting rules using three factors, in order: **origin/importance** (author styles vs. browser defaults, and `!important`), **specificity** (how precise the selector is), and **source order** (later rules win ties). Some properties, mainly typography-related ones like `color` and `font-family`, are **inherited** by default — a child element takes its parent's value unless overridden. Layout properties like `margin` and `border` are not inherited.

## Units

- **Absolute**: `px` — a fixed pixel size, doesn't scale with user settings.
- **Relative to font size**: `em` (relative to the current element's font size) and `rem` (relative to the root `<html>` font size, making it more predictable for consistent scaling).
- **Relative to viewport**: `vw`/`vh` (1% of viewport width/height), useful for responsive sizing.
- **Percentage**: `%` — relative to the parent element's corresponding dimension.

## Practice Questions

1. What are the four layers of the CSS box model, from innermost to outermost?
2. Why does `box-sizing: border-box` make layouts easier to reason about?
3. Between a class selector and an ID selector, which has higher specificity, and why does that matter?
4. Is `color` an inherited property? What about `padding`?
5. When would you prefer `rem` over `px` for font sizing?
