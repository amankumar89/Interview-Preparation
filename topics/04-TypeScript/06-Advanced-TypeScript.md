# TypeScript — 06 Advanced TypeScript

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a conditional type?

**Interview Answer:**

A conditional type resolves to one of two branches depending on whether a type satisfies a condition.

```ts
type IsString<T> = T extends string ? true : false;
```

### Q2. What is a mapped type?

A mapped type transforms each property of an existing object type.

```ts
type ReadonlyUser<T> = {
  readonly [K in keyof T]: T[K];
};
```

### Q3. What is a discriminated union?

A discriminated union uses a common literal property to narrow differences between variants.

```ts
type Result =
  | { type: "success"; value: string }
  | { type: "error"; message: string };
```

### Q4. How does TypeScript narrow values with `in` checks?

```ts
if ("message" in error) {
  console.log(error.message);
}
```

This allows narrowing after checking that a property exists.

### Q5. What is `satisfies`?

The `satisfies` operator checks that an expression matches a type without widening it to a looser type.

```ts
const config = {
  mode: "dark",
} satisfies { mode: "light" | "dark" };
```

### Q6. What is `as const` used for?

`as const` keeps literal values and readonly properties narrow, useful for config objects and unions.

### Q7. What is template literal type?

It creates string types from template patterns.

```ts
type EventName = `on:${"click" | "change"}`;
```

### Q8. What is a recursive type?

A recursive type references itself, often used for tree-like objects or nested structures.

```ts
type Tree<T> = {
  value: T;
  children?: Tree<T>[];
};
```

### Q9. What is the purpose of `never` in advanced types?

`never` is useful for impossible cases in conditional and mapped types and for exhaustive checks.

```ts
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}
```

### Q10. What is an overload signature?

Function overloads allow a single function implementation to support different parameter/return shapes.

```ts
function format(value: string): string;
function format(value: number): string;
```

## Intermediate Topics

### Q11. Why is `keyof` powerful in advanced TypeScript?

It allows you to create generic utilities that operate on object keys without hardcoding property names.

### Q12. What is the difference between structural typing and nominal typing?

TypeScript is structurally typed: compatibility is based on shape, not names. Nominal typing requires explicit type names.

### Q13. What are declaration merging and advanced interfaces used for?

They allow adding members to existing interfaces, which is useful in library augmentation and framework extension patterns.

### Q14. When are advanced types harder to maintain?

Overly clever conditional or mapped types can become difficult for teammates to understand, especially if they are not documented well.

## Production and Debugging

### Q15. How do you debug complex TypeScript types?

Use incremental type inspection, simplify the type in a small example, and break down conditional and mapped types into readable chunks.

### Q16. Why is readability important in advanced TypeScript?

Complex types reduce maintainability if they are too clever or hidden behind abstractions. Strong developer ergonomics matter in long-lived systems.

### Q17. What patterns help keep advanced types maintainable?

Use small named types, keep generic constraints simple, document assumptions, and avoid deep conditional nesting unless necessary.

### Q18. How does advanced TypeScript support large-scale application design?

It creates reusable contracts, supports team-wide consistency, and allows safe refactoring of shared domain logic across APIs, services, and UI layers.
