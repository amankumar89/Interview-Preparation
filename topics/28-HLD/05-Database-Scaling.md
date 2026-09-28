# HLD — 05 Database Scaling

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What are common ways to improve database read performance?**

**Answer:** Start by measuring slow queries, then use appropriate indexes, reduce unnecessary data retrieval, and optimize query shape. Caching or read replicas can help when the workload supports them, but neither replaces correct indexing and query analysis.

**Q2. What is the difference between a read replica and a sharded database?**

**Answer:** A read replica copies data to serve additional reads while writes generally go to a primary. Sharding divides data across multiple database nodes, often to distribute storage and write load. Replication and sharding solve different capacity problems and can be combined.

### Intermediate

**Q3. What is database sharding, and how do you choose a shard key?**

**Answer:** Sharding partitions records among database nodes. A good shard key distributes traffic and data evenly while supporting common queries without excessive cross-shard work. Consider write volume, growth, tenant skew, query patterns, and whether the key can change.

**Q4. What is replication lag, and how can it affect an application?**

**Answer:** Replication lag is the delay before a replica reflects changes committed at the primary. A read immediately after a write may return stale data if served from a lagging replica. Route consistency-sensitive reads to the primary or use a mechanism that waits for the relevant write to replicate.

### Practical and Production

**Q5. Why can adding indexes make a database workload worse?**

**Answer:** Indexes consume storage and memory, and must be maintained on writes. Too many or poorly chosen indexes can increase write latency and complicate planning. Use query plans and workload measurements to justify each index, and account for the cost of creating it on a large table.

**Q6. How can connection pools help, and how can they become a bottleneck?**

**Answer:** Pools reuse database connections and limit connection-setup overhead. If the pool is too small, requests wait; if too large, many application instances can overwhelm the database with connections and concurrent work. Size pools against database capacity and total application replica count, and monitor wait time.

**Q7. How do you reduce the risk of hot shards?**

**Answer:** Choose a distribution key that avoids concentrating popular tenants or time ranges on one shard. If a key is inherently hot, split its workload or isolate large tenants where practical. Rebalancing can help, but plan for data movement, query routing, and temporary operational load.

**Q8. What should a database migration plan include for a large production table?**

**Answer:** Prefer a staged, backward-compatible change: add the new structure, deploy code that can handle both versions, backfill in bounded batches, verify results, then switch reads and remove obsolete fields later. Monitor replication lag, locks, error rates, and rollback options throughout.
