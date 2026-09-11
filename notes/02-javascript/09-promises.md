# Promises

> Interview Preparation Notes

---

## 1. Overview

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises replaced deeply nested callback-based async code ("callback hell") with a flatter, more composable chaining model, and they form the foundation that `async`/`await` is built on top of.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Asynchronous operations (network requests, timers, file I/O) need a way to
represent "a value that isn't ready yet" and notify code when it becomes available
   ↓
Limitations of plain callbacks
   ↓
Nesting callbacks for sequential async steps creates deeply indented, hard-to-read
"callback hell," with awkward and inconsistent error handling across each level
   ↓
Solution
   ↓
Promises represent a future value with a standard interface (.then/.catch/.finally)
that can be chained flatly instead of nested
   ↓
Benefits
   ↓
Flat, readable async chains, unified error handling via .catch, composability via
Promise.all/race/allSettled
```

---

## 3. Core Concepts

```
Promises
├── States: pending, fulfilled, rejected
├── .then() / .catch() / .finally()
├── Promise Chaining
├── Promise.all() / Promise.race() / Promise.allSettled() / Promise.any()
└── Microtask Queue (how promises schedule callbacks)
```

### Promise States

| State | Meaning | Can Transition To |
|---|---|---|
| `pending` | Initial state, operation not yet complete | `fulfilled` or `rejected` |
| `fulfilled` | Operation completed successfully | Final — immutable |
| `rejected` | Operation failed | Final — immutable |

Once a promise settles (fulfilled or rejected), it cannot change state again — this immutability is a deliberate design guarantee.

---

## 4. How It Works

```
new Promise(executor) is created
   ↓
executor function runs SYNCHRONOUSLY and immediately, receiving resolve/reject
   ↓
Promise starts in "pending" state
   ↓
Async operation completes → executor calls resolve(value) or reject(error)
   ↓
Promise transitions to "fulfilled" or "rejected" (settled, permanently)
   ↓
Any .then()/.catch() callbacks registered are scheduled on the MICROTASK QUEUE
   ↓
Microtask queue runs after the current synchronous code finishes, but before
the next macrotask (e.g., setTimeout callback)
```

---

## 5. Syntax / Basic Example

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice" });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then((user) => {
    console.log(user); // { id: 1, name: "Alice" }
    return user.name;
  })
  .then((name) => console.log(name.toUpperCase())) // "ALICE"
  .catch((err) => console.error(err.message))
  .finally(() => console.log("Done"));
```

Each `.then()` returns a **new promise**, allowing chaining — the return value of one `.then()` becomes the resolved value passed into the next.

---

## 6. Internal Working

### Promise Chaining and Error Propagation

```javascript
Promise.resolve(1)
  .then((val) => {
    throw new Error("Something broke");
  })
  .then((val) => {
    console.log("This is skipped"); // never runs
  })
  .catch((err) => {
    console.log("Caught:", err.message); // "Caught: Something broke"
  });
```

A thrown error (or a rejected promise) inside a `.then()` skips all subsequent `.then()` handlers until the nearest `.catch()` — this is analogous to how a `throw` skips to the nearest `catch` in synchronous try/catch blocks.

### Static Combinators

| Method | Resolves When | Rejects When |
|---|---|---|
| `Promise.all([...])` | All promises fulfill | Any single promise rejects (fails fast) |
| `Promise.allSettled([...])` | All promises settle (regardless of outcome) | Never rejects — always resolves with results array |
| `Promise.race([...])` | The first promise to settle (fulfill or reject) | Same as above — first to settle wins |
| `Promise.any([...])` | The first promise to fulfill | Only if ALL promises reject (AggregateError) |

```javascript
Promise.all([fetchUser(1), fetchUser(2)])
  .then(([user1, user2]) => console.log(user1, user2))
  .catch((err) => console.log("At least one failed:", err.message));
```

### Microtasks vs Macrotasks

Promise callbacks (`.then`, `.catch`, `.finally`, and `async`/`await` continuations) are queued as **microtasks**, which run after the current synchronous code completes but *before* the next macrotask (like a `setTimeout` callback), even if that `setTimeout` was scheduled with a `0ms` delay. This ordering detail is a very common interview question, covered further in `11-event-loop.md`.

---

## 7. Important Concepts

### Promises Are Eager, Not Lazy

The executor function passed to `new Promise()` runs immediately and synchronously when the promise is constructed — the async operation begins right away, regardless of whether `.then()` is ever called on the resulting promise.

### `Promise.resolve()` and `Promise.reject()`

```javascript
Promise.resolve(42).then((val) => console.log(val)); // 42
Promise.reject(new Error("fail")).catch((err) => console.log(err.message)); // "fail"
```

These create already-settled promises immediately, useful for normalizing values (which may or may not already be promises) into a consistent promise-based interface.

### Chaining vs Nesting (Anti-Pattern)

```javascript
// Anti-pattern: nesting defeats the purpose of promises
fetchUser(1).then((user) => {
  fetchPosts(user.id).then((posts) => {
    console.log(posts); // nested — hard to read, error handling duplicated
  });
});

// Correct: flat chaining
fetchUser(1)
  .then((user) => fetchPosts(user.id))
  .then((posts) => console.log(posts))
  .catch((err) => console.error(err));
```

---

## 8. Real-World Usage

- **API calls**: `fetch()` returns a promise, and virtually all modern HTTP client libraries follow the same promise-based interface.
- **Parallel data fetching**: `Promise.all` is the standard way to fetch multiple independent resources concurrently and wait for all of them.
- **Partial-failure tolerance**: `Promise.allSettled` is used when you want results from all operations even if some fail (e.g., batch operations where individual failures shouldn't abort the whole batch).
- **Timeout racing**: `Promise.race` is commonly used to implement request timeouts by racing a fetch promise against a timer promise.

---

## 9. Best Practices

- Always attach a `.catch()` (or use try/catch with `async`/`await`) — unhandled promise rejections can crash Node.js processes or silently fail in browsers.
- Prefer flat `.then()` chaining over nested promises to keep async code readable.
- Use `Promise.all` for independent operations that should run concurrently rather than awaiting them sequentially, which wastes time.
- Use `Promise.allSettled` when partial failures are acceptable and you need every result regardless of individual failures.

---

## 10. Common Mistakes

### 1. Nesting `.then()` calls instead of chaining

Reintroduces the same readability problems promises were meant to solve, and often duplicates error-handling logic at each nested level.

### 2. Forgetting to return a value/promise inside a `.then()`

```javascript
fetchUser(1).then((user) => {
  fetchPosts(user.id); // missing `return`!
}).then((posts) => {
  console.log(posts); // undefined — the fetchPosts promise wasn't returned/chained
});
```

Without `return`, the next `.then()` receives `undefined` immediately rather than waiting for the inner promise to resolve.

### 3. Using `Promise.all` when partial failures should be tolerated

`Promise.all` rejects immediately if any single promise rejects, discarding the results of any that succeeded — `Promise.allSettled` is usually the better choice for batch operations tolerant of partial failure.

### 4. Not handling promise rejections at all

Letting a rejected promise go unhandled can produce unhandled rejection warnings/crashes, since JavaScript expects every promise's failure path to eventually be observed.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `Promise.all` | `Promise.allSettled` | `all` fails fast on the first rejection; `allSettled` always resolves with every result, success or failure |
| `Promise.race` | `Promise.any` | `race` settles on the first promise to settle (fulfill or reject); `any` settles on the first to *fulfill*, ignoring rejections unless all reject |
| Callbacks | Promises | Callbacks nest for sequential async steps; promises chain flatly via `.then()` |
| `.then()` chaining | Nested `.then()` calls | Chaining returns a new promise per step for flat composition; nesting reintroduces callback-hell-like structure |

---

## 12. Interview Questions

### Beginner

#### Q1. What is a Promise?

**Answer:**

A Promise is an object representing the eventual result of an asynchronous operation. It exists in one of three states — pending, fulfilled, or rejected — and provides `.then()`/`.catch()`/`.finally()` methods to handle its eventual outcome.

#### Q2. What are the three states of a Promise?

**Answer:**

`pending` (initial, not yet resolved), `fulfilled` (completed successfully), and `rejected` (failed). Once a promise reaches `fulfilled` or `rejected`, it's considered "settled" and cannot change state again.

---

### Intermediate

#### Q3. What's the difference between `Promise.all` and `Promise.allSettled`?

**Answer:**

`Promise.all` resolves only if every promise in the array fulfills, and rejects immediately as soon as any single promise rejects (discarding other results). `Promise.allSettled` always resolves once every promise has settled, providing an array of each result's status and value/reason regardless of individual failures.

#### Q4. What happens if you throw an error inside a `.then()` callback?

**Answer:**

The returned promise from that `.then()` becomes rejected with the thrown error, and execution skips all subsequent `.then()` handlers until it reaches the nearest `.catch()` in the chain — analogous to how a `throw` propagates to the nearest `catch` block in synchronous code.

---

### Advanced

#### Q5. Are promise callbacks executed synchronously or asynchronously, and how does this interact with the event loop?

**Answer:**

Promise callbacks (`.then`/`.catch`/`.finally`) are always executed asynchronously, even if the promise is already settled at the time `.then()` is called — they're queued onto the microtask queue rather than run immediately. The microtask queue is fully drained after each synchronous execution block completes, but before the event loop proceeds to the next macrotask (like a `setTimeout` callback), which is why promise resolutions consistently run before timer callbacks scheduled around the same time.

---

### Follow-Up Questions

#### Q6. Why is it a mistake to nest promises instead of chaining them?

**Answer:**

Nesting reproduces the same deeply indented, hard-to-follow structure that promises were designed to eliminate from callback-based code, and typically requires duplicating error-handling logic at each nested level instead of relying on a single `.catch()` at the end of a flat chain to handle errors from any step.

---

## 13. Scenario-Based Questions

### Scenario 1 — Dashboard Needs Data From Three Independent APIs

A dashboard needs to display data fetched from three unrelated API endpoints as soon as all are available.

**Approach:**

1. Fire off all three fetch calls immediately (not sequentially with `await` one after another) to run them concurrently.
2. Use `Promise.all([fetch1, fetch2, fetch3])` to wait for all three to complete together.
3. Add a single `.catch()` to handle the case where any one of them fails, understanding that `Promise.all` rejects immediately upon any single failure.
4. If partial data (from whichever succeeded) is acceptable even when some fail, use `Promise.allSettled` instead.

### Scenario 2 — A Chained Async Operation Silently Produces `undefined`

A `.then()` chain fetches a user, then fetches that user's posts, but the second `.then()` receives `undefined` instead of the posts data.

**Approach:**

1. Check whether the inner async call (`fetchPosts(user.id)`) inside the first `.then()` is properly `return`ed.
2. Without a `return`, the outer `.then()` chain doesn't wait for the inner promise, and immediately proceeds with `undefined`.
3. Add the `return` statement so the promise chain properly waits for and passes along the actual resolved value.

---

## 14. Practical Examples

### Example 1

Implement a `fetchWithTimeout(url, ms)` function using `Promise.race` between a `fetch` call and a timer-based rejection.

### Example 2

Use `Promise.allSettled` to fetch data from multiple endpoints and log which succeeded and which failed, without letting one failure abort the whole operation.

### Example 3

Refactor a nested `.then()` callback chain into a flat, properly chained version with a single `.catch()` at the end.

---

## 15. Quick Revision

- A Promise represents pending/fulfilled/rejected states for an eventual async result.
- The executor function runs synchronously and immediately upon promise creation.
- `.then()`/`.catch()`/`.finally()` callbacks are queued as microtasks, running before the next macrotask.
- `Promise.all` fails fast on first rejection; `Promise.allSettled` always resolves with every result.
- Always chain flatly and attach error handling — never nest promises or leave rejections unhandled.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Flat, composable alternative to deeply nested async callbacks |
| How? | States (pending/fulfilled/rejected); callbacks run via the microtask queue |
| When? | Any async operation: API calls, timers, file I/O |
| Alternative? | Raw callbacks (harder to compose/read) or async/await (sugar over promises) |
| Production? | fetch() calls, Promise.all for concurrent requests, timeout racing |
| Interview? | Explain Promise.all vs allSettled, and microtask vs macrotask ordering |
