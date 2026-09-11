# Callbacks

> Interview Preparation Notes

---

## 1. Overview

A callback is a function passed as an argument to another function, to be invoked later — either synchronously (like in `array.map(callback)`) or asynchronously (like in `setTimeout(callback, 1000)`). Callbacks are the original mechanism for handling asynchronous operations in JavaScript, predating Promises, and understanding them is essential to understanding why Promises and `async`/`await` were introduced.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Code often needs to run only after some operation completes — especially
operations that take time (I/O, timers, network requests)
   ↓
Limitations without callbacks
   ↓
Without a way to say "run this function once you're done," asynchronous
operations would need to block the thread until they complete, or provide no
way to react to their result at all
   ↓
Solution
   ↓
Pass a function as an argument; the async operation invokes it once finished,
handing back the result (or error)
   ↓
Benefits
   ↓
Non-blocking async operations, flexible composition, foundational building
block for event handling and array iteration
```

---

## 3. Core Concepts

```
Callbacks
├── Synchronous Callbacks (array methods, immediate invocation)
├── Asynchronous Callbacks (setTimeout, event listeners, I/O)
├── Error-First Callback Convention (Node.js style)
└── Callback Hell (the problem Promises were designed to solve)
```

### Synchronous vs Asynchronous Callbacks

| Type | When Invoked | Example |
|---|---|---|
| Synchronous | Immediately, during the same call stack execution | `array.map(fn)`, `array.forEach(fn)` |
| Asynchronous | Later, after some operation completes (timer, I/O, network) | `setTimeout(fn, 1000)`, `fs.readFile(path, fn)`, `element.addEventListener("click", fn)` |

---

## 4. How It Works

```
Function A receives function B ("the callback") as an argument
   ↓
Function A performs its operation
   ↓
   If synchronous: Function A calls B() directly, in the same execution flow
   ↓
   If asynchronous: Function A registers B with a runtime API (timer, network
   stack, file system), then returns immediately WITHOUT calling B yet
   ↓
   Once the underlying async operation completes, the runtime schedules B onto
   the macrotask queue
   ↓
   Event loop eventually picks up B from the queue and executes it on the call stack
```

---

## 5. Syntax / Basic Example

```javascript
// Synchronous callback
[1, 2, 3].forEach(function (num) {
  console.log(num); // called immediately, once per element
});

// Asynchronous callback
setTimeout(function () {
  console.log("Runs after at least 1000ms");
}, 1000);

// Error-first callback convention (common in Node.js)
function readFileCallback(err, data) {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }
  console.log("File contents:", data);
}
```

---

## 6. Internal Working

### The Error-First Convention

Node.js established a widespread convention: callbacks receive an error as their *first* argument (`null` if no error occurred), followed by the actual result data.

```javascript
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    // handle error
    return;
  }
  // use data
});
```

This convention exists because, unlike synchronous code where `try`/`catch` naturally handles errors, an async callback has no equivalent surrounding context to "catch" a thrown error — so the error must be explicitly passed as data instead.

### Callback Hell (Pyramid of Doom)

```javascript
getUser(userId, (err, user) => {
  if (err) return handleError(err);
  getPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    getComments(posts[0].id, (err, comments) => {
      if (err) return handleError(err);
      console.log(comments); // deeply nested, hard to follow
    });
  });
});
```

Each async step nests inside the previous one's callback, producing deeply indented code that's hard to read, hard to modify, and requires repeating error-handling logic at every level. This structural problem is precisely what Promises (and later `async`/`await`) were designed to solve, by flattening sequential async logic into chainable or linear syntax.

---

## 7. Important Concepts

### Callbacks Are the Foundation Promises Are Built On

Under the hood, even Promises use callback-like mechanisms (`resolve`/`reject` are themselves callback functions passed into the executor) — Promises don't eliminate callbacks entirely, they provide a standardized, more composable *interface* around them.

### Losing `this` in Callbacks

```javascript
class Timer {
  constructor() {
    this.seconds = 0;
  }
  start() {
    setInterval(this.tick, 1000); // `this` inside tick will NOT be the Timer instance
  }
  tick() {
    this.seconds++; // throws or silently fails — this is undefined/global here
  }
}
```

This is the same `this`-binding issue covered in `05-this.md` — passing a method as a bare callback reference detaches it from its object, requiring `.bind(this)` or an arrow function wrapper to preserve the correct `this`.

### Callbacks in Array Methods Are Always Synchronous

A common point of confusion: `array.map()`, `array.forEach()`, etc. invoke their callbacks synchronously and immediately — they are not asynchronous just because they use a "callback-style" API. True asynchronous callbacks come from things like timers, promises, or I/O operations.

---

## 8. Real-World Usage

- **Event handling**: `element.addEventListener("click", callback)` is the most common pattern for reacting to user interaction.
- **Timers**: `setTimeout`/`setInterval` for scheduling delayed or repeating work.
- **Legacy Node.js APIs**: many core Node modules (like the original `fs` module) use error-first callbacks, though modern code increasingly prefers their promise-based counterparts (`fs.promises`).
- **Array iteration**: every higher-order array method (`map`, `filter`, `reduce`, etc.) is fundamentally a synchronous callback pattern.

---

## 9. Best Practices

- Prefer Promises/`async`-`await` over raw nested callbacks for sequential asynchronous logic, to avoid callback hell.
- Follow the error-first convention consistently when writing your own callback-based APIs, to match ecosystem expectations.
- Be mindful of `this` binding when passing object methods as callbacks — use `bind`, arrow functions, or arrow class fields as needed.
- Avoid deeply nesting callbacks; if nesting exceeds two or three levels, refactor toward named functions, promises, or `async`/`await`.

---

## 10. Common Mistakes

### 1. Nesting many async callbacks, creating callback hell

Leads to hard-to-read, hard-to-maintain code with duplicated error handling at every level of nesting.

### 2. Forgetting error-first callbacks require explicit error checks

Omitting the `if (err) { ... }` check at the start of a callback, silently proceeding as if the operation succeeded even when it failed.

### 3. Assuming array method callbacks are asynchronous

Writing code that expects `array.forEach(callback)` to defer execution, when it actually runs its callback synchronously and immediately, in order.

### 4. Passing an object method as a bare callback without preserving `this`

Leads to `this` being `undefined` or the wrong object when the callback is eventually invoked by the async operation or event system.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| Synchronous callback | Asynchronous callback | Synchronous runs immediately within the same call stack; asynchronous runs later, after the current stack empties |
| Error-first callback | Promise rejection | Error-first passes an explicit error argument to check manually; promises reject and propagate errors through `.catch()`/try-catch |
| Callbacks | Promises | Callbacks nest for sequential steps; promises chain flatly and standardize error handling |
| `forEach` callback | `setTimeout` callback | forEach's callback is synchronous and immediate; setTimeout's callback is asynchronous, deferred to the macrotask queue |

---

## 12. Interview Questions

### Beginner

#### Q1. What is a callback function?

**Answer:**

A function passed as an argument to another function, intended to be invoked later — either synchronously (like in array methods) or asynchronously (like in timers or event listeners) — once some condition or operation completes.

#### Q2. What is the error-first callback convention?

**Answer:**

A widespread Node.js convention where callback functions receive an error object as their first argument (`null` if no error occurred), followed by the actual result data — used because async callbacks have no surrounding `try`/`catch` context to naturally propagate thrown errors.

---

### Intermediate

#### Q3. What is "callback hell," and why does it happen?

**Answer:**

Callback hell refers to deeply nested callback functions that result from chaining multiple sequential asynchronous operations, where each step's logic is nested inside the previous step's callback. It happens because raw callbacks have no built-in mechanism for flat sequential composition, forcing each dependent step to be defined inside the previous one, which also duplicates error-handling logic at every level.

#### Q4. Are callbacks passed to array methods like `map` synchronous or asynchronous?

**Answer:**

Synchronous — `map`, `forEach`, `filter`, and similar array methods invoke their callback immediately and in order during the same call stack execution. They are not inherently asynchronous just because they follow a callback-passing pattern; true asynchronous callbacks come from timers, I/O, or promise-based APIs.

---

### Advanced

#### Q5. How do Promises relate to callbacks — do they eliminate them?

**Answer:**

Promises don't eliminate callbacks; they standardize and improve how callbacks are composed. Internally, a Promise's executor function receives `resolve` and `reject`, which are themselves callback functions. What Promises add is a consistent interface (`.then`/`.catch`) that allows flat chaining instead of nesting, along with unified error propagation — solving the structural problems of callback hell without removing the underlying callback mechanism entirely.

---

### Follow-Up Questions

#### Q6. How would you refactor a deeply nested error-first callback chain into `async`/`await`?

**Answer:**

First, convert or wrap each callback-based function into a Promise-returning version (using `util.promisify` in Node.js, or manually wrapping with `new Promise((resolve, reject) => {...})`), then write an `async` function that sequentially `await`s each step inside a single `try`/`catch` block — flattening the nested structure into linear, readable code with unified error handling.

---

## 13. Scenario-Based Questions

### Scenario 1 — Legacy Codebase With Deep Callback Nesting Is Hard to Maintain

A section of the codebase has five levels of nested error-first callbacks handling a sequential file-processing workflow, and adding a new step risks introducing bugs.

**Approach:**

1. Wrap each callback-based function in a Promise (or use `util.promisify` if using Node.js core APIs).
2. Rewrite the sequential logic using `async`/`await` with a single `try`/`catch` block.
3. Verify behavior is preserved with tests before removing the old nested implementation.

### Scenario 2 — An Event Handler Method Loses Access to Component State

A class-based UI component passes `this.handleClick` directly as an event listener callback, and inside the handler, `this` is `undefined`.

**Approach:**

1. Recognize this as the classic bare-callback `this`-binding issue, not a bug in the handler's logic itself.
2. Fix using `.bind(this)` in the constructor, converting the handler to an arrow-function class field, or wrapping the listener registration in an inline arrow function.

---

## 14. Practical Examples

### Example 1

Implement a simple error-first callback-based `readConfig(path, callback)` function (simulated with `setTimeout`), then refactor it into a Promise-returning version.

### Example 2

Write a three-level nested callback chain simulating sequential async steps, then refactor it into flat `async`/`await` code.

### Example 3

Demonstrate the difference between a synchronous callback (`array.map`) and an asynchronous callback (`setTimeout`) by logging execution order around each.

---

## 15. Quick Revision

- A callback is a function passed to another function to be invoked later, synchronously or asynchronously.
- Array method callbacks (`map`, `forEach`, etc.) are synchronous; timers, I/O, and events are asynchronous.
- The error-first convention (`(err, data) => {}`) is the traditional Node.js pattern for handling async errors.
- Callback hell is the deeply nested structure that results from sequential async callbacks — Promises/`async`-`await` solve this.
- Passing an object method as a bare callback can lose its `this` binding — the same issue covered in the `this` topic.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Enables reacting to async operations without blocking the thread |
| How? | Passed as arguments, invoked immediately (sync) or later via the event loop (async) |
| When? | Event handling, timers, array iteration, legacy Node.js APIs |
| Alternative? | Promises/async-await for cleaner composition of sequential async logic |
| Production? | addEventListener, setTimeout, legacy fs callbacks, array iteration |
| Interview? | Explain callback hell and why Promises were introduced to address it |
