# LLD — 02 Class Design

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What makes a class cohesive?

**Interview Answer:**

A cohesive class has one closely related responsibility, a small and meaningful public API, and methods that use most of its own state. Its name and invariants can be explained without combining unrelated concerns.

**Detailed Explanation:**

For example, `Invoice` can calculate totals and validate invoice lines, while sending email belongs elsewhere. High cohesion makes changes local and tests focused. A class with many unrelated fields, conditional branches, or suffixes such as `ManagerAndValidator` is often doing too much.

---

### Q2. How do you design a useful class API?

**Answer:**

Expose the smallest set of operations needed by clients, use domain language, validate inputs at the boundary, and preserve invariants after every public operation. Prefer commands that express intent, such as `reserve()` or `cancel()`, over setters that expose representation.

The API should make invalid usage difficult and should not force callers to understand internal collections, status flags, or ordering rules.

---

## Core Concepts

### Q3. When should you use composition instead of inheritance?

**Answer:**

Prefer composition when behavior may vary independently, when the relationship is "has-a", or when a subclass would inherit methods it cannot support. Use inheritance only for a stable "is-a" relationship where the subtype can honor the full parent contract.

Composition allows behavior to be replaced at runtime and avoids fragile base-class coupling. For example, a `Report` can contain a `Formatter` rather than subclassing one report class for every output format.

---

### Q4. What is immutability, and when is it useful?

**Answer:**

An immutable object cannot change after construction. Its fields are final, it validates state during construction, and it does not leak mutable internal references.

Immutable value objects such as `Money`, `EmailAddress`, and `DateRange` are easier to share, cache, reason about, and use safely across threads. If a mutable object is necessary, define ownership and mutation rules clearly.

---

### Q5. How should a class represent invalid states?

**Answer:**

Reject invalid input at construction or at the operation that would create the invalid state. Use a domain exception or a typed result when the caller can recover, and keep the object valid after an error.

Avoid boolean flags that permit contradictory combinations such as `active = true` and `deleted = true` unless the state model explicitly supports them. Enums and state-specific types can make valid transitions clearer.

---

## Code-Based Questions

### Q6. How would you model a value object for money in Java?

**Answer:**

Represent the amount with `BigDecimal`, store the currency, validate both, and make the type immutable. Arithmetic should reject incompatible currencies instead of silently converting them.

```java
public record Money(BigDecimal amount, Currency currency) {
	public Money {
		if (amount == null || currency == null || amount.signum() < 0) {
			throw new IllegalArgumentException("Invalid money");
		}
	}

	public Money add(Money other) {
		if (!currency.equals(other.currency)) {
			throw new IllegalArgumentException("Currency mismatch");
		}
		return new Money(amount.add(other.amount), currency);
	}
}
```

The value object owns its invariant and callers cannot change its amount through a setter.

---

### Q7. How can you avoid a large constructor with many optional parameters?

**Answer:**

Separate required and optional data, use a builder for readable construction, or introduce named parameter/value objects. The builder must validate before creating the object and should not allow an unfinished invalid instance to escape.

Do not use a builder merely to hide an unclear domain model. If many options are always used together, they may belong in a separate cohesive object.

---

## Debugging Questions

### Q8. A class has many getters and service code contains all business rules. What problem does this indicate?

**Answer:**

It suggests an anemic domain model: objects hold data while another class manipulates that data. This spreads invariants across callers and increases duplication.

Move rules that protect the object's state into intention-revealing methods. Keep orchestration in services, but let domain objects decide whether their own state transition is valid.

---

## Quick Revision

- High cohesion keeps related state and behavior together.
- Prefer small intent-based APIs over public setters and leaked collections.
- Use composition for replaceable behavior and inheritance for genuine substitutability.
- Immutable value objects are strong boundaries for domain concepts.
- Reject invalid state close to where it is created.
