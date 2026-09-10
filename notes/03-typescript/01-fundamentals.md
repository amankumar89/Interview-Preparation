# TypeScript Fundamentals

TypeScript is a **statically typed superset of JavaScript** that adds a type system, better tooling, and compile-time checks while preserving JavaScript's runtime model. It is useful for large applications because many mistakes can be detected before the code runs, while the emitted program is JavaScript executed by a JavaScript runtime.

## TypeScript vs JavaScript

JavaScript determines most types at runtime, while TypeScript checks types during development and compilation.

```ts
let age: number = 25;
age = "25"; // Error
```

The TypeScript compiler does not create a new runtime language. TypeScript code is transformed into JavaScript, and most type annotations disappear from the emitted output.

```ts
const add = (a: number, b: number): number => a + b;
```

Conceptually:

```text
TypeScript source
      |
      v
Type checking
      |
      v
JavaScript output
      |
      v
Browser / Node.js / JavaScript runtime
```

TypeScript therefore improves developer-time safety but does not make JavaScript runtime behavior inherently type-safe.

## Type Annotations and Type Inference

A **type annotation** explicitly declares a type.

```ts
let username: string = "Aman";
let age: number = 26;
let active: boolean = true;
```

**Type inference** allows TypeScript to determine the type from the assigned value.

```ts
const username = "Aman"; // string
const age = 26;          // number
const active = true;     // boolean
```

Prefer inference when the type is obvious. Explicit annotations are especially useful for function parameters, public APIs, object shapes, and cases where inference is insufficient.

## Primitive Types

Common primitive types include:

```ts
let name: string = "Aman";
let age: number = 26;
let isAdmin: boolean = false;
let id: bigint = 123n;
let token: symbol = Symbol("token");
```

JavaScript's `null` and `undefined` are represented directly:

```ts
let value: null = null;
let missing: undefined = undefined;
```

With strict null checking enabled, `null` and `undefined` are not automatically assignable to unrelated types.

## Arrays and Tuples

Arrays contain values of a common type.

```ts
const scores: number[] = [10, 20, 30];
const names: Array<string> = ["Aman", "Rahul"];
```

A **tuple** represents a fixed structure with known positions and types.

```ts
const user: [number, string] = [1, "Aman"];
```

Tuple elements can be named for readability:

```ts
const response: [status: number, body: string] = [200, "OK"];
```

## Objects

Object types describe the expected properties.

```ts
const user: {
  id: number;
  name: string;
  active: boolean;
} = {
  id: 1,
  name: "Aman",
  active: true,
};
```

For reusable object shapes, `interface` or `type` is usually clearer.

## Special Types: any, unknown, never, void

**`any`** disables most type checking for a value.

```ts
let value: any = "hello";
value.toFixed(); // TypeScript allows it, runtime may fail
```

Avoid `any` unless there is a deliberate boundary where type information is genuinely unavailable.

**`unknown`** is safer than `any`. You must narrow it before using it as a specific type.

```ts
function print(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

**`void`** usually describes a function that does not return a useful value.

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

**`never`** represents a value that cannot occur, commonly for functions that always throw or never finish.

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

## Type Assertions

A **type assertion** tells TypeScript how you want to treat a value. It does not perform runtime conversion or validation.

```ts
const input = document.querySelector("#email") as HTMLInputElement;
input.value = "test@example.com";
```

Equivalent angle-bracket syntax exists outside JSX:

```ts
const input = <HTMLInputElement>element;
```

Prefer `as` in modern frontend code because angle-bracket assertions conflict with JSX syntax.

An assertion can be wrong:

```ts
const value = "hello" as unknown as number;
```

This does not convert the string into a number.

## Literal Types and const

A literal type represents an exact value.

```ts
let status: "loading" | "success" | "error";

status = "success";
// status = "done"; // Error
```

`const` often produces a narrower inferred type:

```ts
const direction = "left"; // "left"
let direction2 = "left";  // string
```

Literal types are useful for modeling finite states and configuration values.

## Enums

Enums provide named constants.

```ts
enum Role {
  ADMIN,
  USER,
  GUEST,
}

const role: Role = Role.ADMIN;
```

String enums are often easier to inspect and serialize:

```ts
enum Status {
  Pending = "pending",
  Success = "success",
  Failed = "failed",
}
```

For many application APIs, a string literal union is simpler:

```ts
type Status = "pending" | "success" | "failed";
```

## TypeScript Configuration

`tsconfig.json` controls compiler behavior.

A strict project commonly starts with:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Important options include:

- `target`: JavaScript version emitted by the compiler.
- `module`: module system used by emitted code.
- `strict`: enables a family of strong type-checking options.
- `noImplicitAny`: prevents accidental implicit `any`.
- `strictNullChecks`: treats `null` and `undefined` explicitly.
- `noUnusedLocals`: reports unused local declarations.
- `noUnusedParameters`: reports unused parameters.
- `esModuleInterop`: improves CommonJS/ES module interoperability.

## Structural Typing

TypeScript is primarily **structurally typed**. Compatibility is based on the members a value has rather than only on the declared name.

```ts
interface User {
  id: number;
  name: string;
}

const employee = {
  id: 1,
  name: "Aman",
  department: "Engineering",
};

const user: User = employee;
```

`employee` has at least the members required by `User`, so it is compatible.

## Key Takeaways

- TypeScript adds compile-time type checking to JavaScript.
- Type annotations are explicit; type inference lets TypeScript determine obvious types.
- `unknown` is safer than `any` because values must be narrowed before use.
- Type assertions affect type checking only; they do not convert or validate runtime values.
- Literal unions are useful for modeling finite states.
- `strict` mode is strongly recommended for production TypeScript projects.
- TypeScript uses structural typing for most compatibility checks.

## Practice Questions

1. What is the difference between TypeScript's compile-time checking and JavaScript's runtime behavior?
2. When would you choose `unknown` instead of `any`?
3. What is the difference between an array and a tuple?
4. Does `value as number` convert a string into a number at runtime? Why?
5. Explain structural typing with an example.
