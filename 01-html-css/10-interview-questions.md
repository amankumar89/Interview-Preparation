# HTML & CSS — Interview Questions

> Interview Preparation Notes

---

## 1. Overview

This file consolidates the most commonly asked HTML and CSS interview questions across topics covered in this section: HTML fundamentals, semantic HTML, forms, CSS fundamentals, Flexbox, Grid, responsive design, positioning, and specificity. Use the individual topic files for deep dives — this file is for rapid-fire revision and mock-interview practice.

---

## 2. Beginner Questions

#### Q1. What is the difference between HTML and CSS?

**Answer:**

HTML defines the structure and meaning of content (headings, paragraphs, links). CSS defines how that content looks (colors, spacing, layout). They're deliberately separated so content and presentation can evolve independently.

#### Q2. What is the DOM?

**Answer:**

The DOM (Document Object Model) is the browser's in-memory tree representation of the parsed HTML document. JavaScript interacts with the DOM, not the raw HTML source, to read or modify page content.

#### Q3. What is the CSS box model?

**Answer:**

Every element is modeled as nested boxes: content, padding, border, and margin. `box-sizing: border-box` makes `width`/`height` include padding and border; the default `content-box` does not.

#### Q4. What's the difference between `id` and `class`?

**Answer:**

`id` must be unique per page and carries high CSS specificity; `class` can be reused across many elements and carries lower specificity — generally preferred for styling.

#### Q5. What does semantic HTML mean?

**Answer:**

Using elements according to their meaning (`nav`, `article`, `button`) rather than generic containers (`div`, `span`), which improves accessibility, SEO, and code clarity.

---

## 3. Intermediate Questions

#### Q6. Explain the CSS cascade and how conflicts are resolved.

**Answer:**

Conflicts are resolved in order: importance/origin (user `!important` > author `!important` > author normal > browser default), then specificity (ID > class/attribute/pseudo-class > type/pseudo-element), then source order as the final tiebreaker.

#### Q7. What's the difference between Flexbox and CSS Grid?

**Answer:**

Flexbox is one-dimensional — it lays out items along a single row or column. CSS Grid is two-dimensional — it controls rows and columns simultaneously. Flexbox suits navbars and toolbars; Grid suits page layouts and dashboards.

#### Q8. What is the difference between `position: absolute` and `position: fixed`?

**Answer:**

Both remove the element from normal flow. `absolute` positions relative to the nearest ancestor with a non-static `position`. `fixed` positions relative to the viewport (so it stays put while scrolling) — unless an ancestor has a `transform`/`filter`/`will-change` property, which changes its containing block.

#### Q9. Why is client-side form validation not sufficient on its own?

**Answer:**

It can be bypassed entirely by sending requests directly to the server (via devtools, curl, or scripts). It only improves UX; the server must independently validate all incoming data as the real security boundary.

#### Q10. What's the difference between `em` and `rem`?

**Answer:**

`em` is relative to the parent element's font-size and compounds with nesting depth. `rem` is always relative to the root (`html`) font-size, making it predictable regardless of nesting.

#### Q11. How would you center a div both horizontally and vertically?

**Answer:**

The modern approach: `display: flex; justify-content: center; align-items: center;` on the parent, with a defined height. Grid's `place-items: center` achieves the same result in one line.

---

## 4. Advanced Questions

#### Q12. Why do semantic elements matter for accessibility at a technical level?

**Answer:**

Semantic elements automatically receive implicit ARIA roles, which populate the browser's accessibility tree — a parallel structure to the DOM that's exposed to OS accessibility APIs and consumed by screen readers. Generic `<div>`s produce no meaningful accessibility tree entries unless ARIA attributes are added manually.

#### Q13. Why might a very high `z-index` still fail to bring an element to the front?

**Answer:**

`z-index` only compares elements within the same stacking context. Properties like `opacity < 1`, `transform`, `filter`, and `will-change` create new stacking contexts on their ancestors, isolating descendant `z-index` comparisons from siblings outside that ancestor — so the fix is often restructuring the DOM or removing the stacking-context trigger, not raising the number further.

#### Q14. Explain how specificity is actually calculated — is it addition?

**Answer:**

Specificity is a four-part tuple (inline styles, IDs, classes/attributes/pseudo-classes, types/pseudo-elements) compared lexicographically, left to right. It is not additive — a single ID always outweighs any number of classes, because comparison happens position by position, not as a summed total.

#### Q15. What is the difference between `auto-fill` and `auto-fit` in CSS Grid?

**Answer:**

Both compute how many tracks fit given a `minmax()` constraint. `auto-fill` preserves empty tracks as gaps when there are fewer items than available tracks. `auto-fit` collapses those empty tracks and stretches existing items to fill the freed space.

#### Q16. How does the browser build the DOM from malformed HTML?

**Answer:**

HTML5 defines a formal, fault-tolerant parsing algorithm: the tokenizer converts bytes into tokens, and the tree-construction step applies well-defined error-recovery rules (like implicit tag closing) to still produce a usable DOM — unlike XML, which fails hard on malformed markup.

---

## 5. Scenario-Based Questions

### Scenario 1 — Style Not Applying Despite Correct Selector

**Approach:**

1. Inspect computed styles in DevTools to see which rule is winning.
2. Check for higher-specificity rules or inline styles overriding it.
3. Check source order if specificity is tied.
4. Verify the selector actually matches (typos, wrong nesting).

### Scenario 2 — Responsive Layout Broken on Mobile Only

**Approach:**

1. Verify the viewport meta tag is present and correctly configured.
2. Check for fixed-width (`px`) elements causing horizontal overflow.
3. Use DevTools device emulation across multiple widths, not just desktop resize.
4. Confirm media query breakpoints match where content actually breaks.

### Scenario 3 — Accessibility Audit Flags Missing Landmarks

**Approach:**

1. Replace generic `<div>`-based structure with semantic elements (`header`, `nav`, `main`, `footer`).
2. Ensure exactly one `<main>` exists per page.
3. Re-test with a screen reader to confirm landmarks are announced correctly.

### Scenario 4 — Dropdown Menu Appears in the Wrong Position

**Approach:**

1. Check whether the dropdown's parent has `position: relative` set.
2. If missing, the child `absolute` element falls back to the page's initial containing block instead of the intended local container.
3. Add `position: relative` to the immediate parent.

---

## 6. Quick Revision

- HTML = structure/meaning; CSS = presentation; separation improves maintainability.
- The cascade resolves conflicts: importance → specificity → source order.
- Flexbox = one-dimensional; Grid = two-dimensional.
- `position: absolute` needs a positioned ancestor; `fixed` uses the viewport (usually).
- Specificity is tuple-based, not additive — IDs always beat classes regardless of count.
- Semantic HTML powers the accessibility tree that screen readers rely on.
- Mobile-first + relative units + media queries = responsive design foundation.

---

## 7. Interview Cheat Sheet

| Topic             | Core Concept to Remember                                                      |
| ----------------- | ----------------------------------------------------------------------------- |
| HTML              | Fault-tolerant parsing builds the DOM tree                                    |
| Semantic HTML     | Implicit ARIA roles power the accessibility tree                              |
| Forms             | Client validation = UX; server validation = security                          |
| CSS Fundamentals  | Cascade = importance → specificity → source order                             |
| Flexbox           | One-dimensional; `flex: 1` sets `flex-basis: 0`                               |
| Grid              | Two-dimensional; `fr` = share of remaining space                              |
| Responsive Design | Mobile-first, relative units, content-driven breakpoints                      |
| Positioning       | Absolute needs a positioned ancestor; z-index needs matching stacking context |
| Specificity       | Tuple comparison, not addition; `!important` overrides it entirely            |
