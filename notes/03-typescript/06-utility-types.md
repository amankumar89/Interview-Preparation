# Utility Types

TypeScript provides built-in **utility types** for transforming existing types instead of rewriting them manually. They are heavily used in application models, API contracts, forms, React props, and reusable libraries.

## Partial

`Partial<T>` makes all properties optional.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserUpdate = Partial<User>;
```

This is useful for update operations:

```ts
function updateUser(id: number, changes: Partial<User>) {
  // update only supplied fields
}
```

`Partial<User>` is conceptually similar to:

```ts
type UserUpdate = {
  id?: number;
  name?: string;
  email?: string;
};
```

## Required

`Required<T>` makes all properties required.

```ts
interface Config {
  host?: string;
  port?: number;
}

type CompleteConfig = Required<Config>;
```

## Readonly

`Readonly<T>` prevents assignment to properties through the resulting type.

```ts
type User = {
  id: number;
  name: string;
};

const user: Readonly<User> = {
  id: 1,
  name: "Aman",
};

// user.name = "Rahul"; // Error
```

This is a compile-time restriction; it does not automatically deep-freeze the runtime object.

## Pick

`Pick<T, K>` creates a type containing only selected properties.

```ts
type User = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

type PublicUser = Pick<User, "id" | "name" | "email">;
```

This is useful when exposing only a subset of a larger domain model.

## Omit

`Omit<T, K>` removes selected properties.

```ts
type UserWithoutPassword = Omit<User, "passwordHash">;
```

`Pick` says "keep these"; `Omit` says "remove these."

## Record

`Record<K, T>` creates an object type whose keys come from `K` and values are `T`.

```ts
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  guest: ["read"],
};
```

It is useful for maps and configuration dictionaries with known key sets.

## Exclude

`Exclude<T, U>` removes union members assignable to `U`.

```ts
type Status = "pending" | "success" | "error";

type FinishedStatus = Exclude<Status, "pending">;
```

`FinishedStatus` becomes:

```ts
"success" | "error"
```

## Extract

`Extract<T, U>` keeps union members assignable to `U`.

```ts
type A = "a" | "b" | "c";
type B = "b" | "c" | "d";

type Common = Extract<A, B>;
```

`Common` becomes `"b" | "c"`.

## NonNullable

`NonNullable<T>` removes `null` and `undefined`.

```ts
type Value = string | null | undefined;

type PresentValue = NonNullable<Value>;
```

The result is `string`.

## ReturnType

`ReturnType<T>` extracts a function's return type.

```ts
function createUser() {
  return {
    id: 1,
    name: "Aman",
  };
}

type User = ReturnType<typeof createUser>;
```

This can reduce duplication when a type naturally follows a function implementation.

## Parameters

`Parameters<T>` extracts a function's parameter tuple.

```ts
function createUser(name: string, age: number) {}

type CreateUserArgs = Parameters<typeof createUser>;
```

The resulting type is equivalent to:

```ts
[string, number]
```

## Awaited

`Awaited<T>` models the type obtained after awaiting a promise-like value.

```ts
type Result = Awaited<Promise<string>>;
// string
```

It is useful for deriving asynchronous result types.

## Combining Utility Types

Utility types can be composed.

```ts
type User = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
};

type UserForm = Partial<Omit<User, "id" | "passwordHash">>;
```

This creates a type where editable public user fields are optional.

## Utility Types vs Manual Types

Manual type:

```ts
type UserUpdate = {
  name?: string;
  email?: string;
};
```

Derived type:

```ts
type UserUpdate = Partial<Pick<User, "name" | "email">>;
```

The derived version stays connected to the source type, reducing duplication when the model changes.

## Key Takeaways

- Utility types transform existing types and reduce repetitive declarations.
- `Partial`, `Required`, and `Readonly` change property modifiers.
- `Pick` selects properties; `Omit` removes properties.
- `Record` models maps with controlled keys and value types.
- `Exclude`, `Extract`, and `NonNullable` transform unions.
- `ReturnType` and `Parameters` derive types from functions.
- Utility types can be composed to model real application requirements.

## Practice Questions

1. What is the difference between `Pick<User, "name">` and `Omit<User, "name">`?
2. How would you create an update type where every User property is optional except `id`?
3. What does `Exclude<"a" | "b" | "c", "b">` produce?
4. When would `Record` be preferable to a generic string index signature?
5. What is the benefit of deriving a type with `ReturnType`?
