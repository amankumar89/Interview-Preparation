# JavaScript — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is JavaScript, and how is it different from HTML and CSS?

**Interview Answer:**

JavaScript is the programming language that adds behavior to a web page. HTML provides structure, CSS provides presentation, and JavaScript handles interaction, validation, DOM updates, and data processing.

A static page can be built with HTML and CSS only, but JavaScript is what makes buttons respond, forms validate, animations run, and API calls happen in the browser.

### Q2. What are `var`, `let`, and `const`? What is the difference?

**Interview Answer:**

`var` is function-scoped and hoisted, which can lead to confusing behavior. `let` and `const` are block-scoped and are preferred in modern JavaScript. `const` also prevents reassignment, though objects and arrays referenced by `const` can still be mutated.

```js
var x = 1;
let y = 2;
const z = 3;

if (true) {
  var a = 10;
  let b = 20;
  const c = 30;
}

console.log(a); // 10
console.log(b); // ReferenceError
```

### Q3. What are the primitive data types in JavaScript?

**Interview Answer:**

JavaScript primitives include `string`, `number`, `boolean`, `bigint`, `symbol`, and `null`, plus `undefined` as a special value. Everything else, including arrays, objects, and functions, is a non-primitive type.

```js
const name = "Aman";
const age = 28;
const active = true;
const count = 12345678901234567890n;
const id = Symbol("id");
```

### Q4. What is type coercion in JavaScript?

**Interview Answer:**

Type coercion happens when JavaScript converts one value type to another automatically. This is often implicit and can lead to surprising results if you are not careful.

```js
console.log("5" + 2); // "52"
console.log("5" - 2); // 3
console.log(Boolean("")); // false
console.log(1 == "1"); // true
```

The safest practice is to be explicit with conversions, especially in comparisons, input handling, and user-facing logic.

### Q5. What is the difference between `==` and `===`?

**Interview Answer:**

`==` compares values after type coercion, while `===` compares both type and value without coercion. `===` is generally preferred because it is more predictable and reduces bugs.

```js
console.log(1 == "1"); // true
console.log(1 === "1"); // false
```

### Q6. What is hoisting?

**Interview Answer:**

Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope during execution. However, only the declaration is hoisted, not the initialization.

```js
console.log(name); // undefined
var name = "Aman";

function greet() {
  console.log("Hello");
}
```

`let` and `const` are hoisted too, but they remain in the temporal dead zone until initialization.

### Q7. What is scope in JavaScript?

**Interview Answer:**

Scope defines where variables are accessible. JavaScript has global scope, function scope, and block scope. `var` uses function scope, while `let` and `const` use block scope.

```js
let globalVar = "global";

function demo() {
  let localVar = "local";
  if (true) {
    let blockVar = "block";
  }
}
```

A variable declared inside a block is not accessible outside that block unless it is intentionally exposed.

### Q8. What is strict mode, and why is it useful?

**Interview Answer:**

Strict mode is enabled with `'use strict';` It makes JavaScript more secure and predictable by disallowing silent errors and unsafe actions.

```js
"use strict";

x = 10; // ReferenceError
```

It helps catch bugs early, such as accidental globals, duplicate parameters, and invalid use of `this`.

### Q9. What are truthy and falsy values?

**Interview Answer:**

In JavaScript, values are considered truthy or falsy when used in boolean contexts. Falsy values include `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`.

```js
if ("hello") console.log("truthy");
if (0) console.log("never");
```

This matters in validation, condition checks, and API response handling.

### Q10. What are common JavaScript beginner mistakes?

**Interview Answer:**

Common mistakes include using `==` instead of `===`, mutating arrays or objects unexpectedly, not understanding `this`, forgetting block scoping, and assuming function declarations are initialized before execution.

Production-safe coding habits include using `const` by default, avoiding global variables, handling `null` and `undefined` intentionally, and writing clear conditions with explicit checks.

## Practical Questions

### Q11. How do you check the type of a value in JavaScript?

```js
console.log(typeof 42); // "number"
console.log(typeof "Aman"); // "string"
console.log(typeof {}); // "object"
console.log(Array.isArray([])); // true
```

`typeof` is useful, but `Array.isArray`, `Object.prototype.toString.call`, and custom guards are often more reliable for complex values.

### Q12. How do you safely handle `null` and `undefined`?

Use explicit checks rather than assuming a value exists:

```js
const username = user?.name ?? "Guest";

if (user && user.name) {
  console.log(user.name);
}
```

`?.` is optional chaining, and `??` is nullish coalescing. These are especially helpful when handling API responses or form values.

### Q13. What is the difference between `null` and `undefined`?

`undefined` means a variable has been declared but not assigned a value, while `null` is an intentional empty value. They are not the same, even though both are falsy.

```js
let a;
console.log(a); // undefined

const b = null;
console.log(b); // null
```

### Q14. Why is JavaScript called a loosely typed language?

Because variables do not have fixed types in the same way as statically typed languages. A variable can hold different data types at different times.

```js
let item = 5;
item = "five";
item = { value: 5 };
```

This flexibility enables fast scripting, but it increases the need for careful validation and testing.

### Q15. What is the `NaN` value, and how do you detect it?

`NaN` means "Not a Number" and is produced by invalid numeric operations. It is tricky because `NaN === NaN` is `false`.

```js
console.log(Number("abc")); // NaN
console.log(Number.isNaN(NaN)); // true
```

The safest detection is `Number.isNaN(value)` instead of relying on loose comparisons.

## Debugging and Production

### Q16. How do you avoid bugs caused by coercion in production apps?

Use strict comparisons, validate inputs, and be explicit when converting strings to numbers or booleans. Avoid relying on implicit conversion in critical logic such as payments, permissions, or user settings.

```js
const count = Number(inputValue);
if (count === 0) {
  // handle empty state explicitly
}
```

### Q17. Why is it important to know JavaScript fundamentals before frameworks?

Frameworks abstract many browser and runtime details, but bugs in state handling, async code, closures, and coercion still appear in application logic. A strong base in JavaScript makes React, Node.js, and modern tooling easier to reason about and debug.

### Q18. What is the difference between a statement and an expression?

A statement is a full instruction, such as `if` or `for`. An expression produces a value, such as `2 + 3`, a function call, or a template literal.

```js
const total = 2 + 3; // expression used in a variable assignment
if (total > 4) {
  // statement
  console.log("Large");
}
```

This distinction matters when writing concise code and understanding language grammar.
