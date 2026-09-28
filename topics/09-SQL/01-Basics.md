# SQL — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is SQL, and how is it different from a database?

**Interview Answer:**

SQL is a declarative language used to define, query, manipulate, and control data in relational database systems. A database is the stored data and the software that manages it; SQL is one way to communicate with that software.

**Detailed Explanation:**

SQL describes the result or operation rather than the exact algorithm used to produce it. Common categories are DDL (`CREATE`, `ALTER`), DML (`INSERT`, `UPDATE`, `DELETE`), DQL (`SELECT`), and transaction or permission commands such as `COMMIT`, `ROLLBACK`, and `GRANT`.

---

### Q2. What are tables, rows, columns, and a primary key?

**Interview Answer:**

A table stores records in rows and attributes in columns. A primary key uniquely identifies each row, must be unique, and cannot be `NULL`.

**Example:**

```sql
CREATE TABLE customers (
	customer_id BIGINT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(100) NOT NULL
);
```

---

## Core Concepts

### Q3. What is the difference between `PRIMARY KEY`, `UNIQUE`, and `FOREIGN KEY`?

**Answer:**

`PRIMARY KEY` identifies the row and permits one primary-key constraint per table. `UNIQUE` prevents duplicate values in a column or column combination, but its treatment of `NULL` depends on the database system. `FOREIGN KEY` enforces a relationship by requiring a value to match a candidate key in another table, unless it is nullable.

---

### Q4. How does SQL handle `NULL`?

**Answer:**

`NULL` means missing or unknown, not zero or an empty string. Comparisons with `NULL` evaluate to unknown, so use `IS NULL` or `IS NOT NULL` rather than `= NULL`.

```sql
SELECT * FROM customers WHERE name IS NULL;
SELECT COALESCE(name, 'Unknown') FROM customers;
```

---

## Practical Questions

### Q5. What is the logical order of SQL query processing?

**Answer:**

The conceptual order is `FROM` and `JOIN`, `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `DISTINCT`, `ORDER BY`, then `LIMIT` or `OFFSET`. This explains why a `SELECT` alias usually cannot be used in `WHERE`, while it can often be used in `ORDER BY`.

---

### Q6. What is the difference between `DELETE`, `TRUNCATE`, and `DROP`?

**Answer:**

`DELETE` removes selected rows and can use `WHERE`. `TRUNCATE` removes all rows more directly and commonly resets storage or identity metadata depending on the database. `DROP` removes the table definition and its data. Transaction and trigger behavior varies by database, so destructive commands must be tested for the target engine.

---

## Scenario-Based Questions

### Q7. How would you safely remove duplicate customer records?

**Answer:**

First define which record should survive, such as the earliest `customer_id`, then rank duplicates inside a transaction and delete only rows with a rank greater than one. Before deleting, run the ranking query as a `SELECT` and take a backup or verified snapshot.

```sql
WITH ranked AS (
	SELECT customer_id,
		   ROW_NUMBER() OVER (
			   PARTITION BY email ORDER BY customer_id
		   ) AS row_number
	FROM customers
)
DELETE FROM customers
WHERE customer_id IN (
	SELECT customer_id FROM ranked WHERE row_number > 1
);
```
