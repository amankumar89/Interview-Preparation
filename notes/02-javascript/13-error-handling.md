# Error Handling

> Interview Preparation Notes

---

## 1. Overview

Error handling in JavaScript centers on `try`/`catch`/`finally` for synchronous (and `async`/`await`) code, the `Error` object hierarchy for representing failures, and specific patterns for propagating and handling errors in asynchronous code (callbacks, promises). Robust error handling distinguishes production-quality code from code that merely works on the happy path.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Operations can fail — network requests time out, user input is invalid, files
don't exist, external services are unavailable
   ↓
Limitations without structured error handling
   ↓
Unhandled errors can crash an entire program (Node.js process) or leave a
browser application in a broken, inconsistent state with no useful feedback
   ↓
Solution
   ↓
try/catch, the Error object hierarchy, and consistent async error propagation
patterns let code detect, respond to, and recover from failures gracefully
   ↓
Benefits
   ↓
Resilient applications, meaningful error messages for debugging and users,
predictable failure recovery instead of silent or catastrophic failure
```

---

## 3. Core Concepts

```
Error Handling
├── try / catch / finally
├── The Error object and its subclasses
├── throw (custom errors)
├── Error handling in Promises (.catch)
├── Error handling in async/await (try/catch)
└── Global error handlers (window.onerror, unhandledrejection)
```

### Built-in Error Types

| Error Type | Typical Cause |
|---|---|
| `Error` | Generic base error type |
| `TypeError` | Operating on a value of the wrong type (e.g., calling a non-function) |
| `ReferenceError` | Referencing an undeclared variable, or a TDZ violation |
| `SyntaxError` | Invalid code structure (usually caught at parse time, not runtime) |
| `RangeError` | A value outside its allowed range (e.g., invalid array length) |

---

## 4. How It Works

```
try block executes
   ↓
If no error occurs: catch block is skipped; finally block still runs
   ↓
If an error is thrown (or a called function throws): execution immediately
jumps to the nearest catch block, skipping remaining code in try
   ↓
catch block receives the error object and handles it
   ↓
finally block runs regardless of whether an error occurred or was caught
   (used for cleanup: closing connections, releasing resources)
```

---

## 5. Syntax / Basic Example

```javascript
function parseConfig(json) {
  try {
    const config = JSON.parse(json);
    return config;
  } catch (err) {
    console.error("Invalid config JSON:", err.message);
    return null; // sensible fallback
  } finally {
    console.log("Parse attempt finished"); // always runs
  }
}
```

```javascript
// Custom error classes for more specific handling
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateAge(age) {
  if (age < 0) {
    throw new ValidationError("Age cannot be negative", "age");
  }
  return age;
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`Validation failed on field: ${err.field}`);
  } else {
    throw err; // re-throw unexpected errors instead of silently swallowing them
  }
}
```

---

## 6. Internal Working

### Custom Error Classes via `extends Error`

Extending the built-in `Error` class (via `class CustomError extends Error`) preserves important built-in behavior — like the `.stack` trace and `.message` property — while allowing additional custom properties (like `field` above) and enabling `instanceof` checks to distinguish error types in `catch` blocks.

### Error Propagation Across Async Boundaries

```
Synchronous throw inside try → caught by nearest surrounding catch, same call stack

Promise rejection → propagates through the .then() chain until a .catch() is
found; unhandled rejections trigger an "unhandledrejection" event/warning

await on a rejected promise → the rejection is converted into a thrown error
at the await expression, catchable via a normal surrounding try/catch
```

### Re-throwing vs Swallowing Errors

```javascript
try {
  doSomethingRisky();
} catch (err) {
  if (isRecoverable(err)) {
    handleGracefully(err);
  } else {
    throw err; // re-throw so it propagates up to a higher-level handler
  }
}
```

Catching an error and doing nothing meaningful with it ("swallowing" it) hides failures and makes debugging much harder — errors should either be handled meaningfully or re-thrown/propagated to a level that can handle them properly.

---

## 7. Important Concepts

### `finally` Runs Even on `return`

```javascript
function example() {
  try {
    return "try value";
  } finally {
    console.log("finally still runs before the function actually returns");
  }
}
```

`finally` executes even if the `try` (or `catch`) block contains a `return`, `throw`, `break`, or `continue` — it's guaranteed to run as long as the surrounding `try` block was entered at all. This makes it ideal for cleanup logic (closing files, releasing locks, hiding loading spinners) that must happen regardless of outcome.

### Global Error Handlers

```javascript
// Browser: catches errors that escape all try/catch blocks
window.addEventListener("error", (event) => {
  console.error("Uncaught error:", event.error);
});

// Browser/Node: catches promise rejections with no .catch()
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
});
```

These act as a last-resort safety net (e.g., for logging to an error-monitoring service) but should never be relied upon as the primary error-handling strategy — they indicate that something wasn't properly handled closer to its source.

### Error Handling in Promise Chains

```javascript
fetchData()
  .then((data) => processData(data))
  .catch((err) => {
    console.error("Something failed:", err.message);
  });
```

A single `.catch()` at the end of a chain catches errors from *any* preceding `.then()` step, or from the initial promise itself — this is one of the key benefits of Promise-based error handling over scattered error-first callbacks.

---

## 8. Real-World Usage

- **API error responses**: distinguishing between different error types (validation errors, network errors, server errors) to display appropriate user-facing messages.
- **Error monitoring/logging services** (Sentry, Rollbar, etc.) rely on global error handlers and structured `Error` objects (with stack traces) to report and aggregate production issues.
- **Retry logic**: catching specific transient error types (like network timeouts) to implement automatic retry mechanisms, while letting other error types propagate immediately.
- **Form validation**: custom error classes (like `ValidationError`) let UI code distinguish "this field is invalid" from "the server is unreachable" and respond differently to each.

---

## 9. Best Practices

- Create custom error classes extending `Error` for domain-specific failure types, enabling precise `instanceof` checks in catch blocks.
- Never silently swallow errors — always either handle them meaningfully or re-throw/propagate them.
- Use `finally` for cleanup logic that must run regardless of success or failure.
- Attach a `.catch()` to every promise chain (or wrap `await` calls in try/catch) — unhandled rejections are a common source of silent production bugs.
- Reserve global error handlers (`window.onerror`, `unhandledrejection`) as a monitoring safety net, not a primary error-handling strategy.

---

## 10. Common Mistakes

### 1. Swallowing errors without handling or re-throwing them

```javascript
try {
  riskyOperation();
} catch (err) {
  // empty catch block — the error vanishes silently, making debugging very difficult
}
```

### 2. Forgetting that `finally` runs even after a `return` in `try`

Being surprised that cleanup code in `finally` executes even when the function has already "returned" from within the `try` block.

### 3. Not distinguishing between error types in a `catch` block

Treating every caught error identically, instead of using `instanceof` checks to apply different handling logic for validation errors, network errors, etc.

### 4. Relying solely on global error handlers instead of local try/catch

Letting errors propagate all the way to a global handler for logging purposes, without ever attempting graceful recovery or meaningful user feedback closer to where the error actually occurred.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `try/catch` | `.catch()` (Promises) | try/catch handles synchronous throws and awaited rejections; .catch() specifically handles promise chain rejections |
| Custom Error class | Generic `Error` | Custom classes allow `instanceof` checks and additional context properties for domain-specific handling |
| Re-throwing | Swallowing | Re-throwing propagates an unhandled error upward for proper handling; swallowing silently discards it, hiding failures |
| Local error handling | Global error handlers | Local handling responds meaningfully at the point of failure; global handlers are a last-resort logging/monitoring safety net |

---

## 12. Interview Questions

### Beginner

#### Q1. What does the `finally` block do?

**Answer:**

Code in `finally` runs regardless of whether the `try` block succeeded, threw an error, or even executed a `return` statement — making it ideal for cleanup logic (closing resources, hiding loading indicators) that must happen no matter the outcome.

#### Q2. How do you create a custom error type in JavaScript?

**Answer:**

By extending the built-in `Error` class: `class ValidationError extends Error { constructor(message) { super(message); this.name = "ValidationError"; } }`. This preserves standard `Error` behavior (like `.message` and `.stack`) while allowing `instanceof` checks to distinguish custom error types in catch blocks.

---

### Intermediate

#### Q3. How does error handling differ between promise chains and `async`/`await`?

**Answer:**

In promise chains, errors are handled via `.catch()`, which catches a rejection from any preceding step in the chain. With `async`/`await`, a rejected awaited promise is converted into a thrown error at the `await` expression, which can be caught using a standard surrounding `try`/`catch` block — functionally equivalent, but syntactically more like traditional synchronous error handling.

#### Q4. Why is silently swallowing an error in a catch block considered bad practice?

**Answer:**

It hides the fact that something failed, making bugs extremely difficult to trace later — the program continues as if nothing went wrong, when in fact meaningful state or data may be missing or corrupted. Errors should be meaningfully handled (logged, recovered from, or shown to the user) or explicitly re-thrown for a higher-level handler to deal with.

---

### Advanced

#### Q5. How would you implement a retry mechanism that only retries on specific transient errors?

**Answer:**

```javascript
async function fetchWithRetry(url, retries = 3) {
  try {
    return await fetch(url);
  } catch (err) {
    if (retries > 0 && err instanceof NetworkError) {
      return fetchWithRetry(url, retries - 1);
    }
    throw err;
  }
}
```

This uses `instanceof` to check the error's specific type, only retrying for errors classified as transient/network-related, while immediately propagating other error types (like validation errors) that retrying wouldn't fix.

---

### Follow-Up Questions

#### Q6. What's the risk of relying only on `window.addEventListener("unhandledrejection", ...)` for error handling?

**Answer:**

It only catches errors that were never handled anywhere else in the code — by the time it fires, the application may already be in a broken or inconsistent state, and there's no good context-specific way to recover gracefully at that point. It's useful for logging/monitoring purposes, but shouldn't replace proper `.catch()`/`try`-`catch` handling closer to where operations can actually fail and be recovered from.

---

## 13. Scenario-Based Questions

### Scenario 1 — An API Call Fails Silently, Leaving the UI in a Broken State

A component fetches data but doesn't show any error message or loading fallback when the request fails — it just displays a blank screen.

**Approach:**

1. Check whether the fetch call has a `.catch()` (or a try/catch around an `await`) at all — it's likely missing or swallowing the error silently.
2. Add proper error handling that updates component state to show a user-facing error message.
3. Consider logging the error to a monitoring service for visibility into production failures.

### Scenario 2 — Different Error Types Need Different User-Facing Messages

An application needs to show "Please check your input" for validation errors but "Something went wrong, please try again" for server/network errors.

**Approach:**

1. Define custom error classes (e.g., `ValidationError`, `NetworkError`) extending `Error`, thrown at the appropriate points in the code.
2. In the catch block, use `instanceof` checks to branch handling logic and display the appropriate message per error type.
3. Ensure any unrecognized error type still gets a sensible generic fallback message rather than crashing or showing a confusing raw error.

---

## 14. Practical Examples

### Example 1

Implement a custom `ValidationError` class and a function that throws it for invalid input, with a catch block that distinguishes it from other error types.

### Example 2

Write a `fetchWithRetry` function that retries only on specific transient error types, giving up and re-throwing for others.

### Example 3

Demonstrate that `finally` runs even when the `try` block contains an early `return`, using a logging statement to verify execution order.

---

## 15. Quick Revision

- `try`/`catch`/`finally` handles synchronous (and awaited) errors; `finally` always runs, even after `return`.
- Custom error classes extend `Error`, enabling `instanceof` checks for type-specific handling.
- Promise chains use `.catch()`; `async`/`await` converts rejections into throwable errors catchable via `try`/`catch`.
- Never silently swallow errors — handle them meaningfully or re-throw for a higher-level handler.
- Global error handlers (`window.onerror`, `unhandledrejection`) are a monitoring safety net, not a primary strategy.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Prevents crashes and silent failures; enables graceful recovery |
| How? | try/catch for sync/await; .catch() for promise chains; custom Error subclasses for specificity |
| When? | Any operation that can fail: I/O, parsing, validation, network calls |
| Alternative? | Result/Either-style return values (common in other languages, less idiomatic in JS) |
| Production? | API error responses, retry logic, form validation, error monitoring integration |
| Interview? | Explain finally-after-return behavior and custom Error class patterns |
