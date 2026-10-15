# React.js — 03 Props

## Fundamentals

### Q1. What are props in React?

**Interview Answer:**

Props are inputs passed from a parent component to a child component. They allow a component to receive data and customize behavior without mutating it internally.

```jsx
function UserCard({ name, age }) {
  return (
    <div>
      {name} - {age}
    </div>
  );
}
```

### Q2. Are props mutable?

**Interview Answer:**

Props should be treated as read-only. A child component should not modify incoming props directly. If a value needs to change, the parent should update it and pass a new prop.

### Q3. What is prop drilling?

**Interview Answer:**

Prop drilling happens when data is passed through multiple layers of components even though only a deeply nested component needs it. This can make components harder to maintain.

### Q4. How can you avoid prop drilling?

**Interview Answer:**

Common approaches include using context, composition, or state management libraries such as Redux Toolkit or Zustand. The right choice depends on app complexity and data flow needs.

### Q5. What is the difference between props and state?

**Interview Answer:**

Props are owned by a parent and passed down. State is internal to a component and can change during the component lifecycle. A component can change its own state, but it cannot change props directly.

### Q6. What is `children` in React?

**Interview Answer:**

`children` is a special prop used to pass nested content into a component. It is very useful for layout wrappers, modal containers, and reusable UI primitives.

```jsx
function Panel({ children }) {
  return <section>{children}</section>;
}
```

### Q7. What are default props?

**Interview Answer:**

Default props provide fallback values when a parent does not pass a prop. They improve component robustness and reduce undefined errors.

```jsx
function Button({ label = "Submit" }) {
  return <button>{label}</button>;
}
```

### Q8. What are prop types and why are they useful?

**Interview Answer:**

Prop types validate the expected data shape and type of props. They help catch bugs earlier, especially in larger codebases. TypeScript can replace or complement PropTypes in modern React apps.

```jsx
import PropTypes from "prop-types";

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

### Q9. What is destructuring props?

**Interview Answer:**

Destructuring props makes the component cleaner and easier to read by extracting fields directly from the props object.

```jsx
function UserCard({ name, age }) {
  return (
    <div>
      {name} - {age}
    </div>
  );
}
```

### Q10. What is prop spreading?

**Interview Answer:**

Prop spreading passes an object of props into a child component using `...props`. It is useful when forwarding many attributes, but it can reduce clarity if overused.

```jsx
const props = { id: 1, disabled: true };
return <Button {...props} />;
```

### Q11. How do you pass functions as props?

**Interview Answer:**

A function can be passed as a prop to let a child notify the parent when an event occurs or trigger a state update.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return <Child onClick={() => setCount(count + 1)} />;
}
```

### Q12. What happens if a required prop is missing?

**Interview Answer:**

The component may render incorrect output or behave unexpectedly. Validation tools like PropTypes or TypeScript help catch missing or wrong props early.

### Q13. Why might props become a design smell in large apps?

**Interview Answer:**

If a component receives too many props, especially unrelated ones, it becomes harder to maintain and reason about. This often signals a need to group data or move state to a proper ownership layer.

### Q14. What is the difference between props and attributes in HTML?

**Interview Answer:**

HTML attributes are used by the browser, while React props are JavaScript values passed to component functions. Some attributes map directly to DOM properties, but component props are not necessarily DOM attributes.

### Q15. Why is immutability important with props and state?

**Interview Answer:**

React relies on changes in reference identity to detect updates. If you mutate objects or arrays in place, React may not notice changes, causing stale UI or unexpected bugs.

### Q16. How do you handle optional props well?

**Interview Answer:**

Use defaults, type guards, and defensive rendering. This makes the component safe for different states and avoids `undefined` rendering errors.

### Q17. What is the best way to design a component API?

**Interview Answer:**

Keep props small, explicit, and meaningful. Prefer a few strong props over a large bag of unrelated values. Also expose simple interfaces and avoid leaking internal implementation details.

### Q18. What is a practical scenario where props are better than state?

**Interview Answer:**

If a value is configured by a parent and does not change locally, it should typically be passed as a prop. For example, a list item title or product configuration is usually a prop, not local state.

## Practical Questions

### Q19. How do you pass a component as a prop?

**Interview Answer:**

You can pass a React component or element as a prop to create composition-based patterns like render props or layout templates.

```jsx
function Container({ content: Content }) {
  return <Content />;
}
```

### Q20. What is the main rule when using props?

**Interview Answer:**

Treat props as immutable inputs from above. If a child needs to change a value, it should communicate upward via callback props, not mutate the input.
