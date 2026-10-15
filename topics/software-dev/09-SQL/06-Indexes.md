# SQL — 06 Indexes

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an index?

**Interview Answer:**

An index is an auxiliary data structure that helps the database locate rows without scanning the whole table. It improves some reads but consumes storage and adds work to inserts, updates, and deletes.

---

### Q2. What is the difference between clustered and non-clustered indexes?

**Answer:**

A clustered organization stores table data in the index's order, so a table generally has at most one such ordering. A non-clustered index stores keys and row references separately, so a table can have many. Exact behavior is database-specific; PostgreSQL's standard indexes, for example, are not clustered by default.

---

## Core Concepts

### Q3. What is a composite index and why does column order matter?

**Answer:**

A composite index contains multiple columns. Its leading columns determine which predicates and orderings can use it efficiently. For an index on `(tenant_id, status, created_at)`, a query filtering by `tenant_id` can use the leading part, while a query filtering only by `status` generally cannot use the index as effectively.

---

### Q4. What is a covering index?

**Answer:**

A covering index contains all columns needed to filter and return a query, allowing the engine to answer it from the index without visiting the table in some cases. It can reduce I/O, but wider indexes cost more storage and write time.

---

## Practical Questions

### Q5. Why might the optimizer ignore an index?

**Answer:**

The table may be small, the predicate may match a large percentage of rows, the expression may prevent index use, statistics may be stale, or an implicit type conversion may be involved. Inspect the actual execution plan rather than assuming an index is always faster.

---

### Q6. How do you choose an index for a query?

**Answer:**

Start with real query patterns and predicates, then consider equality filters, join keys, range filters, and ordering. Check selectivity, write cost, existing indexes, and the actual plan. Avoid adding indexes solely to every column because redundant indexes increase maintenance cost.

---

## Scenario-Based Questions

### Q7. A production query became slow after the table grew. What is your process?

**Answer:**

I capture the exact query and parameters, inspect the actual plan and timing, compare it with a known-good plan, and check statistics, locks, data distribution, and recent schema changes. I test a targeted index or query rewrite on representative data, measure reads and latency, then deploy with monitoring and a rollback plan.
