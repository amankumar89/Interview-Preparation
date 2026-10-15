# React.js — 11 Performance

## Fundamentals

### Q1. Why is performance important in React apps?

**Interview Answer:**

User experience suffers when components re-render too often, large lists render inefficiently, or expensive work runs on each update. Performance issues can cause lag, poor responsiveness, and lower engagement.

### Q2. What is re-rendering in React?

**Interview Answer:**

A re-render happens when a component updates because its state, props, or parent state changes. React then compares the new output with the previous one and updates the DOM if necessary.

### Q3. What causes unnecessary re-renders?

**Interview Answer:**

Unused state, unstable props, inline object creation, missing memoization, and frequent parent updates can all trigger unnecessary re-rendering. This often appears in large component trees.

### Q4. What is `React.memo` and when is it useful?

**Interview Answer:**

`React.memo` prevents a component from re-rendering when its props have not changed. It is useful for pure or mostly static child components that receive stable props.

### Q5. What is `useMemo` used for?

**Interview Answer:**

`useMemo` memoizes expensive calculations so they are recalculated only when dependencies change. This is helpful for large filtering, sorting, or data transformation work.

### Q6. What is `useCallback` used for?

**Interview Answer:**

`useCallback` memoizes functions to preserve stable references between renders. This helps when passing them to memoized child components or effects that depend on a stable callback identity.

### Q7. Why are list keys important for performance and correctness?

**Interview Answer:**

Keys help React identify which items changed, were added, or removed. Wrong or unstable keys can cause unnecessary DOM work and incorrect UI behavior in lists.

### Q8. What is virtualization?

**Interview Answer:**

Virtualization renders only the visible portion of a large list instead of all items at once. This significantly improves performance for huge datasets in tables or feeds.

### Q9. What is code splitting?

**Interview Answer:**

Code splitting divides a bundle into smaller chunks that load only when needed. React apps often use `React.lazy` and dynamic imports to reduce initial load time.

### Q10. Why should we avoid heavy logic inside render?

**Interview Answer:**

Render should be focused on returning UI. Heavy calculations inside render can slow down each re-render and degrade overall app responsiveness.

### Q11. What is the impact of creating objects or arrays inline?

**Interview Answer:**

If you create a new object or array inside render or a callback, React may treat them as changed values and trigger extra updates. Memoization or moving them outside render can reduce churn.

### Q12. What is the role of the React DevTools profiler?

**Interview Answer:**

The React profiler helps identify which components re-render most often and how expensive a render is. This makes optimization efforts more targeted and measurable.

### Q13. What is a common optimization for expensive filtered lists?

**Interview Answer:**

Instead of recalculating the full list on every render, memoize the filtered list with `useMemo` or move filtering to a stable data pipeline when appropriate.

### Q14. What is the difference between memoization and premature optimization?

**Interview Answer:**

Memoization is useful when expensive work is repeated. Premature optimization is adding complexity without evidence of a bottleneck. The right approach is to profile first and optimize the actual hot paths.

### Q15. How do large forms affect performance?

**Interview Answer:**

Large forms can re-render many fields on every change, especially if state updates are too broad. Better patterns include local state, field-level updates, and batching input changes when the UI needs it.

### Q16. What is lazy loading in React?

**Interview Answer:**

Lazy loading defers the loading of components or routes until they are actually needed. This reduces the initial bundle size and improves app startup performance.

### Q17. How can you reduce network overhead in React apps?

**Interview Answer:**

Use request caching, deduplication, pagination, debouncing search, and background refresh strategies. This reduces unnecessary API traffic and keeps the app fast.

### Q18. What is the biggest performance principle in React?

**Interview Answer:**

Profile the app, optimize only the clear bottlenecks, and keep render paths simple. React performance is usually improved by reducing unnecessary work rather than adding complexity everywhere.

## Practical Questions

### Q19. When should you use `memo` versus `useMemo`?

**Interview Answer:**

Use `memo` to skip re-renders for components. Use `useMemo` to avoid recomputing derived values inside a component. They solve different problems and should be used intentionally.

### Q20. How do you measure performance improvements in a real React app?

**Interview Answer:**

Use the React DevTools profiler, browser performance tools, and production builds to identify slow renders. Measure before and after changes to confirm that optimization actually improved the user experience.
