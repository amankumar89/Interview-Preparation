# React.js — 02 Components

## Fundamentals

### Q1. What is a React component?

**Interview Answer:**

A React component is a reusable unit of UI that can accept inputs and return JSX. Components are the building blocks of a React application.

```jsx
function ProfileCard({ user }) {
  return <div>{user.name}</div>;
}
```

### Q2. What is the difference between function components and class components?

**Interview Answer:**

Function components are simpler and rely on hooks for state and lifecycle behavior. Class components use `this.state` and lifecycle methods. Modern React prefers function components.

### Q3. Why are function components preferred in modern React?

**Interview Answer:**

They are easier to read, easier to test, support hooks for state and effects, and align with functional programming patterns. They also reduce boilerplate compared to class components.

### Q4. What is a pure component?

**Interview Answer:**

A pure component renders the same output when given the same props and state. In class components, this is implemented via `React.PureComponent`. In function components, `React.memo` can be used to stop unnecessary re-renders.

### Q5. What is `React.memo`?

**Interview Answer:**

`React.memo` memoizes a component so it does not re-render when its props are shallow-equal to the previous props. It is useful for preventing unnecessary re-renders in performance-sensitive UI.

```jsx
const Item = React.memo(function Item({ value }) {
  return <div>{value}</div>;
});
```

### Q6. What is component composition?

**Interview Answer:**

Composition is building complex UI by combining smaller components. Rather than relying on inheritance, React encourages composition to share behavior and structure cleanly.

```jsx
function Layout({ sidebar, content }) {
  return (
    <div>
      <aside>{sidebar}</aside>
      <main>{content}</main>
    </div>
  );
}
```

### Q7. What is the difference between presentational and container components?

**Interview Answer:**

Presentational components focus on rendering UI and are usually stateless. Container components manage state, data fetching, and pass data down to presentational components.

### Q8. What are controlled and uncontrolled components?

**Interview Answer:**

A controlled component is driven by React state; an uncontrolled component keeps its own DOM state. For forms, controlled components are more common because React is the single source of truth.

### Q9. What is a higher-order component (HOC)?

**Interview Answer:**

An HOC is a function that takes a component and returns a new component with added behavior. It used to be a common pattern for cross-cutting concerns like auth or logging, though hooks are often preferred now.

### Q10. What are lifecycle methods in class components?

**Interview Answer:**

Lifecycle methods let a component respond to mount, update, and unmount events. Examples include `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

### Q11. What is the role of `key` in React lists?

**Interview Answer:**

The `key` helps React identify which list item changed, was added, or removed. It is especially important for stable rendering and efficient updates.

```jsx
{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

### Q12. Why should keys be stable and unique within a list?

**Interview Answer:**

Stable keys help React preserve component state across re-renders. Using unstable or non-unique keys can cause incorrect DOM updates and subtle bugs.

### Q13. What is an error boundary?

**Interview Answer:**

An error boundary is a React component that catches rendering errors in its child tree and renders a fallback UI instead of crashing the entire app.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong</h1>;
    return this.props.children;
  }
}
```

### Q14. Can function components have lifecycle behavior?

**Interview Answer:**

Function components do not have lifecycle methods directly, but hooks like `useEffect` allow similar behavior for mounting, updates, and cleanup.

### Q15. What are common component design mistakes?

**Interview Answer:**

Common mistakes include putting too much business logic in a single component, making props too deep and complex, ignoring component boundaries, and creating unnecessary re-renders by placing unstable objects or functions in state or props.

### Q16. How do you decide whether a component should be reusable?

**Interview Answer:**

A component should be reusable when it represents a cohesive UI concept with predictable props, independent behavior, and clear responsibilities. Reusable components are easier to test and maintain.

### Q17. What is the difference between `children` and props?

**Interview Answer:**

`props` are explicit inputs passed from the parent. `children` is a special prop that allows passing nested content between JSX tags.

```jsx
function Card({ children }) {
  return <div>{children}</div>;
}
```

### Q18. Why is component decomposition important in large applications?

**Interview Answer:**

Breaking UI into small components improves readability, reduces complexity, enables isolated testing, and makes refactoring safer as the app grows.

## Practical Questions

### Q19. What kind of logic belongs in a component?

**Interview Answer:**

A component should handle state, rendering decisions, user interactions, and small local behaviors. Network calls and complex business rules are often extracted into custom hooks or service layers.

### Q20. What is the biggest drawback of too many tiny components?

**Interview Answer:**

Too many tiny components can increase indirection and maintenance overhead. The goal is not to split every line into a component, but to keep responsibilities focused and logical.
