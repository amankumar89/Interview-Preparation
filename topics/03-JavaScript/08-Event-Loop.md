# JavaScript — 08 Event Loop

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the JavaScript event loop?

**Interview Answer:**

The event loop is the runtime mechanism that manages the call stack, task queue, and microtask queue. It allows JavaScript to perform non-blocking operations while remaining single-threaded.

### Q2. What is the call stack?

The call stack is where synchronous code executes one frame at a time. When a function is called, it is pushed onto the stack; when it returns, it is popped.

```js
function a() {
  console.log("a");
}

function b() {
  a();
  console.log("b");
}

b();
```

### Q3. What is a task queue?

A task queue stores tasks scheduled by APIs like `setTimeout`, I/O handlers, and event callbacks. The event loop moves tasks from the queue into the call stack when it is free.

### Q4. What is a microtask queue?

The microtask queue holds promises and queueMicrotask work. Microtasks are processed after the current script ends and before the browser renders or handles the next task.

```js
console.log("start");
Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("task"), 0);
console.log("end");
```

The order is typically: `start`, `end`, `microtask`, `task`.

### Q5. Why is JavaScript described as single-threaded?

JavaScript executes one operation at a time in the main thread. This makes code simpler to reason about, but it means long-running operations block the UI unless they are made asynchronous.

### Q6. How does `setTimeout` interact with the event loop?

`setTimeout` schedules a callback to run later. The timer does not execute immediately; it waits until the callback queue is processed and the time delay expires.

### Q7. What is the difference between macrotasks and microtasks?

Microtasks run after the current synchronous work completes but before rendering and before the next macrotask. Macrotasks represent larger tasks such as timers, events, and I/O callbacks.

### Q8. Why do promise callbacks run before timers?

Because promise reactions are queued as microtasks, which have higher priority than task queue callbacks like timers.

### Q9. What is blocking code, and why is it problematic?

Blocking code prevents the event loop from processing tasks and rendering UI updates. Heavy loops or synchronous network work can freeze the page.

### Q10. What is the browser's rendering phase in relation to the event loop?

The browser prioritizes painting changes after the call stack is empty and microtasks are complete. If rendering is delayed too long, the UI stutters or appears frozen.

## Intermediate Topics

### Q11. Why can `setTimeout(fn, 0)` still run later than expected?

Because the timer is only a minimum delay, not a guarantee. The browser may be busy with rendering, other tasks, or the current event loop cycle.

### Q12. How does the event loop handle user inputs?

User events, such as click or keyboard input, are queued as tasks. The browser dispatches them when the stack is clear, triggering listeners and updates.

### Q13. What is starvation in the context of the event loop?

Starvation occurs when a long-running task or too many microtasks prevent other queued tasks from running for a long time, causing perceived slowness.

### Q14. What is the relationship between the event loop and async APIs?

Async APIs such as `fetch`, timers, and file I/O delegate work to browser or Node runtime internals, which then schedule callbacks when the work completes.

### Q15. Why is understanding the event loop important for interview performance?

It explains why async code behaves the way it does and helps diagnose flickers, race conditions, ordering issues, and UI freezes.

## Production and Debugging

### Q16. How do you debug ordering bugs in async code?

Log timestamps, inspect the call stack, track microtask vs task order, and isolate whether the problem is caused by timers, promises, or event listeners.

### Q17. What common mistakes cause event loop issues?

Common mistakes include heavy synchronous work, infinite loops, unbounded microtasks, and scheduling many timers without cleanup.

### Q18. How do you keep the event loop responsive in production?

Break work into smaller tasks, defer expensive operations, avoid unnecessary synchronous processing, and use async patterns that yield control back to the browser or runtime.
