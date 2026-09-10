# Type Narrowing

**Type narrowing** is the process of refining a broad TypeScript type into a more specific type based on runtime checks or control flow. It allows TypeScript to safely determine which operations are valid at a particular point in the program.

## Why Narrowing Is Needed

Suppose a value can be a string or number:

```ts
function format(value: string | number) {
  return value.toUpperCase();
}
```

This is invalid because numbers do not have `toUpperCase`.

Narrowing fixes this:

```ts
function format(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

## `typeof` Narrowing

`typeof` is useful for JavaScript primitive types.

```ts
function print(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else if (typeof value === "boolean") {
    console.log(value ? "yes" : "no");
  }
}
```

Typical results include `"string"`, `"number"`, `"boolean"`, `"bigint"`, `"symbol"`, `"undefined"`, `"function"`, and `"object"`.

Remember that `typeof null` is `"object"` because of a historical JavaScript behavior.

## Equality Narrowing

Equality checks can narrow values.

```ts
function format(value: string | null) {
  if (value === null) {
    return "No value";
  }

  return value.toUpperCase();
}
```

Strict equality checks are usually preferable because they avoid JavaScript's coercion rules.

## Truthiness Narrowing

Truthiness checks can remove values such as `null` and `undefined`.

```ts
function printName(name?: string) {
  if (name) {
    console.log(name.toUpperCase());
  }
}
```

Be careful: truthiness also treats `""`, `0`, and `false` as falsy. If those are valid values, an explicit check may be more appropriate.

## `in` Operator

The `in` operator can distinguish object variants based on property existence.

```ts
type Card = {
  cardNumber: string;
};

type UPI = {
  upiId: string;
};

function pay(method: Card | UPI) {
  if ("cardNumber" in method) {
    console.log(method.cardNumber);
  } else {
    console.log(method.upiId);
  }
}
```

## `instanceof`

`instanceof` checks whether an object is associated with a constructor's prototype chain.

```ts
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

This is particularly useful for built-in classes such as `Error`, `Date`, and custom classes.

## Discriminated Unions

A common and reliable pattern is a shared literal discriminator.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}
```

The `kind` check narrows the object to the corresponding member.

## User-Defined Type Guards

A function can communicate a narrowing rule using a **type predicate**.

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function print(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

The return type `value is string` tells TypeScript that a `true` result means the parameter is a string.

## Assertion Functions

An assertion function can tell TypeScript that execution only continues if a condition is satisfied.

```ts
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected a string");
  }
}

function process(value: unknown) {
  assertString(value);
  console.log(value.toUpperCase());
}
```

This is useful for validation boundaries.

## Control-Flow Analysis

TypeScript tracks conditions, assignments, returns, and branches.

```ts
function example(value: string | number) {
  if (typeof value === "string") {
    return value.length;
  }

  return value.toFixed(2);
}
```

Inside each branch, TypeScript understands the narrowed type.

Early returns are often a clean way to narrow:

```ts
function process(user: User | null) {
  if (!user) {
    return;
  }

  console.log(user.name);
}
```

## Narrowing `unknown`

`unknown` forces callers to prove what a value is before using it.

```ts
function parseInput(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof value.name === "string"
  ) {
    return value.name;
  }

  throw new Error("Invalid input");
}
```

This is safer than accepting `any`, especially at external data boundaries.

## Narrowing vs Type Assertion

Narrowing proves a type using logic that TypeScript understands.

```ts
if (typeof value === "string") {
  value.toUpperCase();
}
```

A type assertion simply tells TypeScript to trust you.

```ts
(value as string).toUpperCase();
```

Assertions are useful when you have stronger knowledge than the compiler, but they should not replace validation of untrusted runtime data.

## Key Takeaways

- Narrowing converts a broad type into a more specific type through control flow.
- `typeof`, `in`, `instanceof`, equality checks, and discriminators are common narrowing techniques.
- User-defined type guards use `value is SomeType`.
- Assertion functions use `asserts` when invalid values should stop execution.
- `unknown` encourages safe narrowing at runtime boundaries.
- Type assertions do not perform runtime validation.

## Practice Questions

1. Why can TypeScript not call string methods on a `string | number` value without narrowing?
2. When would you use `in` instead of `typeof`?
3. Write a type guard that checks whether an unknown value is an array of numbers.
4. What is the difference between a type guard and a type assertion?
5. How would you narrow a discriminated union in a `switch` statement?
