# HTML Fundamentals

> Interview Preparation Notes

---

## 1. Overview

HTML (HyperText Markup Language) is the markup language that defines the structure and content of every web page. It is not a programming language — it has no logic, loops, or conditionals. Its job is to describe _what_ content is (a heading, a paragraph, a link, an image) so browsers can render it and assistive technologies (like screen readers) can interpret it correctly.

Every frontend interview, regardless of framework, assumes solid HTML fundamentals, because React, Vue, and Angular all eventually render to HTML in the DOM.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Browsers need a standard way to know what content is and how it's structured
   ↓
Limitations of plain text
   ↓
Plain text has no structure — no way to say "this is a heading" or "this is a link"
   ↓
Solution
   ↓
HTML wraps content in tags/elements that describe meaning and structure
   ↓
Benefits
   ↓
Consistent rendering across browsers, accessibility, SEO, and a DOM that JS can manipulate
```

Without HTML, there is no DOM. Without a DOM, CSS has nothing to style and JavaScript has nothing to manipulate. HTML is the foundation layer of the web platform.

---

## 3. Core Concepts

```
HTML
├── Elements & Tags
├── Attributes
├── The DOM Tree
├── Document Structure (doctype, html, head, body)
├── Void Elements
├── Nesting & Block vs Inline
└── Global Attributes
```

### Elements vs Tags

- A **tag** is the markup syntax: `<p>` (opening tag), `</p>` (closing tag).
- An **element** is the tag plus its content and attributes: `<p class="intro">Hello</p>`.

### Attributes

Key-value pairs inside the opening tag that configure an element's behavior or provide metadata:

```html
<img src="logo.png" alt="Company logo" width="200" />
```

### Void Elements

Elements that cannot have children and don't need a closing tag: `<img>`, `<br>`, `<hr>`, `<input>`, `<meta>`, `<link>`.

---

## 4. How It Works

```
Browser requests HTML file
  ↓
Browser parses HTML top to bottom
  ↓
Parser builds the DOM (Document Object Model) tree
  ↓
CSSOM is built from CSS
  ↓
DOM + CSSOM combine into the Render Tree
  ↓
Layout (geometry) is calculated
  ↓
Paint (pixels) happens on screen
```

HTML parsing is **incremental and streaming** — the browser doesn't wait for the whole file; it starts building the DOM as bytes arrive, which is why `<script>` placement affects perceived load time.

---

## 5. Syntax / Basic Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` tells the browser to use standards mode (HTML5), avoiding "quirks mode" rendering bugs.
- `lang="en"` helps screen readers and search engines.
- `<meta charset="UTF-8">` ensures correct text encoding.
- The viewport meta tag is required for responsive design on mobile.

---

## 6. Internal Working

```
Bytes received
   ↓
Tokenizer converts bytes into tokens (start tag, end tag, text, etc.)
   ↓
Tree construction algorithm builds DOM nodes from tokens
   ↓
Malformed HTML is auto-corrected by the parser (error recovery)
   ↓
DOM tree is exposed to JavaScript via `document`
```

A key interview point: **HTML parsers are fault-tolerant**. Unlike XML, an unclosed `<div>` will not crash the page — the browser applies well-defined error-recovery rules (e.g., auto-closing tags) to still produce a usable DOM. This is very different from how a JSON or XML parser behaves.

---

## 7. Important Concepts

### Block vs Inline Elements

| Aspect                      | Block                       | Inline                         |
| --------------------------- | --------------------------- | ------------------------------ |
| Starts on new line          | Yes                         | No                             |
| Takes full width by default | Yes                         | No (only as wide as content)   |
| Can set width/height        | Yes                         | No (mostly ignored)            |
| Examples                    | `div`, `p`, `section`, `h1` | `span`, `a`, `strong`, `img`\* |

\*`img` is technically "inline-block" — it respects width/height despite being inline-level.

### The DOM Tree

The DOM is a tree of nodes representing the parsed document. Every HTML element becomes an object node that JavaScript can query and mutate via `document.querySelector`, `document.createElement`, etc.

### Global Attributes

Attributes usable on nearly any element: `id`, `class`, `style`, `title`, `data-*`, `tabindex`, `hidden`, `contenteditable`.

---

## 8. Real-World Usage

- **SEO**: Search engines parse raw HTML structure (headings, meta tags) to rank pages — this is why server-rendered or pre-rendered HTML matters for SPAs.
- **Accessibility**: Screen readers rely on correct HTML structure and semantics, not visual styling.
- **Frameworks**: React's JSX compiles down to `React.createElement` calls that ultimately produce real DOM nodes — understanding the DOM is essential to understanding React's virtual DOM diffing.
- **Progressive enhancement**: Forms and links should work even before JavaScript loads, using native HTML behavior (`<form action="...">`, `<a href="...">`).

---

## 9. Best Practices

- Always include `<!DOCTYPE html>` to avoid quirks mode.
- Use one `<h1>` per page for a clear document outline.
- Use semantic elements over generic `<div>`/`<span>` wherever possible (covered in depth in `02-semantic-html.md`).
- Always provide `alt` text for images.
- Keep HTML valid — run it through a validator; malformed HTML can cause inconsistent rendering across browsers.
- Load render-blocking `<script>` tags at the end of `<body>` or use `defer`/`async`.

---

## 10. Common Mistakes

### 1. Treating divs as a universal solution

Using `<div>` for everything (buttons, headings, navigation) loses semantic meaning, hurts accessibility, and adds unnecessary JavaScript work to replicate native behavior (like keyboard focus on a `<button>`).

### 2. Forgetting the viewport meta tag

Without it, mobile browsers render the page at desktop width and then scale down, breaking responsive layouts.

### 3. Nesting block elements inside inline elements

E.g., putting a `<div>` inside a `<span>` — this produces unpredictable rendering because inline elements aren't meant to contain block-level content.

### 4. Relying on tag closing behavior

Assuming the parser "figures it out" for every malformed case. It's better to write clean, valid, well-nested markup than to depend on error-recovery quirks.

---

## 11. Common Differences

| Concept       | vs               | Key Difference                                                                        |
| ------------- | ---------------- | ------------------------------------------------------------------------------------- |
| `id`          | `class`          | `id` must be unique per page; `class` can repeat and apply to many elements           |
| `<script>`    | `<script defer>` | Plain `<script>` blocks parsing; `defer` downloads in parallel and runs after parsing |
| Block element | Inline element   | Block starts new line and accepts width/height; inline does not                       |
| HTML          | XML              | HTML parsing is fault-tolerant; XML parsing fails hard on malformed markup            |

---

## 12. Interview Questions

### Beginner

#### Q1. What is HTML and what problem does it solve?

**Answer:**

HTML is a markup language used to structure content on the web. It solves the problem of describing what a piece of content _is_ (heading, paragraph, list, link) so browsers can render it consistently and assistive technology can interpret it.

#### Q2. What is the DOM?

**Answer:**

The DOM (Document Object Model) is the browser's in-memory tree representation of the HTML document. It's what JavaScript actually manipulates — not the HTML text itself.

---

### Intermediate

#### Q3. What is the difference between block-level and inline elements?

**Answer:**

Block-level elements start on a new line and take the full available width by default (e.g., `div`, `p`). Inline elements flow within text and only take as much width as their content requires (e.g., `span`, `a`). Block elements respect `width`/`height`; most inline elements ignore them.

#### Q4. Why does the browser still render pages with invalid HTML?

**Answer:**

HTML parsers implement a formal error-recovery algorithm (part of the HTML5 spec) that auto-corrects common mistakes like unclosed tags. This makes HTML more forgiving than strict formats like XML, at the cost of sometimes-unpredictable DOM structures for badly malformed markup.

---

### Advanced

#### Q5. How does the browser build the DOM from raw bytes?

**Answer:**

The browser tokenizes the byte stream into tags, attributes, and text nodes, then runs a tree-construction algorithm that applies HTML5 parsing rules (including implicit tag closing and error recovery) to build the DOM tree. This tree is then combined with the CSSOM to build the render tree.

---

### Follow-Up Questions

#### Q6. Why is `<img>` considered "inline" but behaves differently from `<span>`?

**Answer:**

`<img>` is a **replaced inline element** — the browser substitutes it with external content (the image) that has intrinsic dimensions, so unlike text-based inline elements, it respects `width` and `height`.

---

## 13. Scenario-Based Questions

### Scenario 1 — Broken Mobile Layout

A page looks fine on desktop but is zoomed out and tiny on mobile devices.

**Approach:**

1. Check if the `<meta name="viewport">` tag is present.
2. Verify `width=device-width, initial-scale=1.0` is set correctly.
3. Check for fixed-width elements wider than the viewport causing horizontal overflow.
4. Confirm no legacy `user-scalable=no` settings are unintentionally disabling zoom in ways that mask the real issue.

### Scenario 2 — SEO Ranking Drop After a Redesign

After migrating to a new frontend, a page that used to rank well drops in search results.

**Approach:**

1. Check if content is now rendered purely client-side (JS-only) with no meaningful HTML in the initial response.
2. Verify heading hierarchy (`h1`–`h6`) is intact and semantically correct.
3. Confirm `<title>` and meta description tags exist and are unique per page.
4. Check that critical content isn't hidden behind JavaScript that crawlers may not execute reliably.

---

## 14. Practical Examples

### Example 1

Build a minimal valid HTML5 document with a title, one heading, and one paragraph.

### Example 2

Add a viewport meta tag and verify the page renders correctly on a simulated mobile width in DevTools.

### Example 3

Intentionally leave a `<div>` unclosed and inspect the resulting DOM tree in browser DevTools to observe the parser's error-recovery behavior.

---

## 15. Quick Revision

- HTML describes structure and meaning, not appearance (that's CSS's job) or behavior (that's JS's job).
- The DOM is the browser's tree representation of parsed HTML — this is what JS interacts with.
- HTML parsing is incremental and fault-tolerant, unlike XML.
- Block elements take full width and start new lines; inline elements don't.
- Always include `<!DOCTYPE html>`, `<meta charset>`, and the viewport meta tag.

---

## 16. Interview Cheat Sheet

| Question     | Remember                                                                       |
| ------------ | ------------------------------------------------------------------------------ |
| Why?         | Standard way to structure content for browsers and assistive tech              |
| How?         | Parsed into tokens, then built into a DOM tree                                 |
| When?        | Every web page — it's the base layer of the platform                           |
| Alternative? | None for the browser — HTML is the only native markup language browsers render |
| Production?  | Affects SEO, accessibility, and how frameworks render to the DOM               |
| Interview?   | Explain block vs inline, DOM tree construction, and parser fault-tolerance     |
