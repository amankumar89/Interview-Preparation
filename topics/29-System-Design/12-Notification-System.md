# System-Design — 12 Notification System

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What requirements should be clarified for a notification system?**

**Answer:** Identify channels such as email, push, and SMS; delivery latency; priority; user preferences; retry expectations; and volume. Clarify whether notifications are best-effort or business-critical and how duplicates should be handled.

**Q2. Why use a queue between notification requests and channel providers?**

**Answer:** A queue decouples request handling from slower or unreliable provider calls. It absorbs bursts, enables independent scaling, and supports retries without making the originating service wait for delivery.

### Intermediate

**Q3. How should user preferences and quiet hours be applied?**

**Answer:** Resolve preferences before dispatch using a clearly defined source of truth, including timezone and fallback behavior. Record the decision or preference version used so delayed retries do not produce surprising results.

**Q4. How should provider failures be retried?**

**Answer:** Retry transient failures with bounded exponential backoff and jitter, respecting provider rate limits. Route permanent failures or exhausted retries for review, and avoid retrying invalid addresses indefinitely.

### Practical and Production

**Q5. How can a notification system prevent duplicate sends?**

**Answer:** Assign an idempotency key to the logical notification and track dispatch state per recipient and channel. Use provider idempotency features when available, while recognizing that a timeout after provider acceptance can make exactly-once external delivery impossible to guarantee.

**Q6. Which metrics are useful for operating the system?**

**Answer:** Track queue depth and age, dispatch latency, provider acceptance and failure rates, retry counts, suppression reasons, and delivery outcomes where providers expose them. Segment by channel and provider and alert on user-impacting delays, not only worker health.

**Q7. How should notification preferences interact with mandatory security alerts?**

**Answer:** Define policy by notification category rather than treating all messages identically. Respect opt-outs where required, but keep legally or security-critical communication governed by explicit product and compliance rules with clear user expectations.

**Q8. How should notification priority affect queue processing?**

**Answer:** Separate or prioritize urgent work so a large backlog of low-priority messages cannot block critical alerts. Set fairness limits to prevent starvation, and define whether expired notifications should be dropped rather than delivered after they are no longer useful.

**Q9. What does “at-least-once” delivery mean for notification workers?**

**Answer:** A message may be processed more than once because a worker can fail after sending but before acknowledging the queue item. Use stable notification IDs and idempotent state transitions, while recognizing that a third-party provider may still deliver duplicates if it lacks idempotency support.

**Q10. How can the system avoid overwhelming a provider during recovery?**

**Answer:** Apply per-provider concurrency and rate limits, exponential backoff with jitter, and gradual queue draining. Monitor queue age and provider health, and support pause or circuit-breaker controls so a recovering provider is not hit by the entire backlog at once.

**Q11. A notification is queued before a user unsubscribes, then delivered afterward. How should this be handled?**

**Answer:** Recheck current consent or suppression policy as close to dispatch as practical, not only when enqueueing. Persist the policy decision for audit, cancel queued work when required, and define how legal retention and delivery requirements interact with preference changes.
