# System-Design — 08 Ecommerce

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What requirements should be clarified when designing an ecommerce platform?**

**Answer:** Clarify catalog browsing and search, cart behavior, checkout, inventory accuracy, payment, fulfillment, returns, and expected traffic patterns. Identify which steps need strong correctness and which can use asynchronous updates or cached data.

**Q2. What are the main entities in an ecommerce data model?**

**Answer:** Common entities include products, offers or variants, inventory by location, carts, orders, payments, shipments, and customer addresses. Keep order-line price and item details as a purchase-time snapshot so later catalog changes do not rewrite order history.

### Intermediate

**Q3. How can the platform prevent selling more units than are available?**

**Answer:** Use an atomic reservation or conditional inventory decrement with an expiration, then confirm or release it as checkout progresses. Inventory views may be cached, but the authoritative reservation path must handle concurrent purchases safely.

**Q4. How should carts behave when prices or inventory change?**

**Answer:** Treat cart contents as intent, not a guaranteed quote. Revalidate price, promotions, and stock at checkout, explain material changes to the user, and make cart updates idempotent so retries do not duplicate quantities.

**Q5. Why is checkout often modeled as a workflow or saga?**

**Answer:** Checkout spans inventory, payment, order, and fulfillment systems that cannot usually share one database transaction. A workflow records progress and uses idempotent steps and compensating actions, such as releasing a reservation after payment failure.

### Advanced and Production

**Q6. How should the system handle payment timeouts during checkout?**

**Answer:** Use a stable payment idempotency key and represent the result as pending until confirmed. Query the provider or process signed webhooks, deduplicate events, and reconcile ambiguous outcomes before retrying or releasing inventory.

**Q7. How would you design for a flash sale?**

**Answer:** Protect inventory with atomic reservations or controlled allocation, apply admission control and per-user limits, and queue noncritical work. Cache catalog reads, isolate checkout capacity, and avoid a single hot inventory key becoming an unbounded contention point.

**Q8. What role do an outbox and idempotent consumers play in order processing?**

**Answer:** Write an order change and its event record in the same database transaction, then publish the outbox asynchronously. Consumers track processed event identifiers and make side effects idempotent, reducing lost-event and duplicate-processing risks.

**Q9. Search results show an item as available, but checkout cannot reserve it. Is this necessarily a defect?**

**Answer:** Not always: search and catalog availability may be eventually consistent, while checkout uses authoritative inventory. The product should communicate that availability is confirmed at checkout, keep projections fresh, and measure how often stale listings cause failed purchases.
