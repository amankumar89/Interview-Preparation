# The Event Loop

> Interview Preparation Notes

---

## 1. Overview

JavaScript is single-threaded — it can only execute one piece of code at a time. The **event loop** is the mechanism that allows JavaScript to handle asynchronous operations (timers, network requests, I/O) without blocking that single thread, by coordinating the call stack, the Web APIs/Node APIs, and two distinct task queues: the macrotask queue and the microtask queue.

---

## 2. Why Do We Need It?

```
Problem
   ↓
JavaScript has only one call stack — running a long or blocking operation
would freeze the entire page/application
   ↓
Limitations of a purely synchronous single thread
   ↓
Without a way to defer work, any operation that takes time (network calls,
timers, file reads) would have to block everything else until it finished
   ↓
Solution
   ↓
Offload slow operations to the browser/Node runtime (Web APIs/libuv), and use
the event loop to bring their results back onto the call stack at the right
time, without blocking synchronous execution
   ↓
Benefits
   ↓
Non-blocking I/O, responsive UIs, the ability to run thousands of concurrent
async operations on a single thread
```

---

## 3. Core Concepts

```
Event Loop System
├── Call Stack (synchronous execution)
├── Web APIs / Node APIs (timers, fetch, fs, etc. — run outside the JS thread)
├── Macrotask Queue (aka Task Queue: setTimeout, setInterval, I/O, UI rendering)
├── Microtask Queue (Promise callbacks, queueMicrotask, MutationObserver)
└── The Event Loop (continuously checks stack/queues and moves tasks over)
```

### Queue Priority

| Queue | Examples | Priority |
|---|---|---|
| Call Stack | Currently executing synchronous code | Always runs first, to completion |
| Microtask Queue | `.then()`/`.catch()`/`.finally()`, `async`/`await` continuations, `queueMicrotask()` | Fully drained after each stack-empty check, before any macrotask |
| Macrotask Queue | `setTimeout`, `setInterval`, I/O callbacks, UI events | Processed one at a time, with a full microtask drain between each |

---

## 4. How It Works

```
1. Call stack executes all synchronous code until empty
   ↓
2. Event loop checks: is the microtask queue non-empty?
   ↓ yes
3. Run ALL microtasks in the queue, one at a time, until it's completely empty
   (if a microtask enqueues another microtask, that new one runs too, in the
    same drain cycle, before moving on)
   ↓
4. Event loop checks: is there a task in the macrotask queue?
   ↓ yes
5. Move ONE macrotask to the call stack and execute it fully
   ↓
6. Repeat from step 2 (drain microtasks again before the next macrotask)
```

This "fully drain microtasks between every single macrotask" rule is the single most important, most frequently tested fact about the event loop.

---

## 5. Syntax / Basic Example

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 3, 2
```

```
Execution trace:
   "1" logged synchronously
   setTimeout callback registered in the Web API, scheduled for the macrotask queue
   Promise .then() callback registered in the microtask queue
   "4" logged synchronously
   ↓ call stack now empty
   microtask queue drained → "3" logged
   ↓ microtask queue now empty
   next macrotask taken → "2" logged
```

Even with a `0ms` delay, the `setTimeout` callback always runs *after* the promise's `.then()` callback, because microtasks are always fully drained before the next macrotask is processed.

---

## 6. Internal Working

### Why `setTimeout(fn, 0)` Doesn't Run Immediately

`setTimeout` always defers its callback to the macrotask queue, even with a `0ms` delay — it never runs synchronously, and it always waits at minimum for the current call stack to empty and the microtask queue to fully drain first. In practice, browsers also enforce a minimum delay (often ~4ms for nested timeouts), adding further delay beyond the "ideal" 0ms.

### Nested Microtasks Run Before Any Macrotask

```javascript
Promise.resolve()
  .then(() => {
    console.log("microtask 1");
    return Promise.resolve();
  })
  .then(() => console.log("microtask 2"));

setTimeout(() => console.log("macrotask"), 0);

// Output: microtask 1, microtask 2, macrotask
```

Even though "microtask 2" is scheduled *during* the processing of "microtask 1" (rather than upfront), it still runs before the macrotask, because the event loop keeps draining the microtask queue until it's completely empty — new microtasks added during the drain are included in the same drain cycle.

### Rendering and the Event Loop (Browser-Specific)

In browsers, the rendering step (repainting the screen) typically happens after the microtask queue is drained but before the next macrotask — this is why long or numerous microtask chains can still delay visual updates, since the browser doesn't get a chance to paint until they're finished.

---

## 7. Important Concepts

### Blocking the Event Loop

```javascript
function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {} // busy-wait — blocks the thread
}

console.log("start");
blockFor(3000); // freezes everything for 3 seconds — no rendering, no other callbacks
console.log("end");
```

Because JavaScript is single-threaded, any long-running synchronous code (like a busy loop, or expensive synchronous computation) blocks the entire event loop — no timers, promises, or UI updates can process until it finishes. This is why CPU-intensive work is often offloaded to Web Workers.

### Starvation Risk with Microtasks

If a microtask keeps scheduling more microtasks indefinitely (e.g., a `.then()` chain that never terminates), the macrotask queue can be starved indefinitely, since the event loop won't move to the next macrotask until the microtask queue is fully empty.

---

## 8. Real-World Usage

- **Debouncing UI updates**: understanding that microtasks run before rendering explains why some UI update patterns need to explicitly defer to the next macrotask (e.g., using `setTimeout(fn, 0)`) to allow a repaint first.
- **Predicting execution order in tests/debugging**: knowing microtask-before-macrotask ordering is essential when debugging why a promise resolves "before" a timer that was scheduled earlier.
- **Avoiding UI freezes**: recognizing that expensive synchronous loops block the event loop is the basis for using `requestIdleCallback`, chunking work across multiple ticks, or Web Workers for CPU-heavy tasks.

---

## 9. Best Practices

- Never run long synchronous loops on the main thread in a UI application — break work into chunks or move it to a Web Worker.
- Be aware that promise chains resolve before any pending timers, which matters when coordinating precise execution order across async operations.
- Use `queueMicrotask()` deliberately (rare, advanced) when you need something to run before the next macrotask but don't want the overhead of creating a promise.
- When debugging unexpected execution order, trace through which queue (micro vs macro) each async operation belongs to.

---

## 10. Common Mistakes

### 1. Assuming `setTimeout(fn, 0)` runs immediately

Expecting a zero-delay timeout to execute synchronously or before promise callbacks — it always goes through the macrotask queue, after all pending microtasks are drained.

### 2. Assuming microtasks and macrotasks are processed in the same interleaved order they were scheduled

Not accounting for the rule that ALL microtasks are drained before even one macrotask runs, regardless of the order in which they were originally scheduled relative to each other.

### 3. Writing blocking synchronous code in event-driven applications

Running expensive computations directly on the main thread, freezing the UI and delaying all other queued callbacks until the blocking code finishes.

### 4. Not recognizing infinite microtask chains as a starvation risk

Creating a recursive or unbounded chain of `.then()` calls that keeps scheduling new microtasks, which can indefinitely delay macrotasks like rendering or timers from ever running.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| Microtask queue | Macrotask queue | Microtasks (promises) are FULLY drained before each single macrotask (timers, I/O) runs |
| `setTimeout(fn, 0)` | `Promise.resolve().then(fn)` | The promise callback always runs first — it's a microtask, `setTimeout` is a macrotask |
| Call stack | Task queues | Call stack executes synchronous code immediately; queues hold callbacks waiting for the stack to empty |
| Blocking code | Async code | Blocking code monopolizes the single thread; async code yields control back to the event loop while waiting |

---

## 12. Interview Questions

### Beginner

#### Q1. Why does JavaScript need an event loop?

**Answer:**

Because JavaScript is single-threaded — it can only run one piece of code at a time. The event loop lets it handle asynchronous operations like timers and network requests without blocking that single thread, by offloading them to the browser/Node runtime and bringing their results back onto the call stack at the appropriate time.

#### Q2. What is the difference between the call stack and the task queues?

**Answer:**

The call stack is where synchronous JavaScript code is actively executing, one frame at a time. The task queues (microtask and macrotask) hold callbacks from completed async operations, waiting for the call stack to become empty before the event loop moves them onto it for execution.

---

### Intermediate

#### Q3. Why does a `Promise.resolve().then()` callback run before a `setTimeout(fn, 0)` callback?

**Answer:**

Promise callbacks are queued as microtasks, while `setTimeout` callbacks are queued as macrotasks. The event loop always fully drains the entire microtask queue after the call stack empties, before it processes even a single macrotask — so the promise's `.then()` callback always executes before the timer callback, regardless of the nominal delay.

#### Q4. What happens if a microtask schedules another microtask during the drain?

**Answer:**

The event loop keeps processing the microtask queue until it's completely empty, including any new microtasks added while draining — so nested/chained microtasks all run before the event loop proceeds to the next macrotask.

---

### Advanced

#### Q5. What can go wrong if you have a recursive chain of `.then()` calls that never terminates?

**Answer:**

Since the event loop must fully drain the microtask queue before processing the next macrotask, an endlessly self-scheduling microtask chain can starve the macrotask queue indefinitely — timers, I/O callbacks, and even browser rendering can be delayed or effectively frozen out, since they never get a turn while microtasks keep being added.

---

### Follow-Up Questions

#### Q6. How would you avoid freezing the UI when processing a very large array synchronously?

**Answer:**

Break the work into smaller chunks and yield control back to the event loop between chunks — for example, processing a batch of items, then scheduling the next batch via `setTimeout(fn, 0)` or `requestIdleCallback`, allowing the browser to handle rendering and other pending callbacks between batches instead of monopolizing the thread with one long synchronous loop.

---

## 13. Scenario-Based Questions

### Scenario 1 — Unexpected Execution Order in a Debugging Session

A developer expects a `setTimeout` callback (scheduled first) to log before a `Promise.then()` callback (scheduled slightly later), but observes the opposite.

**Approach:**

1. Explain that scheduling order doesn't determine execution order between the two queues — queue *type* does.
2. Clarify that microtasks (promises) are always fully drained before any macrotask (timers) is processed, regardless of which was scheduled first.
3. Use this understanding to correctly predict output in similar mixed async scenarios.

### Scenario 2 — A Page Becomes Unresponsive During a Large Data Processing Task

Processing a large array of records synchronously on the main thread causes the entire UI to freeze until it completes.

**Approach:**

1. Identify that the long synchronous loop is blocking the call stack, preventing the event loop from processing any other queued work (rendering, user input, timers) until it finishes.
2. Refactor to process the array in smaller chunks, yielding control back to the event loop between chunks (e.g., via `setTimeout` or `requestIdleCallback`), or offload the work entirely to a Web Worker if it doesn't need direct DOM access.

---

## 14. Practical Examples

### Example 1

Write a code snippet mixing `console.log`, `setTimeout`, and `Promise.then()` calls, and predict the exact output order before running it.

### Example 2

Demonstrate microtask starvation by writing a recursive `.then()` chain and observing how it delays a `setTimeout` callback from ever firing (in a controlled, bounded example).

### Example 3

Refactor a large synchronous array-processing loop into chunks using `setTimeout` to keep the UI responsive during processing.

---

## 15. Quick Revision

- JavaScript is single-threaded; the event loop enables non-blocking async behavior around that single thread.
- Call stack runs first; then the ENTIRE microtask queue drains; then one macrotask runs; repeat.
- Promise callbacks = microtasks; `setTimeout`/`setInterval`/I/O callbacks = macrotasks.
- `setTimeout(fn, 0)` never runs before pending microtasks, regardless of its "zero" delay.
- Long synchronous code blocks the entire event loop — no timers, promises, or rendering can proceed until it finishes.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Enables non-blocking async behavior on a single JS thread |
| How? | Call stack → drain all microtasks → one macrotask → repeat |
| When? | Every async operation: promises, timers, I/O, events |
| Alternative? | Multi-threading (not natively available in JS; Web Workers are the closest equivalent) |
| Production? | UI responsiveness, debugging async execution order, avoiding thread-blocking code |
| Interview? | Explain why Promise.then() always beats setTimeout(fn, 0) |
