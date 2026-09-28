# PostgreSQL — 03 Transactions

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

#### 1. How does PostgreSQL provide transaction isolation while allowing concurrent work?

PostgreSQL uses multiversion concurrency control (MVCC). Updates create row versions, and a statement reads versions visible to its snapshot rather than blocking on every concurrent change. This improves read/write concurrency, but old versions need cleanup and conflicting writes can still block or fail.

#### 2. What are PostgreSQL's transaction isolation levels?

PostgreSQL supports Read Uncommitted, Read Committed, Repeatable Read, and Serializable. Read Uncommitted behaves as Read Committed in PostgreSQL. Read Committed is the default and gives each statement a new snapshot; Repeatable Read uses a stable transaction snapshot; Serializable aims to make committed transactions equivalent to some serial execution, sometimes aborting a transaction that must be retried.

#### 3. What is a savepoint?

A savepoint marks a point within a transaction to which the application can roll back without aborting all earlier work:

```sql
BEGIN;
UPDATE accounts SET label = 'primary' WHERE id = 1;
SAVEPOINT optional_step;
-- If this step fails:
ROLLBACK TO SAVEPOINT optional_step;
COMMIT;
```

Savepoints do not commit work; the outer transaction still controls final commit or rollback.

### Practical

#### 4. How would you safely transfer money between two accounts?

Perform both balance changes in one transaction and validate that the debit succeeded. For concurrent transfers, lock the account rows in a consistent order (for example, by ascending account ID) or use a conditional update such as `UPDATE ... SET balance = balance - amount WHERE id = ... AND balance >= amount`, then verify the affected-row count. Enforce nonnegative balances with a database constraint where appropriate, and roll back if any step fails.

#### 5. What do `SELECT ... FOR UPDATE`, `NOWAIT`, and `SKIP LOCKED` do?

`FOR UPDATE` locks selected rows against conflicting updates until the transaction ends. `NOWAIT` fails immediately if a required lock is unavailable. `SKIP LOCKED` skips rows already locked by another transaction, which can help multiple workers claim jobs from a queue. Skipped rows are not a general-purpose consistent view of all matching data.

#### 6. What causes a deadlock, and how should an application respond?

A deadlock occurs when transactions wait on one another in a cycle, such as one locking row A then B while another locks B then A. PostgreSQL detects the cycle and aborts one transaction. Reduce risk by acquiring locks in a consistent order and keeping transactions short. Applications should be prepared to retry the entire aborted transaction for deadlock errors, with bounded retries and safe handling of external side effects.

#### 7. Why should transactions be kept short?

Long-running transactions retain old snapshots, which can prevent vacuum from reclaiming obsolete row versions and can contribute to table bloat. They also hold locks longer and increase contention. Avoid waiting for user input or slow network calls while a transaction is open; keep database work bounded and commit promptly.

### Advanced and Production

#### 8. What is a serialization failure, and how is it different from a deadlock?

A serialization failure means PostgreSQL could not safely serialize the concurrent outcome under the chosen isolation level, commonly Serializable or Repeatable Read. A deadlock is a cycle of lock waits. Both can abort a transaction, but serialization failures do not require a lock cycle. Retry the complete transaction when it is safe, not just the final statement, and ensure external effects are deferred or idempotent.

#### 9. What does Serializable isolation guarantee in PostgreSQL?

Serializable isolation uses Serializable Snapshot Isolation to detect dangerous patterns that could produce a result inconsistent with any serial order. It can allow transactions to proceed concurrently and then abort one with a serialization error. The application must implement transaction-level retries; choosing Serializable does not eliminate the need to handle failures.

#### 10. How do you prevent duplicate work when a client retries after a timeout?

Use an idempotency key protected by a unique constraint, and record the key and result in the same transaction as the business change. A repeated request can then return the existing result rather than apply the operation twice. A client timeout does not reveal whether the server committed, so retry behavior must be designed around that ambiguity.
