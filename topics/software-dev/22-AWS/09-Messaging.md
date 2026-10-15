# AWS — 09 Messaging

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What are Amazon SQS and Amazon SNS used for?**

**Answer:** SQS is a managed message queue that decouples producers from consumers. SNS is a publish/subscribe service that fans a message out to subscribers such as queues, functions, or endpoints.

**Q2. What is the difference between an SQS standard queue and a FIFO queue?**

**Answer:** Standard queues prioritize high throughput and provide at-least-once delivery with best-effort ordering. FIFO queues support ordered processing within message groups and deduplication features, with different throughput characteristics and constraints.

### Intermediate

**Q3. How does an SQS visibility timeout work?**

**Answer:** After a consumer receives a message, the visibility timeout temporarily hides it from other consumers while processing occurs. The consumer must delete it after successful processing; if it does not, the message can become visible and be delivered again.

**Q4. How can SNS and SQS be combined for fan-out?**

**Answer:** Publish an event to an SNS topic and subscribe multiple SQS queues. Each consumer group then receives its own queued copy and can process at an independent pace; queue policies must allow the topic to send messages.

### Practical and Production

**Q5. How should a consumer handle duplicate SQS deliveries?**

**Answer:** Assume a message may be delivered more than once and make side effects idempotent, for example by recording a processed event identifier or using an idempotency key. Delete the message only after successful processing.

**Q6. What is a dead-letter queue in SQS, and what should be monitored?**

**Answer:** A redrive policy moves repeatedly unprocessed messages to a dead-letter queue after a configured receive count. Monitor queue age and depth, alarm on unexpected growth, and establish a controlled process to diagnose and replay messages.
