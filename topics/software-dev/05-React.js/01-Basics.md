# React.js — 01 Basics

## Fundamentals

### Q1. What is React, and why is it popular?

**Interview Answer:**

React is a JavaScript library for building user interfaces, especially single-page applications. It is popular because it makes UI development predictable, component-based, and fast through a virtual DOM and declarative rendering model.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Q2. What is the difference between React and plain JavaScript DOM manipulation?

**Interview Answer:**

With plain JavaScript, developers manually update DOM nodes and handle state changes imperatively. React abstracts this by letting us describe the UI and automatically updates the DOM when state or props change.

### Q3. What does "declarative" mean in React?

**Interview Answer:**

Declarative means you tell React what UI should look like for a given state, and React decides how to update the DOM efficiently. You do not manually manipulate DOM elements for every change.

### Q4. What is JSX?

**Interview Answer:**

JSX is a syntax extension that looks like HTML inside JavaScript. It is compiled by tools like Babel into `React.createElement(...)` calls.

```jsx
const element = <div className="card">Hello</div>;
```

### Q5. Why is JSX better than writing DOM code manually?

**Interview Answer:**

JSX makes component structure easier to read, keeps logic and markup together, and reduces boilerplate. It also allows using JavaScript expressions directly inside UI code.

### Q6. What is the virtual DOM?

**Interview Answer:**

The virtual DOM is a lightweight in-memory representation of the actual DOM. React compares previous and next versions using a diffing algorithm and updates only the changed parts, improving performance.

### Q7. What is a React element?

**Interview Answer:**

A React element is a plain object that describes what should be rendered. It is not the actual DOM node yet; it is the instruction object React uses to render the UI.

### Q8. What is a component in React?

**Interview Answer:**

A component is a reusable piece of UI logic and markup. Components can be functions or classes and accept props to render dynamic output.

```jsx
function Button({ label }) {
  return <button>{label}</button>;
}
```

### Q9. What is the difference between a component and an element?

**Interview Answer:**

A component is a function or class that returns elements. An element is the result of invoking that component, describing the UI structure. Components define behavior; elements are the rendered instructions.

### Q10. What is a single-page application (SPA)?

**Interview Answer:**

A SPA loads one HTML page and updates the interface dynamically without full-page reloads. React is well-suited for SPAs because state and UI can change without reloading the whole app.

### Q11. What is the role of `ReactDOM` in React applications?

**Interview Answer:**

`ReactDOM` is responsible for mounting React trees into the browser DOM. It also handles updates and unmounting in the DOM.

```jsx
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

### Q12. What happens when state changes in React?

**Interview Answer:**

React schedules a re-render of the component tree affected by that state change. It reconciles the virtual DOM and updates only the required DOM nodes.

### Q13. What are the main advantages of React?

**Interview Answer:**

- Reusable components
- Declarative syntax
- Efficient rendering with virtual DOM
- Strong ecosystem and tooling
- Easy integration with other libraries and frameworks

### Q14. What are some common mistakes beginners make in React?

**Interview Answer:**

Common mistakes include mutating state directly, using non-unique keys in lists, ignoring stale closure issues, adding heavy logic inside render, and overusing inline functions without memoization in performance-sensitive components.

### Q15. How do you build a simple React app?

**Interview Answer:**

You install React and a bundler such as Vite or webpack, create a root element in HTML, and render your application using `createRoot`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Welcome</h1>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

### Q16. Why is React considered a library and not a full framework?

**Interview Answer:**

React focuses mainly on the view layer and UI composition. Routing, data fetching, and state management are often handled by other libraries or frameworks, whereas frameworks usually include broader application infrastructure.

### Q17. What is `StrictMode` in React?

**Interview Answer:**

`StrictMode` helps detect unsafe lifecycle patterns, side effects, and warnings during development. It intentionally double-invokes certain render-related checks to surface development-time issues early.

```jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

### Q18. What is the most important React mindset for new developers?

**Interview Answer:**

Think in terms of state, props, and re-render cycles. React apps are easier to maintain when state ownership is clear, components are small, and UI updates are driven by predictable data flow instead of manual DOM mutations.

## Practical Questions

### Q19. Why does React use a component tree instead of one giant DOM file?

**Interview Answer:**

A component tree encourages modularity, testability, and reuse. Each component owns a focused responsibility, which makes large applications easier to reason about and debug.

### Q20. What is the difference between client-side rendering and server-side rendering in React?

**Interview Answer:**

Client-side rendering builds the UI in the browser after the JavaScript loads. Server-side rendering generates HTML on the server, which can improve initial page load and SEO. Frameworks like Next.js build on this concept.
