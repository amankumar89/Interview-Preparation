# System-Design — 04 Availability

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What does availability mean for a service?**

**Answer:** Availability is the proportion of time or requests for which a service provides an acceptable response. It should be defined using a user-facing service-level indicator, since a healthy process can still return unusable results or be unreachable through a dependency.

**Q2. What is the difference between an SLA, an SLO, and an SLI?**

**Answer:** An SLI is a measured indicator, such as successful requests or latency. An SLO is the target for that indicator over a window. An SLA is an external agreement that may define consequences if targets are missed.

### Intermediate

**Q3. How do redundancy and failover improve availability?**

**Answer:** Redundancy provides alternate instances, zones, or paths, while failover redirects work after a failure. Redundancy helps only when alternatives do not share the same failure domain and failover has been tested, automated, and kept within recovery objectives.

**Q4. What are graceful degradation and load shedding?**

**Answer:** Graceful degradation keeps essential functions available while disabling or simplifying optional ones. Load shedding rejects low-priority work when capacity is exhausted so the system can protect core operations instead of failing every request.

**Q5. What are RTO and RPO?**

**Answer:** Recovery time objective (RTO) is the maximum acceptable time to restore a service after disruption. Recovery point objective (RPO) is the maximum acceptable amount of data loss measured in time. Backups, replication, and recovery procedures must meet the chosen targets.

### Advanced and Production

**Q6. Why can retries reduce availability during an outage?**

**Answer:** Retries add load to an already impaired dependency and can create a positive feedback loop. Use deadlines, bounded retries with jitter, retry budgets, circuit breakers, and backpressure; avoid retries for non-idempotent operations unless deduplication is in place.

**Q7. How can a circuit breaker help, and what can go wrong?**

**Answer:** A circuit breaker temporarily blocks calls to a persistently failing dependency, allowing it to recover and freeing caller resources. Poor thresholds can open on harmless spikes, while synchronized half-open probes can overload a recovering service; monitor state transitions and tune against real traffic.

**Q8. What is the risk of deploying redundant instances in one region?**

**Answer:** They may all be affected by a regional outage, shared network, identity service, or configuration failure. Multi-zone or multi-region designs reduce correlated risk but introduce replication, routing, data residency, and failover complexity.

**Q9. A service meets its monthly availability target but has a severe five-minute outage during peak traffic. Is it healthy?**

**Answer:** Not necessarily. A monthly aggregate can hide concentrated user impact. Break down SLIs by region, operation, and traffic period; monitor latency and saturation; and use an error budget and incident review to decide whether reliability work should take priority over feature delivery.
