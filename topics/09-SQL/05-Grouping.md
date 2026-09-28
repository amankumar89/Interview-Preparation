# SQL — 05 Grouping

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What does `GROUP BY` do?

**Interview Answer:**

`GROUP BY` partitions rows into groups with equal values for the specified expressions, allowing aggregate functions such as `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX` to calculate one result per group.

```sql
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;
```

---

### Q2. Why must selected non-aggregate columns usually appear in `GROUP BY`?

**Answer:**

After grouping, a group can contain multiple values for a non-grouped column. Requiring that column in `GROUP BY` prevents the database from choosing an arbitrary value. Some engines allow functional-dependency exceptions, but portable SQL should group every selected non-aggregate expression.

---

## Core Concepts

### Q3. What is the difference between `COUNT(*)`, `COUNT(column)`, and `COUNT(DISTINCT column)`?

**Answer:**

`COUNT(*)` counts rows, including rows containing `NULL`. `COUNT(column)` counts only non-`NULL` values in that column. `COUNT(DISTINCT column)` counts unique non-`NULL` values.

---

### Q4. How do you calculate conditional aggregates?

**Answer:**

Use `CASE` inside an aggregate, or a database-specific filtered aggregate where available. This allows several metrics to be computed in one grouped query.

```sql
SELECT customer_id,
	   COUNT(*) AS total_orders,
	   SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) AS paid_orders
FROM orders
GROUP BY customer_id;
```

---

## Practical Questions

### Q5. How do you find groups that occur more than once?

**Answer:**

Group by the suspected duplicate key and filter the aggregate with `HAVING`.

```sql
SELECT email, COUNT(*) AS occurrences
FROM customers
GROUP BY email
HAVING COUNT(*) > 1;
```

---

### Q6. How are window functions different from `GROUP BY`?

**Answer:**

`GROUP BY` collapses each group into one output row. A window function calculates across related rows while preserving the original row detail.

```sql
SELECT employee_id, department_id, salary,
	   AVG(salary) OVER (PARTITION BY department_id) AS department_average
FROM employees;
```

---

## Scenario-Based Questions

### Q7. How would you calculate a running total by account?

**Answer:**

Use `SUM` as a window function with a deterministic ordering. Include a tie-breaker such as the transaction ID so rows with the same timestamp have stable ordering.

```sql
SELECT account_id, transaction_id, amount,
	   SUM(amount) OVER (
		   PARTITION BY account_id
		   ORDER BY occurred_at, transaction_id
		   ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
	   ) AS running_balance
FROM transactions;
```
