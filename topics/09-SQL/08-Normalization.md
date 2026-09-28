# SQL — 08 Normalization

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is normalization?

**Interview Answer:**

Normalization organizes relational data to reduce unnecessary duplication and prevent insert, update, and delete anomalies. It generally separates independent facts into related tables connected by keys.

---

### Q2. What are the first three normal forms?

**Answer:**

First normal form requires atomic values and no repeating groups. Second normal form requires 1NF and that every non-key attribute depend on the whole candidate key, which matters for composite keys. Third normal form requires 2NF and removes transitive dependencies of non-key attributes on the key.

---

## Core Concepts

### Q3. What is a functional dependency?

**Answer:**

An attribute set `A` functionally determines `B` when one value of `A` can be associated with only one value of `B`, written `A -> B`. Functional dependencies help identify candidate keys and decide whether attributes belong in the same relation.

---

### Q4. What anomalies does normalization prevent?

**Answer:**

An update anomaly occurs when the same fact must be changed in multiple rows. An insertion anomaly prevents storing a fact without unrelated data. A deletion anomaly accidentally removes a fact when deleting another record. Splitting tables and enforcing foreign keys addresses these problems.

---

## Practical Questions

### Q5. What is denormalization, and when is it justified?

**Answer:**

Denormalization intentionally duplicates or precomputes data to reduce joins or improve read latency. It is justified after measuring a real bottleneck and requires a clear strategy for keeping duplicated values consistent, such as transactions, asynchronous events, or refreshable materialized views.

---

### Q6. How would you model products with multiple categories?

**Answer:**

Use `products`, `categories`, and a junction table such as `product_categories(product_id, category_id)`. Give the junction table a composite primary key or equivalent unique constraint to prevent duplicate relationships, and add foreign keys with the intended delete behavior.

---

## Scenario-Based Questions

### Q7. A normalized schema is causing a dashboard to time out. What should you do?

**Answer:**

First measure the query plan, joins, row counts, and required freshness. Then add appropriate indexes, pre-aggregate data, use a materialized view, or introduce a read model if justified. I would not broadly denormalize before identifying the bottleneck, and I would document how the read model is refreshed and recovered.
