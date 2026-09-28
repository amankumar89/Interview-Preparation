# REST-API — 03 API Design

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. How should REST endpoint URLs be named?**

**Answer:** Use nouns for resources, plural collection names, and consistent nesting only when the relationship is meaningful. For example, use `/customers/12/orders` rather than `/getCustomerOrders`.

**Q2. Should an API expose database table names in its URLs?**

**Answer:** Usually no. URLs should represent a stable domain contract, not storage details. Hiding table names lets the implementation evolve without forcing clients to change.

### Intermediate

**Q3. How should an API represent relationships between resources?**

**Answer:** Use nested URLs for scoped collection access, such as `/users/7/orders`, and links or identifiers in representations when appropriate. Avoid deeply nested paths because they become difficult to use and maintain.

**Q4. What makes an API response contract consistent?**

**Answer:** Consistency means predictable field names and types, uniform success and error shapes, stable null and missing-field rules, documented date and number formats, and the same conventions across endpoints.

**Q5. How should validation errors be returned?**

**Answer:** Return a client-error status such as `400` or `422`, a machine-readable error code, a human-readable message, and field-level details when relevant. Do not expose stack traces or internal database errors.

### Practical and Production

**Q6. How do you design an endpoint that creates an order and starts payment?**

**Answer:** Separate durable order creation from payment processing or model the workflow explicitly. Use an idempotency key for retried commands, return a clear initial state such as `pending`, and expose a way to query the final payment status instead of making a long synchronous request depend on every downstream service.

**Q7. What should be considered before adding a new API field?**

**Answer:** Check naming, type stability, privacy, authorization, serialization cost, cache effects, and whether clients can safely ignore the field. Additive optional fields are usually backward-compatible, but changing meaning or type is not.
