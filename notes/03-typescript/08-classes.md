# Classes in TypeScript

TypeScript extends JavaScript classes with **access modifiers, typed fields, abstract classes, interfaces, parameter properties, and other compile-time checks**. The emitted code still follows JavaScript's class model.

## Class Properties and Methods

A class can declare typed properties and methods.

```ts
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  greet(): string {
    return `Hello ${this.name}`;
  }
}
```

TypeScript checks that fields are initialized appropriately when strict property initialization is enabled.

## Access Modifiers

TypeScript supports:

- `public`: accessible from anywhere; this is the default.
- `private`: accessible only inside the declaring class.
- `protected`: accessible inside the class and subclasses.

```ts
class Account {
  public owner: string;
  private balance: number;
  protected accountType: string;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
    this.accountType = "standard";
  }
}
```

These modifiers are primarily type-system constraints. JavaScript also has native `#private` fields, which provide runtime-enforced private fields.

## Parameter Properties

TypeScript can declare and initialize fields directly in constructor parameters.

```ts
class User {
  constructor(
    public id: number,
    private name: string
  ) {}
}
```

This is equivalent to declaring fields and assigning them in the constructor.

## `readonly`

`readonly` prevents reassignment through the TypeScript type after initialization.

```ts
class User {
  constructor(
    public readonly id: number,
    public name: string
  ) {}
}

const user = new User(1, "Aman");
// user.id = 2; // Error
```

`readonly` is not the same as deep immutability.

## Getters and Setters

Getters and setters provide controlled property access.

```ts
class User {
  private _name = "";

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value.trim()) {
      throw new Error("Name is required");
    }

    this._name = value;
  }
}
```

They allow validation or computed behavior while exposing property-like syntax.

## Inheritance

A class can extend another class.

```ts
class Animal {
  move() {
    console.log("moving");
  }
}

class Dog extends Animal {
  bark() {
    console.log("woof");
  }
}
```

The subclass inherits accessible members from the base class.

## Method Overriding

A subclass can replace an inherited method.

```ts
class Animal {
  speak(): string {
    return "sound";
  }
}

class Dog extends Animal {
  override speak(): string {
    return "woof";
  }
}
```

The `override` keyword makes the intention explicit and helps catch mistakes if the base class changes.

## Abstract Classes

An abstract class cannot be instantiated directly.

```ts
abstract class PaymentProcessor {
  abstract process(amount: number): Promise<void>;

  log(amount: number) {
    console.log(`Processing ${amount}`);
  }
}

class CardProcessor extends PaymentProcessor {
  async process(amount: number) {
    console.log(`Card payment: ${amount}`);
  }
}
```

Abstract classes are useful when subclasses share implementation as well as a required contract.

## Interfaces and Classes

A class can implement an interface.

```ts
interface Serializable {
  serialize(): string;
}

class User implements Serializable {
  constructor(
    public id: number,
    public name: string
  ) {}

  serialize(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
    });
  }
}
```

`implements` checks that the class satisfies the interface; it does not automatically copy implementation from the interface.

## Static Members

Static members belong to the class rather than individual instances.

```ts
class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }
}

MathUtil.add(2, 3);
```

You cannot access a static member through a normal instance.

## `public`, `private`, and `protected` vs `#private`

TypeScript:

```ts
class Service {
  private token = "secret";
}
```

JavaScript private field:

```ts
class Service {
  #token = "secret";
}
```

A `private` TypeScript member is enforced by TypeScript's type system. A `#private` field has runtime privacy enforced by JavaScript.

## Structural Typing and Classes

TypeScript is structurally typed, so class compatibility is not based solely on inheritance.

```ts
class User {
  constructor(public name: string) {}
}

const object = {
  name: "Aman",
};

const user: User = object;
```

The object has the required structure, although it was not created using `new User()`.

Private or protected members affect compatibility and can make class instances nominally distinct in relevant situations.

## Key Takeaways

- TypeScript classes extend JavaScript classes with compile-time type features.
- `public`, `private`, and `protected` control access at the type level.
- Parameter properties reduce constructor boilerplate.
- `readonly` prevents reassignment through the type system.
- `abstract` classes provide shared implementation plus required subclass behavior.
- `implements` checks a class against an interface; it does not inherit implementation.
- `#private` fields provide JavaScript runtime privacy.

## Practice Questions

1. What is the difference between `private` and JavaScript's `#private` fields?
2. What does the `override` keyword protect against?
3. When would you choose an abstract class instead of an interface?
4. Explain constructor parameter properties.
5. Does `implements` copy methods from an interface into a class?
