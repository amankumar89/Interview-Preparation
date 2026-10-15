# SQL — 02 Select

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. How do you select and filter rows in SQL?

**Interview Answer:**

Use `SELECT` to choose columns and `FROM` to choose the source table. Add `WHERE` to filter rows before grouping or ordering.

```sql
SELECT id, name
FROM customers
WHERE status = 'ACTIVE';
```

---

### Q2. What is the difference between `WHERE` and `HAVING`?

**Answer:**

`WHERE` filters individual rows before aggregation. `HAVING` filters groups after `GROUP BY` has produced aggregate values.

```sql
SELECT customer_id, COUNT(*) AS order_count
FROM orders
WHERE created_at >= DATE '2026-01-01'
GROUP BY customer_id
HAVING COUNT(*) >= 5;
```

---

## Core Concepts

### Q3. What does `DISTINCT` do, and when can it be expensive?

**Answer:**

`DISTINCT` removes duplicate result rows based on all selected expressions. The database may need to sort or hash a large intermediate result, so it should not be used to hide an unintended join that produces duplicates.

---

### Q4. How do `CASE`, `COALESCE`, and `NULLIF` help in a query?

**Answer:**

`CASE` expresses conditional logic, `COALESCE` returns the first non-`NULL` expression, and `NULLIF(a, b)` returns `NULL` when two expressions are equal. They are useful for labels, defaults, and avoiding division by zero.

```sql
SELECT product_id,
	   CASE WHEN stock = 0 THEN 'OUT_OF_STOCK' ELSE 'AVAILABLE' END AS state,
	   revenue / NULLIF(quantity, 0) AS unit_revenue
FROM sales;
```

---

## Practical Questions

### Q5. How do you paginate a result set?

**Answer:**

Offset pagination uses `ORDER BY ... LIMIT ... OFFSET ...`, but becomes slower and less stable as rows change. Keyset pagination uses the last seen ordered key and is usually better for large or frequently changing datasets.

```sql
SELECT id, created_at, total
FROM orders
WHERE (created_at, id) < (:last_created_at, :last_id)
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

---

### Q6. How do you prevent SQL injection?

**Answer:**

Use parameterized statements or prepared statements and pass user input as values, never by concatenating it into SQL. Validate dynamic identifiers separately with an allowlist because bind parameters generally cannot represent table or column names. Use least-privilege database accounts as a second layer.

---

## Debugging Questions

### Q7. A query returns duplicate rows after adding a filter. What do you check?

**Answer:**

I check whether the filter changed a join path, whether the join condition is missing a key column, and whether the relationship is one-to-many. I compare row counts before and after each join, inspect the actual keys, and use `DISTINCT` only after understanding the cause.
