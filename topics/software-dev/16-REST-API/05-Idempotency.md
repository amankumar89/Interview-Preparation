# REST-API — 05 Idempotency

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What does idempotent mean in HTTP?**

**Answer:** An operation is idempotent when repeating the same request has the same intended server-side effect as sending it once. The response may differ, but the resulting state should not accumulate an additional effect.

**Q2. Which common HTTP methods are idempotent?**

**Answer:** `GET`, `HEAD`, `PUT`, `DELETE`, and `OPTIONS` are defined as idempotent by HTTP semantics. `POST` is not inherently idempotent, although an API can add idempotency handling to a specific POST operation.

### Intermediate

**Q3. Why is idempotency important for distributed systems?**

**Answer:** Networks can lose responses after the server has processed a request. Clients then retry. Idempotency prevents a retry from creating duplicate orders, charges, messages, or other side effects.

**Q4. How can a payment API make a create request idempotent?**

**Answer:** Require a client-generated idempotency key, store the key with the operation result, and return the original result for a repeated key. Bind the key to the authenticated account and reject reuse with different request parameters.

**Q5. How long should an idempotency record be retained?**

**Answer:** Retain it for at least the maximum client retry and business-duplicate window. The duration should be documented and backed by durable storage. Expiring too early can allow a late retry to create a duplicate operation.

### Practical and Production

**Q6. What race condition must an idempotency implementation avoid?**

**Answer:** Two requests with the same key may arrive concurrently. The service must atomically claim the key or use a unique constraint, then make later requests wait for or read the first result. A check-then-insert sequence without atomicity is unsafe.

**Q7. Is an idempotent API automatically safe to retry?**

**Answer:** No. A request may be idempotent but still expensive, unauthorized, or unsafe under an infrastructure failure. Retry policy must also consider timeout type, status code, rate limits, operation completion uncertainty, and whether the server or downstream systems support idempotency.
