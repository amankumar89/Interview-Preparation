# Kafka — 09 Schema Evolution, Retries, and Dead-Letter Queues

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Why should Kafka event schemas be managed explicitly?**

**Answer:** Producers and consumers often deploy independently, so schema changes can break consumers that still expect an older event shape. Explicit schema management and compatibility rules make those changes safer to validate.

**Q2. What does backward compatibility mean for an event schema?**

**Answer:** A backward-compatible change allows a newer consumer to read data written with an older schema. The exact rules depend on the format and registry, but optional fields with defaults are generally safer than removing or changing the meaning of existing fields.

### Intermediate

**Q3. How do retries affect message ordering and duplicate processing?**

**Answer:** Retrying can delay later work and may result in a message being processed more than once, depending on the failure and commit behavior. Ordering is generally scoped to a partition, so retry design should preserve required key ordering or explicitly accept reordering.

**Q4. When should a message be sent to a dead-letter topic?**

**Answer:** Send a message there after a defined retry policy is exhausted or when it is permanently invalid. Preserve enough metadata to diagnose and replay it, and alert on growth rather than treating the dead-letter topic as a silent discard bin.

### Practical and Production

**Q5. How would you design retries for a consumer that calls an unreliable external service?**

**Answer:** Use bounded retries with backoff and a clear timeout budget, then route exhausted messages for investigation or later replay. Make the downstream operation idempotent where possible, since a timeout can occur after the external system has already applied the request.

**Q6. What should a safe dead-letter replay process do?**

**Answer:** It should validate the cause has been fixed, control replay rate, preserve event identity, and avoid creating duplicate side effects. Track replay outcomes and ensure replayed messages follow the current schema and processing rules.

**Q7. How do schema compatibility rules influence deployment order?**

**Answer:** A compatible rollout typically supports both old and new producers or consumers during the transition. Deploy consumers that tolerate the new shape before producers emit it, and remove old fields only after all readers no longer depend on them.
