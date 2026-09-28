# JavaScript — 05 Closures

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a closure in JavaScript?

**Interview Answer:**

A closure is created when an inner function retains access to variables from its outer scope even after the outer function has finished executing.

```js
function outer() {
  const count = 0;

  return function inner() {
    return count + 1;
  };
}

const inc = outer();
console.log(inc());
```

### Q2. Why are closures important?

Closures allow data encapsulation and stateful behavior without polluting the global scope. They are used in private variables, event handlers, currying, and functional patterns.

### Q3. What is lexical scoping?

Lexical scoping means variables are resolved based on where a function is defined, not where it is called.

```js
function outer() {
  const msg = "Hello";
  return function inner() {
    console.log(msg);
  };
}
```

### Q4. How are closures used in callbacks and event handlers?

Closures let callbacks remember values from the surrounding scope.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

This prints `3, 3, 3` because `var` is function-scoped. Using `let` gives the expected `0, 1, 2`.

### Q5. What is the module pattern?

The module pattern uses closures to hide internal state while exposing a limited API.

```js
const counter = (() => {
  let count = 0;
  return {
    increment() {
      count += 1;
      return count;
    },
    get() {
      return count;
    },
  };
})();
```

### Q6. How do closures cause memory retention issues?

A closure keeps references to outer variables alive longer than expected, which can prevent garbage collection and create memory leaks if a closure is retained unnecessarily.

This often happens with long-lived event listeners, intervals, or caches that capture large objects.

### Q7. What is the relationship between closures and `this`?

Closures capture lexical `this` through the outer scope, which is often used when the callback needs the same context as the surrounding function.

```js
const obj = {
  value: 42,
  getValue() {
    return () => this.value;
  },
};
```

### Q8. How do closures help with function factories?

A function factory creates functions with customized behavior based on a captured value.

```js
function makeMultiplier(factor) {
  return (num) => num * factor;
}

const double = makeMultiplier(2);
console.log(double(5));
```

### Q9. What is the difference between closure and scope?

Scope determines where variables are visible. A closure is a function that retains access to variables from an outer scope. A closure is only possible because of lexical scope.

### Q10. How do you avoid closure bugs in loops?

Use `let` instead of `var` when a new binding is needed in each iteration, or capture the current value explicitly.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

## Intermediate Concepts

### Q11. What is a closure leak in browser code?

A closure leak happens when an event listener or timer holds a reference to a large object even after it is no longer needed. This can keep memory usage high and degrade performance.

### Q12. Why are closures useful in async programming?

They preserve state across asynchronous operations, such as a request result or user selection, even though the original function has already returned.

```js
function loadUser(id) {
  fetch(`/api/users/${id}`).then((response) => {
    console.log(response);
  });
}
```

### Q13. What is the difference between closure and callback?

A callback is a function passed to another function. A closure is the behavior of a function retaining access to its lexical scope. A callback can be a closure if it captures outer variables.

### Q14. How do you debug closure-related bugs?

Log the captured variables, inspect whether `var` is being used in loops, and confirm whether the function is retaining the right state across multiple executions.

### Q15. What is partial application?

Partial application pre-fills some arguments and returns a function that takes the remaining ones. Closures are often used to implement it.

```js
function partial(fn, ...preset) {
  return (...rest) => fn(...preset, ...rest);
}
```

## Production and Design

### Q16. When should you avoid closures?

Avoid unnecessary closures in hot paths or large loops when performance matters and the same behavior can be achieved with parameters, objects, or explicit state management.

### Q17. Why is closure understanding essential for React and Node.js?

Both ecosystems rely heavily on callbacks, effects, asynchronous flows, and encapsulated state. Without closure knowledge, developers often write stale-state bugs and memory leaks.

### Q18. How can closures improve code quality?

They support encapsulation, stable references, and cleaner APIs. Used correctly, closures make code more modular and easier to reason about, especially for stateful logic and event-driven systems.
