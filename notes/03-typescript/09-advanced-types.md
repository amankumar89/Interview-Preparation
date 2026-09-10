# Advanced Types

Advanced TypeScript types let you derive new types from existing types and express relationships that are difficult to model with simple annotations. Important features include **keyof, indexed access types, mapped types, conditional types, template literal types, infer, and recursive types**.

## `keyof`

`keyof` produces a union of property keys from a type.

```ts
type User = {
  id: number;
  name: string;
  active: boolean;
};

type UserKey = keyof User;
// "id" | "name" | "active"
```

It is useful for safe dynamic property access.

```ts
function getValue<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

## Indexed Access Types

Indexed access types retrieve a property type.

```ts
type User = {
  id: number;
  name: string;
};

type UserId = User["id"];
// number
```

With a union of keys:

```ts
type UserValue = User[keyof User];
// number | string
```

This is useful when deriving types instead of repeating them.

## Mapped Types

Mapped types transform every property in another type.

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

This is conceptually similar to `Partial<T>`.

A readonly version:

```ts
type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};
```

Mapped types can also selectively transform properties.

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

## Conditional Types

Conditional types select one type or another based on a condition.

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

The general form is:

```ts
T extends U ? X : Y
```

It behaves similarly to a type-level `if`.

## Distributive Conditional Types

Conditional types distribute over naked type parameters.

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]
```

This behavior is important when transforming union members individually.

## `infer`

`infer` lets a conditional type capture part of another type.

```ts
type ElementType<T> =
  T extends (infer U)[] ? U : never;

type Value = ElementType<string[]>;
// string
```

A common real-world example extracts a promise result:

```ts
type UnwrapPromise<T> =
  T extends Promise<infer U> ? U : T;
```

Modern TypeScript also provides `Awaited<T>` for common promise-unwrapping behavior.

## Template Literal Types

Template literal types build string unions from other literal types.

```ts
type Color = "red" | "blue";
type Size = "small" | "large";

type Variant = `${Color}-${Size}`;
```

The resulting union includes:

```text
"red-small"
"red-large"
"blue-small"
"blue-large"
```

They are useful for event names, CSS-like tokens, route patterns, and generated property names.

## Key Remapping

Mapped types can rename keys using `as`.

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = {
  name: string;
  age: number;
};

type UserGetters = Getters<User>;
```

Conceptually this produces:

```ts
type UserGetters = {
  getName: () => string;
  getAge: () => number;
};
```

## `satisfies`

The `satisfies` operator checks that an expression conforms to a type without unnecessarily widening the expression's inferred type.

```ts
type Config = {
  mode: "development" | "production";
  port: number;
};

const config = {
  mode: "development",
  port: 3000,
} satisfies Config;
```

This is useful for configuration objects where you want validation while preserving precise inferred property types.

Compare with an annotation:

```ts
const config: Config = {
  mode: "development",
  port: 3000,
};
```

The annotation explicitly gives the variable the `Config` type. `satisfies` primarily validates compatibility while retaining the expression's own inferred type.

## `as const`

`as const` requests deeply readonly literal inference for the expression.

```ts
const routes = {
  home: "/",
  users: "/users",
} as const;
```

This preserves literal values rather than widening them to `string`.

```ts
type Route = typeof routes[keyof typeof routes];
// "/" | "/users"
```

## `typeof` in Type Positions

`typeof` can derive a type from a value.

```ts
const user = {
  id: 1,
  name: "Aman",
};

type User = typeof user;
```

This is useful when a runtime constant should be the source of truth for a corresponding type.

## Recursive Types

A type can reference itself.

```ts
type TreeNode = {
  value: string;
  children: TreeNode[];
};
```

This models recursive structures such as trees, nested menus, comments, and file systems.

Another example:

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
```

Recursive types should be designed carefully because very complex recursive type computations can make compiler errors difficult to understand.

## Branded Types

TypeScript's structural typing can sometimes allow values that are technically the same primitive but represent different domain concepts.

A common pattern is branding:

```ts
type UserId = string & {
  readonly __brand: "UserId";
};

type OrderId = string & {
  readonly __brand: "OrderId";
};

function getUser(id: UserId) {}

function toUserId(value: string): UserId {
  return value as UserId;
}
```

Now `UserId` and `OrderId` are treated as distinct types by TypeScript even though both are represented by strings at runtime.

Branding is a compile-time technique; it does not automatically validate the value.

## Type-Level Composition

Advanced types are often combined.

```ts
type ApiResponse<T> = {
  data: T;
  success: boolean;
};

type User = {
  id: number;
  name: string;
};

type UserResponse = ApiResponse<User>;
```

A more dynamic transformation might combine `keyof`, mapped types, and conditional types.

The important principle is to use advanced types when they make a domain contract clearer, not merely because a type-level trick is possible.

## Key Takeaways

- `keyof` extracts property keys; indexed access extracts property types.
- Mapped types transform properties systematically.
- Conditional types provide type-level branching.
- `infer` captures types inside conditional expressions.
- Template literal types generate precise string unions.
- `satisfies` validates compatibility while preserving useful inference.
- `as const` preserves literal values and readonly inference.
- Recursive and branded types can model complex domain structures.
- Advanced types should improve correctness and maintainability, not just demonstrate type-system complexity.

## Practice Questions

1. What does `keyof User` produce for an object type?
2. Write a mapped type that makes every property nullable.
3. Explain how conditional types differ from ordinary runtime `if` statements.
4. Use `infer` to extract the element type from an array.
5. What problem does `satisfies` solve compared with a normal type annotation?
6. Why might branded types be useful for IDs?
