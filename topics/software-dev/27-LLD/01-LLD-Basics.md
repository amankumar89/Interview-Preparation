# LLD — 01 LLD Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is low-level design (LLD), and how is it different from high-level design?

**Interview Answer:**

LLD describes the internal design of a component: classes, interfaces, objects, method contracts, relationships, and state transitions. HLD describes the system boundary and major components: services, databases, queues, deployment, and communication between services.

**Detailed Explanation:**

LLD answers questions such as "which object owns this behavior?" and "what happens when this state changes?" HLD answers questions such as "which service stores orders?" A good LLD is detailed enough to implement and test, but does not prematurely decide framework or infrastructure details.

---

### Q2. What steps do you follow when solving an LLD problem?

**Interview Answer:**

Clarify requirements, identify actors and use cases, extract domain objects, assign responsibilities, define relationships and interfaces, model important states, handle failure cases, and validate the design with example flows.

**Detailed Explanation:**

Start with scope and constraints. Separate nouns that represent data from verbs that represent behavior. Keep behavior close to the data it protects, define dependencies at boundaries, and make the main flow explicit before optimizing. Finish by checking extensibility, testability, concurrency, and persistence assumptions.

---

## Core Concepts

### Q3. What is the difference between a class, an object, an interface, and an abstract class?

**Answer:**

A class is a blueprint containing state and behavior. An object is a runtime instance of a class. An interface defines a contract without requiring a particular implementation. An abstract class can share state and implemented behavior while leaving some operations abstract.

Use an interface when multiple unrelated implementations should be interchangeable. Use an abstract class when implementations share a genuine invariant or lifecycle.

---

### Q4. What is encapsulation, and why is it important in LLD?

**Answer:**

Encapsulation keeps an object's state private and exposes operations that preserve its invariants. For example, an `Account` should expose `withdraw(amount)` rather than allowing callers to set `balance` directly.

This prevents invalid state, reduces coupling, and gives the class one place to enforce rules. Getters and setters alone are not necessarily encapsulation if callers can still violate the domain rules.

---

### Q5. How do you decide which class should own a behavior?

**Answer:**

Give behavior to the object that has the required information and is responsible for protecting the related invariant. If the behavior coordinates several independent objects or represents a use case, place it in an application service or coordinator.

Avoid a large "manager" class that owns unrelated operations. A useful test is to ask whether moving the behavior would force another class to expose internal state.

---

## Practical Questions

### Q6. Why should LLD designs depend on abstractions instead of concrete classes?

**Answer:**

Depending on an interface lets the high-level policy remain stable while implementations change. For example, `CheckoutService` can depend on `PaymentGateway` while production uses a remote gateway and tests use a fake gateway.

This improves substitution and testing, but an abstraction should represent a real variation point. Creating an interface for every class adds indirection without reducing coupling.

---

### Q7. How do you make an LLD design testable?

**Answer:**

Keep domain rules deterministic and free from direct calls to time, randomness, network, filesystem, or static global state. Inject those dependencies through constructors or method parameters, and expose behavior through small contracts.

Unit tests should verify domain invariants and interaction tests should verify important collaborations. A design that requires a database to test a pricing rule has likely mixed infrastructure with domain logic.

---

## Scenario-Based Questions

### Q8. How would you review an LLD before implementation?

**Answer:**

Walk through the main use cases with concrete inputs, invalid inputs, repeated calls, and partial failures. Check whether each invariant has one owner, whether dependencies point in a sensible direction, and whether a new likely variation requires editing many classes.

Then review thread safety, object lifetimes, error contracts, observability, persistence boundaries, and test seams. The goal is not to predict every future feature; it is to expose unclear ownership and expensive changes before code is written.

---

## Quick Revision

- LLD defines implementable classes, contracts, behavior, and object collaboration.
- Start with use cases and invariants, not class names.
- Keep state private and behavior close to the state it protects.
- Use abstractions at genuine variation and external-system boundaries.
- Design for deterministic tests and explicit failure behavior.
