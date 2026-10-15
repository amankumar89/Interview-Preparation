# TypeScript — 03 Interfaces

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an interface in TypeScript?

**Interview Answer:**

An interface defines the structure of an object. It describes which properties and methods an object must have.

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

### Q2. How is an interface different from a type alias?

Both can define structure, but interfaces are commonly used for object shapes and support declaration merging. Type aliases are more flexible for unions and mapped types.

```ts
interface Product {
  id: number;
}

type ProductDTO = {
  id: number;
};
```

### Q3. What is optional property syntax?

Use `?` to make a property optional.

```ts
interface User {
  name: string;
  age?: number;
}
```

### Q4. What are readonly properties?

Readonly properties cannot be reassigned after initialization.

```ts
interface User {
  readonly id: number;
}
```

### Q5. Can interfaces extend other interfaces?

Yes. Interfaces can inherit from other interfaces.

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

### Q6. What is declaration merging?

TypeScript merges multiple interface declarations with the same name into one combined definition.

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

### Q7. How do interfaces model function signatures?

```ts
interface SearchFn {
  (value: string): boolean;
}
```

This defines a function type with specific parameter and return signatures.

### Q8. What is an index signature?

An index signature allows an object to have dynamic keys.

```ts
interface Dictionary {
  [key: string]: string;
}
```

### Q9. How do interfaces relate to classes?

Classes can implement interfaces to guarantee a specific structure.

```ts
interface Vehicle {
  start(): void;
}

class Car implements Vehicle {
  start() {
    console.log("Starting");
  }
}
```

### Q10. What is a hybrid type?

A hybrid type is an object that can act both like a function and like an object. Interfaces can represent this using method and property signatures.

```ts
interface Counter {
  (start: number): string;
  interval: number;
}
```

## Intermediate Topics

### Q11. Why are interfaces useful for API contracts?

They document the shape of request and response objects, making it easier for teams to maintain contracts across components and services.

### Q12. What is the difference between `interface` and `class` in TypeScript?

A class also creates runtime behavior and can have implementations. An interface is erased at compile time and exists only for type checking.

### Q13. Can interfaces describe arrays or tuples?

Interfaces can describe array-like objects, but tuples are often better modeled with a tuple type or an array interface.

```ts
interface NumberList {
  [index: number]: number;
}
```

### Q14. What is the role of optional methods in interfaces?

Optional methods make the interface more flexible for implementations that do not need every capability.

```ts
interface Logger {
  log?(message: string): void;
}
```

### Q15. What is the difference between a required and optional property in an interface?

Required properties must be provided when the object is created or passed. Optional properties are not required, but can be checked before use.

### Q16. How do interfaces help with refactoring?

When a shared contract changes, TypeScript can flag each implementation or use site that no longer fits, reducing breakage in large projects.

## Advanced and Production

### Q17. What problems do interfaces solve in real-world codebases?

They reduce context switching, communicate expected contracts, and prevent invalid object shapes inside large systems.

### Q18. When should you prefer a type alias over an interface?

Use a type alias when you need unions, intersections, literal types, or mapped/conditional types. Use an interface for object shapes and extensibility.
