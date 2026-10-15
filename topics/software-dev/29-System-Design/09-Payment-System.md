# System-Design — 09 Payment System

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What requirements should be clarified when designing a payment system?**

**Answer:** Clarify payment methods, currencies, authorization and capture flows, refunds, transaction volume, latency, availability, auditability, and regulatory scope. Identify which external processors are involved and what the system promises when their responses are delayed or unavailable.

**Q2. What is the difference between authorization and capture?**

**Answer:** Authorization asks the payment provider to reserve or approve funds. Capture requests settlement of some or all of the authorized amount. Some flows combine them, while others capture later after fulfillment; the state model must represent each step.

### Intermediate

**Q3. Why should payment APIs support idempotency keys?**

**Answer:** A client may retry after a timeout even when the first request succeeded. An idempotency key lets the service recognize the same logical operation and return its prior result rather than creating a second charge. Scope keys to an operation and retain them for an appropriate period.

**Q4. How would you model payment state?**

**Answer:** Represent explicit transitions such as created, pending, authorized, captured, failed, voided, partially refunded, and refunded. Record immutable events or an audit trail with provider references, and reject invalid transitions rather than overwriting state from out-of-order updates.

**Q5. How should payment webhooks be processed?**

**Answer:** Verify signatures and timestamps, persist the event durably, acknowledge promptly, and process asynchronously. Deduplicate by provider event ID, tolerate retries and out-of-order delivery, and query the provider for authoritative status when an event conflicts with local state.

### Advanced and Production

**Q6. How do you handle an ambiguous timeout from a payment provider?**

**Answer:** Do not immediately submit a new charge with a new identifier. Mark the operation pending, use the same idempotency key for safe retries if supported, and query provider status or await a webhook. Reconcile before deciding to retry, fail, or release related resources.

**Q7. Why is exactly-once payment processing difficult?**

**Answer:** A network failure can occur after the provider performs the charge but before the caller receives the response. The system cannot infer the outcome from the timeout alone. Idempotency, durable operation state, deduplication, and reconciliation provide effectively-once business behavior without assuming exactly-once delivery.

**Q8. What is a ledger, and why is it useful?**

**Answer:** A ledger records financial movements as immutable, auditable entries, commonly using balanced debit and credit postings. It supports reconciliation and correction through compensating entries rather than silently editing history. The design must define currency precision and accounting invariants.

**Q9. How should a payment platform reconcile its records with a processor?**

**Answer:** Compare internal transactions and ledger entries with provider reports or APIs on a schedule, identify missing or mismatched operations, and route exceptions for controlled investigation. Reconciliation catches failures that synchronous responses and webhooks alone may not reveal.

**Q10. What security concerns shape payment-system architecture?**

**Answer:** Minimize the handling and retention of cardholder data, use a compliant processor or tokenization where possible, encrypt sensitive data, restrict access, protect secrets, and keep audit logs. Define controls based on the applicable compliance scope instead of assuming encryption alone makes a system compliant.

**Q11. A customer reports a duplicate charge after a checkout timeout. How would you investigate?**

**Answer:** Trace the order and idempotency key through application logs, provider requests, webhook events, and ledger entries. Determine whether two distinct charge operations occurred or one operation was represented twice locally; reconcile with the provider and issue a refund or correction through an auditable workflow if needed.
