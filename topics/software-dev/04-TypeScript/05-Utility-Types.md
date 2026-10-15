# TypeScript — 05 Utility Types

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are utility types in TypeScript?

**Interview Answer:**

Utility types are built-in generic types that transform existing types into new ones without rewriting the original definition.

### Q2. What does `Partial<T>` do?

`Partial<T>` makes all properties optional.

```ts
type User = { id: number; name: string; email: string };
type PartialUser = Partial<User>;
```

### Q3. What does `Required<T>` do?

It makes all properties required.

```ts
type MaybeUser = { id?: number; name?: string };
type User = Required<MaybeUser>;
```

### Q4. What does `Readonly<T>` do?

It makes all properties readonly.

```ts
const user: Readonly<User> = { id: 1, name: "Aman" };
```

### Q5. What does `Pick<T, K>` do?

It creates a new type with only selected keys.

```ts
type User = { id: number; name: string; email: string };
type UserName = Pick<User, "id" | "name">;
```

### Q6. What does `Omit<T, K>` do?

It creates a new type without specific keys.

```ts
type UserWithoutEmail = Omit<User, "email">;
```

### Q7. What does `Record<K, T>` do?

It creates an object type where each key in `K` maps to type `T`.

```ts
const roles: Record<string, "admin" | "user"> = {
  a: "admin",
};
```

### Q8. What does `Exclude<T, U>` do?

It removes types from `T` that are assignable to `U`.

```ts
type Result = string | number | boolean;
type TextOnly = Exclude<Result, number | boolean>;
```

### Q9. What does `Extract<T, U>` do?

It keeps only the types in `T` that are assignable to `U`.

```ts
type OnlyStrings = Extract<string | number, string>;
```

### Q10. What does `NonNullable<T>` do?

It removes `null` and `undefined` from a type.

```ts
type SafeValue = NonNullable<string | null | undefined>;
```

## Intermediate Topics

### Q11. What does `ReturnType<T>` do?

It extracts the return type of a function type.

```ts
type Fn = () => number;
type R = ReturnType<Fn>;
```

### Q12. What does `Parameters<T>` do?

It extracts the parameter tuple of a function type.

```ts
type Args = Parameters<(a: string, b: number) => void>;
```

### Q13. What does `Awaited<T>` do?

It unwraps `Promise` and nested promise values.

```ts
type Value = Awaited<Promise<Promise<string>>>;
```

### Q14. What does `ThisParameterType` do?

It extracts the type of the `this` parameter from a function type.

### Q15. What does `ThisType<T>` do?

It marks a function's `this` type in object methods.

### Q16. What is the benefit of mapped types?

Mapped types let you transform object properties in a reusable way. They are the foundation for many built-in utility types.

```ts
type ReadonlyKeys<T> = {
  readonly [K in keyof T]: T[K];
};
```

## Production and Debugging

### Q17. What is a common misuse of utility types?

Using `any`, `Partial` without checking constraints, or overusing broad utility transformations can reduce the effectiveness of static checks.

### Q18. Why are utility types important in large apps?

They help model domain transformations cleanly, reduce duplication, and keep API contracts consistent across services, forms, and UI state.
