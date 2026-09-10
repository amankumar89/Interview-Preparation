# HTML

HTML (HyperText Markup Language) is the markup language used to structure content on the web. It defines the elements — headings, paragraphs, links, images, and more — that browsers render into a page, and it forms the foundation that CSS and JavaScript build on top of.

## Document Structure

Every HTML document follows a standard skeleton:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

The `<!DOCTYPE html>` declaration tells the browser to render the page in standards mode rather than "quirks mode." The `<html>` element is the root, split into `<head>` (metadata, not visible on the page) and `<body>` (the visible content). The `lang` attribute helps screen readers and search engines identify the document's language.

## Elements and Tags

An **element** consists of an opening tag, content, and a closing tag, e.g. `<p>Some text</p>`. Some elements are **void elements** — they have no closing tag and no content, like `<img>`, `<br>`, and `<input>`. Elements can be nested, but nesting must not overlap: `<b><i>text</i></b>` is valid, `<b><i>text</b></i>` is not.

## Attributes

Attributes provide additional information about an element and are written inside the opening tag as `name="value"` pairs:

```html
<a href="https://example.com" target="_blank" rel="noopener">Visit</a>
```

Common global attributes (usable on any element) include `id`, `class`, `style`, `title`, and `data-*` custom attributes for storing extra data that JavaScript can read.

## Text and Content Elements

Headings (`<h1>`–`<h6>`) establish hierarchy and should be used in order, not chosen for font size. `<p>` defines a paragraph. Inline formatting elements like `<strong>` (importance) and `<em>` (emphasis) carry semantic meaning, unlike their purely visual counterparts `<b>` and `<i>`. `<br>` inserts a line break, and `<hr>` inserts a thematic break.

## Links and Navigation

The anchor element `<a>` creates hyperlinks:

```html
<a href="/about">About</a>
<a href="mailto:someone@example.com">Email us</a>
<a href="#section2">Jump to section</a>
```

Relative URLs (`/about`) point within the same site; absolute URLs (`https://...`) point elsewhere. Fragment links (`#id`) jump to an element with a matching `id` on the same page.

## Lists

HTML supports three list types: unordered (`<ul>`, bulleted), ordered (`<ol>`, numbered), and description lists (`<dl>` with `<dt>`/`<dd>` pairs for terms and definitions).

```html
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

## Images and Media

`<img>` embeds images and requires a `src` and, for accessibility, an `alt` attribute describing the image content:

```html
<img src="cat.jpg" alt="A gray cat sleeping on a windowsill" />
```

`<video>` and `<audio>` embed media with built-in browser controls, and `<source>` elements inside them let the browser pick a supported file format.

## Tables

Tables structure tabular data using `<table>`, `<tr>` (row), `<th>` (header cell), and `<td>` (data cell):

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>30</td>
  </tr>
</table>
```

Tables should be used for genuinely tabular data, not for page layout.

## Practice Questions

1. What is the difference between an HTML element and an HTML tag?
2. Why is the `alt` attribute on `<img>` important beyond just accessibility?
3. What happens if you nest two elements so their closing tags overlap, like `<b><i>text</b></i>`?
4. When would you use `<strong>` instead of `<b>`?
5. What is the purpose of the `<!DOCTYPE html>` declaration?
