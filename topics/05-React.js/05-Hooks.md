# React.js — 05 Hooks

## Fundamentals

### Q1. What are React hooks?

**Interview Answer:**

Hooks are functions that let function components use React features such as state, effects, refs, and context without writing a class component. They were introduced to simplify component logic and reuse behavior.

### Q2. Why were hooks introduced?

**Interview Answer:**

Hooks were introduced to solve issues with class components, such as verbose lifecycle logic, difficulty reusing logic, and confusing `this` binding. They also make functional components more expressive and composable.

### Q3. What is `useState` and how is it used?

**Interview Answer:**

`useState` lets a function component hold local state and update it over time.

```jsx
const [count, setCount] = useState(0);
```

### Q4. What is `useEffect` used for?

**Interview Answer:**

`useEffect` runs side effects after render, such as fetching data, subscribing to events, or cleaning up timers. It is the functional equivalent of lifecycle methods in class components.

```jsx
useEffect(() => {
  document.title = "Hello";
}, []);
```

### Q5. What is the dependency array in `useEffect`?

**Interview Answer:**

The dependency array tells React when to re-run the effect. If the array is empty, the effect runs once after mount. If dependencies change, the effect re-runs.

### Q6. What happens if dependencies are missing or incorrect?

**Interview Answer:**

Effects may use stale values and create bugs, especially with closures. This is why dependency arrays must include all values the effect uses.

### Q7. What is `useMemo`?

**Interview Answer:**

`useMemo` memoizes a computed value so React does not recompute it unnecessarily on every render. It is useful for expensive calculations, but should not be used for every value.

```jsx
const expensiveValue = useMemo(() => computeHeavyValue(items), [items]);
```

### Q8. What is `useCallback`?

**Interview Answer:**

`useCallback` memoizes a function so the same function instance is reused between renders when dependencies do not change. It is often used with `useEffect` or child components wrapped in `React.memo`.

### Q9. What is `useRef`?

**Interview Answer:**

`useRef` creates a mutable object that persists across renders without causing re-renders when its value changes. It is commonly used for DOM references and timers.

```jsx
const inputRef = useRef(null);
```

### Q10. What is `useReducer`?

**Interview Answer:**

`useReducer` is useful for more complex local state transitions. It follows a reducer pattern similar to Redux and is especially good for form logic or multi-step workflows.

### Q11. What is `useContext`?

**Interview Answer:**

`useContext` reads the current context value from the nearest provider. It simplifies access to shared data without manually drilling props through every component.

### Q12. What are custom hooks?

**Interview Answer:**

Custom hooks are reusable functions that encapsulate common logic and call built-in hooks internally. They are a clean way to share behavior across components.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return data;
}
```

### Q13. What are the rules of hooks?

**Interview Answer:**

Hooks must be called only at the top level of function components or custom hooks, and not inside loops, conditions, or nested functions. This ensures React can correctly preserve hook state between renders.

### Q14. Why are hooks called in the same order?

**Interview Answer:**

React relies on the order of hook calls to associate state and effects with the correct component instance. Changing their order across renders can break state behavior.

### Q15. What is a stale closure and how does it relate to hooks?

**Interview Answer:**

A stale closure occurs when a function uses state or props from an earlier render. This often happens when async functions or effects capture values from previous renders. Dependency arrays and functional updates help prevent it.

### Q16. What is `useLayoutEffect`?

**Interview Answer:**

`useLayoutEffect` runs synchronously after DOM mutations but before the browser paints. It is useful for measuring layout or preventing visual flicker, but it should be used carefully because it blocks painting.

### Q17. When should you not use `useMemo` or `useCallback`?

**Interview Answer:**

Do not use them prematurely. They add complexity and are only useful when expensive calculations or function identity matter. Overusing memoization can reduce readability without providing real benefit.

### Q18. What is the difference between `useMemo` and `useRef`?

**Interview Answer:**

`useMemo` stores a computed value that can be recalculated when dependencies change. `useRef` stores a mutable reference that persists across renders and does not trigger re-renders when updated.

## Practical Questions

### Q19. How do you detect a click outside a component in React?

**Interview Answer:**

Use a ref to the component, attach a document click listener, and check whether the click target is inside the ref. This is a common pattern in dropdowns and modals.

### Q20. What is the main advantage of hooks in production applications?

**Interview Answer:**

Hooks let teams extract and reuse logic clearly, reduce class-component complexity, and make code easier to reason about. This improves maintainability and speeds up feature delivery in large front-end apps.
