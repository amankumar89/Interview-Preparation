# Functions in TypeScript

TypeScript adds precise type information to JavaScript functions, including parameter types, return types, optional parameters, rest parameters, overloads, and generic relationships. Correct function typing makes APIs easier to use and prevents invalid calls at compile time.

## Parameter and Return Types

The basic form is:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Parameter types are usually required under strict settings.

The return type can often be inferred:

```ts
function add(a: number, b: number) {
  return a + b;
}
```

Explicit return types are valuable for public APIs, callbacks with important contracts, and functions where you want the implementation checked against a specific return shape.

## Function Type Aliases

A function itself can have a type.

```ts
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;
```

The function type describes the callable signature.

## Function Interfaces

An interface can also describe a callable object.

```ts
interface Formatter {
  (value: string): string;
}

const uppercase: Formatter = value => value.toUpperCase();
```

Interfaces can also contain properties alongside call signatures.

```ts
interface Logger {
  (message: string): void;
  level: "info" | "error";
}
```

## Optional Parameters

Optional parameters use `?`.

```ts
function greet(name: string, title?: string) {
  if (title) {
    return `Hello ${title} ${name}`;
  }

  return `Hello ${name}`;
}
```

An optional parameter is effectively `T | undefined` for the function body.

Required parameters generally need to come before optional parameters.

## Default Parameters

Default values make parameters optional at the call site.

```ts
function createPage(size: number = 20) {
  return size;
}

createPage();
createPage(50);
```

The parameter's type is inferred from the default value when possible.

## Rest Parameters

Rest parameters collect multiple arguments into an array.

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, value) => total + value, 0);
}

sum(1, 2, 3, 4);
```

A tuple can type a fixed rest signature:

```ts
function log(...args: [string, number]) {}

log("age", 26);
```

## Function Overloads

Overloads provide multiple call signatures for one implementation.

```ts
function getValue(id: number): User;
function getValue(name: string): User;
function getValue(value: number | string): User {
  // implementation
  return findUser(value);
}
```

Callers see the overload signatures rather than the implementation signature.

Overloads are useful when the relationship between input and output differs across call patterns.

## Generic Functions

Generics preserve relationships between input and output types.

```ts
function wrap<T>(value: T): T[] {
  return [value];
}

const numbers = wrap(10);
const names = wrap("Aman");
```

Without generics, using `any` would lose this relationship.

## Callback Functions

Callback parameters can be typed explicitly.

```ts
function processUsers(
  users: User[],
  callback: (user: User) => void
) {
  for (const user of users) {
    callback(user);
  }
}
```

When using array methods, TypeScript generally infers callback parameter types.

```ts
const names = users.map(user => user.name);
```

## `void` Callback Behavior

A function returning a value can sometimes be passed where a `void` callback is expected.

```ts
const values = [1, 2, 3];

values.forEach(value => value * 2);
```

`forEach` ignores the callback's returned value.

This does not mean the callback cannot return a value at runtime; it means the caller does not use that value.

## `never` Return Type

Use `never` for functions that cannot complete normally.

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

This is useful for exhaustive checks and impossible branches.

## `this` Parameter

TypeScript supports a fake first parameter used only for type checking `this`.

```ts
function printName(this: User) {
  console.log(this.name);
}
```

The `this` parameter is not emitted as a real runtime argument.

## Rest, Optional, and Overload Design

Function APIs should model real call behavior instead of accepting overly broad types.

Poor design:

```ts
function request(
  url: string,
  options?: any
) {}
```

Better:

```ts
interface RequestOptions {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
}

function request(url: string, options?: RequestOptions) {}
```

Strong function types improve autocomplete and prevent invalid calls.

## Key Takeaways

- Function parameters and return values can be explicitly typed.
- Function types describe callable signatures and can be expressed with `type` or `interface`.
- Optional parameters introduce `undefined`; default parameters provide fallback values.
- Rest parameters collect arguments into typed arrays or tuples.
- Overloads model multiple valid call signatures.
- Generics preserve relationships between function inputs and outputs.
- `never` represents functions that cannot return normally.

## Practice Questions

1. What is the difference between a function type and a function implementation?
2. When should you use function overloads?
3. Write a generic function that returns the first element of an array.
4. How are optional and default parameters different?
5. What does `never` mean as a function return type?
