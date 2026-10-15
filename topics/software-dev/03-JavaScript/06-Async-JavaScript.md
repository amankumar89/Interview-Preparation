# JavaScript — 06 Async JavaScript

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is asynchronous JavaScript?

**Interview Answer:**

Asynchronous JavaScript allows code to continue running while waiting on I/O, timers, or network operations. It avoids blocking the main thread and ensures the UI remains responsive.

```js
console.log("Start");
setTimeout(() => console.log("After 1s"), 1000);
console.log("End");
```

### Q2. Why is asynchronous code needed in the browser?

Browsers are single-threaded for JavaScript execution, so long-running tasks would freeze the UI. Async code lets the browser handle rendering, user input, and network traffic without blocking the page.

### Q3. What is the difference between synchronous and asynchronous code?

Synchronous code runs line by line and blocks until completion. Asynchronous code schedules work to run later and continues executing the current flow.

```js
console.log("A");
console.log("B");
setTimeout(() => console.log("C"), 0);
console.log("D");
```

Output order is `A, B, D, C`.

### Q4. What is `setTimeout` used for?

`setTimeout` schedules a task after a given delay. It is useful for delayed actions like UI transitions, polling, and timeouts.

```js
setTimeout(() => {
  console.log("Delayed task");
}, 500);
```

### Q5. What is `setInterval`?

`setInterval` repeatedly executes a function at a fixed delay.

```js
const id = setInterval(() => console.log("tick"), 1000);
setTimeout(() => clearInterval(id), 5000);
```

Intervals must be cleared when they are no longer needed to avoid leaks.

### Q6. What is an event loop?

The event loop is the mechanism that continuously checks the call stack and task queue. It picks tasks from the queue and runs them in order when the stack is empty.

### Q7. What is the difference between a callback and a promise?

A callback is a function passed to another function for later execution. A promise represents a future value and provides a cleaner way to handle success, failure, and chaining.

### Q8. What is the purpose of `async` and `await`?

`async` wraps a function in a promise, and `await` pauses execution until a promise resolves.

```js
async function loadData() {
  const response = await fetch("/api/data");
  return response.json();
}
```

### Q9. What are microtasks?

Microtasks are queued tasks that run before the next macrotask. Promises resolve in microtasks, which is why they often run before timers or rendering updates.

### Q10. What are common async pitfalls?

Common pitfalls include forgetting to `await`, unhandled promise rejections, writing race conditions, and creating memory leaks with uncleaned timers or listeners.

## Intermediate Topics

### Q11. What is the callback hell problem?

Callback hell occurs when nested callbacks become deeply chained and hard to read or maintain.

```js
fetchData((data) => {
  processData(data, (processed) => {
    saveData(processed, (saved) => {
      console.log(saved);
    });
  });
});
```

Promises and `async/await` make this much clearer.

### Q12. Why should you avoid blocking the main thread?

Blocking the main thread makes the app feel frozen. It prevents rendering, input handling, and user interaction, which is particularly harmful in the browser.

### Q13. What is the difference between network latency and CPU blocking?

Network latency is waiting for a response from remote services. CPU blocking is work done locally that prevents the browser from doing other tasks. Both are important in async design, but they affect the app differently.

### Q14. How do you handle async exceptions?

Use `try/catch` around `await` expressions and `.catch()` for promise chains.

```js
async function run() {
  try {
    const result = await riskyCall();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

### Q15. What is polling?

Polling repeatedly checks for updated data at intervals. It is often used when server-sent events or WebSockets are not available.

## Production and Debugging

### Q16. How do you avoid stale closures in async code?

Capture the needed values explicitly or use a fresh state update instead of relying on old outer variables in asynchronous callbacks.

### Q17. What is the impact of asynchronous code on debugging?

Async flow can reorder operations, making logs confusing. Use tracing, request IDs, and explicit sequencing to understand runtime order.

### Q18. Why is concurrency modeling important in production systems?

Real apps handle multiple requests, streams, and events at once. Good async design avoids race conditions, dropped requests, duplicate actions, and inconsistent state.
