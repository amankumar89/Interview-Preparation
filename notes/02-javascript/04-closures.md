# Closures

> Interview Preparation Notes

---

## 1. Overview

A closure is a function that retains access to variables from its enclosing (lexical) scope, even after that outer scope has finished executing. Closures are one of the most heavily tested JavaScript interview topics because they underlie data privacy patterns, currying, memoization, and much of how React hooks work internally.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Functions sometimes need to "remember" state from where they were created,
even when called much later or from a completely different context
   ↓
Limitations without closures
   ↓
Without persistent access to outer variables, you'd need global variables or
some other external mechanism to share state across function calls — losing
encapsulation
   ↓
Solution
   ↓
Closures let a function carry its defining scope with it wherever it goes,
giving controlled, private access to that scope's variables
   ↓
Benefits
   ↓
Data privacy/encapsulation, function factories, memoization, callback state
retention (event handlers, timers, async operations)
```

---

## 3. Core Concepts

```
Closures
├── Lexical Scope (the foundation closures build on)
├── Function Factories
├── Data Privacy / Encapsulation
├── Memoization
└── Closures in Loops (the var/let interview classic)
```

### Minimal Closure Example

```javascript
function makeCounter() {
  let count = 0; // "private" variable

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

`count` isn't accessible from outside `makeCounter` at all — the returned inner function is the *only* way to interact with it, and it retains access to `count` even though `makeCounter()` has already finished running.

---

## 4. How It Works

```
Outer function executes, creating its own lexical environment (with local variables)
   ↓
Inner function is defined within that lexical environment
   ↓
Inner function is returned (or otherwise persists beyond the outer function's execution)
   ↓
Normally, the outer function's local variables would be garbage collected once it returns
   ↓
But because the inner function retains a reference to the outer scope, that scope
is kept alive in memory as long as the inner function exists
```

This is the essential mechanism: a closure isn't really "the outer function's variables snapshot" — it's a live reference to the entire lexical environment, which is why mutations to closed-over variables are visible across all calls of the returned function.

---

## 5. Syntax / Basic Example

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
```

`balance` cannot be accessed or modified directly from outside — only through the exposed methods, which all share the same closed-over `balance` variable. This is a common real-world pattern for enforcing data privacy before native private class fields existed.

---

## 6. Internal Working

```
JS engine creates a lexical environment for makeCounter() when called
   ↓
The returned inner function stores a reference to that lexical environment
   (not a copy of the values — a live reference)
   ↓
Even after makeCounter() finishes executing and its call frame is popped off
the call stack, the lexical environment is NOT garbage collected, because the
returned function still references it
   ↓
Each subsequent call to the returned function reads/writes the SAME closed-over
variables, since they all share the same lexical environment reference
```

### Memory Implications

Because closures keep their outer lexical environment alive, closures can inadvertently cause **memory leaks** if they hold onto large objects or DOM references long after they're needed (e.g., an event listener closure referencing a large object that never gets cleaned up).

---

## 7. Important Concepts

### Each Function Call Creates a New Closure

```javascript
const counterA = makeCounter();
const counterB = makeCounter();

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterB()); // 1 — independent closure, separate `count`
```

Every invocation of `makeCounter()` creates a brand-new lexical environment, so `counterA` and `counterB` do not share state.

### The Classic `var` in a Loop Closure Bug

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 3, 3, 3
```

All three closures share the *same* `i` binding because `var` is function-scoped, not block-scoped. By the time the `setTimeout` callbacks run, the loop has finished and `i` is `3`.

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Logs: 0, 1, 2
```

`let` creates a new block-scoped binding for `i` on each iteration, so each closure captures its own independent value.

### Closures Enable Memoization

```javascript
function memoize(fn) {
  const cache = new Map(); // closed-over cache, private to this memoized function
  return function (arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
```

---

## 8. Real-World Usage

- **Data privacy**: encapsulating "private" state before native private class fields (`#field`) existed, and still common in functional-style code.
- **React hooks**: `useState`, `useEffect`, and custom hooks rely heavily on closures to "remember" values across re-renders.
- **Event handlers**: a click handler closure often needs access to variables from the component/function that set it up.
- **Debounce/throttle utilities**: these commonly close over a timer ID or "last called" timestamp to coordinate behavior across multiple calls.
- **Currying and partial application**: functions that return specialized versions of themselves rely entirely on closures to remember pre-supplied arguments.

---

## 9. Best Practices

- Use closures deliberately for encapsulation, not accidentally — be aware when a function captures outer variables.
- Be cautious with closures inside loops; default to `let` to get per-iteration bindings automatically.
- Watch for closures unintentionally keeping large objects or DOM nodes alive longer than needed, especially in long-lived event listeners.
- Prefer returning small, focused closures (like the bank account example) over exposing broad mutable state.

---

## 10. Common Mistakes

### 1. Expecting `var` in a loop to behave like `let`

Leads to the classic "all callbacks log the same final value" bug, since `var` shares one binding across all iterations.

### 2. Assuming a closure captures a snapshot of a variable's value

Closures capture a *live reference* to the variable, not a frozen value at the time of creation — if the outer variable changes later, the closure sees the updated value (unless a new scope/binding was created for each capture, as `let` does in loops).

### 3. Creating memory leaks with long-lived closures

Attaching event listeners or timers that close over large objects and never get cleaned up, preventing garbage collection.

### 4. Overusing closures where a simple object or class would be clearer

Deeply nested closures for stateful logic can become harder to read than an equivalent class or object with explicit fields, especially for those unfamiliar with the pattern.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| Closure | Regular function | A closure specifically retains access to its defining scope's variables after that scope has finished executing |
| `var` closures in a loop | `let` closures in a loop | `var` shares one binding across all iterations; `let` creates a new binding per iteration |
| Captured value | Captured reference | Closures capture a live reference to the variable, not a snapshot of its value at creation time |
| Closures | Private class fields (`#field`) | Closures achieve privacy via scope; private fields achieve it via a dedicated class syntax feature |

---

## 12. Interview Questions

### Beginner

#### Q1. What is a closure?

**Answer:**

A closure is a function that retains access to variables from its enclosing lexical scope, even after that outer function has finished executing — allowing the inner function to "remember" and interact with that outer state.

#### Q2. Give a simple real-world use case for closures.

**Answer:**

Creating a private counter or bank account object where internal state (like a balance) can only be read or modified through specific exposed methods, never accessed directly from outside — closures provide this encapsulation without needing classes.

---

### Intermediate

#### Q3. Why does the classic `var` loop example log the same value for every callback?

**Answer:**

Because `var` is function-scoped, all iterations of the loop share a single `i` binding. Each `setTimeout` callback closes over that same shared variable, so by the time the callbacks actually run (after the loop has completed), they all see `i`'s final value.

#### Q4. Does a closure capture a variable's value or a reference to the variable?

**Answer:**

A live reference, not a snapshot. If the outer variable changes after the closure is created but before it's invoked, the closure will observe the updated value — this is precisely why `var` in a loop produces the same final value across all closures, while `let` (creating a fresh binding per iteration) avoids the issue.

---

### Advanced

#### Q5. How can closures cause memory leaks, and how would you prevent that?

**Answer:**

A closure keeps its entire referenced lexical environment alive in memory for as long as the closure itself exists, even if only one small piece of that environment is actually used. If a closure is attached to a long-lived object (like a global event listener) and references large objects or DOM nodes, those objects can't be garbage collected even after they're no longer needed. Prevention involves removing event listeners when no longer needed, nulling out references, and being deliberate about what a closure actually needs to capture.

---

### Follow-Up Questions

#### Q6. How would you implement a `once(fn)` utility that ensures a function can only run one time, using closures?

**Answer:**

```javascript
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
```

The returned function closes over `called` and `result`, which persist across every invocation, allowing it to enforce "only run once" semantics using purely closure state, with no external variables needed.

---

## 13. Scenario-Based Questions

### Scenario 1 — Event Listeners Referencing Stale Data

Multiple buttons are created in a loop, each meant to log its own index when clicked, but all of them log the same final index.

**Approach:**

1. Identify that the loop variable is declared with `var`, creating a single shared binding across all listener closures.
2. Switch to `let` so each iteration gets its own block-scoped binding, giving each closure the correct captured index.

### Scenario 2 — Suspected Memory Leak in a Long-Running Single-Page App

Memory usage steadily grows as users navigate between views in an SPA, eventually degrading performance.

**Approach:**

1. Audit event listeners and timers set up in components/views for whether they're properly removed on cleanup (unmount/navigation away).
2. Check whether any long-lived closures (e.g., attached to `window` or global event buses) are capturing references to large objects or DOM nodes that should have been released.
3. Use browser memory profiling tools to take heap snapshots before/after navigation and identify retained closures.

---

## 14. Practical Examples

### Example 1

Implement a `makeCounter()` function using closures, and verify two separate counters maintain independent state.

### Example 2

Fix the classic `var` in a loop bug two different ways: switching to `let`, and using an IIFE.

### Example 3

Implement a `memoize(fn)` utility using a closed-over cache, and demonstrate it avoiding redundant computation for repeated arguments.

---

## 15. Quick Revision

- A closure is a function plus its retained access to the lexical scope it was defined in.
- Closures capture live references to variables, not frozen snapshots.
- `var` in loops shares one binding across iterations; `let` creates a new one per iteration — the classic closure bug.
- Closures enable data privacy, memoization, and stateful callbacks/hooks.
- Long-lived closures can cause memory leaks if they retain references to large objects unnecessarily.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Lets functions retain private state across calls without globals |
| How? | Inner function keeps a live reference to its defining lexical environment |
| When? | Encapsulation, memoization, event handlers, function factories, React hooks |
| Alternative? | Classes with private fields (`#field`) for similar encapsulation goals |
| Production? | Debounce/throttle utilities, private state, React hook internals |
| Interview? | Explain the var-vs-let loop bug and how closures can leak memory |
