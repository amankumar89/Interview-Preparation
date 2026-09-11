# Hoisting

> Interview Preparation Notes

---

## 1. Overview

Hoisting is JavaScript's behavior of processing variable and function declarations during the compile phase, before code execution begins, so they appear to be "moved to the top" of their scope. Understanding hoisting explains why some code that references a variable before its declaration line works, while other similar-looking code throws an error — the distinction depends on `var` vs `let`/`const` vs function declarations vs function expressions.

---

## 2. Why Do We Need It?

```
Problem
   ↓
JS engines need to know about all variable and function names in a scope before
executing any code line by line
   ↓
Limitations of a naive top-to-bottom-only model
   ↓
Without a pre-processing step, mutually recursive functions or functions used
before their definition later in the file would be impossible to call
   ↓
Solution
   ↓
The engine performs a compilation pass that registers declarations in memory
before execution begins — this is hoisting
   ↓
Benefits
   ↓
Function declarations can be called before they appear in the source; enables
certain flexible code organization patterns
```

---

## 3. Core Concepts

```
Hoisting
├── var hoisting (hoisted and initialized to undefined)
├── let/const hoisting (hoisted but NOT initialized — the "Temporal Dead Zone")
├── Function Declaration hoisting (fully hoisted, including the function body)
└── Function Expression hoisting (only the variable is hoisted, not the function)
```

### Hoisting Behavior Table

| Declaration Type | Hoisted? | Initialized During Hoisting? |
|---|---|---|
| `var x` | Yes | Yes — to `undefined` |
| `let x` / `const x` | Yes (but in TDZ) | No — accessing throws `ReferenceError` |
| `function foo() {}` | Yes | Yes — fully, including the body |
| `const foo = function() {}` | Only the `const foo` binding | No — accessing before the line throws |
| `const foo = () => {}` | Only the `const foo` binding | No — accessing before the line throws |

---

## 4. How It Works

```
JS engine compiles the current scope before execution
   ↓
Step 1 (Creation Phase): scan for var, let, const, and function declarations
   ↓
   var → allocated and initialized to undefined
   let/const → allocated but left uninitialized (Temporal Dead Zone)
   function declarations → allocated and fully initialized with their body
   ↓
Step 2 (Execution Phase): code runs top to bottom, assigning actual values as
reached
```

---

## 5. Syntax / Basic Example

```javascript
console.log(a); // undefined (not an error — var is hoisted and initialized)
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

sayHi(); // "Hi!" — works, function declarations are fully hoisted
function sayHi() {
  console.log("Hi!");
}

greet(); // TypeError: greet is not a function
var greet = function () {
  console.log("Hello");
};
```

The last example is subtle: `var greet` is hoisted (initialized to `undefined`), but the function assignment happens at the original line — so calling it earlier tries to invoke `undefined` as a function, producing a `TypeError`, not a `ReferenceError`.

---

## 6. Internal Working

### The Temporal Dead Zone (TDZ)

```
Scope begins
   ↓
let/const bindings are created in memory but marked as "uninitialized"
   ↓
Any access attempt before the actual declaration line throws a ReferenceError
   ↓
Once execution reaches the declaration line, the binding is initialized and
becomes accessible normally
```

The TDZ exists between the start of a scope and the point where a `let`/`const` declaration is actually executed. It's a deliberate language design choice to catch bugs that `var`'s silent `undefined` hoisting would otherwise hide.

### Why Function Declarations Are Fully Hoisted

The engine's creation-phase scan specifically recognizes `function foo() {}` syntax and stores the entire function definition in memory immediately — unlike `var`, which only reserves the name and sets it to `undefined`. This is why function declarations (but not function expressions) can be safely called before their line in the source.

---

## 7. Important Concepts

### `var` Hoisting Masks Bugs; `let`/`const` Surfaces Them

```javascript
function example() {
  console.log(x); // undefined — silent, potentially confusing
  var x = 1;
}

function example2() {
  console.log(y); // ReferenceError — loud, immediately visible
  let y = 1;
}
```

This is a key reason `let`/`const` are preferred: the TDZ turns a silent, hard-to-trace bug (`undefined` where a value was expected) into an immediate, loud error.

### Function Declarations vs Function Expressions vs Arrow Functions

Only `function foo() {}` syntax gets the "full hoist" treatment. Assigning a function to a variable — `const foo = function() {}` or `const foo = () => {}` — only hoists the variable binding (subject to `let`/`const` TDZ rules or `var`'s `undefined` initialization), not the function body itself.

### `class` Declarations Are Also in the TDZ

```javascript
new Car(); // ReferenceError
class Car {}
```

Even though classes are somewhat like function declarations conceptually, they behave like `let`/`const` regarding hoisting — accessing them before their declaration line throws.

---

## 8. Real-World Usage

- **Code organization**: function declarations are often placed after their usage (e.g., helper functions defined at the bottom of a file) relying on hoisting, a stylistic choice some teams embrace and others avoid for readability.
- **Linting rules**: ESLint's `no-use-before-define` rule exists specifically to catch hoisting-related confusion before it causes bugs.
- **Debugging `undefined` vs `ReferenceError`**: recognizing which error type appears helps immediately narrow down whether a `var` or `let`/`const`/TDZ issue is at play.

---

## 9. Best Practices

- Declare variables at the top of their scope regardless of hoisting behavior, to avoid relying on hoisting mentally when reading code.
- Prefer `let`/`const` over `var` specifically because the TDZ catches "used before declared" bugs loudly instead of silently.
- Avoid relying on function-declaration hoisting for critical program flow — while legal, calling a function before its definition can hurt readability.
- Use linting rules to catch use-before-definition patterns automatically.

---

## 10. Common Mistakes

### 1. Assuming all declarations behave like `var`

Expecting `let`/`const` to also silently return `undefined` when accessed early, rather than throwing due to the TDZ.

### 2. Confusing function declarations with function expressions regarding hoisting

Assuming a `const foo = function() {}` can be called before its line, the same way a `function foo() {}` declaration can.

### 3. Misreading a `TypeError` as a hoisting bug and vice versa

Not distinguishing "accessing before initialization" (`ReferenceError`, TDZ) from "calling something that isn't a function yet" (`TypeError`, `var` hoisted to `undefined`).

### 4. Writing code that relies heavily on hoisting for control flow

Making code harder to read by depending on the engine's hoisting behavior instead of declaring things in a natural top-to-bottom order.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `var` hoisting | `let`/`const` hoisting | `var` initializes to `undefined`; `let`/`const` remain uninitialized in the TDZ until their line executes |
| Function declaration | Function expression | Declaration is fully hoisted with its body; expression only hoists the variable binding (per `var`/`let`/`const` rules) |
| `ReferenceError` (TDZ) | `TypeError` (calling `undefined`) | TDZ access throws ReferenceError; calling a `var`-hoisted `undefined` as a function throws TypeError |
| Hoisting | Execution order | Hoisting happens during compilation (creation phase); execution still proceeds top to bottom afterward |

---

## 12. Interview Questions

### Beginner

#### Q1. What is hoisting?

**Answer:**

Hoisting is JavaScript's behavior of registering variable and function declarations in memory during a compile phase before code executes, making them appear as if moved to the top of their scope — though the actual behavior differs significantly between `var`, `let`/`const`, and function declarations.

#### Q2. What happens if you access a `var` variable before its declaration line?

**Answer:**

You get `undefined`, not an error — `var` declarations are hoisted and automatically initialized to `undefined` during the creation phase, with the actual value assigned only when execution reaches that line.

---

### Intermediate

#### Q3. What is the Temporal Dead Zone?

**Answer:**

The TDZ is the period between the start of a scope and the point where a `let`/`const` (or `class`) declaration is actually executed. During this period, the binding exists in memory but is uninitialized — accessing it throws a `ReferenceError`, unlike `var`'s silent `undefined`.

#### Q4. Why can you call a function declaration before it appears in the source code, but not a function expression?

**Answer:**

Function declarations are fully hoisted — the engine stores the complete function definition in memory during the creation phase. Function expressions (`const foo = function(){}`) only hoist the variable binding itself, following that binding type's own hoisting rules (`undefined` for `var`, TDZ for `let`/`const`) — the actual function assignment only happens when execution reaches that line.

---

### Advanced

#### Q5. Why does calling a `var`-declared function expression early throw a `TypeError` instead of a `ReferenceError`?

**Answer:**

Because `var` hoisting initializes the binding to `undefined` (not leaving it uninitialized like `let`/`const`). So the variable exists and is accessible, but its value at that point is `undefined`, not a function — attempting to invoke `undefined` as a function produces a `TypeError`, whereas TDZ violations produce a `ReferenceError` for genuinely inaccessible bindings.

---

### Follow-Up Questions

#### Q6. Does hoisting mean the JS engine physically moves code to the top of the file?

**Answer:**

No — this is a common but inaccurate simplification. The engine performs a compilation/creation-phase scan that registers declarations in memory ahead of execution; the source code itself is never rearranged. "Hoisting" describes the *observable effect*, not a literal code transformation.

---

## 13. Scenario-Based Questions

### Scenario 1 — Intermittent `undefined` Bug Traced to Declaration Order

A variable sometimes logs `undefined` instead of its expected value, depending on where in the function it's read.

**Approach:**

1. Check whether the variable is declared with `var` further down in the same function — its hoisted-but-unassigned state would explain the `undefined`.
2. Refactor to `let`/`const` so the same mistake would throw a loud `ReferenceError` during development instead of silently producing `undefined`.
3. Reorganize declarations to appear before their first use for clarity.

### Scenario 2 — Confusing `TypeError` When Calling a Utility Function Early

A function stored as a `const` arrow function throws `"is not a function"` when called near the top of a file, even though it's defined later in the same file.

**Approach:**

1. Recognize that arrow/anonymous function expressions are not hoisted with their body — only the `const`/`let` binding placeholder exists (in the TDZ) until that line executes.
2. Move the function definition above its usage, or restructure the file so functions are defined before they're called.

---

## 14. Practical Examples

### Example 1

Write code demonstrating the exact difference in behavior between accessing a `var`, a `let`, and an undeclared variable before their respective declaration lines.

### Example 2

Demonstrate calling a `function foo() {}` declaration before its line successfully, then show the same attempt failing for `const foo = () => {}`.

### Example 3

Trigger and observe a Temporal Dead Zone `ReferenceError` intentionally, then fix it by reordering the code.

---

## 15. Quick Revision

- `var` is hoisted and initialized to `undefined`; accessing it early gives `undefined`, not an error.
- `let`/`const` are hoisted but stay uninitialized until their line runs — the Temporal Dead Zone.
- Function declarations are fully hoisted, including their body — callable before their line.
- Function expressions/arrow functions only hoist the variable binding, not the function itself.
- TDZ violations throw `ReferenceError`; calling a `var`-hoisted `undefined` throws `TypeError`.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Engine must register declarations before execution begins |
| How? | Creation phase scans and registers bindings; execution phase assigns values |
| When? | Every scope, every declaration |
| Alternative? | No language-level alternative — it's core engine behavior |
| Production? | Explains ReferenceError vs TypeError bugs during debugging |
| Interview? | Explain the TDZ and function declaration vs expression hoisting |
