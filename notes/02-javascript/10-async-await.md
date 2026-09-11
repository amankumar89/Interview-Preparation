# Async/Await

> Interview Preparation Notes

---

## 1. Overview

`async`/`await` is syntactic sugar over Promises, introduced in ES2017, that lets asynchronous code be written and read in a synchronous, top-to-bottom style. An `async` function always returns a promise, and `await` pauses execution *within that function* until the awaited promise settles — without blocking the rest of the program.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Promise chains, while flatter than nested callbacks, can still become hard to
read for complex sequential async logic (many .then() steps, conditional branching)
   ↓
Limitations of pure .then() chains
   ↓
Expressing loops, try/catch error handling, and conditional branches across
async steps is awkward when everything must be expressed as chained callbacks
   ↓
Solution
   ↓
async/await lets asynchronous code be written with normal control flow
(if/else, loops, try/catch) while still being built entirely on Promises
underneath
   ↓
Benefits
   ↓
Reads like synchronous code, natural error handling via try/catch, easier to
debug (better stack traces) than long promise chains
```

---

## 3. Core Concepts

```
Async/Await
├── async function declaration (always returns a Promise)
├── await (pauses function execution until a Promise settles)
├── try/catch for error handling
├── Sequential vs Parallel await
└── Top-level await (ES modules)
```

### `async` Functions Always Return a Promise

```javascript
async function getValue() {
  return 42;
}

getValue().then((val) => console.log(val)); // 42
```

Even though `getValue` returns a plain number, JavaScript automatically wraps it in a resolved promise because the function is declared `async`.

---

## 4. How It Works

```
async function called
   ↓
Function body executes synchronously until the first `await` expression
   ↓
`await` pauses the function's execution (NOT the whole program) until the
awaited promise settles
   ↓
While paused, control returns to the calling code / event loop, allowing other
work to proceed
   ↓
Once the awaited promise settles:
   - if fulfilled: execution resumes with the resolved value
   - if rejected: an error is thrown at the await expression (catchable via try/catch)
   ↓
Function continues to the next line, repeating for further awaits, until it
returns — which resolves the async function's own returned promise
```

---

## 5. Syntax / Basic Example

```javascript
async function fetchUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    return { user, posts };
  } catch (err) {
    console.error("Failed to fetch data:", err.message);
    throw err; // re-throw if the caller needs to handle it too
  }
}

fetchUserData(1)
  .then((data) => console.log(data))
  .catch((err) => console.log("Caller caught:", err.message));
```

This reads top-to-bottom like synchronous code, but each `await` line is genuinely asynchronous underneath — the function yields control back to the event loop while waiting for each promise.

---

## 6. Internal Working

### `await` Only Pauses the Enclosing `async` Function

```javascript
console.log("1");

async function demo() {
  console.log("2");
  await Promise.resolve();
  console.log("4"); // runs after the microtask queue processes the await
}

demo();
console.log("3");

// Output: 1, 2, 3, 4
```

`await` does not block the entire JavaScript thread — `console.log("3")` runs before `console.log("4")` because the code after `await` is scheduled as a microtask continuation, letting the rest of the synchronous script (line `3`) finish first.

### Sequential vs Parallel `await` — A Critical Performance Distinction

```javascript
// Sequential — SLOWER, each await waits for the previous to finish before starting the next
async function sequential() {
  const a = await fetchA(); // waits ~1s
  const b = await fetchB(); // THEN waits another ~1s — total ~2s
  return [a, b];
}

// Parallel — FASTER, both requests start immediately
async function parallel() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]); // total ~1s
  return [a, b];
}
```

This is one of the most commonly tested `async`/`await` performance interview questions: awaiting promises one at a time in sequence when they're actually independent wastes time; starting them concurrently with `Promise.all` and awaiting together is far more efficient.

### Error Propagation with try/catch

Because `await` throws a catchable JavaScript error when the awaited promise rejects, ordinary `try`/`catch` blocks work naturally around `async` code — a major readability improvement over `.catch()` chains scattered across a promise pipeline.

---

## 7. Important Concepts

### `async`/`await` Is Built Entirely on Promises

`await` is essentially syntax that automatically attaches a `.then()` continuation to the awaited promise and pauses the generator-like execution of the `async` function until it resolves. There is no separate runtime mechanism — it's the exact same microtask-based promise machinery underneath, just with different syntax on top.

### Top-Level `await`

```javascript
// Inside an ES module (not inside a function)
const data = await fetch("/api/data").then((r) => r.json());
console.log(data);
```

Modern ES modules support `await` at the top level, without wrapping it in an `async` function — useful for module initialization that depends on async setup.

### `for...of` with `await` vs `forEach` with `await`

```javascript
// Works correctly — for...of respects await, running sequentially
for (const id of userIds) {
  const user = await fetchUser(id);
  console.log(user);
}

// Broken — forEach does NOT wait for the async callbacks; they all fire concurrently
// and forEach itself doesn't wait for any of them to finish
userIds.forEach(async (id) => {
  const user = await fetchUser(id);
  console.log(user);
});
```

`forEach` ignores the returned promise from its callback entirely — it doesn't pause between iterations, and the surrounding code doesn't wait for all the async operations to finish either. `for...of` (or `for` loops) properly respects `await` at each iteration.

---

## 8. Real-World Usage

- **Sequential API workflows**: fetching a user, then their permissions, then rendering a page based on both — expressed naturally with sequential `await`s when each step genuinely depends on the previous.
- **Concurrent data fetching**: combining `await Promise.all([...])` with `async`/`await` syntax for both readability and performance.
- **Error boundaries in API route handlers**: Node.js/Express handlers commonly wrap `async` logic in try/catch (or middleware that catches rejected promises) to return proper error responses.
- **Testing frameworks**: most modern test runners (Jest, Vitest) support `async` test functions natively, making asynchronous test assertions straightforward to write.

---

## 9. Best Practices

- Use `Promise.all` (or `allSettled`) with `await` when multiple async operations are independent, instead of awaiting them one at a time.
- Always wrap `await` calls in try/catch (or ensure calling code handles the rejected promise) to avoid unhandled rejections.
- Avoid using `async` callbacks inside `forEach` — use a `for...of` loop (for sequential processing) or `Promise.all(array.map(async ...))` (for parallel processing) instead.
- Don't mix `async`/`await` and raw `.then()` chaining unnecessarily in the same function — pick one style for consistency and readability.

---

## 10. Common Mistakes

### 1. Using `await` sequentially for independent operations

Awaiting unrelated promises one after another instead of running them concurrently with `Promise.all`, needlessly increasing total wait time.

### 2. Using `async` functions inside `.forEach()`

Assuming `forEach` will wait for each async callback to complete before moving to the next iteration or before the surrounding code continues — it does neither.

### 3. Forgetting to handle errors from `await`

Omitting try/catch around `await` calls, causing unhandled promise rejections when the awaited operation fails.

### 4. Assuming `await` blocks the entire program

Misunderstanding `await` as a thread-blocking operation, when it only pauses the current `async` function while yielding control back to the event loop for other work.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `async`/`await` | `.then()` chaining | Same underlying mechanism (Promises); async/await offers synchronous-style readability and native try/catch |
| Sequential `await` | `Promise.all` + `await` | Sequential runs operations one after another (slower); Promise.all runs them concurrently (faster) for independent tasks |
| `for...of` with await | `.forEach()` with async callback | for...of properly pauses per iteration; forEach ignores returned promises entirely |
| `await` | Thread blocking | await pauses only the current async function; the JS thread remains free to do other work via the event loop |

---

## 12. Interview Questions

### Beginner

#### Q1. What does an `async` function always return?

**Answer:**

A Promise — even if the function's `return` statement provides a plain value, JavaScript automatically wraps it in a resolved promise. If the function throws, the returned promise is rejected with that error.

#### Q2. What does `await` do?

**Answer:**

It pauses execution of the enclosing `async` function until the awaited promise settles, then resumes with either the resolved value or throws the rejection reason as a catchable error — without blocking the rest of the JavaScript thread.

---

### Intermediate

#### Q3. Why is awaiting two independent API calls sequentially generally worse than using `Promise.all`?

**Answer:**

Sequential awaiting starts the second request only after the first has fully completed, so the total time is roughly the sum of both durations. Using `Promise.all` starts both requests immediately and concurrently, so the total time is roughly the duration of the *slower* of the two — a significant performance improvement whenever the operations don't depend on each other's results.

#### Q4. Why doesn't `.forEach()` work well with `async` callbacks?

**Answer:**

`forEach` doesn't inspect or wait for the promise returned by its callback — it fires all iterations immediately (which may run concurrently and out of order) and returns `undefined` right away, without waiting for any of the async work to complete. A `for...of` loop or `Promise.all(array.map(...))` should be used instead, depending on whether sequential or parallel processing is desired.

---

### Advanced

#### Q5. Does `await` block the JavaScript thread while waiting?

**Answer:**

No. `await` pauses only the execution of its enclosing `async` function, effectively suspending it and scheduling its continuation as a microtask once the awaited promise settles. Control returns to the caller (and ultimately the event loop) immediately, allowing other synchronous code, timers, and other async operations to proceed while the await is pending — this is why `console.log` statements after an `await`-containing function call can execute before the code following the `await` itself.

---

### Follow-Up Questions

#### Q6. How would you process an array of items with async operations, ensuring correct order but maximum concurrency where safe?

**Answer:**

If the operations are fully independent, use `Promise.all(items.map(item => processAsync(item)))` for maximum concurrency, since `map` preserves result order regardless of which promise resolves first. If each item's processing genuinely depends on the result of the previous one, a `for...of` loop with `await` inside is required to guarantee strict sequential execution.

---

## 13. Scenario-Based Questions

### Scenario 1 — A Page Load Is Slower Than Expected Due to Sequential Fetching

A dashboard fetches user profile data, then notification counts, then account settings — each with a separate `await`, and each independent of the others — resulting in a noticeably slow page load.

**Approach:**

1. Identify that the three fetches don't actually depend on each other's results, despite being awaited sequentially.
2. Refactor to `const [profile, notifications, settings] = await Promise.all([fetchProfile(), fetchNotifications(), fetchSettings()]);` to run them concurrently.
3. Measure the improvement — total load time should now approximate the slowest single request instead of the sum of all three.

### Scenario 2 — Async Operations Inside a Loop Don't Behave as Expected

A function uses `array.forEach(async (item) => { await process(item); })` and expects all processing to complete before continuing, but subsequent code runs immediately with items still unprocessed.

**Approach:**

1. Recognize `forEach` doesn't await its async callbacks or wait for them to resolve.
2. Replace with a `for...of` loop (if sequential processing per item is required) or `await Promise.all(array.map(item => process(item)))` (if items can be processed independently and concurrently).

---

## 14. Practical Examples

### Example 1

Write an `async` function that fetches a user and their posts sequentially with proper try/catch error handling.

### Example 2

Refactor a sequential `await` chain fetching three independent resources into a `Promise.all`-based concurrent version, and compare execution timing.

### Example 3

Demonstrate the `forEach` + async pitfall by attempting to sum values fetched asynchronously inside a `forEach`, showing the bug, then fixing it with a `for...of` loop.

---

## 15. Quick Revision

- `async` functions always return a Promise; returned values are auto-wrapped, thrown errors become rejections.
- `await` pauses only the enclosing async function — it never blocks the whole JS thread.
- Use `Promise.all` with `await` for independent operations to run them concurrently instead of sequentially.
- `try`/`catch` works naturally around `await` for error handling, unlike `.then()`/`.catch()` chains.
- `forEach` does not respect `async`/`await` — use `for...of` or `Promise.all(array.map(...))` instead.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Makes async code read like synchronous code, with native try/catch |
| How? | Sugar over Promises — await pauses via microtask-based continuation |
| When? | Any async workflow, especially multi-step sequential logic |
| Alternative? | Raw `.then()` chaining — same underlying mechanism, less readable for complex flows |
| Production? | API route handlers, sequential/parallel data fetching, test functions |
| Interview? | Explain sequential vs Promise.all performance, and the forEach + async pitfall |
