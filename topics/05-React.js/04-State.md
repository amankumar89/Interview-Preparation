# React.js — 04 State

## Fundamentals

### Q1. What is state in React?

**Interview Answer:**

State is data that belongs to a component and can change over time. When state changes, React re-renders the component to reflect the new UI.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Q2. What is the difference between state and props?

**Interview Answer:**

State is owned and managed internally by a component. Props are values passed from the parent component and are read-only from the child’s perspective.

### Q3. Where should state live?

**Interview Answer:**

State should live at the lowest common parent that needs it. This keeps data flow predictable and avoids duplicate state in multiple components.

### Q4. What is lifting state up?

**Interview Answer:**

Lifting state up means moving shared state to a common parent so multiple child components can read and update the same source of truth.

### Q5. Why should state not be mutated directly?

**Interview Answer:**

React depends on immutable updates to detect changes and trigger re-renders. Mutating an object or array in place may not trigger the expected update.

### Q6. What is the difference between `useState` and `setState` in class components?

**Interview Answer:**

Both update state and trigger re-renders, but `useState` is the functional hook-based API and setState is the class-based API. In function components, `useState` is the modern standard.

### Q7. How does React handle asynchronous state updates?

**Interview Answer:**

State updates are batched and scheduled. Because React may batch updates for performance, code that depends on the newest state should use a functional updater when necessary.

```jsx
setCount((prev) => prev + 1);
```

### Q8. What is a functional state update?

**Interview Answer:**

A functional state update uses a callback that receives the previous state and returns the next state. This avoids stale state issues when multiple updates happen in a short time.

### Q9. What is derived state?

**Interview Answer:**

Derived state is a value computed from existing props or state instead of stored separately. It is often better to compute it on render rather than storing redundant state.

### Q10. Why is duplicate state a problem?

**Interview Answer:**

Duplicate state can lead to inconsistent UI and bugs because multiple components may disagree on the same value. A single source of truth is usually the correct design.

### Q11. What is local state?

**Interview Answer:**

Local state is state that only affects one component or a small subtree. It is usually managed by `useState` or `useReducer` and kept close to where it is used.

### Q12. What is the difference between controlled and uncontrolled state?

**Interview Answer:**

Controlled state is driven by React state, while uncontrolled state is stored in DOM elements or refs. React prefers controlled patterns for forms and UI consistency.

### Q13. What are stale closures?

**Interview Answer:**

A stale closure happens when a function captures an outdated state value after a re-render. This commonly appears when event handlers or effects use old values from previous renders.

### Q14. How do you avoid stale closure bugs?

**Interview Answer:**

Use functional updates, include the right dependencies in hooks, and keep state updates predictable. This is especially important when working with timers, event handlers, and async operations.

### Q15. What is the role of `useReducer`?

**Interview Answer:**

`useReducer` is useful when state updates are complex or multiple related values must change together. It provides a reducer pattern similar to Redux but local to a component.

### Q16. What are common state management antipatterns?

**Interview Answer:**

Common antipatterns include storing everything in one giant state object, mutating state directly, duplicating state in multiple components, and storing derived values as actual state.

### Q17. When should you use `useMemo` versus state?

**Interview Answer:**

Use `useMemo` for expensive derived values that can be recomputed when dependencies change. Use state when the value is actually part of the app’s data model and should update over time.

### Q18. Why do forms often use state heavily?

**Interview Answer:**

Forms usually need to react to user input, validation, loading states, and submission status. Storing form fields in state enables controlled UI and predictable validation.

## Practical Questions

### Q19. How do you reset state in React?

**Interview Answer:**

You can reset a component to initial values by using a reset function or by setting state back to the initial object or array. This is common in forms and modal flows.

```jsx
const initialState = { name: "", email: "" };
const [form, setForm] = useState(initialState);

const resetForm = () => setForm(initialState);
```

### Q20. What is the biggest rule in React state design?

**Interview Answer:**

Keep the state minimal, meaningful, and centralized. If state can be derived from existing data, avoid storing it separately. This reduces bugs, makes the app easier to reason about, and improves maintainability.
