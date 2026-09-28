# System-Design — 01 Distributed Systems

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is a distributed system?**

**Answer:** A distributed system is a set of independent computers that communicate over a network and cooperate to provide a service. Users may experience it as one system even though data and work are spread across multiple processes or machines.

**Q2. Why do teams use distributed systems instead of one larger machine?**

**Answer:** Distribution can increase capacity through horizontal scaling, improve resilience through redundancy, and place services closer to users. It also adds network latency, partial failures, coordination costs, and operational complexity, so it should solve a real scaling or availability need.

### Intermediate

**Q3. What is the difference between replication and partitioning?**

**Answer:** Replication keeps copies of data on multiple nodes to improve availability and read capacity. Partitioning splits a dataset across nodes to increase storage and write capacity. A system can use both, but must manage replica consistency and partition placement.

**Q4. What does partial failure mean, and why is it important?**

**Answer:** A partial failure occurs when one component or network path fails while the rest of the system continues operating. Callers cannot always distinguish a slow response from a failed service, so timeouts, bounded retries, fallbacks, and clear failure handling are essential.

**Q5. How should a service handle a timeout when the outcome of a write is unknown?**

**Answer:** Treat the outcome as uncertain rather than assuming the write failed. Retry with a stable idempotency key or query the operation's status. Without deduplication, a retry may perform the same logical operation twice.

### Advanced and Production

**Q6. How do timeouts and retries interact in a service call chain?**

**Answer:** Set a total request deadline and allocate smaller time budgets to downstream calls. Retry only transient failures, use exponential backoff with jitter, cap attempts, and avoid retrying at multiple layers without coordination because that multiplies load during an outage.

**Q7. What is a quorum, and what does it provide?**

**Answer:** A quorum is a threshold of nodes whose responses are required for an operation. With suitable replica placement and protocol assumptions, overlapping read and write quorums can improve consistency. Quorums do not automatically guarantee linearizability; versioning, leader rules, and failure behavior also matter.

**Q8. What is a split-brain condition?**

**Answer:** Split brain occurs when multiple nodes or partitions each believe they are authoritative, potentially accepting conflicting writes. Fencing tokens, consensus-backed leadership, quorum rules, and rejecting stale leaders help prevent an old or isolated leader from continuing to mutate shared state.

**Q9. A downstream dependency becomes slow but not fully unavailable. How should a system respond?**

**Answer:** Enforce deadlines and concurrency limits so waiting requests cannot exhaust threads or connections. Apply backpressure, shed noncritical work, and use a circuit breaker if appropriate. Track latency and saturation as well as error rates, then restore traffic gradually when the dependency recovers.
