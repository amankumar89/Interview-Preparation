# JavaScript Fundamentals

> Interview Preparation Notes

---

## 1. Overview

JavaScript is a dynamically typed, single-threaded, prototype-based scripting language originally designed to make web pages interactive. It has since become one of the most widely deployed languages in the world, running in browsers, servers (Node.js), mobile apps, and embedded systems. Its quirks — type coercion, `this` binding, prototypal inheritance — are frequent interview topics precisely because they differ from more traditional class-based languages like Java.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Static HTML pages couldn't respond to user interaction without a page reload
   ↓
Limitations of early web pages
   ↓
No way to validate forms instantly, update content dynamically, or react to clicks
without a full server round trip
   ↓
Solution
   ↓
JavaScript runs directly in the browser, manipulating the DOM and responding to
events in real time
   ↓
Benefits
   ↓
Interactive UIs, client-side validation, dynamic content updates, and — with
Node.js — a unified language across frontend and backend
```

---

## 3. Core Concepts

```
JavaScript
├── Data Types (primitives vs objects)
├── Variables (var, let, const)
├── Type Coercion
├── Equality (== vs ===)
├── Truthy/Falsy values
└── Execution Context
```

### Primitive Types

| Type | Example |
|---|---|
| `string` | `"hello"` |
| `number` | `42`, `3.14` |
| `boolean` | `true`, `false` |
| `undefined` | Declared but not assigned |
| `null` | Explicit absence of value |
| `symbol` | Unique identifier (ES6) |
| `bigint` | Arbitrary precision integers (ES2020) |

Everything else (objects, arrays, functions) is a **reference type**.

---

## 4. How It Works

```
JS engine (e.g., V8) parses source code
   ↓
Compiles to bytecode (JIT compilation, not pure interpretation)
   ↓
Creates execution context (global or function-level)
   ↓
Memory (heap) allocation for objects; stack for primitives and call frames
   ↓
Executes statements top to bottom within that context
```

Modern JS engines (V8, SpiderMonkey) use **Just-In-Time (JIT) compilation** — code is not purely interpreted line-by-line; hot code paths get compiled to optimized machine code at runtime.

---

## 5. Syntax / Basic Example

```javascript
let count = 0;
const MAX_RETRIES = 3;

function increment() {
  count += 1;
  return count;
}

console.log(increment()); // 1
console.log(typeof count); // "number"
```

- `let` allows reassignment; `const` does not (though objects/arrays declared with `const` can still have their contents mutated).
- `typeof` returns a string describing the primitive type — though `typeof null` famously returns `"object"`, a long-standing language quirk.

---

## 6. Internal Working

### Primitives vs Reference Types in Memory

```
Primitives (string, number, boolean, etc.)
   → stored directly on the stack, copied by value on assignment

Objects, arrays, functions
   → reference stored on the stack, actual data stored on the heap,
     copied by reference on assignment
```

```javascript
let a = 10;
let b = a; // copies the value
b = 20;
console.log(a); // 10 — unaffected

let obj1 = { x: 1 };
let obj2 = obj1; // copies the reference
obj2.x = 2;
console.log(obj1.x); // 2 — same underlying object
```

### Type Coercion

JavaScript is **weakly typed** — it implicitly converts types during operations:

```javascript
console.log("5" + 3);   // "53" (string concatenation)
console.log("5" - 3);   // 2   (numeric coercion)
console.log(1 == "1");  // true (loose equality coerces types)
console.log(1 === "1"); // false (strict equality checks type too)
```

### Truthy/Falsy Values

Falsy values: `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN`. Everything else — including `"0"`, `[]`, and `{}` — is truthy, which frequently surprises developers coming from other languages.

---

## 7. Important Concepts

### `==` vs `===`

`==` performs type coercion before comparing; `===` compares both type and value without coercion. Nearly universal best practice is to use `===` to avoid coercion-related bugs.

### `null` vs `undefined`

`undefined` means a variable has been declared but not assigned a value (or a function has no return value). `null` is an explicit, intentional "no value" assigned by the developer.

### Execution Context

Every function call creates a new execution context containing its own variable environment, scope chain, and `this` binding — this underlies scope, hoisting, and closures (covered in detail in their own files).

---

## 8. Real-World Usage

- **Form validation**: instant client-side feedback before submission.
- **Dynamic UI updates**: manipulating the DOM in response to user actions without full page reloads.
- **Full-stack development**: Node.js allows the same language on client and server, sharing validation logic, types (with TypeScript), and tooling.
- **API interaction**: fetching, transforming, and rendering data from REST/GraphQL APIs.

---

## 9. Best Practices

- Prefer `const` by default; use `let` only when reassignment is genuinely needed. Avoid `var` in modern code.
- Always use `===`/`!==` instead of `==`/`!=` unless intentionally relying on coercion (rare, and should be commented).
- Be explicit about `null` vs `undefined` semantics in your own code rather than mixing them inconsistently.
- Understand reference vs value semantics before passing objects/arrays into functions, to avoid unintended mutation bugs.

---

## 10. Common Mistakes

### 1. Using `==` and being surprised by coercion

`"" == 0` is `true`, `null == undefined` is `true` but `null == 0` is `false` — these inconsistent coercion rules are a classic interview trap and a real source of bugs.

### 2. Assuming `const` makes objects immutable

`const obj = { a: 1 }; obj.a = 2;` is perfectly legal — `const` only prevents reassigning the variable binding itself, not mutating the object it points to.

### 3. Confusing `typeof null === "object"` as meaningful

This is a decades-old bug baked into the language for backward compatibility — `null` is not actually an object, despite what `typeof` reports.

### 4. Mutating objects/arrays passed into functions unexpectedly

Since objects are passed by reference, mutating a parameter inside a function affects the caller's original object — a frequent source of hard-to-trace bugs.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `==` | `===` | `==` coerces types before comparing; `===` requires matching type and value |
| `null` | `undefined` | `null` is an intentional "no value"; `undefined` means unassigned/missing |
| Primitives | Reference types | Primitives copied by value; objects/arrays copied by reference |
| `let` | `const` | `let` allows reassignment; `const` does not (but object contents remain mutable) |

---

## 12. Interview Questions

### Beginner

#### Q1. What are JavaScript's primitive types?

**Answer:**

`string`, `number`, `boolean`, `undefined`, `null`, `symbol`, and `bigint`. Everything else (objects, arrays, functions) is a reference type.

#### Q2. What is the difference between `==` and `===`?

**Answer:**

`==` performs type coercion before comparing values, which can produce surprising results (`"" == 0` is `true`). `===` compares both type and value with no coercion, and is the recommended default for predictable comparisons.

---

### Intermediate

#### Q3. What's the difference between `null` and `undefined`?

**Answer:**

`undefined` is the default value of a declared-but-unassigned variable, or a function with no explicit return. `null` is an intentional assignment representing "no value" — it's something a developer sets deliberately, whereas `undefined` usually indicates something was never set.

#### Q4. Are objects passed by value or by reference in JavaScript?

**Answer:**

Technically, JavaScript is always "pass by value," but for objects, the value being passed is a reference to the object in memory. So reassigning the parameter inside a function doesn't affect the caller's variable, but mutating properties on the object does, since both variables point to the same underlying object.

---

### Advanced

#### Q5. Why does `typeof null` return `"object"`?

**Answer:**

It's a long-standing bug from the earliest JavaScript implementation, where values were represented with a type tag, and `null` was represented with the same tag as objects (all zeros). Fixing it would break backward compatibility across the web, so it remains part of the language specification today.

---

### Follow-Up Questions

#### Q6. Why is `NaN === NaN` false, and how do you correctly check for `NaN`?

**Answer:**

`NaN` is defined by the IEEE 754 floating-point standard to never be equal to any value, including itself — this is spec-mandated, not a bug. The correct check is `Number.isNaN(value)`, which specifically detects `NaN` without the type-coercion pitfalls of the older global `isNaN()` function.

---

## 13. Scenario-Based Questions

### Scenario 1 — Unexpected Object Mutation Across Function Calls

A function receives a config object, makes a "local" change, and the caller's original object ends up mutated unexpectedly.

**Approach:**

1. Recognize this is a reference-type sharing issue, not a bug in the function's own logic.
2. Decide whether mutation was intended; if not, create a shallow (or deep, if nested) copy before modifying inside the function (`{ ...config }` or `structuredClone(config)`).
3. Document or enforce (via linting/TypeScript `readonly`) whether functions are expected to mutate their inputs.

### Scenario 2 — Comparison Logic Behaves Inconsistently

A conditional using `==` produces unexpected `true`/`false` results across different input types.

**Approach:**

1. Audit all `==`/`!=` usage and replace with `===`/`!==` unless coercion is explicitly desired and documented.
2. Add explicit type checks or conversions (`Number(value)`, `String(value)`) instead of relying on implicit coercion.

---

## 14. Practical Examples

### Example 1

Write a function that demonstrates the difference between primitive and reference copying by modifying a passed number vs a passed object.

### Example 2

List five different falsy values and demonstrate each in a conditional statement.

### Example 3

Refactor a snippet using `==` throughout to use `===`, and identify any behavior changes.

---

## 15. Quick Revision

- Primitives are copied by value; objects/arrays are copied by reference.
- `===` should be the default; `==` coerces types and can surprise.
- `null` = intentional absence; `undefined` = unassigned/missing.
- `const` prevents reassignment, not mutation of object contents.
- `typeof null === "object"` is a historical language bug, not a meaningful type check.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Enables interactivity in browsers; now spans full-stack via Node.js |
| How? | JIT-compiled by the engine; executes within execution contexts |
| When? | Any dynamic client-side or server-side behavior |
| Alternative? | TypeScript adds static typing on top of the same runtime semantics |
| Production? | Form validation, dynamic UI, API interaction, full-stack apps |
| Interview? | Explain == vs ===, null vs undefined, and pass-by-value-of-reference |
