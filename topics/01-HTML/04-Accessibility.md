# HTML — 04 Accessibility

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What does web accessibility mean?

**Interview Answer:**

Accessibility means people with different abilities and devices can perceive, operate, understand, and interact with a website. Good HTML provides a strong foundation through native semantics, labels, headings, keyboard support, and text alternatives.

### Q2. What is the accessibility tree?

The browser derives an accessibility tree from the DOM, styles, and semantics. Assistive technologies use it to expose roles, names, states, and values. An element can be visible in the DOM but missing or misleading in the accessibility tree.

### Q3. What is an accessible name?

It is the text assistive technology uses to identify a control or landmark. A button's accessible name may come from its text, an associated label, or `aria-label`. Prefer visible text and native labeling so all users receive the same context.

## Core Concepts

### Q4. Why is keyboard accessibility important?

Some users navigate without a mouse, and keyboard access is also important for power users and alternative input devices. All interactive functionality should be reachable, have a visible focus indicator, and operate in a logical order with Enter, Space, or arrow keys as appropriate.

### Q5. What is the first rule of ARIA?

Do not use ARIA when a native HTML element already provides the required semantics and behavior. For example, use `button` instead of a `div role="button"`. ARIA changes what assistive technology sees but does not implement interaction for you.

### Q6. How should images use `alt` text?

Informative images need concise alt text describing their purpose. Decorative images should use an empty `alt=""`. Images that contain essential text need an alternative conveying that text, while complex charts may need a nearby detailed explanation.

### Q7. What makes a form control accessible?

It needs a programmatic label, a suitable native type, keyboard access, clear instructions, visible focus, and errors that are announced or associated with the field. Placeholder text is not a replacement for a label.

## Practical Questions

### Q8. How do you make a modal dialog accessible?

Use a native `dialog` where suitable or implement the complete dialog pattern: move focus into the dialog, provide an accessible name, keep focus within it while open, close on an explicit close action and usually Escape, restore focus to the opener, and prevent interaction with the background. Test the focus behavior rather than relying on `role="dialog"` alone.

### Q9. How should skip navigation work?

Provide an early link such as “Skip to main content” that points to the `main` element. It lets keyboard users bypass repeated navigation on every page.

```html
<a class="skip-link" href="#main-content">Skip to main content</a>
<main id="main-content">...</main>
```

### Q10. How do you test HTML accessibility?

Use automated checks for missing labels, invalid ARIA, contrast, and landmark issues, then manually test keyboard-only navigation, zoom and reflow, reduced motion, focus visibility, and a screen reader. Automated tools catch patterns, not the full user experience.

## Debugging and Production

### Q11. Why is a positive `tabindex` usually a problem?

Positive values create a separate focus order that becomes fragile as the page changes. Prefer native focusable elements and DOM order. Use `tabindex="0"` only when a custom element genuinely needs to enter the natural order, and `tabindex="-1"` for programmatic focus targets.

### Q12. How should dynamic content be announced?

Use semantic controls and visible status text first. For updates that users need to know without focus moving, a carefully scoped live region such as `role="status"` can announce the change. Avoid making large or frequently changing regions assertive.

### Q13. What accessibility issues commonly appear in production?

Common issues include missing focus after route changes, inaccessible custom dropdowns, icon-only controls without names, errors shown only by color, content hidden with CSS but still exposed, keyboard traps, and modals that do not restore focus. Include accessibility checks in component tests and release reviews.
