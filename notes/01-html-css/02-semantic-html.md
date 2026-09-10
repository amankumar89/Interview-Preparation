# Semantic HTML

Semantic HTML means using elements whose tag name describes the meaning of their content, rather than relying on generic containers like `<div>` and `<span>` for everything. This gives structure that both browsers and assistive technologies (like screen readers) can understand, and it improves SEO because search engines can identify the important parts of a page.

## Semantic vs. Non-Semantic Elements

A non-semantic element like `<div>` or `<span>` tells you nothing about its content — it's a generic box. A semantic element like `<article>` or `<nav>` tells you exactly what role that content plays:

```html
<!-- Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Semantic -->
<header>
  <nav>...</nav>
</header>
```

Both can be styled identically with CSS, but only the semantic version communicates meaning in the markup itself.

## Common Semantic Elements

- `<header>` — introductory content or navigation for a page or section.
- `<nav>` — a block of primary navigation links.
- `<main>` — the dominant content of the document (only one per page).
- `<article>` — self-contained content that could stand alone, like a blog post or news story.
- `<section>` — a thematic grouping of content, usually with its own heading.
- `<aside>` — content tangentially related to the surrounding content, like a sidebar.
- `<footer>` — footer content for a page or section, like copyright or contact info.
- `<figure>` and `<figcaption>` — self-contained media (image, diagram, code) with an optional caption.

```html
<article>
  <header>
    <h2>Article Title</h2>
  </header>
  <p>Content goes here...</p>
  <footer>Posted by Jane Doe</footer>
</article>
```

## Article vs. Section

A common point of confusion: use `<article>` when the content makes sense independently of the rest of the page (a forum post, a blog entry). Use `<section>` when content is a thematic chunk of a larger whole and doesn't stand alone (a "Features" section of a landing page). Sections often, but don't always, have a heading.

## Why Semantics Matter

**Accessibility**: screen readers use semantic landmarks (`<nav>`, `<main>`, `<header>`) to let users jump directly to a page region instead of reading everything linearly.

**SEO**: search engines weigh content inside `<article>` and heading tags more heavily when determining what a page is about.

**Maintainability**: a codebase full of `<div class="header">`, `<div class="nav">` is harder to scan than one using actual semantic tags, because the markup itself documents its own structure.

## Practice Questions

1. When should you use `<section>` instead of `<article>`?
2. Why might a screen reader user prefer a page built with semantic elements over one built entirely from `<div>`s?
3. How many `<main>` elements should a single page have, and why?
4. Give an example of content that belongs in `<aside>`.
5. Rewrite this into semantic HTML: `<div class="footer"><div class="copyright">© 2026</div></div>`
