# System-Design — 11 Chat System

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What core requirements would you clarify when designing a chat system?**

**Answer:** Clarify one-to-one and group messaging, delivery guarantees, message history, online presence, attachments, ordering expectations, and supported clients. Also establish scale, retention, privacy, and whether end-to-end encryption is required.

**Q2. What is a basic architecture for sending a chat message?**

**Answer:** An authenticated client sends a message to a chat service, which validates membership, persists the message, and routes it to recipient connections or a delivery queue. Offline recipients can receive it later from durable storage or queued events.

### Intermediate

**Q3. How can a chat service maintain message order within a conversation?**

**Answer:** Assign a conversation-scoped sequence or authoritative timestamp at the write path and route related operations consistently. Global ordering is usually unnecessary and expensive; the design should state whether ordering is strict per conversation or best-effort.

**Q4. How can the system support offline delivery and read state?**

**Answer:** Persist messages and maintain per-user or per-conversation delivery/read cursors. On reconnect, clients request messages after their last acknowledged position, and updates should be idempotent to handle retries.

### Practical and Production

**Q5. How would you scale persistent connections for real-time delivery?**

**Answer:** Use horizontally scalable connection servers and a routing or pub/sub layer to reach the server holding a recipient's connection. Keep durable message storage separate from transient connection state, and plan for reconnect storms and backpressure.

**Q6. What should happen if a client retries a send after a timeout?**

**Answer:** Give each client message a stable idempotency identifier and deduplicate it at the write path. A timeout does not prove the server failed to persist the message, so returning the original result avoids duplicate messages.

**Q7. What are key security and abuse controls for chat?**

**Answer:** Enforce conversation membership on every read and write, rate-limit sends, validate attachments, and provide blocking and reporting controls. Protect stored content and connection tokens, and define retention and deletion behavior.
