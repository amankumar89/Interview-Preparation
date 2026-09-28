# HLD — 07 Consistency

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What does consistency mean in a distributed system?**

**Answer:** Consistency describes what values and ordering clients may observe when data is read or updated across replicas. The exact guarantee matters: systems may provide strong consistency for some operations and weaker, explicitly bounded behavior for others.

**Q2. What is eventual consistency?**

**Answer:** Eventual consistency allows replicas to temporarily disagree, with the expectation that they converge if updates stop and replication succeeds. Reads may be stale during convergence, so the application must decide whether that behavior is acceptable and how to communicate it.

### Intermediate

**Q3. What is the difference between strong consistency and eventual consistency?**

**Answer:** Strong consistency provides a guarantee such as reads observing the latest completed write according to a defined ordering. Eventual consistency permits stale reads temporarily to improve availability, latency, or replication flexibility. The choice should be tied to the operation's correctness requirements.

**Q4. What is read-your-writes consistency?**

**Answer:** It guarantees that a client who has completed a write can subsequently observe that write in its own reads. It is weaker than global strong consistency and can often be supported by routing that client's reads to the primary or to a replica known to have applied the write.

### Practical and Production

**Q5. How does replication lag create a user-visible consistency problem?**

**Answer:** A write may succeed on the primary while a subsequent read reaches a replica that has not applied it yet. The user can then see old data or believe the update failed. A session consistency mechanism, primary read, or wait-for-replication policy can address this at additional cost.

**Q6. What is quorum-based consistency at a high level?**

**Answer:** A quorum system requires a read or write to receive responses from a configured number of replicas. Choosing read and write quorum sizes affects overlap, latency, and availability. Quorums alone do not settle every conflict or guarantee linearizability; the replication protocol and failure model matter.

**Q7. How should an application handle concurrent conflicting updates?**

**Answer:** Select a policy based on the data: reject stale writes with a version check, serialize updates, merge changes when a valid merge rule exists, or apply a deterministic conflict-resolution rule. Last-write-wins is simple but can discard meaningful updates, especially when clocks are not reliable.

**Q8. How do you choose consistency guarantees for different operations?**

**Answer:** Identify the invariant each operation must preserve and the consequence of stale or conflicting data. Account balances and inventory reservations often need coordination to prevent invalid outcomes, while feeds or aggregate counters may tolerate delay. State the guarantee and its latency or availability cost explicitly.
