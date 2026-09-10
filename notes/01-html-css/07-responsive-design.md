# Responsive Design

Responsive design is the practice of building web pages that adapt their layout and appearance to different screen sizes and devices, rather than serving a fixed layout designed for one screen width. It combines flexible layout techniques, media queries, and a few key HTML/CSS conventions.

## The Viewport Meta Tag

Mobile browsers render pages at a desktop-width virtual viewport by default and then zoom out, unless told otherwise:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

`width=device-width` sets the viewport width to the actual device width, and `initial-scale=1.0` sets the initial zoom level. Without this tag, responsive CSS often won't behave as expected on mobile.

## Media Queries

Media queries apply CSS conditionally based on characteristics of the viewport, most commonly width:

```css
.container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

The convention of writing base styles for mobile first, then adding `min-width` breakpoints for larger screens, is called **mobile-first design**. It tends to produce simpler CSS than the reverse (desktop-first with `max-width` overrides), since small-screen layouts are usually the simpler starting point.

## Fluid Layouts and Units

Responsive design relies on layout values that scale rather than staying fixed:

- Use percentages, `fr` (Grid), or flex-grow (Flexbox) instead of fixed pixel widths for containers.
- Use `max-width` instead of `width` on elements like images so they shrink on small screens but don't grow past their natural size on large ones.
- Use relative units (`rem`, `em`, `vw`) for spacing and typography so they scale with user or viewport settings.

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Responsive Images

The `srcset` and `sizes` attributes let the browser choose the most appropriate image file for the current screen size and resolution, avoiding sending an oversized image to a small screen:

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Description"
/>
```

## Flexbox and Grid for Responsiveness

Flexbox's `flex-wrap` and Grid's `repeat(auto-fit, minmax(...))` can create layouts that adapt to available space without any media queries at all, by letting the browser reflow content based on how much room is available.

## Common Breakpoints

There's no fixed standard, but common breakpoint ranges are roughly: mobile (up to ~480px), tablet (~481px–768px), and desktop (769px+). Real-world breakpoints should be chosen based on where a specific design actually starts to break, not blindly copied from a list.

## Practice Questions

1. What does the viewport meta tag do, and what happens if it's missing on a mobile page?
2. Why is mobile-first design (using `min-width` media queries) generally preferred over desktop-first (`max-width`)?
3. What problem does `srcset` solve that `max-width: 100%` on an `<img>` does not?
4. How can `repeat(auto-fit, minmax(200px, 1fr))` reduce the need for media queries in a grid layout?
5. Why is `max-width: 100%` generally safer than `width: 100%` for responsive images?
