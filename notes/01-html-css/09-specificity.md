# Specificity

Specificity is the algorithm the browser uses to decide which CSS rule wins when multiple rules target the same element with conflicting declarations for the same property. Understanding it is essential for debugging "why isn't my style applying" problems.

## How Specificity Is Calculated

Specificity is commonly represented as a tuple of four values, often written `(a, b, c, d)`:

- **a** — inline styles (`style="..."` attribute). Counts as 1 if present, 0 otherwise.
- **b** — number of ID selectors (`#id`).
- **c** — number of class selectors (`.class`), attribute selectors (`[type="text"]`), and pseudo-classes (`:hover`).
- **d** — number of type selectors (`div`, `p`) and pseudo-elements (`::before`).

Two selectors are compared left to right through these categories; the first category with a higher count wins, regardless of how many the losing selector has in later categories.

```css
#nav a.active {
  color: red;
} /* (0, 1, 1, 1) */
.nav-link {
  color: blue;
} /* (0, 0, 1, 0) */
```

The first rule wins because it has an ID selector, even though the second has fewer selectors overall. Specificity is not decimal — ten class selectors (0,0,10,0) never outweigh a single ID selector (0,1,0,0).

## Examples

```css
p                  /* (0,0,0,1) */
.box                /* (0,0,1,0) */
#header             /* (0,1,0,0) */
div.box             /* (0,0,1,1) */
#header .box p      /* (0,1,1,1) */
```

## The Cascade Order

When two rules have identical specificity, the cascade falls back to **source order** — the rule that appears later in the stylesheet (or later `<style>`/`<link>` in the document) wins.

```css
.text {
  color: blue;
}
.text {
  color: green;
} /* wins — same specificity, comes later */
```

## !important

Adding `!important` to a declaration overrides normal specificity rules entirely — it wins against any rule without `!important`, regardless of selector specificity. If two conflicting declarations both use `!important`, normal specificity rules apply again between them.

```css
p {
  color: red !important;
}
```

`!important` is generally discouraged as a habitual tool because it breaks the predictability of the cascade and makes future overrides harder — it's better reserved for narrow exceptions, like overriding a third-party library's styles you can't edit directly.

## Universal Selector and Combinators

The universal selector (`*`) and combinators (`>`, `+`, `~`, and the space for descendant) do not add to specificity themselves — only the actual type, class, and ID selectors around them count.

```css
* {
  margin: 0;
} /* (0,0,0,0) */
div > p {
  color: red;
} /* (0,0,0,2) — just the two type selectors */
```

## Practice Questions

1. Between `#sidebar .widget` and `.sidebar-widget-active`, which wins and why?
2. Why can't ten class selectors ever outweigh one ID selector, no matter how many there are?
3. If two selectors have identical specificity, which rule takes effect?
4. Why is overusing `!important` considered a bad practice?
5. What is the specificity, in `(a,b,c,d)` form, of the selector `nav ul li.active > a`?
