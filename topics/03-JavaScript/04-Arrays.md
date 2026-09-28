# JavaScript — 04 Arrays

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an array in JavaScript?

**Interview Answer:**

An array is an ordered, indexed collection of values. It can store numbers, strings, objects, functions, or nested arrays.

```js
const fruits = ["apple", "banana", "mango"];
console.log(fruits[1]);
```

### Q2. How do you create and mutate arrays?

```js
const numbers = [1, 2, 3];
numbers.push(4);
numbers[0] = 10;
```

Arrays are mutable by default, so methods like `push`, `pop`, `splice`, and `sort` change the original array.

### Q3. What is the difference between mutating and non-mutating array methods?

Mutating methods change the original array; non-mutating methods return a new array.

```js
const arr = [1, 2, 3];
arr.push(4); // mutates

const doubled = arr.map((n) => n * 2); // returns new array
```

### Q4. What is the purpose of `map`, `filter`, and `reduce`?

These methods transform or aggregate data in a declarative way.

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
const evens = nums.filter((n) => n % 2 === 0);
const total = nums.reduce((sum, n) => sum + n, 0);
```

### Q5. What is the difference between `forEach` and `map`?

`forEach` executes a function for each item but returns `undefined`. `map` returns a new array of results.

```js
[1, 2, 3].forEach((n) => console.log(n));
const squared = [1, 2, 3].map((n) => n * n);
```

### Q6. What is array destructuring?

Array destructuring extracts values from an array into variables.

```js
const [first, second, ...rest] = ["A", "B", "C", "D"];
console.log(first, second, rest);
```

### Q7. How do you flatten nested arrays?

Use `flat()` for nested arrays or `reduce` for custom flattening logic.

```js
const nested = [1, [2, [3]], 4];
console.log(nested.flat(2));
```

### Q8. What is the difference between `slice` and `splice`?

`slice` returns a copy of a section without modifying the original, while `splice` changes the original array in place.

```js
const arr = [1, 2, 3, 4];
console.log(arr.slice(1, 3));
arr.splice(1, 2, 9, 10);
```

### Q9. What is the difference between `find` and `filter`?

`find` returns the first matching element, while `filter` returns an array of all matching elements.

```js
const nums = [10, 20, 30];
console.log(nums.find((n) => n > 15));
console.log(nums.filter((n) => n > 15));
```

### Q10. How do you sort arrays safely?

The default sort is lexicographic and can produce unexpected results for numbers. Provide a comparator when needed.

```js
const numbers = [5, 1, 10, 3];
console.log(numbers.sort((a, b) => a - b));
```

## Intermediate Topics

### Q11. What is a sparse array?

A sparse array has missing indices. It is not the same as an array with all values defined.

```js
const arr = new Array(3);
console.log(arr.length); // 3
console.log(arr[0]); // undefined
```

### Q12. What is the difference between `includes` and `indexOf`?

`includes` checks for a value and returns a boolean. `indexOf` returns the index or `-1`.

```js
const arr = ["a", "b", "c"];
console.log(arr.includes("b"));
console.log(arr.indexOf("b"));
```

### Q13. How can you remove duplicates from an array?

Use `Set` for unique values or combine it with array methods.

```js
const unique = [...new Set([1, 2, 2, 3])];
console.log(unique);
```

### Q14. What is the difference between `concat` and `push`?

`concat` returns a new array, while `push` mutates the original. `concat` is often safer when you want to avoid side effects.

```js
const a = [1, 2];
const b = [3];
console.log(a.concat(b));
```

### Q15. What is `every` and `some`?

These methods check whether all or any values satisfy a condition.

```js
const ages = [18, 20, 25];
console.log(ages.every((age) => age >= 18));
console.log(ages.some((age) => age > 21));
```

## Production and Debugging

### Q16. Why is array mutation risky in production code?

Mutating arrays in place can create bugs when multiple parts of the app share references to the same array. Prefer creating new arrays when updating state or data.

```js
const original = [1, 2, 3];
const copy = [...original, 4];
```

### Q17. How do you optimize array operations for performance?

Use the right methods for the job, avoid repeatedly nested loops when a single pass will do, and be cautious with `sort` on large arrays. For heavy transformations, consider using streaming or chunked processing when appropriate.

### Q18. What is the difference between arrays and objects in data modeling?

Arrays represent ordered collections, while objects represent named properties. Use arrays for lists; use objects for records and keyed data. Complex data often mixes both structures.

```js
const users = [
  { id: 1, name: "Aman" },
  { id: 2, name: "Riya" },
];
```
