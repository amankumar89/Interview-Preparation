# SQL — 07 Transactions

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a database transaction?

**Interview Answer:**

A transaction is a unit of work whose changes are committed together or rolled back together. It protects consistency when several related statements must be treated as one operation.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;
```

---

### Q2. Explain ACID.

**Answer:**

Atomicity means all-or-nothing changes. Consistency means constraints and invariants remain valid. Isolation controls how concurrent transactions observe each other's work. Durability means committed changes survive a failure, subject to the database's durability configuration.

---

## Core Concepts

### Q3. What are common transaction isolation levels?

**Answer:**

Read uncommitted can observe dirty data. Read committed prevents dirty reads. Repeatable read also stabilizes reads of existing rows, with database-specific phantom behavior. Serializable provides the strongest isolation by making concurrent execution equivalent to some serial order, usually at a higher cost. Snapshot or MVCC implementations differ by engine.

---

### Q4. What are dirty reads, non-repeatable reads, and phantom reads?

**Answer:**

A dirty read sees another transaction's uncommitted change. A non-repeatable read gets different values for the same row within one transaction after another transaction commits an update. A phantom read sees a different set of rows when a repeated predicate finds inserted or deleted matching rows.

---

## Practical Questions

### Q5. What causes a deadlock, and how should applications handle it?

**Answer:**

A deadlock occurs when transactions hold locks that the other transactions need, creating a cycle. The database aborts one transaction. Applications should use a consistent lock order, keep transactions short, avoid external calls inside them, and retry the aborted operation with bounded exponential backoff when it is safe and idempotent.

---

### Q6. What is the difference between optimistic and pessimistic locking?

**Answer:**

Pessimistic locking acquires a database lock before changing a row, which is useful when conflicts are likely. Optimistic locking reads a version and updates only when the version is unchanged, detecting conflicts without holding a long lock.

```sql
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE product_id = :id AND version = :expected_version AND stock > 0;
```

---

## Scenario-Based Questions

### Q7. How would you implement a reliable money transfer?

**Answer:**

Validate the request, start a transaction, lock or atomically update both accounts in a consistent ID order, verify sufficient funds, write a transfer record with an idempotency key, and commit. Retry transient deadlocks or serialization failures only when the operation is safely identifiable; never report success before commit completes.
