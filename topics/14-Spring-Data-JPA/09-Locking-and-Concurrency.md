# Spring-Data-JPA — 09 Locking and Concurrency

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Why can concurrent updates cause lost updates?**

**Answer:** Two transactions may read the same old value and then overwrite each other's changes. The later write can silently discard the earlier transaction's update unless the application or database detects the conflict.

**Q2. What is the difference between optimistic and pessimistic locking?**

**Answer:** Optimistic locking allows concurrent reads and detects conflicting writes when they occur. Pessimistic locking acquires a database lock to prevent conflicting operations while a transaction is active.

### Intermediate

**Q3. How does JPA optimistic locking with `@Version` work?**

**Answer:** JPA tracks a version value on the entity and includes it in updates. If another transaction has changed the row, the version no longer matches and the update fails with an optimistic-locking conflict rather than silently overwriting data.

**Q4. When would you choose pessimistic locking?**

**Answer:** Consider it when conflicts are frequent or an operation must reserve a row while making a short, critical update. It can reduce throughput and introduce lock waits or deadlocks, so transactions should remain short and lock ordering should be consistent.

### Practical and Production

**Q5. How should an application handle an optimistic-locking conflict?**

**Answer:** It can return a conflict response, ask the user to refresh, or retry the entire operation if it is safe and the business rule permits it. Retrying only the failed SQL update without re-reading and revalidating state can produce an incorrect result.

**Q6. What should you consider when using pessimistic locks through Spring Data JPA?**

**Answer:** Apply a suitable lock mode to the query, execute it inside a transaction, and consider lock timeout behavior and database-specific semantics. Monitor blocking and deadlocks, and never hold a lock across slow external calls.
