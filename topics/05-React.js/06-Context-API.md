# React.js — 06 Context API

## Fundamentals

### Q1. What is React Context?

**Interview Answer:**

React Context provides a way to share data across a component tree without passing props through every level. It is useful for values like theme, auth status, or locale.

```jsx
const ThemeContext = React.createContext("light");
```

### Q2. When should you use Context?

**Interview Answer:**

Use Context for cross-cutting application state that many components need but that does not need to be in every prop chain. It is a good fit for theming, user data, or app-wide settings.

### Q3. How do you provide a value to Context?

**Interview Answer:**

Use a `Provider` component and pass a value prop. Consumers deeper in the tree can access it with `useContext` or a consumer component.

```jsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

### Q4. How do you consume Context in a component?

**Interview Answer:**

Use the `useContext` hook to read the current context value directly.

```jsx
const theme = useContext(ThemeContext);
```

### Q5. What is the difference between Context and props?

**Interview Answer:**

Props are explicit and local to a component tree path. Context is implicit and available to any descendant component without passing props manually. Props are better for explicit data flow; Context is better for shared app-wide state.

### Q6. What are common uses of Context?

**Interview Answer:**

Common uses include theme settings, authentication state, locale, user profile, and feature flags. It is also used for global UI configuration.

### Q7. What is a provider in Context?

**Interview Answer:**

A provider is the component that supplies the context value to descendants. It helps define the scope of the shared value and lets consumers access the right data from the current branch.

### Q8. What is the issue with passing massive objects through Context?

**Interview Answer:**

If the context value is a large object and changes often, all consumers may re-render even when they only need some of the data. This can impact performance if not managed carefully with memoization.

### Q9. How can you optimize Context performance?

**Interview Answer:**

Split context into smaller contexts, memoize the provider value, and avoid storing unstable objects in the context unless necessary. Use `useMemo` to keep values stable across renders.

### Q10. Can Context be used with a reducer?

**Interview Answer:**

Yes. Context is often paired with `useReducer` for shared state management in moderate-sized apps. The reducer and dispatch function are stored in context and consumed by components.

### Q11. What is the downside of using Context for everything?

**Interview Answer:**

Context is easy to overuse. If too much state is placed in a global context, components become tightly coupled, debugging becomes harder, and app performance can degrade due to unnecessary re-renders.

### Q12. How is Context different from Redux?

**Interview Answer:**

Context is built-in and great for app-wide static or light shared state. Redux Toolkit is a more structured state management library with middleware, devtools, predictable updates, and better tooling for large-scale app state.

### Q13. What is a context value that should not be global?

**Interview Answer:**

Data that is only relevant to a small subtree, user-specific ephemeral state, or frequently changing values with high render churn should usually stay local to the component or be managed via a proper store, not a global context.

### Q14. What is the provider value pattern?

**Interview Answer:**

The provider can accept a value object and place stable references into it. For example:

```jsx
const value = useMemo(() => ({ user, logout }), [user, logout]);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
```

This avoids unnecessary re-renders when the underlying data is unchanged.

### Q15. Why is `useContext` better than nested consumer components?

**Interview Answer:**

`useContext` is simpler and cleaner in function components. It reduces nested JSX and makes shared state easy to access without large wrapper structures.

### Q16. What is context propagation?

**Interview Answer:**

Context values propagate through the component tree to all descendants, even if intermediate components do not use the value. This makes it convenient, but it also means large provider trees can impact performance if they re-render often.

### Q17. How do you avoid unnecessary re-renders with Context?

**Interview Answer:**

Break the context into more specific providers, memoize the value, and avoid putting objects generated on every render into the provider. This reduces the number of components that re-render unnecessarily.

### Q18. What is an example of a good Context design in a React app?

**Interview Answer:**

A `UserContext` that contains `user`, `login`, and `logout` is a good candidate if many components need access to the authenticated user. The provider value should be memoized and only updated when relevant data changes.

## Practical Questions

### Q19. How do you combine Context and `useReducer` in a real app?

**Interview Answer:**

Use a reducer for state transitions, create a context for state and dispatch, and wrap the app in a provider. This gives a predictable, centralized state workflow without introducing a full Redux store for small to medium applications.

### Q20. What is the biggest rule for using Context correctly?

**Interview Answer:**

Use Context for shared, app-wide, or cross-cutting data, not for every state update. Too much context causes extra renders, harder debugging, and poor component boundaries.
