# HTML — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is HTML?

**Interview Answer:**

HTML (HyperText Markup Language) is the standard markup language used to structure content on the web. It describes the meaning and relationships of content; CSS controls presentation and JavaScript controls behavior.

**Detailed Explanation:**

The browser parses HTML into a document tree called the DOM. Elements such as headings, paragraphs, links, images, and lists provide structure that browsers, search engines, and assistive technologies can understand.

### Q2. What is the purpose of `<!DOCTYPE html>`?

**Interview Answer:**

It tells the browser to use standards mode when rendering the document. In modern HTML, the declaration is `<!DOCTYPE html>`.

**Detailed Explanation:**

It is a declaration rather than an HTML element. Omitting it can trigger quirks mode, where the browser emulates historical rendering behavior and layout calculations may differ.

### Q3. What is the basic structure of an HTML document?

**Example:**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interview Notes</title>
  </head>
  <body>
    <h1>HTML Basics</h1>
  </body>
</html>
```

`head` contains metadata and resource references. `body` contains the document content displayed to the user. The `lang` attribute identifies the document language.

## Core Concepts

### Q4. What is the difference between an element, a tag, and an attribute?

**Interview Answer:**

A tag is markup such as `<p>` or `</p>`. An element is the complete structure, such as `<p>Hello</p>`. An attribute adds configuration or metadata to an element, such as `class="note"`.

### Q5. What is the difference between block and inline elements?

**Interview Answer:**

Block elements normally start on a new line and occupy the available width, while inline elements flow within surrounding text. This is the browser's default display behavior and can be changed with CSS.

**Detailed Explanation:**

Examples of block-level elements include `div`, `p`, and `section`. Examples of inline elements include `span`, `a`, and `strong`. The distinction is about layout, not semantic importance.

### Q6. When should you use `div` and `span`?

**Interview Answer:**

Use `div` for a generic block container and `span` for a generic inline container when no semantic element fits. They should not replace meaningful elements such as `nav`, `button`, or `article`.

### Q7. What is the difference between `id` and `class`?

**Interview Answer:**

An `id` should uniquely identify one element in a document and is useful for fragment links or scripting. A `class` can be shared by many elements and is generally used for reusable styling or behavior.

## Practical Questions

### Q8. How do you create a link that opens an email client or a new page?

```html
<a href="mailto:hello@example.com">Email us</a>
<a href="/about">About us</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External site
</a>
```

`rel="noopener noreferrer"` prevents the new page from receiving the opener reference and avoids leaking the referring URL. Use a normal link for navigation rather than a clickable `div`.

### Q9. How should images be marked up?

**Answer:**

Use `img` with a meaningful `alt` attribute, intrinsic dimensions when known, and lazy loading for below-the-fold images.

```html
<img
  src="team.jpg"
  alt="Three engineers reviewing a design"
  width="900"
  height="600"
  loading="lazy"
/>
```

Decorative images should use `alt=""`. The `width` and `height` attributes help the browser reserve space and reduce layout shift.

## Audio and Video

### Q13. How do you embed audio and video in HTML?

**Interview Answer:**

Use the native `audio` and `video` elements. They provide built-in playback controls and can be enhanced with JavaScript through the media API.

```html
<audio controls preload="metadata">
  <source src="podcast.mp3" type="audio/mpeg" />
  Your browser does not support audio playback.
</audio>

<video
  controls
  width="640"
  height="360"
  preload="metadata"
  poster="preview.jpg"
>
  <source src="lesson.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>
```

The fallback text is useful for browsers that cannot use the element. `poster` provides an initial video image before playback begins.

### Q14. Why can a media element contain multiple `source` elements?

Different browsers and devices may support different codecs. Multiple sources let the browser choose the first compatible resource.

```html
<video controls>
  <source src="lesson.webm" type="video/webm" />
  <source src="lesson.mp4" type="video/mp4" />
</video>
```

The `type` attribute helps the browser skip sources it cannot decode without downloading them first. It is a compatibility fallback, not a replacement for testing the actual media files.

### Q15. How do you add captions or subtitles to a video?

Use a `track` element with a WebVTT file. Captions should include spoken dialogue and meaningful sound information; subtitles generally focus on translated dialogue.

```html
<video controls>
  <source src="interview.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="interview-en.vtt"
    srclang="en"
    label="English"
    default
  />
</video>
```

Captions make video usable for deaf or hard-of-hearing users and for people watching without sound. The media should also have a transcript when that is useful for search and other access needs.

### Q16. What is the difference between `autoplay`, `muted`, `loop`, and `controls`?

`controls` exposes browser playback controls, `autoplay` requests automatic playback, `muted` starts media without sound, and `loop` repeats it. Browsers commonly block autoplay with sound, so autoplay media should generally be muted and should not surprise users.

Avoid autoplay for important content, and always provide a clear way to pause or stop moving or repeating media.

### Q17. How do you make a responsive video without layout shift?

Give the video intrinsic `width` and `height` attributes and constrain it with CSS.

```css
video {
  display: block;
  max-width: 100%;
  height: auto;
}
```

The intrinsic dimensions let the browser reserve the correct aspect-ratio space before the resource is ready. For art-directed media, use `picture` for images or JavaScript/media queries with appropriate video sources rather than stretching a fixed asset blindly.

### Q18. How should audio and video be optimized for production?

Use an appropriate codec and bitrate, serve media through a cacheable CDN, use `preload="metadata"` or `preload="none"` when immediate playback is unnecessary, provide poster images and captions, and avoid loading large media below the fold until needed. Test keyboard controls, mobile data usage, slow networks, and browser codec support.

## Debugging and Production

### Q10. Why should HTML be validated and properly nested?

Invalid or incorrectly nested markup can cause the browser's error-recovery parser to create a DOM different from what the author intended. Validate templates, inspect the DOM in browser developer tools, and keep one clear owner for interactive elements.

### Q11. How can HTML affect page performance?

**Interview Answer:**

Keep the document small, avoid unnecessary wrappers, load scripts with `defer` when they are not needed during parsing, provide image dimensions, and use semantic structure so CSS and JavaScript remain simpler.

```html
<script src="app.js" defer></script>
```

`defer` downloads the script while parsing and executes it after parsing, preserving document order. It is usually preferable to blocking scripts placed in the document head.

### Q12. What are common HTML mistakes in production?

Common mistakes include missing document language, duplicate IDs, missing image alternatives, using buttons without a `type`, using links for actions, skipping heading structure, loading blocking scripts unnecessarily, and trusting client-side HTML validation as a security boundary. Server-side validation and output escaping are still required.
