# System-Design — 03 Consistency

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is data consistency in a distributed system?**

**Answer:** Consistency describes what values clients are allowed to observe as data is read and written across replicas. Different consistency models make different promises about visibility, ordering, and how quickly updates appear.

**Q2. What is the difference between strong and eventual consistency?**

**Answer:** Strong consistency makes a completed write visible to later reads according to a defined ordering, often linearizability. Eventual consistency allows reads to temporarily return older or conflicting values but promises convergence if updates stop and communication resumes.

### Intermediate

**Q3. What are read-your-writes and monotonic-read guarantees?**

**Answer:** Read-your-writes means a client sees its own completed writes on later reads. Monotonic reads mean a client does not move backward to an older observed value. Session tokens, sticky routing, or replica selection can provide these guarantees without requiring every read to be globally linearizable.

**Q4. How can a read from a replica return stale data?**

**Answer:** Replication is often asynchronous, so a write may reach the primary before it reaches a read replica. A client routed to that replica can see an earlier value. The system can offer stronger read modes, wait for replication, or use session-aware routing where the use case requires it.

**Q5. What is causal consistency?**

**Answer:** Causal consistency preserves the ordering of related operations: if one operation could have influenced another, observers see them in that order. Independent concurrent operations may be observed in different orders, which can reduce coordination compared with a single global order.

### Advanced and Production

**Q6. How can concurrent updates to the same record be resolved?**

**Answer:** Options include serializing writes through a leader, optimistic concurrency with versions, application-specific conflict resolution, or mergeable data structures. The correct choice depends on whether updates may be rejected, combined, or must follow one authoritative order.

**Q7. What do read and write quorums guarantee?**

**Answer:** Quorum sizes determine how many replicas must participate in reads and writes. Intersecting quorums can ensure a read encounters a recent write under specific replication assumptions, but quorum intersection alone does not define conflict resolution or guarantee linearizable behavior.

**Q8. When is eventual consistency an appropriate choice?**

**Answer:** It is useful when temporary stale reads are acceptable and high availability or low-latency writes are valuable, such as some activity counters or feed projections. It is risky when stale results can authorize spending, violate inventory limits, or expose data after access has been revoked.

**Q9. A user updates a profile and immediately sees the old value on another device. How would you investigate and improve this?**

**Answer:** Check write acknowledgment semantics, replication lag, cache invalidation, and read routing. If the product requires session consistency, return a version or session token and route subsequent reads to a replica at least that current, or briefly read from the authoritative source.
