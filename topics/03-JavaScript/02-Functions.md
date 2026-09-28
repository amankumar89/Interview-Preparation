# JavaScript — 02 Functions

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a function in JavaScript?

**Interview Answer:**

A function is a reusable block of code designed to perform a task. Functions help organize logic, avoid duplication, and model behavior in a modular way.

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Aman"));
```

### Q2. What is the difference between a function declaration and a function expression?

**Interview Answer:**

Function declarations are hoisted and can be called before they are defined. Function expressions are created at runtime and are not hoisted in the same way.

```js
sayHi(); // works
function sayHi() {
  console.log("Hi");
}

const sayBye = function () {
  console.log("Bye");
};
```

### Q3. What are parameters and arguments?

Parameters are placeholders defined in the function signature, while arguments are the actual values passed when the function is called.

```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // arguments: 2, 3
```

### Q4. How do default parameters work?

Default parameters allow a function to use fallback values when an argument is missing or `undefined`.

```js
function welcome(name = "Guest") {
  return `Welcome, ${name}!`;
}

console.log(welcome());
```

### Q5. What are rest parameters and spread syntax?

**Interview Answer:**

Rest parameters collect multiple arguments into an array. Spread syntax expands iterable values into separate arguments or array elements.

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4));
console.log([..."abc"]);
```

### Q6. What is an arrow function?

**Interview Answer:**

Arrow functions provide concise syntax and do not bind their own `this`. They are often used for callbacks and inline logic.

```js
const multiply = (a, b) => a * b;
console.log(multiply(3, 4));
```

### Q7. When should you avoid arrow functions?

Arrow functions are not ideal when you need dynamic `this`, constructor behavior, or methods that should use object context.

```js
const person = {
  name: "Aman",
  greet: function () {
    return `Hi, ${this.name}`;
  },
};
```

Normal functions are better for object methods and when `this` matters.

### Q8. What is a callback function?

A callback is a function passed into another function to be invoked later. It is common in async patterns and event listeners.

```js
function fetchData(callback) {
  setTimeout(() => callback("done"), 1000);
}

fetchData((value) => console.log(value));
```

### Q9. What is a higher-order function?

**Interview Answer:**

A higher-order function takes another function as an argument or returns a function.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log(doubled);
```

`map`, `filter`, and `reduce` are classic examples in JavaScript.

### Q10. What is an IIFE?

An IIFE (Immediately Invoked Function Expression) runs as soon as it is defined.

```js
(function () {
  console.log("Runs immediately");
})();
```

It is useful for isolating scope and avoiding global pollution.

## Intermediate Concepts

### Q11. What is recursion?

Recursion occurs when a function calls itself until a base case is reached.

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));
```

### Q12. What is the difference between `call`, `apply`, and `bind`?

These methods control function execution context.

```js
function greet(city) {
  return `${this.name} lives in ${city}`;
}

const user = { name: "Aman" };
console.log(greet.call(user, "Delhi"));
console.log(greet.apply(user, ["Delhi"]));
const bound = greet.bind(user, "Delhi");
console.log(bound());
```

### Q13. What are pure functions?

A pure function always returns the same output for the same inputs and does not mutate external state.

```js
function add(a, b) {
  return a + b;
}
```

Pure functions are easier to test, debug, and reason about.

### Q14. What is function currying?

Currying transforms a function that takes multiple arguments into a series of functions that each take one argument.

```js
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5));
```

### Q15. What is function composition?

Function composition combines small functions to build bigger behavior.

```js
const addOne = (x) => x + 1;
const double = (x) => x * 2;
const compose = (f, g) => (x) => f(g(x));

console.log(compose(addOne, double)(3));
```

## Production and Debugging

### Q16. What are common function bugs in production?

Common bugs include using `var` in loops, forgetting default values, mutating input objects, creating functions inside loops without proper closure handling, and overusing callbacks that obscure control flow.

### Q17. Why are functions important for testability?

Functions isolate logic into small units, making tests easier and more precise. This improves maintainability, code review, and debugging in large codebases.

### Q18. How do functions help with performance and readability?

Breaking code into functions reduces repetition, improves readability, makes logic reusable, and can help optimize code by isolating expensive work, caching, or testing smaller units separately.
