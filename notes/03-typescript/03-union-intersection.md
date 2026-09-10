# Union and Intersection Types

**Union types** model values that can be one of several alternatives, while **intersection types** combine multiple requirements into one type. They are fundamental for modeling API states, domain variants, permissions, configuration objects, and composable types.

## Union Types

A union uses `|` to say that a value can be one of several types.

```ts
let id: string | number;

id = "user-1";
id = 101;
```

A union does not mean the value contains both types. It means the value is valid if it matches at least one member.

## Literal Unions

Literal unions model a finite set of allowed values.

```ts
type Status = "pending" | "approved" | "rejected";

let status: Status = "pending";
```

This is often preferable to arbitrary strings when the domain has a known set of states.

## Narrowing a Union

Because a union value may have different shapes, TypeScript only permits operations valid for all possible members until the value is narrowed.

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}
```

The `typeof` check narrows the type inside each branch.

## Discriminated Unions

A **discriminated union** uses a common literal property to distinguish variants.

```ts
type Result =
  | {
      status: "success";
      data: string;
    }
  | {
      status: "error";
      message: string;
    };

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data);
  } else {
    console.log(result.message);
  }
}
```

This pattern is especially useful for API responses and state machines.

## Exhaustive Checking

A `never` helper can ensure every union member is handled.

```ts
type Status = "pending" | "success" | "error";

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function getMessage(status: Status): string {
  switch (status) {
    case "pending":
      return "Waiting";
    case "success":
      return "Done";
    case "error":
      return "Failed";
    default:
      return assertNever(status);
  }
}
```

If a new status is added and not handled, TypeScript can report an error at the `assertNever` call.

## Intersection Types

An intersection uses `&` to combine requirements.

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type EmployeePerson = Person & Employee;
```

A valid value must satisfy both sides.

```ts
const employee: EmployeePerson = {
  name: "Aman",
  employeeId: 101,
};
```

## Intersection of Interfaces

Intersections are useful for composing capabilities.

```ts
type Timestamped = {
  createdAt: Date;
};

type Identifiable = {
  id: string;
};

type Entity = Timestamped & Identifiable;
```

This can be useful when several domain concepts share independent requirements.

## Union vs Intersection

Think of them as:

```text
A | B
"either A or B"

A & B
"must satisfy A and B"
```

Example:

```ts
type Admin = {
  role: "admin";
};

type User = {
  name: string;
};

type AdminUser = Admin & User;

type Actor = Admin | User;
```

`AdminUser` requires both `role` and `name`, while `Actor` can be either shape.

## Union of Object Types

A union can model alternative object structures.

```ts
type Payment =
  | {
      method: "card";
      cardNumber: string;
    }
  | {
      method: "upi";
      upiId: string;
    };
```

Use the discriminator to safely access the variant-specific field.

## Intersection Pitfalls

Intersections do not merge conflicting primitive types into a broader type.

```ts
type A = {
  value: string;
};

type B = {
  value: number;
};

type C = A & B;
```

A `C` value would need `value` to be both a `string` and a `number`, which is impossible.

Intersections are therefore best used when requirements are genuinely compatible.

## Key Takeaways

- `A | B` means a value may satisfy either alternative.
- `A & B` means a value must satisfy both requirements.
- Union members often require narrowing before member-specific operations.
- Discriminated unions are excellent for modeling finite states.
- `never` can help enforce exhaustive handling.
- Intersections compose compatible object requirements.

## Practice Questions

1. What is the difference between `A | B` and `A & B`?
2. Why can you not access every property of a union without narrowing?
3. Design a discriminated union for loading, success, and error states.
4. What happens when an intersection requires a property to be both `string` and `number`?
5. How can `never` help detect an unhandled union member?
