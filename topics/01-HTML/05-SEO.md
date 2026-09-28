# HTML — 05 SEO

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. How does HTML support SEO?

**Interview Answer:**

HTML gives search engines clear signals about a page's identity, structure, language, links, content, and media. Semantic markup, useful titles, descriptive headings, crawlable links, and accurate metadata provide a strong foundation, but ranking also depends on content quality and many factors outside HTML.

### Q2. What is the purpose of the `<title>` element?

It identifies the document in browser tabs, history, bookmarks, and often search results. Each indexable page should have a unique, concise title that describes its actual content.

### Q3. What is a meta description?

`<meta name="description" content="...">` summarizes a page for potential search-result snippets. It can improve click-through rate, but it is not a guaranteed ranking signal and search engines may generate a different snippet.

```html
<meta
  name="description"
  content="Practical HTML interview questions covering semantics, forms, accessibility, and SEO."
/>
```

## Core Concepts

### Q4. Why are semantic elements useful for SEO?

They make the structure and purpose of content clearer to machines and humans. Semantic elements do not guarantee rankings, but they improve document organization, accessibility, maintainability, and the likelihood that important content is interpreted correctly.

### Q5. How do canonical URLs work?

A canonical link identifies the preferred URL for substantially duplicate pages.

```html
<link rel="canonical" href="https://example.com/guides/html" />
```

It is a hint, not an access-control mechanism. Canonicals should use the correct absolute URL and should not be used to hide content that should be blocked or removed.

### Q6. What makes a link crawlable and useful?

Use an actual `a` element with an `href`, a descriptive visible label, and a destination that can be fetched and understood. Avoid navigation implemented only through click handlers on generic elements. Do not make every link say “click here.”

### Q7. What is the role of heading hierarchy in SEO?

Headings organize content and help users and crawlers understand topics. Use one clear primary heading for the page's main subject and nested headings for sections. Do not insert keywords unnaturally or choose heading levels only for visual size.

## Practical Questions

### Q8. How should an image be optimized for SEO?

Use a descriptive filename when practical, meaningful `alt` text, correct dimensions, an appropriate format and size, and nearby relevant text. Use empty alt text for decorative images. Do not stuff keywords into alt text.

### Q9. How do you mark up a responsive image?

Use `picture` when different formats or art direction are needed, and `srcset` with `sizes` when the same image should be selected at different resolutions.

```html
<img
  src="article-800.jpg"
  srcset="article-400.jpg 400w, article-800.jpg 800w, article-1200.jpg 1200w"
  sizes="(max-width: 700px) 100vw, 800px"
  alt="Developer reviewing HTML documentation"
  width="1200"
  height="800"
/>
```

### Q10. What are Open Graph and social metadata?

Open Graph and similar metadata describe how a URL appears when shared on social platforms. They improve presentation and sharing, but they do not replace the document title, description, semantic content, or crawlable links.

```html
<meta property="og:title" content="HTML Interview Guide" />
<meta
  property="og:description"
  content="A practical guide to HTML fundamentals and production concerns."
/>
<meta property="og:type" content="article" />
```

## Debugging and Production

### Q11. What is the difference between `robots.txt` and `noindex`?

`robots.txt` gives crawlers instructions about fetching URL paths; it is not a reliable way to keep a known URL out of search results. A `noindex` directive tells a crawler not to index a page when the crawler can access and process it. Neither replaces authentication for private data.

### Q12. How can JavaScript rendering affect SEO?

If important content, links, titles, or metadata appear only after unreliable client-side execution, crawlers and users may receive an incomplete page. Render critical content predictably, return useful server responses, use crawlable links, and verify the final rendered DOM with search testing tools.

### Q13. How would you debug a page that is not appearing in search results?

Check HTTP status and redirects, accidental `noindex` directives, canonical targets, robots rules, internal links, sitemap inclusion, duplicate or thin content, mobile rendering, and the rendered DOM. Inspect the URL in the relevant search console and fix the earliest blocking issue before changing metadata.
