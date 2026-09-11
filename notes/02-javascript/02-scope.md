# Scope

> Interview Preparation Notes

---

## 1. Overview

Scope determines where a variable is accessible in your code. JavaScript has function scope, block scope, and global scope, along with the scope chain that governs how variable lookups resolve when a name isn't found in the current scope. Understanding scope is the foundation for understanding closures, hoisting, and the `var`/`let`/`const` differences.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Programs need a way to control which parts of code can see and modify which variables
   ↓
Limitations of a single global namespace
   ↓
Without scope, every variable would be globally accessible, causing name collisions
and making it impossible to encapsulate logic safely
   ↓
Solution
   ↓
Scope creates boundaries — variables declared inside a function or block are only
visible within that region (and nested regions), not leaked to the outside
   ↓
Benefits
   ↓
Encapsulation, avoiding naming collisions, predictable variable lifetime, enabling closures
```

---

## 3. Core Concepts

```
Scope
├── Global Scope
├── Function Scope
├── Block Scope (let/const)
├── Lexical Scope (determined by where code is written, not called)
└── The Scope Chain
```

### Scope Types

| Scope Type | Created By | Applies To |
|---|---|---|
| Global | Top-level code | `var`, `let`, `const`, function declarations |
| Function | Any function body | `var` (function-scoped), all declarations |
| Block | `{ }` (if, for, while, standalone blocks) | `let`, `const` only — **not** `var` |

---

## 4. How It Works

```
Code is parsed
   ↓
Each function/block creates a new lexical environment
   ↓
Variable lookups start in the current scope
   ↓
If not found, JS searches outward through enclosing scopes (the scope chain)
   ↓
Search continues until the global scope; if still not found, a ReferenceError is thrown
```

Scope in JavaScript is **lexical** (also called static scope) — it's determined by where functions and blocks are physically written in the source code, not by how or where they are called at runtime.

---

## 5. Syntax / Basic Example

```javascript
let globalVar = "I am global";

function outer() {
  let outerVar = "I am in outer";

  function inner() {
    let innerVar = "I am in inner";
    console.log(globalVar); // accessible — scope chain reaches global
    console.log(outerVar);  // accessible — scope chain reaches outer
    console.log(innerVar);  // accessible — own scope
  }

  inner();
  console.log(innerVar); // ReferenceError — innerVar not accessible outside inner()
}

outer();
```

```javascript
if (true) {
  var functionScoped = "visible outside the block";
  let blockScoped = "only visible inside this block";
}
console.log(functionScoped); // "visible outside the block"
console.log(blockScoped);    // ReferenceError
```

---

## 6. Internal Working

### The Scope Chain

```
Variable lookup requested
   ↓
Check current lexical environment's variable bindings
   ↓
Not found? → follow the reference to the outer (enclosing) lexical environment
   ↓
Repeat until global scope is reached
   ↓
Still not found? → ReferenceError
```

Each function, when created, stores a reference to the lexical environment in which it was defined — this reference is what makes the scope chain work, and it's also the exact mechanism that enables closures (a function "remembers" its defining scope even after that scope has technically finished executing).

### `var` vs `let`/`const` Scoping Internals

`var` declarations are **function-scoped** — they ignore block boundaries (`if`, `for`, etc.) and attach to the nearest enclosing function (or global scope if there is none). `let`/`const` are **block-scoped** — they respect `{ }` boundaries at any level, which is generally far more predictable and matches scoping behavior in most other modern languages.

---

## 7. Important Concepts

### Lexical Scope vs Dynamic Scope

JavaScript uses **lexical scope**: a function's access to variables is determined by where it was *defined* in the source code, not by where it's *called from*. This is why closures work reliably — a function retains access to its defining scope regardless of when or where it's later invoked.

### Global Scope Pollution

Variables declared without `var`/`let`/`const` in non-strict mode become implicit global variables — a common source of bugs, since they're accessible (and overwritable) from anywhere in the program.

```javascript
function leaky() {
  accidentalGlobal = "oops"; // no declaration keyword — becomes global
}
```

### Block Scope and Loop Variables

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // logs 3, 3, 3 — var is function-scoped, shared across iterations
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // logs 0, 1, 2 — let creates a new binding per iteration
}
```

This is one of the most common closure-in-a-loop interview questions, and it's fundamentally a scope question: `let` creates a fresh block-scoped binding for each loop iteration, while `var`'s single function-scoped binding is shared and mutated across all iterations.

---

## 8. Real-World Usage

- **Module patterns**: encapsulating private variables/functions inside an IIFE or ES module so they don't leak into the global scope.
- **Event handler loops**: the classic `var` vs `let` loop bug appears constantly when attaching event listeners or timers inside loops.
- **Avoiding global namespace pollution**: modern bundlers and ES modules give each file its own module scope by default, preventing accidental global collisions across large codebases.

---

## 9. Best Practices

- Use `let`/`const` exclusively in new code — avoid `var` to sidestep function-scoping surprises.
- Keep variable declarations as close as possible to where they're used, in the narrowest scope that makes sense.
- Avoid creating accidental globals — always use strict mode (`"use strict"` or ES modules, which are strict by default) to catch undeclared assignments.
- Be intentional about closures capturing loop variables — prefer `let` in `for` loops specifically to avoid the shared-binding pitfall.

---

## 10. Common Mistakes

### 1. Assuming `var` is block-scoped like `let`

Leads to variables "leaking" outside `if`/`for` blocks unexpectedly, since `var` only respects function boundaries.

### 2. Using `var` in loops with async callbacks

Produces the classic bug where all callbacks see the same final value of the loop variable instead of the value at the time the callback was scheduled.

### 3. Creating accidental global variables

Forgetting a `let`/`const`/`var` keyword and unintentionally creating a global variable that can be overwritten from anywhere.

### 4. Confusing lexical scope with "the scope of the caller"

Assuming a function can access variables from wherever it's *called*, rather than where it was *defined* — this misunderstanding usually stems from confusing JavaScript's lexical scoping with dynamic scoping (which JavaScript does not use).

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `var` | `let`/`const` | `var` is function-scoped and ignores block boundaries; `let`/`const` are block-scoped |
| Lexical scope | Dynamic scope | Lexical: determined by where code is written; Dynamic: determined by where code is called (JS does not use this) |
| Global scope | Function/block scope | Global variables are accessible everywhere; function/block scope restricts access to that region and nested regions |
| Function scope | Block scope | Function scope spans the entire function body; block scope is limited to the nearest enclosing `{ }` |

---

## 12. Interview Questions

### Beginner

#### Q1. What is scope in JavaScript?

**Answer:**

Scope defines where in the code a variable is accessible. JavaScript has global scope (accessible everywhere), function scope (`var`), and block scope (`let`/`const`, limited to the nearest enclosing `{ }`).

#### Q2. What is the difference between function scope and block scope?

**Answer:**

Function scope means a variable is accessible anywhere within the function it's declared in, regardless of nested blocks (`if`, `for`, etc.) — this is how `var` behaves. Block scope restricts a variable to the nearest enclosing `{ }`, which is how `let` and `const` behave.

---

### Intermediate

#### Q3. What is the scope chain, and how does variable lookup work?

**Answer:**

When a variable is referenced, JavaScript first checks the current scope's bindings. If not found, it looks in the next outer (enclosing) scope, continuing outward until it either finds the variable or reaches the global scope without finding it, at which point a `ReferenceError` is thrown. This chain of enclosing scopes is called the scope chain.

#### Q4. Why does the classic `var` vs `let` loop example produce different output?

**Answer:**

With `var`, there's a single function-scoped binding for the loop variable shared across all iterations, so by the time asynchronous callbacks run, they all see the final value. With `let`, each iteration gets its own block-scoped binding, so each callback captures the value specific to its own iteration.

---

### Advanced

#### Q5. What does it mean that JavaScript uses lexical (static) scope?

**Answer:**

It means a function's variable access is determined by where the function is physically defined in the source code, not by the call stack or where it's invoked from. This is what allows closures to reliably retain access to their defining scope's variables no matter when or where the function is later called.

---

### Follow-Up Questions

#### Q6. How would you avoid the `var`-in-loop closure bug without switching to `let`?

**Answer:**

Wrap the loop body in an IIFE (Immediately Invoked Function Expression) that takes the loop variable as a parameter, creating a new function-scoped binding per iteration — this was the standard pre-ES6 workaround before `let` provided block scoping natively.

---

## 13. Scenario-Based Questions

### Scenario 1 — All Event Listeners Reference the Same Value

A loop attaches click listeners to multiple buttons, but clicking any of them logs the same (last) index value.

**Approach:**

1. Check whether the loop variable is declared with `var`.
2. Switch to `let`, which creates a fresh block-scoped binding per iteration, so each listener's closure captures its own value.
3. Verify behavior with each button now logging its own correct index.

### Scenario 2 — Unexpected Global Variable Causing a Bug in an Unrelated Module

A bug appears where a variable seems to have a value set by a completely unrelated part of the codebase.

**Approach:**

1. Search for an assignment missing a `let`/`const`/`var` declaration keyword, which would create an implicit global.
2. Enable strict mode (or migrate to ES modules) to make such assignments throw an error instead of silently creating globals.
3. Refactor the responsible code to properly scope its variables.

---

## 14. Practical Examples

### Example 1

Write a loop using `var` and one using `let`, both scheduling `setTimeout` callbacks, and compare the logged output.

### Example 2

Create a module-like pattern using an IIFE that exposes only specific functions while keeping internal variables private via scope.

### Example 3

Intentionally create an accidental global variable (by omitting a declaration keyword) and observe the resulting bug, then fix it.

---

## 15. Quick Revision

- Scope determines where a variable is accessible: global, function, or block.
- `var` is function-scoped and ignores block boundaries; `let`/`const` are block-scoped.
- JavaScript uses lexical (static) scope — determined by where code is written, not called.
- The scope chain resolves variable lookups by searching outward through enclosing scopes.
- The classic `var`-in-loop bug happens because `var` shares one binding across iterations; `let` creates a new one per iteration.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Prevents naming collisions and enables encapsulation |
| How? | Scope chain resolves lookups outward until global scope |
| When? | Every variable declaration in every function/block |
| Alternative? | No true alternative — scope is a core language mechanism |
| Production? | Module patterns, avoiding global pollution, loop-safe closures |
| Interview? | Explain the var-in-loop bug and lexical vs dynamic scope |
