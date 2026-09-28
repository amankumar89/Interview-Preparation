# JavaScript — 09 Advanced JavaScript

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is prototype-based inheritance in JavaScript?

**Interview Answer:**

JavaScript objects inherit properties and methods from their prototype. This allows reusable behavior without classical class inheritance.

```js
const animal = {
  speak() {
    return "Hello";
  },
};

const dog = Object.create(animal);
console.log(dog.speak());
```

### Q2. What is the difference between class syntax and constructor functions?

Classes provide a cleaner syntax over prototype-based inheritance, but under the hood they still use prototypes. Constructor functions are older and more manual, but conceptually similar.

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

### Q3. What is the purpose of modules in JavaScript?

Modules allow code to be split into reusable files with explicit exports and imports. They improve organization, maintainability, and scope isolation.

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

### Q4. What is the difference between `export default` and named exports?

Named exports allow multiple exports from a file, while default exports provide a single primary export. Each has different import syntax and project conventions.

### Q5. What is a `Set` in JavaScript?

A `Set` stores unique values and is useful for deduplication and membership checks.

```js
const ids = new Set([1, 2, 2, 3]);
console.log(ids.size); // 3
```

### Q6. What is a `Map` in JavaScript?

A `Map` is a collection of key-value pairs where keys can be any type, not just strings or symbols.

```js
const userMap = new Map();
userMap.set("id", 1);
console.log(userMap.get("id"));
```

### Q7. What is the difference between `Map` and object keys?

Objects use string keys and are optimized for property access. Maps allow non-string keys and are often more predictable for dynamic or frequent key-based lookups.

### Q8. What is debouncing?

Debouncing delays a function call until a period of inactivity has passed. It is useful for search input and resize handlers.

```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

### Q9. What is throttling?

Throttling ensures a function runs at most once within a given interval. It is useful for scroll and resize events where frequent triggers are expensive.

### Q10. What is memoization?

Memoization caches computed results for repeated inputs to avoid recomputing expensive work.

```js
function memoize(fn) {
  const cache = new Map();
  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg);
  };
}
```

## Intermediate Topics

### Q11. What is the EventTarget API?

`EventTarget` is the standard base for dispatching events. It is used to build custom event-based systems in JavaScript.

```js
const emitter = new EventTarget();
emitter.addEventListener("data", (event) => console.log(event.type));
emitter.dispatchEvent(new Event("data"));
```

### Q12. What is `Proxy` in JavaScript?

A `Proxy` intercepts operations performed on an object, such as property access, assignment, and method invocation.

```js
const target = { name: "Aman" };
const proxy = new Proxy(target, {
  get(obj, prop) {
    return obj[prop] ?? "missing";
  },
});
```

### Q13. What is `Reflect` used for?

`Reflect` provides methods for object-level operations that mirror JavaScript language semantics. It is often used with `Proxy`.

### Q14. Why are WeakMap and WeakSet important?

`WeakMap` and `WeakSet` hold weak references, which helps avoid memory leaks for temporary metadata or caches.

### Q15. What is the difference between synchronous and asynchronous iteration?

Synchronous iteration is built around loops and arrays. Asynchronous iteration is used with `for await...of` and streams where values arrive over time.

```js
async function* stream() {
  yield 1;
  yield 2;
}
```

## Production and Design

### Q16. What makes advanced JavaScript code hard to maintain?

Common issues include over-abstracting, hidden shared state, deep nesting, stale closures, and unclear mutation patterns. Clear APIs and simple data flow improve maintainability.

### Q17. How do you avoid performance issues with large data sets?

Use efficient iteration, avoid repeated re-renders, memoize expensive work, flatten unnecessary nested loops, and keep object mutation predictable.

### Q18. What skills do senior JavaScript engineers rely on beyond syntax?

They reason about runtime behavior, memory usage, concurrency, code organization, debugging tools, and tradeoffs between readability and performance. Strong fundamentals are what make advanced patterns safe and maintainable.
