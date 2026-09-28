# SQL — 09 Query Optimization

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is query optimization?

**Interview Answer:**

Query optimization is the process of choosing an efficient execution plan for a SQL statement. The optimizer considers available indexes, table statistics, join algorithms, estimated cardinalities, and resource costs.

---

### Q2. How do you inspect a query's execution plan?

**Answer:**

Use the database's plan command, such as `EXPLAIN`, and use the actual execution option where supported, such as PostgreSQL's `EXPLAIN (ANALYZE, BUFFERS)`. Compare estimated and actual rows, scan types, join order, sort or spill operations, buffer reads, and total time. Run analysis carefully because actual-plan commands execute the query.

---

## Core Concepts

### Q3. What is the difference between a sequential scan and an index scan?

**Answer:**

A sequential scan reads table pages in order and can be cheapest for small tables or low-selectivity predicates. An index scan follows index entries to locate rows and is useful when a small portion of the table matches, though random table access can make it expensive.

---

### Q4. What are common join algorithms?

**Answer:**

Nested loop joins repeatedly search the inner input and are effective when one side is small and indexed. Hash joins build a hash table and work well for equality joins. Merge joins walk sorted inputs and can be efficient when useful ordering already exists. The optimizer chooses based on estimates and cost.

---

## Practical Questions

### Q5. What makes a predicate non-sargable?

**Answer:**

A predicate is often called non-sargable when it applies a function or transformation to the indexed column, preventing a direct index range lookup.

```sql
-- Often prevents direct use of an index on created_at
WHERE DATE(created_at) = DATE '2026-09-28'

-- Equivalent range that can use an index on created_at
WHERE created_at >= TIMESTAMP '2026-09-28 00:00:00'
	AND created_at <  TIMESTAMP '2026-09-29 00:00:00'
```

---

### Q6. How do statistics affect query performance?

**Answer:**

Statistics describe data distribution and help estimate predicate selectivity and join cardinality. Stale or insufficient statistics can produce a bad plan, such as a nested loop for a large result. Refresh statistics using the database's maintenance tools and verify the resulting plan.

---

## Scenario-Based Questions

### Q7. A query is fast in testing but slow in production. What do you investigate?

**Answer:**

I compare data volume and distribution, parameter values, indexes, statistics, database version, configuration, cache state, concurrent load, locks, and execution plans. I capture production-like timings and I/O, then test a targeted change on representative data. The fix should address the measured bottleneck and include monitoring for regressions.
