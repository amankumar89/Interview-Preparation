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

**Q8. How should a chat system handle duplicate or out-of-order message events?**

**Answer:** Give each client send a stable message ID and each conversation message an authoritative sequence or version. Deduplicate by message ID, order messages by the conversation sequence, and let clients reconcile optimistic messages with the persisted server result.

**Q9. How can group chat fan-out be scaled?**

**Answer:** Persist a message once, then distribute delivery events to active members through a broker or routing layer. For very large groups, avoid synchronous per-member work on the send request; batch fan-out, apply backpressure, and fetch durable history on reconnect.

**Q10. What privacy risks arise from presence and read receipts?**

**Answer:** These signals can reveal user activity and relationships. Make them configurable where appropriate, limit who can observe them, minimize retention, and avoid treating presence as proof that a user received or read a particular message.

**Q11. A user sees a sent message on one device but not another. How would you debug it?**

**Answer:** Trace the message ID through persistence, conversation sequence assignment, event publication, device connection routing, and client cursor state. Check authorization and synchronization watermarks, then make reconnect catch-up idempotent so a missed live event is recovered from durable history.
