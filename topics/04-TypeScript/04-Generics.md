# TypeScript — 04 Generics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a generic in TypeScript?

**Interview Answer:**

A generic lets a function, class, or interface work with multiple types while preserving type safety.

```ts
function identity<T>(value: T): T {
  return value;
}
```

### Q2. Why are generics useful?

Generics allow code to be reusable across different types without losing type information.

```ts
const a = identity<string>("hello");
const b = identity<number>(42);
```

### Q3. What is a generic constraint?

A generic constraint restricts the type parameter to a specific shape.

```ts
function logLength<T extends { length: number }>(value: T) {
  console.log(value.length);
}
```

### Q4. What is the difference between a generic and a union type?

A union accepts one of several types at a specific value. A generic creates type variables that can be reused across many values while preserving relationship between inputs and outputs.

### Q5. What is a generic interface?

```ts
interface Box<T> {
  value: T;
}
```

This describes a container whose value type can vary.

### Q6. Can a generic function infer the type automatically?

Yes. TypeScript often infers the type from the arguments.

```ts
const result = identity(123);
```

### Q7. What is a default generic parameter?

You can provide a fallback type when none is specified.

```ts
interface Result<T = string> {
  value: T;
}
```

### Q8. What is the type of a generic function's return value?

It is tied to the generic parameter, preserving type relationships.

```ts
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}
```

### Q9. What is `keyof` used for?

`keyof` produces a union of keys for a type.

```ts
type UserKeys = keyof { id: number; name: string };
// "id" | "name"
```

### Q10. What is `typeof` used for in TypeScript?

`typeof` obtains the type of a value, which is useful when reusing a concrete value's structure in another type.

```ts
const person = { name: "Aman" };
type Person = typeof person;
```

## Intermediate Concepts

### Q11. What is a generic class?

A generic class accepts a type parameter for its members.

```ts
class Box<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}
```

### Q12. What is the purpose of `extends` in generic constraints?

It limits the allowed generic types to those that satisfy a specific contract.

```ts
function getLength<T extends { length: number }>(value: T) {
  return value.length;
}
```

### Q13. What are utility generics in TypeScript?

Utility generics are built-in generic types like `Partial`, `Pick`, `Record`, and `Omit` that solve common transformation problems.

### Q14. What is `infer` in conditional types?

`infer` allows TypeScript to infer a type from another type inside a conditional type.

```ts
type Unwrap<T> = T extends Promise<infer U> ? U : T;
```

### Q15. How do generics help with API responses?

They let you model response shapes in a reusable way and keep `data` strongly typed without duplicating interfaces.

## Advanced and Production

### Q16. What is a common generic anti-pattern?

Overusing generic constraints or extremely broad types can make the code difficult to read and may reduce type safety rather than improve it.

### Q17. Why are generic types important in libraries?

Libraries need to support many input shapes while preserving predictable return types and avoiding repeated boilerplate.

### Q18. How do generics improve maintainability?

They let you write reusable abstractions without sacrificing correctness, especially in utility functions, data structures, and shared framework hooks.
