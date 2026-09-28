# System-Design — 07 Food Delivery

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What core requirements should be clarified for a food-delivery system?**

**Answer:** Clarify restaurant discovery, menus, ordering, payment, courier assignment, live tracking, cancellation, and delivery confirmation. Establish geographic coverage, peak demand, expected freshness of location updates, and which order transitions must be durable.

**Q2. What are the main services or components?**

**Answer:** A baseline includes customer and restaurant APIs, catalog and availability, order management, payment integration, courier dispatch, location ingestion, notifications, and a map or routing provider. Their boundaries should follow ownership and scaling needs rather than forcing every feature into a separate service.

### Intermediate

**Q3. How should an order's lifecycle be represented?**

**Answer:** Use an explicit state machine with valid transitions, such as placed, accepted, preparing, picked up, and delivered, plus cancellation and failure states. Persist transitions with timestamps and actor information so retries, support investigations, and downstream events are auditable.

**Q4. How can nearby couriers be found efficiently?**

**Answer:** Maintain recent courier locations in a geospatial index and query within a bounded area, then rank eligible couriers by distance, availability, vehicle, and workload. Location data is transient and stale positions should be excluded or down-ranked.

**Q5. How should the system assign a courier while preventing double assignment?**

**Answer:** Create a time-bounded reservation or assignment with an atomic conditional update so only one dispatch operation claims the order. Expire unaccepted offers and make retries idempotent; do not rely on separate read-then-write checks under concurrent dispatchers.

### Practical and Production

**Q6. How would you provide live order tracking without overwhelming services?**

**Answer:** Ingest location updates at a controlled frequency, keep current location in a fast store, and push meaningful changes to the customer over a persistent connection or polling API. Throttle updates, expire stale locations, and separate tracking freshness from the durable order record.

**Q7. How should the design estimate delivery time?**

**Answer:** Combine preparation estimates, courier assignment and travel time, distance, traffic, and historical error. Return a range or confidence where appropriate, update it as events arrive, and measure prediction error rather than presenting an estimate as a guarantee.

**Q8. What if a restaurant accepts an order but payment confirmation is delayed?**

**Answer:** Model payment as an explicit pending state and use an idempotent payment operation with status lookup or provider webhook reconciliation. Define whether preparation may begin before final confirmation and handle late success or failure through compensating order transitions.

**Q9. A courier's location feed stops during an active delivery. What should the system do?**

**Answer:** Mark the location stale after a defined interval, stop displaying it as live, and fall back to order milestones or a last-updated timestamp. Alert operations if the gap is prolonged, but do not infer that the order is lost solely from missing GPS updates.
