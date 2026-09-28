# JavaScript — 07 Promises

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a Promise?

**Interview Answer:**

A Promise represents a value that may be available now, later, or never. It provides a standard way to handle asynchronous success and failure.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});
```

### Q2. What are the three states of a Promise?

A Promise can be:

- pending: still waiting
- fulfilled: operation succeeded
- rejected: operation failed

### Q3. What is the difference between `.then()`, `.catch()`, and `.finally()`?

`.then()` handles a successful result. `.catch()` handles errors. `.finally()` runs regardless of success or failure.

```js
fetch("/api/data")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log("Request complete"));
```

### Q4. Why are Promises better than nested callbacks?

Promises flatten asynchronous control flow and make the code easier to read, test, and maintain. They avoid deeply nested callback structures.

### Q5. What is Promise chaining?

Promise chaining allows sequential asynchronous steps to be written naturally.

```js
Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => x * 2)
  .then((x) => console.log(x));
```

### Q6. What is `Promise.all`?

`Promise.all` waits for all promises to resolve and resolves to an array of results. If any promise rejects, the whole operation rejects.

```js
Promise.all([fetch("/api/a"), fetch("/api/b")]);
```

### Q7. What is `Promise.allSettled`?

`Promise.allSettled` waits for all promises to settle and returns the result of each promise, even if some fail.

```js
Promise.allSettled([Promise.resolve(1), Promise.reject("error")]);
```

### Q8. What is `Promise.race`?

`Promise.race` resolves or rejects based on the first settled promise.

```js
Promise.race([fetch("/api/slow"), fetch("/api/fast")]);
```

### Q9. What is the difference between `Promise.all` and `Promise.race`?

`Promise.all` waits for all results, while `Promise.race` proceeds as soon as the first one settles. The former is good for parallel completion checks; the latter is useful for timeouts or "first response wins" logic.

### Q10. What is a rejected Promise?

A rejected Promise indicates a failed async operation. It is usually handled via `.catch()` or a surrounding `try/catch` when using `await`.

## Intermediate Topics

### Q11. What is `Promise.resolve` and `Promise.reject`?

These helpers create immediately fulfilled or rejected promises.

```js
const ok = Promise.resolve(42);
const bad = Promise.reject(new Error("Failure"));
```

### Q12. What is `await` used with a Promise?

`await` pauses execution until the Promise settles, then returns the resolved value or throws the rejection.

```js
async function run() {
  const result = await Promise.resolve(5);
  console.log(result);
}
```

### Q13. What is promise rejection handling in production?

Production code must catch errors to avoid silent failures, unhandled rejections, and inconsistent application state. Use logs, monitoring, and fallback behavior.

### Q14. Why is `finally` useful?

`finally` is useful for cleanup work such as stopping loaders, resetting flags, or closing resources, regardless of success or failure.

```js
async function save() {
  try {
    await api.save();
  } finally {
    console.log("Cleanup");
  }
}
```

### Q15. What is a Promise anti-pattern?

A common anti-pattern is creating a Promise that wraps an already asynchronous operation incorrectly, or swallowing errors instead of rethrowing them. It creates confusing control flow and poor debugging.

## Production and Debugging

### Q16. How do you avoid unhandled rejections?

Always attach a rejection handler, use `try/catch` with `await`, and avoid swallowing errors. In browser or server runtimes, unhandled rejections are often visible in logs and monitoring.

### Q17. What is a race condition in async code?

A race condition happens when multiple async operations finish in an order that produces incorrect results. Guarding state, using request IDs, or disabling duplicate actions helps prevent it.

### Q18. How do you sequence async tasks correctly?

Use `await` in a loop or chain promises intentionally, rather than firing multiple requests that may overlap in an uncontrolled order.

```js
async function fetchAll() {
  const a = await fetchA();
  const b = await fetchB();
  return [a, b];
}
```
