# Array Methods

> Interview Preparation Notes

---

## 1. Overview

Modern JavaScript provides a rich set of built-in array methods — `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`, and more — that enable declarative data transformation instead of manual `for` loops. Interviewers frequently probe not just usage but *which method mutates the original array* and *what each method returns*, since mixing these up is a common real-world bug source.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Transforming, filtering, and aggregating array data with manual for-loops is
verbose and error-prone (off-by-one errors, manual accumulator management)
   ↓
Limitations of manual loops
   ↓
Imperative loops describe HOW to do something step by step, obscuring WHAT
transformation is actually intended, and are easy to get subtly wrong
   ↓
Solution
   ↓
Built-in higher-order array methods express intent declaratively — map to
transform, filter to select, reduce to aggregate
   ↓
Benefits
   ↓
More readable code, fewer off-by-one bugs, easier to chain transformations,
functional and composable
```

---

## 3. Core Concepts

```
Array Methods
├── Mutating methods (push, pop, splice, sort, reverse)
├── Non-mutating / transformation methods (map, filter, slice, concat)
├── Iteration methods (forEach, map, filter, find, some, every)
├── Aggregation (reduce)
└── Search methods (find, findIndex, includes, indexOf)
```

### Mutating vs Non-Mutating Reference Table

| Method | Mutates Original? | Returns |
|---|---|---|
| `push`, `pop`, `shift`, `unshift` | Yes | New length (push/unshift) or removed element (pop/shift) |
| `splice` | Yes | Array of removed elements |
| `sort`, `reverse` | Yes | The same array, sorted/reversed in place |
| `map` | No | New array of transformed elements |
| `filter` | No | New array of elements passing the test |
| `slice` | No | New array, a shallow copy of a portion |
| `concat` | No | New array, combining arrays |
| `reduce` | No (unless the reducer itself mutates) | A single accumulated value |
| `forEach` | No (but the callback can mutate elements) | `undefined` |
| `find` | No | The first matching element, or `undefined` |
| `some` / `every` | No | Boolean |

---

## 4. How It Works

```
Array method called with a callback function
   ↓
Engine iterates over array elements (index 0 to length-1, generally)
   ↓
Callback invoked with (element, index, array) for each item
   ↓
Method-specific behavior applied:
   map      → collects each callback's return value into a new array
   filter   → keeps elements where callback returns truthy
   reduce   → passes an accumulator through each call, building up a single result
   forEach  → simply calls the callback per element, discarding return values
```

---

## 5. Syntax / Basic Example

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);        // [2, 4, 6, 8, 10]
const evens = numbers.filter((n) => n % 2 === 0);  // [2, 4]
const total = numbers.reduce((sum, n) => sum + n, 0); // 15
const firstEven = numbers.find((n) => n % 2 === 0);   // 2
const hasNegative = numbers.some((n) => n < 0);       // false
const allPositive = numbers.every((n) => n > 0);      // true

numbers.forEach((n) => console.log(n)); // logs each number, returns undefined
```

---

## 6. Internal Working

### `reduce` in Depth

```javascript
const cart = [{ price: 10 }, { price: 20 }, { price: 30 }];

const total = cart.reduce((accumulator, item) => {
  return accumulator + item.price;
}, 0); // initial value of accumulator = 0

console.log(total); // 60
```

```
reduce internal loop:
   accumulator = 0 (initial value)
   iteration 1: accumulator = 0 + 10 = 10
   iteration 2: accumulator = 10 + 20 = 30
   iteration 3: accumulator = 30 + 30 = 60
   final result returned: 60
```

If no initial value is provided, `reduce` uses the array's first element as the initial accumulator and starts iterating from the second element — this can throw a `TypeError` on empty arrays if no initial value is supplied, since there's nothing to use as a starting accumulator.

### `map` vs `forEach` — A Frequent Confusion

```javascript
// Misuse: using forEach and expecting a returned array
const result = numbers.forEach((n) => n * 2); // undefined — forEach does NOT return anything

// Correct: use map when you need a new transformed array
const result2 = numbers.map((n) => n * 2); // [2, 4, 6, 8, 10]
```

`forEach` is purely for side effects (like logging or pushing to an external array); it always returns `undefined` regardless of what the callback returns.

---

## 7. Important Concepts

### Chaining Array Methods

```javascript
const activeUserNames = users
  .filter((user) => user.isActive)
  .map((user) => user.name)
  .sort();
```

Because `filter` and `map` both return new arrays, they can be chained fluently — each step's output becomes the next step's input, forming a readable transformation pipeline.

### `sort()` Mutates and Has Surprising Default Behavior

```javascript
const nums = [10, 2, 33, 4];
console.log(nums.sort()); // [10, 2, 33, 4] → [10, 2, 33, 4] sorted as STRINGS: [10, 2, 33, 4]
```

By default, `sort()` converts elements to strings and compares them lexicographically — `[10, 2, 33, 4].sort()` produces `[10, 2, 33, 4]` sorted as strings, i.e., `[10, 2, 33, 4]` → `[10, 2, 33, 4]` becomes `[10, 2, 33, 4]`... in practice this yields `[10, 2, 33, 4]` sorted lexicographically as `["10", "2", "33", "4"]` → `[10, 2, 33, 4]`. For correct numeric sorting, always pass a comparator: `nums.sort((a, b) => a - b)`.

### `find` vs `filter`

`find` returns the *first matching element itself* (or `undefined`); `filter` returns an *array* of all matching elements (possibly empty). Confusing these leads to either unnecessarily iterating a whole array with `filter()[0]` or getting an array where a single value was expected.

---

## 8. Real-World Usage

- **API data transformation**: mapping raw API response objects into the shape a UI component expects.
- **Filtering lists**: search/filter UI features (e.g., filtering a product list by category) rely directly on `filter`.
- **Aggregating totals**: shopping cart totals, statistics, and grouping operations commonly use `reduce`.
- **Existence/validation checks**: `some`/`every` for form validation (e.g., "every field is filled") or permission checks (e.g., "some role grants access").

---

## 9. Best Practices

- Use `map`/`filter`/`reduce` for transformations that produce a new value; use `forEach` only for side effects with no return value needed.
- Always pass a comparator function to `sort()` for numeric arrays to avoid the default lexicographic string-sort surprise.
- Prefer non-mutating methods (`map`, `filter`, `slice`) over mutating ones (`splice`, `sort`, `reverse`) when working with state that shouldn't be changed in place — especially important in frameworks like React that rely on immutability for change detection.
- Always provide an initial value to `reduce` unless you're certain the array is non-empty, to avoid runtime errors on empty arrays.

---

## 10. Common Mistakes

### 1. Using `forEach` and expecting a returned array

`forEach` always returns `undefined` — using it where `map` is needed is a very common beginner mistake.

### 2. Forgetting `sort()` mutates the original array

Calling `.sort()` on an array referenced elsewhere in the app can cause unexpected side effects, since it sorts in place rather than returning a new array.

### 3. Sorting numbers without a comparator

Relying on default `sort()` behavior for numbers, which sorts lexicographically as strings and produces incorrect ordering for multi-digit numbers.

### 4. Mutating state directly with array methods in React (or similar frameworks)

Using `push`, `splice`, or `sort` directly on state arrays instead of creating new arrays via `map`/`filter`/spread — this breaks reference-equality checks that React relies on to detect changes and trigger re-renders.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `map` | `forEach` | `map` returns a new array of transformed values; `forEach` always returns `undefined` |
| `find` | `filter` | `find` returns the first matching element (or undefined); `filter` returns an array of all matches |
| `some` | `every` | `some` returns true if at least one element passes; `every` returns true only if all elements pass |
| Mutating methods | Non-mutating methods | Mutating (push, splice, sort) change the original array; non-mutating (map, filter, slice) return a new array |

---

## 12. Interview Questions

### Beginner

#### Q1. What is the difference between `map` and `forEach`?

**Answer:**

`map` returns a new array containing the transformed result of each element, making it ideal for creating derived data. `forEach` simply executes a callback for each element for side effects and always returns `undefined` — it should not be used when a new array is needed.

#### Q2. What does `reduce` do?

**Answer:**

`reduce` iterates over an array, applying a callback that combines each element with an accumulator, ultimately producing a single aggregated value (a sum, an object, another array, etc.) rather than a transformed array of the same length.

---

### Intermediate

#### Q3. Which array methods mutate the original array, and which don't?

**Answer:**

Mutating: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse` — these all modify the array in place. Non-mutating: `map`, `filter`, `slice`, `concat`, `reduce` — these return a new array or value, leaving the original untouched.

#### Q4. Why might `[10, 2, 33, 4].sort()` not produce the numerically sorted order you'd expect?

**Answer:**

By default, `sort()` converts elements to strings and compares them lexicographically, not numerically. To sort numbers correctly, you must pass an explicit comparator function: `.sort((a, b) => a - b)`.

---

### Advanced

#### Q5. How would you implement `map` using `reduce`?

**Answer:**

```javascript
function mapWithReduce(array, fn) {
  return array.reduce((acc, item, index) => {
    acc.push(fn(item, index, array));
    return acc;
  }, []);
}
```

This demonstrates that `reduce` is the most general-purpose iteration method — `map`, `filter`, and even `forEach` can all be expressed in terms of `reduce`, since it has full control over building up an arbitrary accumulator value.

---

### Follow-Up Questions

#### Q6. Why is it important to avoid mutating arrays directly when working with React state?

**Answer:**

React determines whether to re-render by comparing state references (often via `Object.is` or shallow equality checks), not by deeply inspecting array contents. Mutating an array in place (e.g., with `push` or `sort`) keeps the same reference, so React may not detect the change and skip re-rendering — always create and set a new array (via `map`, `filter`, or the spread operator) to ensure React observes the update.

---

## 13. Scenario-Based Questions

### Scenario 1 — A List Isn't Re-Rendering After an Update in a React App

A component calls `items.push(newItem)` and then calls `setItems(items)`, but the UI doesn't update.

**Approach:**

1. Recognize that `push` mutates the array in place — `items` still points to the same reference, so React's reference-equality check sees no change.
2. Replace with `setItems([...items, newItem])` or `setItems(items.concat(newItem))` to create a genuinely new array reference.

### Scenario 2 — Sorting a List of Prices Produces Incorrect Order

A list of numeric prices, when sorted, doesn't appear in proper ascending numeric order (e.g., `[100, 25, 3]` instead of `[3, 25, 100]`).

**Approach:**

1. Check whether `.sort()` was called without a comparator — the default lexicographic string sort is likely the cause.
2. Add an explicit numeric comparator: `prices.sort((a, b) => a - b)`.

---

## 14. Practical Examples

### Example 1

Given an array of user objects, use `filter` and `map` chained together to produce a list of active users' email addresses.

### Example 2

Use `reduce` to group an array of objects by a property (e.g., grouping transactions by category into an object of arrays).

### Example 3

Implement `filter` from scratch using only `reduce`, to demonstrate the general-purpose nature of `reduce`.

---

## 15. Quick Revision

- `map`/`filter`/`slice`/`concat`/`reduce` are non-mutating; `push`/`pop`/`splice`/`sort`/`reverse` mutate in place.
- `forEach` always returns `undefined` — never use it expecting a transformed array.
- `find` returns a single element (or undefined); `filter` returns an array of matches.
- `sort()` defaults to lexicographic string comparison — always pass a comparator for numbers.
- `reduce` is the most general iteration method; `map`/`filter`/`forEach` can all be implemented using it.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Declarative, composable alternative to manual for-loops |
| How? | Engine iterates the array, invoking a callback per element per method semantics |
| When? | Any array transformation, filtering, searching, or aggregation |
| Alternative? | Manual for-loops (more control, more verbose, more error-prone) |
| Production? | API data shaping, list filtering/searching, cart totals, validation checks |
| Interview? | Know exactly which methods mutate, and map/forEach/find/filter return differences |
