# SQL — 03 Joins

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an inner join?

**Interview Answer:**

An `INNER JOIN` returns only rows for which the join condition matches in both inputs.

```sql
SELECT o.id, c.email
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id;
```

---

### Q2. Compare `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, and `FULL OUTER JOIN`.

**Answer:**

`INNER JOIN` keeps matches only. `LEFT JOIN` keeps every row from the left input and fills unmatched right columns with `NULL`. `RIGHT JOIN` is the mirrored form. `FULL OUTER JOIN` keeps unmatched rows from both sides where supported. In practice, rewriting a right join as a left join often makes query direction clearer.

---

## Core Concepts

### Q3. What is a self join?

**Answer:**

A self join joins a table to itself using different aliases. It is useful for hierarchical data such as employees and managers.

```sql
SELECT employee.name, manager.name AS manager_name
FROM employees AS employee
LEFT JOIN employees AS manager
	ON manager.employee_id = employee.manager_id;
```

---

### Q4. What is a many-to-many relationship and how is it queried?

**Answer:**

It is represented by a junction table containing foreign keys to both entities. For example, `students`, `courses`, and `student_courses` allow a student to take many courses and a course to have many students.

```sql
SELECT s.name, c.title
FROM students AS s
JOIN student_courses AS sc ON sc.student_id = s.student_id
JOIN courses AS c ON c.course_id = sc.course_id;
```

---

## Practical Questions

### Q5. How do you find rows with no related record?

**Answer:**

Use an anti-join. `NOT EXISTS` is usually clear and avoids accidental matches caused by nullable columns in a `NOT IN` subquery.

```sql
SELECT c.customer_id
FROM customers AS c
WHERE NOT EXISTS (
		SELECT 1 FROM orders AS o
		WHERE o.customer_id = c.customer_id
);
```

---

### Q6. Why can a condition in `WHERE` accidentally change a `LEFT JOIN` into an inner join?

**Answer:**

Unmatched rows have `NULL` values for the right table, so a right-table predicate in `WHERE` removes them. Put the predicate in the `ON` clause when unmatched left rows must remain.

```sql
SELECT c.customer_id, o.id
FROM customers AS c
LEFT JOIN orders AS o
	ON o.customer_id = c.customer_id
 AND o.status = 'PAID';
```

---

## Scenario-Based Questions

### Q7. A report is counting each order twice. How do you diagnose it?

**Answer:**

I identify the intended grain, such as one row per order, then inspect each join's cardinality. A join to a one-to-many table can multiply rows. I can aggregate that table first, join on the complete key, or use `EXISTS` when I only need to test presence. I verify the fix with counts of distinct order IDs.
