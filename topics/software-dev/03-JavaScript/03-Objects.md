# JavaScript — 03 Objects

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an object in JavaScript?

**Interview Answer:**

An object is a collection of key-value pairs. It is used to model structured data, like users, products, settings, or API responses.

```js
const user = {
  name: "Aman",
  age: 28,
  active: true,
};

console.log(user.name);
```

### Q2. How do you access properties of an object?

You can use dot notation for known keys and bracket notation for dynamic keys.

```js
const user = { name: "Aman" };
console.log(user.name);
console.log(user["name"]);
```

Bracket notation is required when property names contain spaces or are computed dynamically.

### Q3. What is the difference between object properties and methods?

A method is a property whose value is a function.

```js
const calculator = {
  add(a, b) {
    return a + b;
  },
};

console.log(calculator.add(2, 3));
```

### Q4. What are object spread and destructuring?

Object spread copies enumerable properties from one object into another. Destructuring extracts values into variables.

```js
const person = { name: "Aman", age: 28 };
const copy = { ...person };
const { name, age } = person;
```

### Q5. What is `this` inside an object method?

`this` depends on how the function is called. In a method, it typically refers to the object itself.

```js
const car = {
  brand: "Tesla",
  getBrand() {
    return this.brand;
  },
};

console.log(car.getBrand());
```

### Q6. What is the prototype chain?

JavaScript objects inherit properties and methods from their prototype, which may inherit from another prototype, forming a chain.

```js
const animal = {
  speak() {
    return "Roar";
  },
};
const dog = Object.create(animal);
console.log(dog.speak());
```

This is the foundation of classical prototype-based inheritance in JavaScript.

### Q7. What is the difference between shallow copy and deep copy?

A shallow copy copies the top-level properties only, while a deep copy duplicates nested objects recursively.

```js
const user = { profile: { city: "Delhi" } };
const shallow = { ...user };
shallow.profile.city = "Mumbai";
console.log(user.profile.city); // Mumbai
```

Deep cloning requires more careful handling, especially for nested data and functions.

### Q8. What are getters and setters?

Getters and setters define computed properties or validation for object fields.

```js
const person = {
  firstName: "Aman",
  lastName: "Sharma",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(" ");
  },
};
```

### Q9. What is optional chaining, and why is it useful?

Optional chaining allows safe access to nested properties without throwing when intermediate values are `null` or `undefined`.

```js
const user = {};
console.log(user.profile?.name); // undefined
```

### Q10. How do you freeze or seal an object?

`Object.freeze` prevents modification of existing properties, while `Object.seal` prevents adding or deleting properties but allows update of existing ones.

```js
const config = Object.freeze({ mode: "prod" });
config.mode = "dev"; // ignored in non-strict mode
```

## Intermediate Questions

### Q11. What is the difference between `Object.assign` and spread?

Both copy enumerable source properties into a target object, but spread is often more concise and readable. `Object.assign` can be useful in older codebases and when you need to control target mutability.

```js
const target = { a: 1 };
const source = { b: 2 };
const result = Object.assign(target, source);
```

### Q12. What is a constructor function?

A constructor function creates multiple similar objects using the `new` keyword.

```js
function Person(name) {
  this.name = name;
}

const p = new Person("Aman");
```

### Q13. What is the difference between `for...in` and `for...of` on objects?

`for...in` iterates enumerable keys of an object, while `for...of` iterates iterable values, such as arrays and strings.

```js
for (const key in { a: 1, b: 2 }) {
  console.log(key);
}
```

### Q14. What are property descriptors?

Property descriptors define configuration for object properties, including `writable`, `enumerable`, and `configurable`.

```js
Object.defineProperty(user, "id", {
  value: 101,
  writable: false,
  enumerable: true,
  configurable: false,
});
```

### Q15. How do you merge objects safely?

Use spread, `Object.assign`, or libraries such as Lodash when working with nested data. Be careful with nested mutation because shallow merges do not deep merge.

```js
const merged = { ...base, ...override };
```

## Debugging and Production

### Q16. What are common object-related bugs?

Typical problems include accidentally mutating shared objects, missing null checks before nested access, confusing primitives and object wrappers, and using stale references after cloning.

### Q17. Why is immutability helpful in JavaScript apps?

Immutable updates make reasoning about state easier, reduce bugs in UI state management, and help with diffing and performance optimizations in frameworks.

### Q18. How do you avoid mutating object references by accident?

Create new objects instead of modifying existing ones when updating state, use functional updates in React patterns, and be careful with nested objects during copies.

```js
const updated = { ...user, active: false };
```
