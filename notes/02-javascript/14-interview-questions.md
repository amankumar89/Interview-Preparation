# JavaScript — Interview Questions

> Interview Preparation Notes

---

## 1. Overview

This file consolidates the most commonly asked JavaScript interview questions across topics covered in this section: fundamentals, scope, hoisting, closures, `this`, prototypes, functions, array methods, promises, async/await, the event loop, callbacks, and error handling. Use the individual topic files for deep dives — this file is for rapid-fire revision and mock-interview practice.

---

## 2. Beginner Questions

#### Q1. What's the difference between `==` and `===`?

**Answer:**

`==` coerces types before comparing, which can produce surprising results (`"" == 0` is `true`). `===` compares both type and value with no coercion — the recommended default.

#### Q2. What's the difference between `null` and `undefined`?

**Answer:**

`undefined` means a variable was declared but never assigned (or a function returned nothing). `null` is an intentional, explicit assignment representing "no value."

#### Q3. What is the difference between `var`, `let`, and `const`?

**Answer:**

`var` is function-scoped and hoisted with an `undefined` initial value. `let`/`const` are block-scoped and hoisted into the Temporal Dead Zone (accessing them before declaration throws). `const` additionally disallows reassignment (but not mutation of object contents).

#### Q4. What is a closure?

**Answer:**

A function that retains access to variables from its enclosing lexical scope, even after that outer scope has finished executing — commonly used for data privacy, memoization, and stateful callbacks.

#### Q5. What does `this` refer to in JavaScript?

**Answer:**

It depends on how the function is called: `new` binding, explicit binding (`call`/`apply`/`bind`), implicit binding (`obj.method()`), or default binding (plain call). Arrow functions are the exception — they inherit `this` lexically from their defining scope.

---

## 3. Intermediate Questions

#### Q6. Explain event delegation / bubbling in relation to callbacks and the DOM.

**Answer:**

Events bubble up from the target element through its ancestors. Attaching a single listener to a common ancestor (instead of each individual child) lets you handle events for many elements efficiently, checking `event.target` to determine which specific element triggered it.

#### Q7. What's the difference between `Promise.all` and `Promise.allSettled`?

**Answer:**

`Promise.all` resolves only if every promise fulfills, rejecting immediately on the first failure. `Promise.allSettled` always resolves once every promise has settled, providing status and value/reason for each, regardless of individual failures.

#### Q8. Why does the classic `var` vs `let` loop example produce different output with `setTimeout`?

**Answer:**

`var` is function-scoped, so all loop iterations share a single binding — by the time async callbacks run, they all see the final value. `let` creates a new block-scoped binding per iteration, so each callback captures its own value.

#### Q9. What is prototypal inheritance, and how does `class` relate to it?

**Answer:**

Objects inherit behavior via a linked prototype chain rather than fixed classes. `class` syntax is sugar over this same mechanism — methods still end up on the underlying `.prototype` object, and `new` still performs the same prototype-linking steps underneath.

#### Q10. Why doesn't `.forEach()` work well with `async` callbacks?

**Answer:**

`forEach` ignores the promise returned by its callback — it doesn't wait for async operations to complete before moving to the next iteration or before the surrounding code continues. Use `for...of` (sequential) or `Promise.all(array.map(...))` (parallel) instead.

#### Q11. What's the difference between microtasks and macrotasks?

**Answer:**

Microtasks (promise callbacks, `queueMicrotask`) are fully drained after the call stack empties, before the event loop processes even one macrotask (`setTimeout`, I/O, UI events) — this is why `Promise.then()` always runs before `setTimeout(fn, 0)`.

---

## 4. Advanced Questions

#### Q12. Why does `typeof null` return `"object"`?

**Answer:**

A historical bug from the earliest JavaScript implementation, where values were represented with type tags and `null`'s tag happened to match objects'. It remains in the spec today for backward compatibility.

#### Q13. What exactly happens when you call a function with `new`?

**Answer:**

A new empty object is created; its `[[Prototype]]` is set to the constructor's `.prototype`; the constructor runs with `this` bound to the new object; and the new object is returned automatically unless the constructor explicitly returns a different object.

#### Q14. How can closures cause memory leaks?

**Answer:**

A closure keeps its entire referenced lexical environment alive in memory for as long as the closure exists. If a long-lived closure (e.g., attached to a global event listener) references large objects or DOM nodes, they can't be garbage collected even after they're no longer needed.

#### Q15. Why might a very deep or infinite chain of `.then()` calls cause problems?

**Answer:**

Since the event loop fully drains the microtask queue before moving to the next macrotask, an unbounded chain of self-scheduling microtasks can starve the macrotask queue indefinitely — timers, I/O, and rendering may be delayed or effectively frozen out.

#### Q16. How would you implement a retry mechanism that only retries specific error types?

**Answer:**

Use custom `Error` subclasses (e.g., `NetworkError`) and check `error instanceof NetworkError` in a catch block before recursively retrying, re-throwing immediately for error types that a retry wouldn't fix (e.g., validation errors).

---

## 5. Scenario-Based Questions

### Scenario 1 — All Event Listeners Log the Same Value

**Approach:**

1. Check whether the loop uses `var` for the index variable — it creates one shared binding across all iterations/closures.
2. Switch to `let`, which creates a fresh block-scoped binding per iteration.

### Scenario 2 — A React List Doesn't Re-Render After an Update

**Approach:**

1. Check whether a mutating array method (`push`, `splice`, `sort`) was used directly on state — this keeps the same reference, so React's equality check misses the change.
2. Use `map`/`filter`/spread to create a new array reference instead.

### Scenario 3 — Sequential `await` Calls Make a Page Load Slowly

**Approach:**

1. Identify whether the awaited operations are actually independent of each other.
2. Refactor to `Promise.all([...])` to run them concurrently instead of one after another.

### Scenario 4 — An API Call Fails Silently With No User Feedback

**Approach:**

1. Check whether a `.catch()` (or try/catch around `await`) exists at all — it's likely missing or swallowing the error.
2. Add proper error handling that surfaces a meaningful message and optionally logs to a monitoring service.

---

## 6. Quick Revision

- `===` avoids coercion surprises that `==` introduces.
- `let`/`const` are block-scoped with a TDZ; `var` is function-scoped and hoisted to `undefined`.
- Closures retain live references to their defining scope, not value snapshots.
- `this` depends on the call-site, except for arrow functions, which inherit it lexically.
- `class` is sugar over the same prototype-chain mechanism JavaScript has always used.
- Microtasks (promises) always fully drain before the next macrotask (timers/I/O).
- `Promise.all` fails fast; `Promise.allSettled` always resolves with every result.
- `forEach` ignores async callbacks entirely — use `for...of` or `Promise.all(map(...))`.
- Never silently swallow errors — handle meaningfully or re-throw.

---

## 7. Interview Cheat Sheet

| Topic | Core Concept to Remember |
|---|---|
| Fundamentals | Primitives copied by value; objects copied by reference |
| Scope | Lexical scoping; var is function-scoped, let/const are block-scoped |
| Hoisting | var → undefined; let/const → Temporal Dead Zone; function declarations fully hoisted |
| Closures | Live reference to defining scope, not a value snapshot |
| `this` | Call-site determines binding; arrow functions inherit lexically |
| Prototypes | Prototype chain lookup; class is sugar over the same mechanism |
| Functions | First-class values; pure vs impure; arguments vs rest params |
| Array Methods | Know exactly which methods mutate vs return new arrays |
| Promises | States (pending/fulfilled/rejected); all vs allSettled vs race vs any |
| Async/Await | Sugar over promises; sequential vs Promise.all performance |
| Event Loop | Microtasks fully drain before each macrotask |
| Callbacks | Error-first convention; callback hell motivated promises |
| Error Handling | try/catch/finally; custom Error subclasses; never swallow errors |
