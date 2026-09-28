# SQL — 04 Subqueries

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a subquery?

**Interview Answer:**

A subquery is a query nested inside another SQL statement. It can return a scalar value, a list of values, or a relation used by the outer query.

---

### Q2. What is the difference between correlated and non-correlated subqueries?

**Answer:**

A non-correlated subquery can run independently of the outer query. A correlated subquery references an outer row and is logically evaluated for each candidate outer row, although the optimizer may transform it.

```sql
SELECT e.employee_id, e.salary
FROM employees AS e
WHERE e.salary > (
	SELECT AVG(e2.salary)
	FROM employees AS e2
	WHERE e2.department_id = e.department_id
);
```

---

## Core Concepts

### Q3. When should you use `EXISTS` instead of `IN`?

**Answer:**

Use `EXISTS` when you need to test whether at least one related row exists. It expresses the intent clearly and handles correlated checks well. `NOT IN` has surprising behavior if the subquery returns `NULL`; `NOT EXISTS` is safer for anti-joins.

---

### Q4. What is a scalar subquery?

**Answer:**

A scalar subquery returns one value for each outer row, such as an average or latest timestamp. It must return at most one row or the database raises an error. A join or window function may be clearer when the value is reused or the data set is large.

---

## Practical Questions

### Q5. What is a derived table?

**Answer:**

A derived table is a subquery in the `FROM` clause. It lets you aggregate or filter an intermediate result before joining it to other data.

```sql
SELECT d.department_id, d.average_salary
FROM (
	SELECT department_id, AVG(salary) AS average_salary
	FROM employees
	GROUP BY department_id
) AS d
WHERE d.average_salary > 80000;
```

---

### Q6. What is a common table expression (CTE)?

**Answer:**

A CTE names a query defined with `WITH` and used by the following statement. It improves readability and can support recursive queries. A CTE is not automatically a materialized temporary table; optimizer and database behavior determine whether it is inlined or materialized.

---

## Scenario-Based Questions

### Q7. How would you find the second-highest salary without assuming it is unique?

**Answer:**

Use `DENSE_RANK` when ties should share the same rank. Filter for rank two, which returns all employees whose salary is the second distinct highest value.

```sql
WITH ranked AS (
	SELECT employee_id, salary,
		   DENSE_RANK() OVER (ORDER BY salary DESC) AS salary_rank
	FROM employees
)
SELECT employee_id, salary
FROM ranked
WHERE salary_rank = 2;
```
