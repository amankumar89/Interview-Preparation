# PostgreSQL — 05 Query Optimization

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

#### 1. How do you inspect a PostgreSQL query plan?

Use `EXPLAIN` to inspect the planner's estimated plan and `EXPLAIN (ANALYZE, BUFFERS)` to execute the query and report actual timing, row counts, and buffer activity:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total FROM orders WHERE customer_id = 42;
```

`ANALYZE` really runs the statement. For modifying statements, use a safe test environment or a transaction that you explicitly roll back, while accounting for external effects such as triggers.

#### 2. What is the difference between estimated and actual rows in a plan?

Estimated rows come from the planner's statistics and cost model; actual rows are observed during execution with `ANALYZE`. Large differences can lead to poor join or scan choices. Investigate stale or insufficient statistics, skewed data, correlated columns, and parameter-sensitive workloads rather than assuming an index is missing.

#### 3. Is a sequential scan always a sign of a missing index?

No. A sequential scan can be the cheapest plan when a table is small, a large fraction of rows is needed, or index lookups would cause many random heap reads. Evaluate the plan against representative data and query latency; do not force indexes simply because a sequential scan appears.

### Practical

#### 4. What can `EXPLAIN (ANALYZE, BUFFERS)` tell you about where time is spent?

Compare estimated and actual rows at each node, inspect loops and timing, and look at shared buffer hits and reads. A node executed many times can dominate even if each loop is quick. Buffer reads indicate blocks had to be read into shared buffers, not necessarily physical disk reads because the operating-system cache may satisfy them. Use the plan to form a hypothesis, then verify with the relevant workload metrics.

#### 5. How do statistics affect query planning, and how do you refresh them?

PostgreSQL uses statistics about value distributions and table sizes to estimate selectivity and cost. `ANALYZE table_name` refreshes table statistics; `VACUUM` also performs analysis by default unless disabled. For skewed columns or correlated values, per-column statistics targets or extended statistics can improve estimates. Refresh after major data changes and verify that the plan improves.

#### 6. What makes a predicate difficult to optimize with a B-tree index?

Applying a function to the indexed column or casting it in a way that prevents a matching index condition can make the predicate non-sargable. For example, `WHERE lower(email) = ...` may need an index on `lower(email)`. A pattern such as `LIKE '%term'` usually cannot use a standard B-tree prefix search. Prefer a compatible predicate or index only when supported by the workload.

#### 7. What are common causes of expensive sorting or hashing?

Large sorts and hash operations can consume memory and spill to temporary files when they exceed available memory. Check plan nodes, actual row counts, temporary I/O, and relevant logs or statistics. Reduce unnecessary rows and columns before the operation, verify join conditions, and tune memory settings cautiously: per-operation memory can multiply across concurrent queries and parallel workers.

### Advanced and Production

#### 8. How does keyset pagination compare with `OFFSET` pagination?

Large offsets require the database to find and skip many preceding rows, and concurrent changes can make page boundaries unstable. Keyset pagination continues from the last seen sort key:

```sql
SELECT id, created_at
FROM orders
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

The ordering should be deterministic, typically with a unique tie-breaker, and supported by a suitable index.

#### 9. How do you find the queries most worth optimizing in production?

Use `pg_stat_statements` when available to compare normalized query calls, total and mean execution time, and rows processed. Correlate this with application latency percentiles, frequency, resource use, and business importance. A slow one-off query may matter less than a moderately expensive query executed thousands of times. Capture representative plans without exposing sensitive parameter data.

#### 10. How do you investigate a query that became slow after a deployment?

Compare the old and new SQL, parameters, plans, row counts, and database statistics. Check whether data volume or distribution changed, whether prepared statements selected a different plan, and whether locks, resource contention, or cache state changed. Reproduce with representative data, change one factor at a time, and verify latency and resource impact under realistic load before rollout.
