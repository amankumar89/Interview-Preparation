# Prototypes & Prototypal Inheritance

> Interview Preparation Notes

---

## 1. Overview

JavaScript is a **prototype-based** language — objects inherit properties and methods directly from other objects via an internal link called the prototype, rather than from classes in the traditional class-based sense. Even ES6 `class` syntax is "syntactic sugar" over this same prototype mechanism underneath, which is a very common interview point.

---

## 2. Why Do We Need It?

```
Problem
   ↓
Objects often need to share behavior (methods) without duplicating that
behavior in memory for every single instance
   ↓
Limitations without prototypes
   ↓
Copying every method onto every object instance individually would waste
memory and make shared behavior updates impossible to apply universally
   ↓
Solution
   ↓
Objects link to a shared prototype object; method lookups fall back to the
prototype chain when a property isn't found directly on the object
   ↓
Benefits
   ↓
Memory-efficient shared behavior, dynamic inheritance, flexible object
composition without rigid class hierarchies
```

---

## 3. Core Concepts

```
Prototypes
├── [[Prototype]] (internal slot, accessed via __proto__ or Object.getPrototypeOf)
├── prototype property (exists on functions, used when called with `new`)
├── The Prototype Chain
├── Object.create()
└── class syntax (sugar over prototypes)
```

### Key Distinction: `prototype` vs `[[Prototype]]`

| Term | What It Is |
|---|---|
| `Function.prototype` | A property on functions; becomes the `[[Prototype]]` of objects created via `new Function()` |
| `obj.[[Prototype]]` | The internal link every object has to another object, exposed via `Object.getPrototypeOf(obj)` or (informally) `__proto__` |

---

## 4. How It Works

```
Property/method accessed on an object
   ↓
JS engine checks if the property exists directly on the object (own property)
   ↓
If not found, follows the object's [[Prototype]] link to its prototype object
   ↓
Checks that prototype object for the property
   ↓
Repeats up the chain until found, or until reaching `null` (end of the chain,
typically Object.prototype's own [[Prototype]])
   ↓
If never found: returns undefined (or throws for method calls on missing functions)
```

---

## 5. Syntax / Basic Example

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound.`);
};

const dog = new Animal("Rex");
dog.speak(); // "Rex makes a sound." — found via the prototype chain, not on `dog` itself

console.log(dog.hasOwnProperty("name"));  // true — own property
console.log(dog.hasOwnProperty("speak")); // false — inherited via prototype
```

```javascript
// Object.create — direct prototype linking without a constructor function
const animalProto = {
  speak() {
    console.log(`${this.name} makes a sound.`);
  },
};

const cat = Object.create(animalProto);
cat.name = "Whiskers";
cat.speak(); // "Whiskers makes a sound."
```

---

## 6. Internal Working

### The Prototype Chain, Visualized

```
dog (instance)
  │  own property: name = "Rex"
  ▼ [[Prototype]]
Animal.prototype
  │  speak() method defined here
  ▼ [[Prototype]]
Object.prototype
  │  toString(), hasOwnProperty(), etc.
  ▼ [[Prototype]]
null (end of chain)
```

Every lookup that isn't found as an "own property" walks up this chain, checking each link in order, until it either finds a match or reaches `null`.

### `new` and the Prototype Link

```
new Animal("Rex") does the following internally:
   1. Creates a new empty object
   2. Sets that new object's [[Prototype]] to Animal.prototype
   3. Calls Animal with `this` bound to the new object
   4. Returns the new object (unless the constructor explicitly returns another object)
```

This is precisely why `dog.speak` works even though `speak` isn't defined directly on `dog` — step 2 links `dog`'s `[[Prototype]]` to `Animal.prototype`, where `speak` actually lives.

### `class` Is Syntactic Sugar

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}
```

This compiles down to essentially the same prototype-based mechanism as the function-constructor example above — `speak` still ends up on `Animal.prototype`, not on each instance. `class` mainly adds cleaner syntax, enforced `new` usage, and features like private fields — it does not introduce a fundamentally different inheritance model.

---

## 7. Important Concepts

### Prototypal Inheritance Between "Classes"

```javascript
function Dog(name) {
  Animal.call(this, name); // call parent constructor
}
Dog.prototype = Object.create(Animal.prototype); // link Dog's prototype to Animal's
Dog.prototype.constructor = Dog; // fix constructor reference

Dog.prototype.bark = function () {
  console.log(`${this.name} barks!`);
};

const rex = new Dog("Rex");
rex.speak(); // inherited from Animal.prototype
rex.bark();  // defined on Dog.prototype
```

With ES6 `class`, this becomes `class Dog extends Animal { ... }` and `super(name)` — but underneath, it's the exact same `[[Prototype]]` chaining.

### `hasOwnProperty` vs `in`

`obj.hasOwnProperty(prop)` checks only the object's own properties. The `in` operator (`prop in obj`) checks the entire prototype chain — an important distinction when iterating over object properties (e.g., with `for...in`, which also traverses inherited enumerable properties unless filtered with `hasOwnProperty`).

### Modifying Built-in Prototypes (Anti-Pattern)

```javascript
Array.prototype.last = function () {
  return this[this.length - 1];
};
```

This works, but modifying built-in prototypes is widely considered an anti-pattern — it can silently conflict with other libraries or future language features that add a method with the same name.

---

## 8. Real-World Usage

- **`class` syntax in modern codebases**: virtually all object-oriented JavaScript today uses `class`, which is entirely prototype-based underneath.
- **Method sharing across instances**: any time many objects need the same behavior, prototypes ensure that behavior lives in one place in memory rather than being duplicated per instance.
- **`Object.create(null)`**: creates an object with no prototype at all, useful for pure dictionary/map-like objects that shouldn't inherit `Object.prototype` methods, avoiding key collisions (e.g., a key literally named `toString`).
- **Polyfills**: many polyfills for older browsers work by adding missing methods directly onto built-in prototypes (though this is now less common with more consistent modern browser support).

---

## 9. Best Practices

- Prefer `class` syntax for readability in modern codebases — it expresses the same prototype mechanism more clearly.
- Avoid modifying built-in prototypes (`Array.prototype`, `Object.prototype`) in production code.
- Use `Object.create(null)` for objects intended purely as dictionaries/maps to avoid inherited property collisions.
- Understand that `class` methods are non-enumerable on the prototype by default, unlike properties assigned directly with `=` inside the constructor.

---

## 10. Common Mistakes

### 1. Assuming `class` creates a fundamentally different inheritance model

Believing `class`-based JS behaves like classical inheritance in Java/C++, when in fact it's still prototype-based underneath, with some added syntactic guarantees.

### 2. Confusing `prototype` (on functions) with `[[Prototype]]` (on all objects)

Using the terms interchangeably leads to confusion — `Function.prototype` is a specific property used during `new`; every object's `[[Prototype]]` (accessed via `Object.getPrototypeOf`) is the actual chain link used for lookups.

### 3. Modifying built-in prototypes carelessly

Adding custom methods to `Array.prototype` or `Object.prototype` can silently break other code or future spec additions that use the same method name.

### 4. Forgetting `for...in` traverses inherited properties

Iterating with `for...in` without a `hasOwnProperty` check can accidentally include inherited enumerable properties from the prototype chain, not just the object's own properties.

---

## 11. Common Differences

| Concept | vs | Key Difference |
|---|---|---|
| `prototype` | `[[Prototype]]` | `prototype` is a property on functions; `[[Prototype]]` is the internal link every object has to its prototype |
| Classical inheritance | Prototypal inheritance | Classical: fixed class blueprints; Prototypal: objects link directly to other objects for shared behavior |
| `class` syntax | Constructor function + prototype | `class` is syntactic sugar over the same prototype mechanism, with cleaner syntax and enforced semantics |
| `hasOwnProperty` | `in` operator | `hasOwnProperty` checks only own properties; `in` checks the entire prototype chain |

---

## 12. Interview Questions

### Beginner

#### Q1. What is a prototype in JavaScript?

**Answer:**

A prototype is an object that another object is linked to, from which it can inherit properties and methods. When a property isn't found directly on an object, the JS engine looks up the prototype chain to find it.

#### Q2. Is `class` syntax a completely different inheritance model from prototypes?

**Answer:**

No — `class` is syntactic sugar over the same prototype-based inheritance mechanism. Methods defined in a `class` body still end up on the underlying `.prototype` object, and instance creation still follows the same `[[Prototype]]` linking that `new` has always used with constructor functions.

---

### Intermediate

#### Q3. How does the prototype chain lookup process work?

**Answer:**

When accessing a property on an object, the engine first checks if it exists directly on that object (an "own property"). If not found, it follows the object's internal `[[Prototype]]` link to the next object up the chain and checks there, repeating until the property is found or the chain ends at `null`.

#### Q4. What's the difference between `hasOwnProperty` and the `in` operator?

**Answer:**

`hasOwnProperty` checks only whether a property exists directly on the object itself, ignoring the prototype chain. The `in` operator checks the entire prototype chain, so it returns `true` even for inherited properties/methods, not just own ones.

---

### Advanced

#### Q5. What exactly happens internally when you call a function with `new`?

**Answer:**

Four steps occur: a brand-new empty object is created; that object's `[[Prototype]]` is set to the constructor function's `.prototype` property; the constructor function is invoked with `this` bound to the new object; and finally, the new object is returned automatically, unless the constructor explicitly returns a different object (a primitive return value is ignored, and the new object is returned regardless).

---

### Follow-Up Questions

#### Q6. Why is modifying built-in prototypes (like `Array.prototype`) generally discouraged?

**Answer:**

Because prototypes are shared across the entire program (and potentially across libraries loaded into the same environment), adding or overriding methods on a built-in prototype can silently conflict with other code, third-party libraries, or future JavaScript spec additions that introduce a method with the same name, leading to hard-to-diagnose bugs.

---

## 13. Scenario-Based Questions

### Scenario 1 — Unexpected Property Appearing During `for...in` Iteration

A `for...in` loop over an object unexpectedly includes a property that wasn't explicitly set on it.

**Approach:**

1. Recognize that `for...in` traverses the entire prototype chain for enumerable properties, not just own properties.
2. Add a `hasOwnProperty` check inside the loop body to filter out inherited properties, or switch to `Object.keys(obj)` / `Object.entries(obj)`, which only include own enumerable properties by default.

### Scenario 2 — Shared State Bug Across "Class" Instances

Multiple instances of a constructor function seem to share the same array/object value unexpectedly, with mutations on one instance affecting all others.

**Approach:**

1. Check whether the shared value was mistakenly defined directly on the constructor's `.prototype` object (shared across all instances) instead of being assigned inside the constructor via `this.value = ...` (unique per instance).
2. Move any per-instance mutable state (arrays, objects) into the constructor so each instance gets its own copy, reserving the prototype strictly for shared methods/behavior.

---

## 14. Practical Examples

### Example 1

Implement inheritance between two constructor functions manually using `Object.create()`, then rewrite the same relationship using ES6 `class extends`.

### Example 2

Demonstrate the difference between defining a method on an instance (via `this.method = ...` in the constructor) versus on the prototype (`Constructor.prototype.method = ...`), and compare memory/behavior implications across many instances.

### Example 3

Write a small dictionary-like object using `Object.create(null)` and show how it avoids key collisions with inherited `Object.prototype` methods like `toString`.

---

## 15. Quick Revision

- JavaScript uses prototypal inheritance: objects link to other objects, not fixed classes.
- The prototype chain is walked on every property lookup that isn't found as an own property.
- `class` syntax is sugar over the same underlying prototype mechanism — not a separate inheritance model.
- `hasOwnProperty` checks only own properties; `in` and `for...in` traverse the full prototype chain.
- Avoid modifying built-in prototypes; prefer `class` syntax and `Object.create` for explicit prototype control.

---

## 16. Interview Cheat Sheet

| Question | Remember |
|---|---|
| Why? | Enables memory-efficient shared behavior across many object instances |
| How? | [[Prototype]] chain is walked on every property lookup miss |
| When? | Any object method/property lookup; every `class`/constructor function |
| Alternative? | Composition (mixins, functional composition) instead of prototype chains |
| Production? | class hierarchies, shared utility methods, dictionary objects via Object.create(null) |
| Interview? | Explain what `new` does internally and that class is sugar over prototypes |
