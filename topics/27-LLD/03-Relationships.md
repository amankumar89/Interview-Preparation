# LLD — 03 Relationships

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are association, aggregation, and composition?

**Interview Answer:**

Association means two objects know or use each other. Aggregation is a weak whole-part relationship where the part can exist independently. Composition is a strong whole-part relationship where the owner controls the part's lifetime.

For example, a `Teacher` and `Student` may be associated, a `Team` aggregates `Player` objects, and an `Order` composes its order lines when those lines have no meaning outside that order.

---

### Q2. How do you choose between a direct reference and an identifier?

**Answer:**

Use a direct reference when objects collaborate within the same aggregate or operation and the lifecycle is clear. Use an identifier when crossing a persistence, service, or bounded-context boundary, or when loading the referenced object would be expensive or create a cycle.

The choice affects consistency, memory, serialization, and transaction boundaries. A reference is not automatically better because it is more convenient.

---

## Core Concepts

### Q3. What is cardinality, and why does it matter?

**Answer:**

Cardinality describes how many instances can participate in a relationship: one-to-one, one-to-many, or many-to-many. It determines collection choice, uniqueness constraints, ownership, and validation rules.

For a one-to-many relationship, decide which side owns updates and whether ordering or duplicate entries matter. Do not expose a mutable collection if callers can bypass those rules.

---

### Q4. How do you model a many-to-many relationship safely?

**Answer:**

Usually introduce an association object when the relationship has attributes or behavior. For example, `Enrollment` can connect `Student` and `Course` while storing enrollment date, status, and grade.

This avoids duplicated synchronization between two collections and gives the relationship a clear owner. In persistence, the association object also maps naturally to a join table.

---

### Q5. What is an aggregate, and how should aggregates reference each other?

**Answer:**

An aggregate is a consistency boundary with one aggregate root responsible for enforcing its invariants. External code should access internal entities through the root rather than modifying them directly.

References between aggregates should generally use IDs, and a transaction should update one aggregate at a time where possible. Cross-aggregate workflows can use domain events or an application service.

---

## Practical Questions

### Q6. How do you prevent bidirectional relationships from becoming difficult to maintain?

**Answer:**

Define one owner for the relationship and provide methods that update both sides atomically when both sides are required. Keep collection mutation private and return read-only views or copies.

If both directions are not needed by the use cases, model only one direction. Bidirectional navigation adds synchronization, serialization, and lifecycle complexity.

---

### Q7. What is coupling, and how can relationships reduce it?

**Answer:**

Coupling is the degree to which one class depends on another class's details. Reduce it by depending on stable contracts, passing only required data, hiding construction, and avoiding knowledge of another object's internal collections or state machine.

High cohesion and low coupling work together: a class should own its rules while exposing a narrow collaboration boundary.

---

## Scenario-Based Questions

### Q8. In an order system, should `Order` directly contain `Product` objects?

**Answer:**

Usually an order should contain immutable `OrderLine` snapshots with product ID, name, unit price, and quantity. A live product reference could change the meaning of a historical order when the product price or name changes.

The catalog remains the source of current product information, while the order owns the data required for its historical and financial invariants.

---

## Quick Revision

- Association is usage; aggregation is weak ownership; composition controls lifetime.
- Cardinality affects invariants, collection types, and persistence constraints.
- Use association objects when a relationship has its own data or behavior.
- Aggregates define consistency boundaries and protect internal entities.
- Avoid bidirectional references unless a real use case requires both directions.
