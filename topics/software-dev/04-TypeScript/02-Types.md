# TypeScript — 02 Types

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are the built-in primitive types in TypeScript?

**Interview Answer:**

TypeScript includes primitive types such as `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`, and `void`.

```ts
const name: string = "Aman";
const age: number = 28;
const isAdmin: boolean = true;
```

### Q2. What is a union type?

A union allows a variable to be one of several types.

```ts
let status: "success" | "error" | "loading";
status = "success";
```

### Q3. What is an intersection type?

An intersection combines multiple types into one, requiring all properties from each to exist.

```ts
type User = { name: string };
type Admin = { isAdmin: boolean };
type AdminUser = User & Admin;
```

### Q4. What is a literal type?

A literal type restricts a variable to a specific value.

```ts
let mode: "light" | "dark" = "light";
```

### Q5. What is a tuple?

A tuple is an array with a fixed number of positions and known types.

```ts
const user: [string, number] = ["Aman", 28];
```

### Q6. What is an enum?

An enum defines a named set of constants.

```ts
enum Role {
  Admin,
  User,
}
```

### Q7. What is `any` and when should you avoid it?

`any` disables type checks and removes the safety contracts that TypeScript provides. It should be avoided in production code unless working with untyped third-party data.

### Q8. What is `unknown`, and why is it safer than `any`?

`unknown` means the value could be anything, and the compiler forces narrowing before use.

```ts
function logValue(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

### Q9. What is `void` used for?

`void` is used for functions that return no value.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

### Q10. What is a type alias?

A type alias creates a named type that can be reused.

```ts
type ID = string | number;
```

## Intermediate Concepts

### Q11. What is the difference between `string[]` and `Array<string>`?

They are equivalent in TypeScript. The first is the shorthand array syntax; the second is the generic form.

### Q12. What is the difference between `null`, `undefined`, and `void`?

`null` and `undefined` represent missing values. `void` indicates a function does not return a meaningful value. In strict mode, these are handled more carefully.

### Q13. What is a type guard?

A type guard narrows a broad type into a more specific type.

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

### Q14. What does `as const` do?

`as const` narrows values to literal types and prevents widening.

```ts
const config = {
  mode: "dark",
} as const;
```

### Q15. What is a function type?

A function type describes a callable signature.

```ts
type Formatter = (value: string) => string;
```

### Q16. What are object types?

These are shapes with required or optional properties.

```ts
type User = {
  id: number;
  name: string;
  age?: number;
};
```

### Q17. What is narrowing?

Narrowing reduces a wider type into something more specific using conditions, type guards, or `in` checks.

```ts
if (typeof input === "string") {
  input.toUpperCase();
}
```

### Q18. Why is `strictNullChecks` important?

It prevents common runtime errors by forcing developers to handle `null` and `undefined` explicitly.

```ts
const value: string | null = null;
```

## Production and Debugging

### Q19. How do you avoid bugs caused by broad types?

Prefer specific types, use unions instead of `any`, and narrow values before using them. This makes code more predictable and easier to refactor.

### Q20. What is the common issue with `any` in production code?

It removes the compiler's safety net and can silently hide errors until runtime, which makes bugs more expensive to detect and fix.
