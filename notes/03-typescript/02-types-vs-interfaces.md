# Types vs Interfaces in TypeScript

**Type aliases** and **interfaces** both describe shapes in TypeScript, but they have different capabilities and extension models. Understanding their differences helps you choose a clear design for domain models, API contracts, React props, and library code.

## Type Aliases

A type alias gives a name to any TypeScript type.

```ts
type User = {
  id: number;
  name: string;
};

type ID = string | number;
type Status = "active" | "inactive";
```

Unlike interfaces, type aliases can directly represent unions, intersections, tuples, primitive aliases, and other type expressions.

```ts
type Coordinates = [number, number];

type Result =
  | { success: true; data: string }
  | { success: false; error: string };
```

## Interfaces

An interface primarily describes an object shape.

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

Properties can be optional or readonly.

```ts
interface User {
  readonly id: number;
  name: string;
  phone?: string;
}
```

Methods can also be described:

```ts
interface UserService {
  findById(id: number): Promise<User>;
  delete(id: number): Promise<void>;
}
```

## Extending Interfaces

Interfaces can extend one or more interfaces.

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}
```

This is useful when modeling related object contracts.

## Intersections with Types

Type aliases can compose shapes using intersections.

```ts
type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
};
```

Both approaches can express composition, but intersection types also work naturally with unions and non-object types.

## Declaration Merging

Interfaces support **declaration merging**.

```ts
interface User {
  id: number;
}

interface User {
  name: string;
}
```

The resulting interface has both properties.

```ts
const user: User = {
  id: 1,
  name: "Aman",
};
```

Type aliases cannot be redeclared with the same name.

```ts
type User = { id: number };
// type User = { name: string }; // Error
```

Declaration merging is useful in some library and framework extension scenarios, but it can also make types harder to trace if overused.

## Type vs Interface: Practical Differences

The most important distinctions are:

| Capability | `type` | `interface` |
| --- | --- | --- |
| Object shape | Yes | Yes |
| Union | Yes | No direct union declaration |
| Intersection | Yes | Via `extends` for interfaces |
| Tuple | Yes | Not naturally |
| Primitive alias | Yes | No |
| Declaration merging | No | Yes |
| `extends` | No | Yes |
| Mapped/conditional types | Yes | No direct equivalent |

The choice is not usually about performance. It is primarily about expressiveness and maintainability.

## Which Should You Use?

A practical rule:

Use **`interface`** when you are primarily describing an extensible object contract.

```ts
interface User {
  id: number;
  name: string;
}
```

Use **`type`** when you need unions, intersections, tuples, mapped types, conditional types, or aliases of non-object values.

```ts
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

Both are valid for many object models. Consistency within a codebase is often more valuable than enforcing one keyword everywhere.

## `extends` vs Intersection

Interface extension:

```ts
interface Base {
  id: number;
}

interface User extends Base {
  name: string;
}
```

Intersection:

```ts
type Base = {
  id: number;
};

type User = Base & {
  name: string;
};
```

A key difference appears when properties conflict.

```ts
interface A {
  value: string;
}

interface B extends A {
  // value: number; // incompatible override
}
```

With intersections:

```ts
type A = { value: string };
type B = A & { value: number };
```

The resulting property can become effectively unusable because a value would need to satisfy both `string` and `number`.

## Index Signatures

Interfaces can describe dynamic keys.

```ts
interface ErrorMap {
  [field: string]: string;
}

const errors: ErrorMap = {
  email: "Invalid email",
  password: "Too short",
};
```

Type aliases can also use index signatures:

```ts
type ErrorMap = {
  [field: string]: string;
};
```

For unrestricted dynamic dictionaries, `Record<string, string>` is another common option.

## React Props

Both styles work for React props.

```ts
interface ButtonProps {
  label: string;
  disabled?: boolean;
}

type CardProps = {
  title: string;
  children: React.ReactNode;
};
```

Choose the style that matches the project's conventions. There is no general TypeScript rule that React props must use interfaces.

## Key Takeaways

- `type` can represent virtually any type expression, including unions and tuples.
- `interface` is primarily an object contract and supports declaration merging.
- Interfaces can extend other interfaces.
- Type aliases compose types naturally with intersections.
- Neither keyword is universally better.
- Prefer consistency and choose based on the type's required features.

## Practice Questions

1. What can a `type` alias represent that an `interface` cannot directly represent?
2. What is declaration merging, and why can it be useful?
3. Compare `interface A extends B` with `type A = B & C`.
4. Would you use `type` or `interface` for a string union such as `"pending" | "success"`? Why?
5. Can React props be represented with both `type` and `interface`?
