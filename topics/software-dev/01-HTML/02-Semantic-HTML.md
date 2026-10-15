# HTML — 02 Semantic HTML

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is semantic HTML?

**Interview Answer:**

Semantic HTML uses elements according to the meaning of their content and behavior. For example, `nav` represents navigation, `article` represents an independent piece of content, and `button` represents an action.

**Detailed Explanation:**

Semantic elements communicate structure to browsers, search engines, developers, and assistive technology. They also provide useful default behavior and reduce the amount of ARIA and JavaScript needed.

### Q2. What is the difference between `section`, `article`, and `div`?

**Interview Answer:**

`article` is independently distributable content, `section` groups a related thematic part of a page, and `div` is a generic container with no semantic meaning.

Use a heading inside a `section` when it represents a meaningful section. Do not add semantic elements only to change visual styling.

### Q3. Which elements commonly describe page structure?

`header` contains introductory content, `nav` contains major navigation links, `main` contains the unique primary content, `aside` contains related content, and `footer` contains closing or ownership information. A page should normally have one `main` landmark.

## Core Concepts

### Q4. Why is a native `button` better than a clickable `div`?

**Interview Answer:**

A native button has keyboard support, focus behavior, semantics, and form behavior built into the browser. A clickable `div` requires manually recreating these behaviors and is easy to make inaccessible.

```html
<button type="button" id="save">Save</button>
```

### Q5. When should you use `strong`, `em`, `b`, and `i`?

`strong` indicates strong importance and `em` indicates emphasis. `b` and `i` are presentational or stylistic alternatives when the content is not more important or emphasized. CSS should handle purely visual styling.

### Q6. How do headings support document structure?

Headings create an outline that helps users scan content and helps assistive technology navigate. Start with the page's primary `h1`, then use lower-level headings for nested topics. Choose heading levels based on structure, not font size.

### Q7. What are `figure` and `figcaption` used for?

They group self-contained content such as an image, diagram, or code sample with its caption.

```html
<figure>
  <img
    src="flow.png"
    alt="Request flow from browser to API"
    width="640"
    height="360"
  />
  <figcaption>Request flow for the checkout page.</figcaption>
</figure>
```

## Practical Questions

### Q8. How would you structure a blog page semantically?

Use `header` for the site and article headers, `nav` for navigation, `main` for the page content, `article` for each independent post, headings for the title and sections, `time datetime="..."` for publication dates, and `aside` for related links. Use `footer` for metadata or related actions.

### Q9. What is the purpose of `time` and `data`?

`time` marks a date or time in a machine-readable form, while `data` associates visible text with a machine-readable value.

```html
<time datetime="2026-09-28">September 28, 2026</time>
<data value="SKU-1042">Interview notebook</data>
```

### Q10. What is the difference between `figure` and an ordinary image inside a paragraph?

Use `figure` when the content is a self-contained unit that can be moved away from the surrounding text without losing its meaning, usually with a caption. An inline image that is part of a sentence can remain an `img` in that sentence.

## Debugging and Production

### Q11. How do you choose between a link and a button?

Use a link when activation navigates to a URL or document location. Use a button when activation performs an action such as opening a dialog, submitting data, toggling state, or deleting an item. This distinction improves keyboard behavior, expectations, and assistive technology output.

### Q12. Can semantic HTML replace ARIA?

**Interview Answer:**

Use native semantic HTML first. ARIA supplements semantics when no native element or relationship expresses the required behavior, but it does not automatically add keyboard interaction or visual behavior.

### Q13. How would you debug an incorrect landmark structure?

Inspect the accessibility tree in browser developer tools, check that the page has a meaningful `main`, verify navigation and headings, remove redundant landmark roles, and test with keyboard navigation and a screen reader. Do not rely only on the visual DOM tree.
