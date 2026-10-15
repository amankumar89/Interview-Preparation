# Spring-Boot — 04 Validation

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. How do you validate a request body in a Spring Boot REST API?**

**Answer:** Put Jakarta Bean Validation constraints on the request DTO and annotate the handler parameter with `@Valid` or, where validation groups are needed, `@Validated`. With a validation provider present, invalid input is rejected before the handler's normal business logic runs.

**Q2. What is the difference between `@NotNull`, `@NotEmpty`, and `@NotBlank`?**

**Answer:** `@NotNull` rejects only `null`; it permits empty strings and collections. `@NotEmpty` rejects `null` and empty strings or collections, while `@NotBlank` is for character sequences and also rejects strings containing only whitespace.

**Q3. How can nested objects and collections be validated?**

**Answer:** Place `@Valid` on the nested property or collection so validation cascades into its elements, and put the relevant constraints on the nested type. Validate collection size separately when the number of elements itself must be limited.

### Intermediate

**Q4. What is the difference between `@Valid` and `@Validated`?**

**Answer:** `@Valid` is the standard Jakarta annotation for cascading validation. Spring's `@Validated` also supports validation groups and can activate method-level validation when applied at an appropriate Spring-managed type or method.

**Q5. How do you create a custom validation constraint?**

**Answer:** Define an annotation with the constraint metadata and implement a `ConstraintValidator` that checks the value and returns whether it is valid. Keep the validator focused and deterministic, and use a class-level constraint when the rule relates multiple fields.

**Q6. How should a REST API report validation errors to a client?**

**Answer:** Map binding and constraint violations into a consistent client-facing error format containing safe field names and understandable messages. Avoid returning rejected values when they may contain personal or secret data, and keep the response independent of internal exception details.

### Practical and Production

**Q7. How would you enforce a rule that depends on two fields, such as an end date being after a start date?**

**Answer:** Implement a class-level constraint or perform the rule in a dedicated validation layer that has access to both fields. Keep syntactic input validation separate from business rules that require database state or other external information.

**Q8. When are validation groups useful, and what risk comes with them?**

**Answer:** Groups let the same type use different constraints in distinct operations, such as create and update. They can make rules difficult to follow when heavily composed, so separate request DTOs are often clearer when the operations have materially different contracts.

**Q9. Should validation replace checks in the service or database layer?**

**Answer:** No. Request validation improves feedback at the boundary, but services must still enforce business invariants and the database must protect integrity under concurrent writes. A pre-check such as “email is unused” cannot by itself prevent two concurrent requests from inserting the same value.
