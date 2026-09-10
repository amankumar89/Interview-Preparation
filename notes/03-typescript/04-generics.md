# Generics

**Generics** allow TypeScript code to work with different types while preserving relationships between those types. They are essential for reusable functions, collections, API wrappers, React components, and utility abstractions.

## Generic Functions

A generic function introduces a type parameter.

```ts
function identity<T>(value: T): T {
  return value;
}

const name = identity("Aman"); // string
const age = identity(26);      // number
```

`T` is a placeholder for a type chosen when the function is used.

## Type Inference with Generics

TypeScript often infers generic parameters from arguments.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const number = first([1, 2, 3]);       // number | undefined
const name = first(["Aman", "Rahul"]); // string | undefined
```

You can also specify the type explicitly:

```ts
const value = identity<number>(100);
```

Explicit generic arguments are useful when inference is ambiguous or when you want to communicate intent.

## Generic Constraints

A generic can be restricted with `extends`.

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");
getLength([1, 2, 3]);
```

The constraint does not mean `T` must equal the constraint. It means `T` must contain at least the required structure.

## `keyof` with Generics

A common pattern is restricting a key to properties that actually exist on an object.

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const user = {
  id: 1,
  name: "Aman",
};

const name = getProperty(user, "name");
```

This preserves the relationship between the selected key and returned property type.

## Generic Interfaces and Types

Generics are not limited to functions.

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

type User = {
  id: number;
  name: string;
};

const response: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "Aman",
  },
};
```

This is useful for reusable API response models.

## Generic Classes

Classes can also be generic.

```ts
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box(10);
const stringBox = new Box("hello");
```

The class preserves the type of the stored value.

## Multiple Type Parameters

A generic can use several parameters.

```ts
function mapValue<T, U>(
  value: T,
  mapper: (value: T) => U
): U {
  return mapper(value);
}

const length = mapValue("hello", value => value.length);
```

Here `T` is the input type and `U` is the transformed output type.

## Default Generic Parameters

A generic type parameter can have a default.

```ts
interface PaginatedResponse<T = string> {
  items: T[];
  total: number;
}

const response: PaginatedResponse = {
  items: ["a", "b"],
  total: 2,
};
```

Defaults are useful when one type is common but customization should remain possible.

## Generic Collections

Generics are built into many TypeScript collection types.

```ts
const users: Array<User> = [];
const cache: Map<string, User> = new Map();
const ids: Set<number> = new Set();
```

The generic parameter tells TypeScript what the collection contains.

## Generic API Client

A generic API wrapper can preserve response types.

```ts
async function get<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

type User = {
  id: number;
  name: string;
};

const user = await get<User>("/api/users/1");
```

The generic describes the expected response at the TypeScript level. It does not validate the server's JSON at runtime.

## Generic Constraints and Defaults Together

Larger abstractions often combine multiple generic features.

```ts
type Entity = {
  id: string;
};

class Repository<T extends Entity> {
  private items: T[] = [];

  save(item: T) {
    this.items.push(item);
  }

  findById(id: T["id"]): T | undefined {
    return this.items.find(item => item.id === id);
  }
}
```

The constraint guarantees that every repository entity has an `id`.

## Key Takeaways

- Generics preserve type information while enabling reusable code.
- TypeScript can often infer generic parameters automatically.
- `extends` constrains generic parameters without forcing them to equal the constraint.
- `keyof` and indexed access types create strong key-value relationships.
- Generic types can be used with functions, classes, interfaces, and type aliases.
- Generic API models improve compile-time consistency but do not validate runtime data.

## Practice Questions

1. What problem do generics solve that `any` does not?
2. Write a generic function that returns the last element of an array.
3. Why would you use `K extends keyof T`?
4. What is the purpose of a generic constraint?
5. Design a generic `ApiResponse<T>` type for paginated API responses.
