# CSS — 05 Responsive Design

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is responsive web design?

**Interview Answer:**

Responsive design makes a page usable across a range of viewport sizes and input conditions. It combines flexible layout, appropriately sized media, readable typography, and breakpoints where the content or layout needs to change.

### Q2. Why is the viewport meta tag important?

On mobile browsers, the viewport meta tag tells the browser to use the device-width layout viewport and the intended initial scale. Without it, a mobile browser may lay out the page at a wider virtual width and shrink the result, making desktop breakpoints and text sizing behave unexpectedly.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Q3. What is a mobile-first approach?

Mobile-first CSS starts with the simplest narrow-screen layout, then adds enhancements at wider breakpoints using `min-width` media queries. It can keep the base experience focused and reduce overrides, but the key is to choose breakpoints based on the content rather than specific device models.

### Q4. How should you choose breakpoints?

Choose a breakpoint where the current content or layout stops working well, such as navigation wrapping or columns becoming too narrow. Test actual content across a range of widths instead of targeting named devices or a small set of popular screen sizes.

```css
.results {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .results {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

### Q5. How do you create fluid dimensions without losing limits?

Combine a flexible value with minimum and maximum constraints. `clamp(min, preferred, max)` is useful for values such as spacing or type that should scale within a defined range.

```css
.page-content {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

h1 {
  font-size: clamp(2rem, 1.4rem + 2vw, 3.25rem);
}
```

Keep text sizing usable when users zoom and avoid relying on viewport width alone for all typography.

### Q6. How do you make images and other media responsive?

Constrain replaced elements to their container and preserve their intrinsic ratio unless a deliberate crop is needed.

```css
img,
video {
  max-width: 100%;
  height: auto;
}
```

Use `object-fit` when an image needs to fill a fixed aspect-ratio box. For different image crops or resolutions, use responsive image markup such as `picture` and `srcset` so the browser can choose an appropriate source.

### Q7. What are container queries, and when are they preferable to media queries?

Media queries respond to viewport or user environment features. Container queries let a component adapt to the size or style of its containing context, which is useful when the same component appears in different-sized regions.

```css
.card-list {
  container-type: inline-size;
}

@container (min-width: 34rem) {
  .card {
    display: grid;
    grid-template-columns: 8rem 1fr;
  }
}
```

The queried container must establish the relevant containment. Use viewport media queries for page-level changes and container queries for reusable component-level changes.

### Q8. How do you prevent horizontal overflow on small screens?

Inspect fixed widths, minimum sizes, long unbreakable strings, wide tables, positioned elements, and images. Let layout tracks shrink where appropriate, use `min-width: 0` for flex or grid children, and provide intentional scrolling for content such as data tables when it cannot be reflowed.

Avoid applying `overflow-x: hidden` to the whole page without finding the source; it can conceal content and create difficult-to-reach controls.

### Q9. What does accessibility require from responsive CSS?

Layouts should reflow at high zoom and narrow widths without loss of content or functionality. Preserve logical reading and focus order, keep controls usable, and do not rely on hover as the only way to reveal information. Support user preferences such as reduced motion and increased contrast where appropriate.

### Q10. How would you test a responsive page?

Test representative narrow, intermediate, and wide widths, plus zoom and text enlargement. Use real or realistic content, keyboard navigation, and browser developer tools to inspect overflow and breakpoints. Validate on physical devices for touch targets, viewport behavior, and platform-specific input or rendering issues; a device emulator is useful but not a complete substitute.

### Q11. What are common responsive design mistakes?

Common mistakes include targeting device names instead of content needs, using fixed widths, hiding important content on small screens, treating mobile as a separate afterthought, allowing tables or long words to break the page, and checking only a few preset viewport widths. A responsive implementation should preserve core functionality throughout the transition between breakpoints.
