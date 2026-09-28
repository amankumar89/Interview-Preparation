# System-Design — 02 CAP Theorem

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What does the CAP theorem state?**

**Answer:** During a network partition, a distributed data system must choose between guaranteeing a response from every non-failing node (availability) and guaranteeing a single consistent view for operations (consistency). A partition means nodes cannot reliably communicate; it is not a normal operating mode the system can simply avoid.

**Q2. What does consistency mean in CAP?**

**Answer:** CAP consistency refers to atomic or linearizable behavior: operations appear to take effect in one global order that respects real-time ordering. It is narrower and stronger than the general use of “consistent” to mean that replicas eventually match.

### Intermediate

**Q3. What is the difference between a CP and an AP choice during a partition?**

**Answer:** A CP design rejects or delays some operations when it cannot safely preserve the required consistent view. An AP design continues serving operations on reachable partitions and may reconcile divergent state later. The choice should be made per operation and business requirement where possible.

**Q4. Is a CA distributed system possible?**

**Answer:** A system can provide consistency and availability when nodes can communicate reliably, but it cannot guarantee both across a network partition. A single-node system avoids inter-node partitioning but does not provide distributed fault tolerance.

**Q5. How does PACELC extend CAP?**

**Answer:** PACELC says that if a partition occurs, a system trades availability against consistency; else, during normal operation, it still trades latency against consistency. This highlights that coordination can add latency even when the network is healthy.

### Practical and Production

**Q6. How would CAP influence the design of a bank balance service?**

**Answer:** Preventing conflicting debits is usually more important than accepting every write during a partition. The service can reject or queue some transactions until it can coordinate safely, while keeping reads available only when their results meet the product's correctness requirements.

**Q7. How would CAP influence a like counter or view counter?**

**Answer:** A counter may accept updates in multiple regions during a partition and merge them later if occasional delay or correction is acceptable. If the count controls a strict business limit, such as a quota, the system needs stronger coordination or a partition-aware policy.

**Q8. Does choosing AP mean a system has no consistency guarantees?**

**Answer:** No. It means the system favors availability during a partition, often with weaker or operation-specific guarantees. It may still provide read-your-writes, causal ordering, or strong consistency for selected operations under normal conditions.

**Q9. How should you explain a CAP tradeoff in a design interview?**

**Answer:** Name the operation, failure condition, and user-visible behavior. Explain which requests are accepted, rejected, or delayed during a partition and how conflicting state is reconciled. Avoid labeling an entire database simply “CP” or “AP” without describing its configuration and operation semantics.
