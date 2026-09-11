# Functions

> Interview Preparation Notes

---

## 1. Overview

Functions in JavaScript are **first-class citizens** — they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures, just like any other value. This flexibility underlies higher-order functions, callbacks, currying, and functional composition, all of which are common interview territory.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Programs need reusable, composable units of logic that can be passed around
and combined flexibly
   ↓
Limitations without first-class functions
   ↓
If functions could only be called by name and never passed as values, patterns
like callbacks, array iteration methods (map/filter/reduce), and event handling
would be impossible to express cleanly
   ↓
Solution
   ↓
Treat functions as values — they can be stored, passed, and returned just like
numbers or strings
   ↓
Benefits
   ↓
Higher-order functions, callback-based APIs, functional composition, flexible
and reusable abstractions
```

---

## 3. Core Concepts

```
Functions
├── Function Declarations vs Expressions vs Arrow Functions
├── Parameters (default, rest)
├── Arguments object (non-arrow functions only)
├── Higher-Order Functions
├── Pure Functions vs Side Effects
├── IIFE (Immediately Invoked Function Expression)
└── Currying / Partial Application
```

### Function Definition Styles

| Style | Hoisted With Body? | Has Own `this` | Has `arguments` object |
|---|---|---|---|
| `function foo() {}` | Yes | Yes | Yes |
| `const foo = function() {}` | No (only binding) | Yes | Yes |
| `const foo = () => {}` | No (only binding) | No — lexical | No — must use rest params |

---

## 4. How It Works

```
Function is defined (declaration, expression, or arrow)
   ↓
Function object is created, with a reference to its defining lexical scope
   (this reference is what powers closures)
   ↓
When called, a new execution context is created:
   - parameters bound to arguments
   - local variable environment created
   - `this` determined per the call-site (except arrow functions)
   ↓
Function body executes; return value (or undefined) is passed back to caller
```

---

## 5. Syntax / Basic Example

```javascript
// Default parameters
function greet(name = "Guest") {
  return `Hello, ${name}`;
}
console.log(greet()); // "Hello, Guest"

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3)); // 6

// Higher-order function: takes a function as an argument
function withLogging(fn) {
  return function (...args) {
    console.log("Calling with:", args);
    return fn(...args);
  };
}
const loggedSum = withLogging(sum);
loggedSum(1, 2); // logs "Calling with: [1, 2]", then returns 3
```

---

## 6. Internal Working

### The `arguments` Object

```javascript
function example() {
  console.log(arguments); // array-like object of all passed arguments
  console.log(arguments.length);
}
```

`arguments` is available in regular functions (not arrow functions) and behaves like an array but isn't one — it lacks methods like `.map()` or `.filter()` directly (though it can be converted via `Array.from(arguments)` or the spread operator). Rest parameters (`...args`) are the modern, preferred replacement since they produce a real array.

### Pure Functions vs Side Effects

```javascript
// Pure — same input always produces same output, no external state modified
function add(a, b) {
  return a + b;
}

// Impure — depends on and modifies external state
let total = 0;
function addToTotal(n) {
  total += n; // side effect
  return total;
}
```

Pure functions are easier to test, reason about, and memoize, since their output depends only on their inputs.

### IIFE (Immediately Invoked Function Expression)

```javascript
(function () {
  const privateVar = "hidden";
  console.log("Runs immediately");
})();
```

Historically used to create an isolated scope and avoid polluting the global namespace before ES6 modules and block-scoped `let`/`const` existed. Still occasionally used for one-off initialization logic.

---

## 7. Important Concepts

### Currying and Partial Application

```javascript
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10
```

Currying transforms a function that takes multiple arguments into a sequence of functions that each take a single argument, relying entirely on closures to remember previously supplied arguments.

### Higher-Order Functions

A higher-order function either takes a function as an argument, returns a function, or both. Array methods like `map`, `filter`, and `reduce` are the most commonly used built-in higher-order functions, and are covered in depth in `08-array-methods.md`.

### Default Parameters Are Evaluated at Call Time

```javascript
function log(message, timestamp = Date.now()) {
  console.log(message, timestamp);
}
```

`Date.now()` is re-evaluated every time `log` is called without a second argument, not once when the function was defined — default parameter expressions are lazily evaluated per-call.

---

## 8. Real-World Usage

- **Array processing pipelines**: `map`/`filter`/`reduce` chains rely entirely on functions as first-class values passed as callbacks.
- **Middleware patterns** (Express.js, Redux): a chain of functions, each receiving and potentially wrapping/calling the next — a direct application of higher-order functions.
- **Event handling**: passing functions as callbacks to `addEventListener`, promise `.then()`, or `setTimeout`.
- **Configuration/factory functions**: currying and partial application are common in functional libraries (e.g., Lodash's `_.curry`) for building specialized, reusable functions from general ones.

---

## 9. Best Practices

- Prefer pure functions where possible — easier to test, debug, and reason about.
- Use rest parameters (`...args`) instead of the legacy `arguments` object for clearer, real-array behavior.
- Use default parameters instead of manual `if (x === undefined)` checks for cleaner, more declarative code.
- Be intentional about when to use arrow functions (lexical `this`, no `arguments`) versus regular functions (dynamic `this`, has `arguments`) based on what the function actually needs.

---

## 10. Common Mistakes

### 1. Using arrow functions where `arguments` or dynamic `this` is needed

Arrow functions have neither their own `arguments` object nor their own `this`, so using one as an object method or somewhere `arguments` is expected leads to bugs or `ReferenceError`s.

### 2. Confusing the `arguments` object with a real array

Attempting to call array methods like `.map()` directly on `arguments` without first converting it.

### 3. Writing functions with hidden side effects

Functions that quietly mutate external state or their input arguments make code harder to test and reason about, and can introduce subtle bugs when called in unexpected orders.

### 4. Assuming default parameter expressions are evaluated once

Expecting a default value like `Date.now()` to be fixed at function-definition time, when it's actually recomputed on every call where that parameter is omitted.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `arguments` object | Rest parameters | `arguments` is array-like (no direct array methods) and unavailable in arrow functions; rest params are real arrays, available everywhere |
| Pure function | Impure function | Pure: same input → same output, no side effects; Impure: depends on or modifies external state |
| Higher-order function | Regular function | Higher-order functions take and/or return other functions; regular functions do not |
| Currying | Partial application | Currying transforms a function into a chain of single-argument functions; partial application pre-fills some (not necessarily all-the-way-to-one) arguments of a function |

---

## 12. Interview Questions

### Beginner

#### Q1. What does it mean that functions are "first-class citizens" in JavaScript?

**Answer:**

It means functions can be treated like any other value — assigned to variables, passed as arguments to other functions, returned from functions, and stored in arrays/objects — enabling patterns like callbacks and higher-order functions.

#### Q2. What is a higher-order function?

**Answer:**

A function that either accepts another function as an argument, returns a function, or both. Common examples include `map`, `filter`, `reduce`, and custom utility wrappers like a logging or memoization decorator.

---

### Intermediate

#### Q3. What's the difference between the `arguments` object and rest parameters?

**Answer:**

`arguments` is an array-like object automatically available inside regular (non-arrow) functions, containing all passed arguments, but it lacks native array methods. Rest parameters (`...args`) collect arguments into a real array, work in both regular and arrow functions (though arrow functions don't have their own `arguments` at all), and are the modern preferred approach.

#### Q4. What is a pure function, and why does it matter?

**Answer:**

A pure function always returns the same output given the same input and has no observable side effects (no mutating external state, no I/O). Pure functions are easier to test in isolation, easier to reason about, and safe to memoize, since their result is fully determined by their inputs.

---

### Advanced

#### Q5. Explain currying with an example, and how closures make it possible.

**Answer:**

Currying converts a function taking multiple arguments into a sequence of functions each taking one argument, e.g., `multiply(a)(b)` instead of `multiply(a, b)`. Each returned inner function forms a closure over the previously supplied arguments (like `a` in `multiply(a)`), retaining access to them even after the outer function call has completed — this closure-based memory is exactly what allows the final inner function to combine all the previously curried arguments together when finally invoked.

---

### Follow-Up Questions

#### Q6. Why might you specifically choose a regular function over an arrow function for an object method?

**Answer:**

Because a regular function gets a dynamic `this` determined by the call-site (`obj.method()` sets `this` to `obj`), whereas an arrow function has no own `this` and would incorrectly inherit `this` from the surrounding lexical scope at definition time — usually not the object itself. For genuine object methods that need to reference `this` as "the calling object," regular functions (or `class` methods, which behave the same way) are the correct choice.

---

## 13. Scenario-Based Questions

### Scenario 1 — A Utility Function Needs to Support Variable Numbers of Arguments

A `sum` function needs to accept any number of numeric arguments and return their total.

**Approach:**

1. Use rest parameters (`function sum(...numbers) {}`) to collect all arguments into a real array.
2. Use `reduce` to total them, handling zero arguments gracefully with a sensible default (e.g., returning 0 for an empty array).

### Scenario 2 — Debugging a Function That Unexpectedly Mutates Its Caller's Data

A function passed an array or object seems to alter the caller's original data as a side effect, causing bugs elsewhere in the codebase.

**Approach:**

1. Identify whether the function mutates its input directly (e.g., `array.push(...)`, `object.prop = ...`) instead of creating and returning a new copy.
2. Refactor toward a pure-function style: create a shallow (or deep, if nested) copy of the input at the start of the function, and operate on/return the copy instead of the original reference.

---

## 14. Practical Examples

### Example 1

Implement a `curry(fn)` utility that automatically curries any function of a fixed arity, using closures.

### Example 2

Write a `withLogging(fn)` higher-order function decorator that logs arguments and return values around any wrapped function call.

### Example 3

Refactor an impure function that mutates its array argument into a pure function that returns a new array instead.

---

## 15. Quick Revision

- Functions are first-class values: assignable, passable, returnable like any other value.
- Regular functions get `arguments` and dynamic `this`; arrow functions get neither.
- Higher-order functions take and/or return functions — the foundation of `map`/`filter`/`reduce` and middleware patterns.
- Pure functions have no side effects and always return the same output for the same input.
- Currying/partial application rely on closures to remember previously supplied arguments.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Enables passing, storing, and composing logic like any other value |
| How? | Function objects retain a reference to their defining scope (closures) |
| When? | Callbacks, array methods, middleware, event handlers, functional composition |
| Alternative? | No true alternative in JS — first-class functions are core to the language |
| Production? | map/filter/reduce pipelines, Express/Redux middleware, memoization |
| Interview? | Explain arguments vs rest params, and pure vs impure functions |
