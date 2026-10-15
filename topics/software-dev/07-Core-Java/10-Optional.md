# Core-Java — 10 Optional

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is `Optional` in Java?

**Interview Answer:**
`Optional` is a container type introduced in Java 8 to represent a value that may or may not be present without using `null`.

**Detailed Explanation:**
It helps make APIs clearer about whether a value is missing. Instead of returning `null`, a method can return `Optional<T>`, making the absence of a value an explicit part of the contract.

### Q2. Why was `Optional` introduced?

**Interview Answer:**
It was introduced to reduce `NullPointerException` risks and make code more expressive when a value may be missing.

**Detailed Explanation:**
`null` has been a source of many bugs in Java applications. `Optional` encourages explicit handling of missing values without requiring every caller to check for `null` manually.

### Q3. How do you create an `Optional`?

**Example:**

```java
Optional<String> name = Optional.of("John");
Optional<String> empty = Optional.empty();
Optional<String> maybe = Optional.ofNullable(userName);
```

**Answer:**
Use `Optional.of(value)` for a non-null value, `Optional.empty()` for no value, and `Optional.ofNullable(value)` when the value may be null.

### Q4. What are the common methods on `Optional`?

**Interview Answer:**
Common methods include `isPresent()`, `ifPresent()`, `orElse()`, `orElseGet()`, `orElseThrow()`, `map()`, and `flatMap()`.

**Detailed Explanation:**
These methods allow you to express logic around missing values clearly and concisely. For example, `orElseThrow()` is useful when a required value is missing and should fail fast.

### Q5. What is the difference between `orElse()` and `orElseGet()`?

**Interview Answer:**
`orElse()` returns a fixed fallback value, while `orElseGet()` computes the fallback lazily when the optional is empty.

**Detailed Explanation:**
This distinction matters when the fallback itself is expensive or has side effects. `orElseGet()` avoids work until it is needed, which can improve performance and avoid unnecessary computation.

### Q6. What is the difference between `map()` and `flatMap()` on `Optional`?

**Interview Answer:**
`map()` transforms a present value into another value, while `flatMap()` is used when the transformation itself returns an `Optional`.

**Detailed Explanation:**
This is useful when chaining operations on optional values. `flatMap()` avoids wrapping a nested `Optional` inside another `Optional` and keeps the API cleaner.

### Q7. Is `Optional` meant to replace all null checks?

**Interview Answer:**
No. `Optional` is a good tool for APIs and domain values where a missing value is part of the contract, but it is not a universal replacement for every null check.

**Detailed Explanation:**
Using `Optional` for fields, local variables, or internal code can sometimes reduce clarity. It is best used for return values and operations where absence is meaningful and part of the business logic.

### Q8. Why is `Optional` not suitable for every use case?

**Answer:**
It should not be used as a replacement for `null` in all data models, and it is not ideal for serialization or frequent iteration. Overusing it can make code verbose or harder to read in simple scenarios.

### Q9. How does `Optional` help in production code?

**Answer:**
It makes missing-value handling explicit and helps reduce null-related code paths. This makes APIs easier to reason about and lowers the risk of `NullPointerException` in service and data access layers.

### Q10. What is a common `Optional` mistake?

**Answer:**
A common mistake is wrapping values just for the sake of using `Optional` without an actual missing-value scenario. This adds ceremony without helping clarity and can make code harder to maintain.

## Practical Questions

### Q11. When should you return `Optional` from a method?

**Answer:**
Return `Optional` when a value may truly be absent as part of the normal business flow, such as a lookup by ID, user profile fields, or a missing configuration value.

### Q12. How do you handle `Optional` in a clean API design?

**Answer:**
Use `Optional` for return types and explicit missing-value flows, keep fallback logic clear, and avoid using `Optional` in constructors or mutable state unless that is genuinely part of the domain model.
