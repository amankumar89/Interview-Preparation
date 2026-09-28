# HLD — 06 Messaging

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. When should a system use asynchronous messaging?**

**Answer:** Use messaging when work can happen independently of the caller's response, when producers and consumers need temporal or load isolation, or when events must reach multiple consumers. It introduces eventual completion, retries, and more operational components, so it is not automatically better than a direct call.

**Q2. How does a queue differ from publish-subscribe messaging?**

**Answer:** A queue commonly distributes each message to one competing consumer in a consumer group. Publish-subscribe delivers an event to multiple independent subscribers. Broker semantics vary, so confirm whether messages are copied, retained, acknowledged, and replayable.

### Intermediate

**Q3. What do at-most-once, at-least-once, and exactly-once delivery mean?**

**Answer:** At-most-once may lose a message but does not redeliver it. At-least-once retries until acknowledged but can deliver duplicates. Exactly-once behavior is usually scoped to specific broker operations; end-to-end effects still require idempotent processing or transactional coordination.

**Q4. How do partitions affect message ordering and throughput?**

**Answer:** A broker can usually preserve order within a partition, not across all partitions. More partitions can increase parallelism, but messages with the same ordering key must consistently map to the same partition. A hot key can limit parallelism for that key.

### Practical and Production

**Q5. How should a consumer handle duplicate message delivery?**

**Answer:** Make processing idempotent using a stable event or operation identifier, and record completion atomically with the business state change where possible. Acknowledging before durable processing can lose work; acknowledging afterward can cause a retry after a successful action, so duplicates must be expected.

**Q6. What are retries and a dead-letter queue used for?**

**Answer:** Retries handle transient failures, preferably with bounded exponential backoff and jitter. A dead-letter queue isolates messages that repeatedly fail so they do not block healthy work. Define alerting, investigation, and safe replay procedures; a DLQ is not a resolution by itself.

**Q7. What is the transactional outbox pattern?**

**Answer:** The service writes its business change and an event record to the same database transaction. A separate publisher forwards outbox records to the broker and marks them delivered. This avoids the dual-write gap between database commit and message publication, while requiring duplicate-safe publishing and outbox cleanup.

**Q8. How can a consumer protect downstream services when a queue backlog grows?**

**Answer:** Monitor backlog size and message age, then control consumer concurrency to match downstream capacity. Apply backpressure, bounded retries, and prioritization where appropriate. Scaling consumers without limits may simply move the overload from the broker to a database or external API.
