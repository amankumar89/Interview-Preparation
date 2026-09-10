# CSS Fundamentals

> Interview Preparation Notes

---

## 1. Overview

CSS (Cascading Style Sheets) controls the visual presentation of HTML: colors, spacing, typography, layout. The "cascading" part refers to how multiple, potentially conflicting style rules are resolved into one final computed value per property, per element — this resolution process (specificity + source order + inheritance) is one of the most frequently tested CSS concepts in interviews.

---

## 2. Why Do We Need It?

```
Problem
   ↓
HTML alone has almost no visual control — content looks like a plain, unstyled document
   ↓
Limitations of inline presentational HTML (old <font> tags, bgcolor attributes)
   ↓
Mixing style with structure makes content hard to maintain and impossible to reuse consistently
   ↓
Solution
   ↓
CSS separates presentation from structure — style rules live independently and target elements via selectors
   ↓
Benefits
   ↓
Reusable styling, consistent design systems, responsive layouts, easier maintenance
```

---

## 3. Core Concepts

```
CSS
├── Selectors (type, class, id, attribute, pseudo-class, pseudo-element)
├── The Cascade (specificity, source order, importance)
├── The Box Model (content, padding, border, margin)
├── Inheritance
├── Units (px, %, em, rem, vh/vw)
└── The `!important` escape hatch
```

### Selector Types

| Selector     | Example                  | Specificity Weight                |
| ------------ | ------------------------ | --------------------------------- |
| Type         | `div`                    | Low                               |
| Class        | `.card`                  | Medium                            |
| ID           | `#header`                | High                              |
| Inline style | `style="..."`            | Highest (short of `!important`)   |
| `!important` | `color: red !important;` | Overrides normal cascade entirely |

---

## 4. How It Works

```
Browser parses CSS into the CSSOM (CSS Object Model)
   ↓
DOM + CSSOM combine into the Render Tree
   ↓
For each element/property pair, the browser resolves the cascade:
   1. Importance (author !important > author normal > user-agent default)
   2. Specificity (ID > class/attribute/pseudo-class > type/pseudo-element)
   3. Source order (later rule wins if specificity ties)
   ↓
Final computed value is used for Layout
```

---

## 5. Syntax / Basic Example

```css
/* Type selector */
p {
  color: #333;
}

/* Class selector */
.card {
  padding: 16px;
  border-radius: 8px;
}

/* ID selector */
#main-header {
  font-size: 2rem;
}

/* Pseudo-class */
button:hover {
  background-color: #005fcc;
}

/* Pseudo-element */
p::first-line {
  font-weight: bold;
}
```

- Class selectors are the recommended default for reusable component styling.
- IDs should generally be reserved for JS hooks or anchor links, not styling, because their high specificity makes overrides harder later.

---

## 6. Internal Working

### The Box Model

```
┌───────────────────────────────┐
│           margin              │
│  ┌──────────────────────────┐ │
│  │         border           │ │
│  │  ┌────────────────────┐  │ │
│  │  │      padding        │  │ │
│  │  │  ┌──────────────┐  │  │ │
│  │  │  │   content    │  │  │ │
│  │  │  └──────────────┘  │  │ │
│  │  └────────────────────┘  │ │
│  └──────────────────────────┘ │
└───────────────────────────────┘
```

By default (`box-sizing: content-box`), `width`/`height` apply only to the content box — padding and border add to the total rendered size. With `box-sizing: border-box`, `width`/`height` include padding and border, which is why most modern CSS resets apply `box-sizing: border-box` globally.

### Specificity Calculation

Specificity is often represented as a tuple `(inline, IDs, classes/attributes/pseudo-classes, types/pseudo-elements)`. Higher tuples win regardless of how many low-weight selectors are combined — ten type selectors combined still lose to a single ID selector.

### Inheritance

Some properties (`color`, `font-family`, `line-height`) inherit from parent to child by default. Others (`margin`, `padding`, `border`, `width`) do not — this is intentional, since inheriting box-model properties would make layout unpredictable.

---

## 7. Important Concepts

### The Cascade Order (Simplified)

```
1. Importance & origin (user !important > author !important > author normal > user-agent default)
2. Specificity
3. Source order (last rule wins on a tie)
```

### `em` vs `rem`

- `em` is relative to the **font-size of the parent element**, so it compounds when nested.
- `rem` is relative to the **root (`html`) font-size**, staying predictable regardless of nesting depth.

### Units for Responsive Design

| Unit        | Relative To                                 |
| ----------- | ------------------------------------------- |
| `px`        | Absolute pixel value                        |
| `%`         | Parent element's dimension                  |
| `em`        | Parent's font-size (compounds with nesting) |
| `rem`       | Root element's font-size                    |
| `vh` / `vw` | 1% of viewport height/width                 |

---

## 8. Real-World Usage

- **Design systems** rely on a consistent specificity strategy (often utility-class-based, like Tailwind) to avoid specificity wars across a large codebase.
- **CSS resets/normalizations** universally apply `box-sizing: border-box` to make width/height math predictable.
- **Responsive typography** commonly uses `rem` for font sizes so a single root font-size change (e.g., for accessibility zoom) scales the whole site proportionally.
- **CSS-in-JS and CSS Modules** exist largely to solve cascade/specificity conflicts at scale in component-based frontends.

---

## 9. Best Practices

- Default to `box-sizing: border-box` globally via a CSS reset.
- Prefer classes over IDs for styling to keep specificity low and overrides manageable.
- Use `rem` for font sizes and spacing that should respect user zoom/accessibility settings.
- Avoid `!important` except as a last resort or in narrowly scoped utility classes.
- Keep selectors as flat/simple as possible — deeply nested selectors increase specificity and make later overrides harder.

---

## 10. Common Mistakes

### 1. Fighting specificity with more `!important`

Escalating specificity wars with `!important` on both sides makes the codebase progressively harder to maintain.

### 2. Confusing `em` and `rem`

Using `em` for deeply nested components causes unexpected compounding font sizes as nesting increases.

### 3. Forgetting `box-sizing: border-box`

Leads to unexpected element sizes when adding padding/border, since default `content-box` adds them on top of the specified width.

### 4. Overusing ID selectors for styling

Makes future overrides require even higher specificity, escalating maintenance difficulty.

---

## 11. Common Differences

| Concept              | vs                       | Key Difference                                                                            |
| -------------------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| `em`                 | `rem`                    | `em` relative to parent font-size (compounds); `rem` relative to root font-size (stable)  |
| `content-box`        | `border-box`             | content-box excludes padding/border from width; border-box includes them                  |
| Class selector       | ID selector              | Class: reusable, lower specificity; ID: unique, much higher specificity                   |
| Inherited properties | Non-inherited properties | Text-related properties (color, font) inherit; box-model properties (margin, width) don't |

---

## 12. Interview Questions

### Beginner

#### Q1. What does "cascading" mean in CSS?

**Answer:**

It refers to how the browser resolves multiple, potentially conflicting rules targeting the same element and property into one final value, using a defined priority order: importance, then specificity, then source order.

#### Q2. What is the CSS box model?

**Answer:**

Every element is represented as nested boxes: content, padding, border, and margin, from innermost to outermost. Total rendered size depends on all four layers unless `box-sizing: border-box` is used to include padding and border within the specified width/height.

---

### Intermediate

#### Q3. How is specificity calculated, and why does it matter?

**Answer:**

Specificity is calculated based on selector type: ID selectors outweigh class/attribute/pseudo-class selectors, which outweigh type/pseudo-element selectors. It matters because it determines which rule wins when multiple rules target the same element with the same property, independent of source order — unless there's a tie, in which case source order decides.

#### Q4. What's the difference between `em` and `rem`?

**Answer:**

`em` is relative to the font-size of the element's parent, so it compounds across nested elements. `rem` is always relative to the root `html` element's font-size, making it predictable regardless of nesting depth — generally preferred for consistent spacing/typography systems.

---

### Advanced

#### Q5. Why do most modern CSS resets set `box-sizing: border-box` globally?

**Answer:**

By default, `width`/`height` apply only to content, so adding padding or border increases the element's total rendered size beyond the specified width — this makes layout math unpredictable. Setting `border-box` makes `width`/`height` include padding and border, so the specified dimension is the actual rendered size, which is far easier to reason about in complex layouts.

---

### Follow-Up Questions

#### Q6. If two selectors have equal specificity, which rule wins?

**Answer:**

The one that appears later in the source order (or is loaded later, if in separate stylesheets) wins — this is the final tiebreaker after importance and specificity.

---

## 13. Scenario-Based Questions

### Scenario 1 — Style Not Applying Despite Correct Selector

A developer writes `.card { color: blue; }` but the text remains black.

**Approach:**

1. Inspect the element in DevTools to see the computed style and which rule is "winning."
2. Check for a higher-specificity rule (ID selector, inline style, or `!important`) overriding it.
3. Check source order if specificity is equal — a later-loaded stylesheet may be overriding it.
4. Verify the selector actually matches the element (typo in class name, wrong nesting).

### Scenario 2 — Layout Breaks After Adding Padding

Adding `padding: 20px` to a fixed-width element causes it to overflow its container unexpectedly.

**Approach:**

1. Check the element's `box-sizing` — if it's `content-box` (default), padding is added on top of the specified width.
2. Apply `box-sizing: border-box` (ideally globally via a reset) so padding is included within the specified width.
3. Verify parent container has enough space to accommodate the box-model changes.

---

## 14. Practical Examples

### Example 1

Create two conflicting rules — one using a class, one using an ID — targeting the same element, and predict which wins before checking in DevTools.

### Example 2

Build a card component and demonstrate the visual difference between `box-sizing: content-box` and `border-box` with identical width/padding values.

### Example 3

Set a root font-size, then build nested elements using both `em` and `rem` units to observe the compounding difference.

---

## 15. Quick Revision

- The cascade resolves conflicts via: importance → specificity → source order.
- Specificity hierarchy: inline style > ID > class/attribute/pseudo-class > type/pseudo-element.
- Box model: content → padding → border → margin (innermost to outermost).
- `box-sizing: border-box` includes padding/border in the specified width/height.
- `em` compounds with nesting (relative to parent); `rem` is stable (relative to root).

---

## 16. Interview Cheat Sheet

| Question     | Remember                                                                    |
| ------------ | --------------------------------------------------------------------------- |
| Why?         | Separates presentation from structure; enables consistent, reusable styling |
| How?         | Cascade resolves conflicts via importance, specificity, then source order   |
| When?        | Every visual aspect of a web page                                           |
| Alternative? | Inline styles (higher specificity, harder to maintain, no reuse)            |
| Production?  | CSS resets, design systems, responsive units (rem, %, vh/vw)                |
| Interview?   | Explain specificity calculation and box-sizing implications                 |
