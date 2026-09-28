# LLD — 04 Design Principles

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. Explain the SOLID principles in practical terms.

**Interview Answer:**

Single Responsibility keeps a class focused. Open/Closed allows new behavior through extension rather than repeated modification. Liskov Substitution requires subtypes to honor the parent contract. Interface Segregation favors focused interfaces. Dependency Inversion makes policies depend on abstractions rather than infrastructure details.

SOLID is a set of design heuristics, not a requirement to create more classes or interfaces. Apply a principle when it reduces a concrete source of coupling or change risk.

---

### Q2. What is the difference between cohesion and coupling?

**Answer:**

Cohesion measures how strongly the responsibilities inside one module belong together. Coupling measures how much one module depends on others. Good LLD aims for high cohesion and low coupling.

The goal is not zero coupling; collaboration is necessary. The goal is explicit, stable coupling through small contracts rather than hidden dependence on implementation details.

---

## Core Concepts

### Q3. What is the Single Responsibility Principle, and what is a common misuse of it?

**Answer:**

SRP says a class should have one reason to change, where a reason represents one cohesive responsibility or stakeholder concern. It does not mean every method must be placed in a separate class.

Splitting a simple cohesive class into many wrappers can make the design harder to follow. Look for independent change reasons, unrelated dependencies, and mixed business or infrastructure concerns before splitting.

---

### Q4. How do you recognize a Liskov Substitution Principle violation?

**Answer:**

If client code must check the concrete subtype, catch unexpected exceptions, or avoid valid parent operations for a subtype, the subtype may not satisfy the parent contract. A classic example is making a read-only subtype of a mutable collection when callers expect `add()` to work.

Fix the contract by narrowing the interface, using composition, or modeling capabilities separately. Do not force inheritance where behavior is not substitutable.

---

### Q5. What is the Interface Segregation Principle?

**Answer:**

Clients should not depend on methods they do not use. Prefer focused interfaces such as `Readable` and `Writable` over one large `Device` interface when implementations support different capabilities.

This reduces accidental coupling and makes test doubles smaller. Interfaces should be designed around client needs, not around every method a concrete class happens to have.

---

## Practical Questions

### Q6. How do you apply Dependency Inversion in an application?

**Answer:**

Put a stable abstraction at the boundary, make the high-level use case depend on it, and inject the infrastructure implementation from outside. For example, `UserService` depends on `UserRepository`, while a database adapter implements that interface.

Dependency injection is a technique that helps implement this principle; simply injecting concrete classes is not dependency inversion.

---

### Q7. What is the Law of Demeter?

**Answer:**

An object should communicate with its close collaborators rather than navigating long chains of unrelated objects. Code such as `order.getCustomer().getAddress().getCity()` exposes structure and creates coupling.

Prefer an intention-revealing operation such as `order.shippingCity()` when the order owns that concept. The law is a guideline, not a ban on every chained call; fluent APIs and value objects may be appropriate exceptions.

---

## Scenario-Based Questions

### Q8. A payment service has `if` statements for every provider. How would you improve it?

**Answer:**

Define a `PaymentProvider` interface, implement one adapter per provider, and select the provider through configuration or a registry. The checkout use case depends on the interface and handles a provider-neutral result.

Provider-specific authentication, request mapping, retries, and error translation stay inside each adapter. This isolates vendor changes and allows contract tests plus a fake provider in unit tests.

---

## Quick Revision

- SOLID should reduce real change pressure, not increase abstraction for its own sake.
- SRP is about one reason to change, not one method per class.
- A subtype must honor the behavioral contract of its parent.
- Small client-focused interfaces are easier to implement and test.
- Put stable policies above replaceable infrastructure details.
