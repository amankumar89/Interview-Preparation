# PostgreSQL — 06 Advanced PostgreSQL

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

#### 1. What does `VACUUM` do in PostgreSQL?

Because updates and deletes leave obsolete row versions under MVCC, `VACUUM` makes space from dead tuples reusable and updates visibility information. It normally does not return all reclaimed space to the operating system. `VACUUM FULL` rewrites the table and can return space, but requires stronger locking and additional disk space, so it is not a routine substitute for healthy autovacuum.

#### 2. What is autovacuum, and what problems can occur if it falls behind?

Autovacuum automatically vacuums and analyzes tables based on thresholds and activity. If it cannot keep up, dead tuples and table/index bloat can accumulate, query plans can use stale statistics, and transaction ID wraparound risks can threaten database availability. Monitor vacuum progress, table activity, long transactions, and logs before changing thresholds globally.

#### 3. What is a materialized view?

A materialized view stores the result of a query so reads can avoid recomputing an expensive aggregation or join. Its contents become stale until refreshed. `REFRESH MATERIALIZED VIEW CONCURRENTLY` can allow reads during refresh, but requires a qualifying unique index and has additional work; schedule refreshes based on freshness requirements and resource impact.

### Practical

#### 4. How does table partitioning work in PostgreSQL?

Declarative partitioning divides a parent table into child partitions using range, list, or hash bounds. Queries can benefit from partition pruning when their predicates constrain the partition key. Partitioning can simplify retention and maintenance for large datasets, but adds planning and operational complexity; it is not automatically faster and does not replace appropriate indexes.

#### 5. What is the difference between physical and logical replication?

Physical replication streams WAL changes to keep a standby's physical copy of the database in sync, commonly supporting read replicas and failover. Logical replication publishes row-level changes for selected tables and can support more selective replication or migrations between versions, but has different DDL, sequence, and conflict-management considerations. Neither should be treated as a backup.

#### 6. What is WAL, and how does point-in-time recovery work?

Write-ahead logging records changes before corresponding data pages are written. With a base backup and a retained, unbroken sequence of WAL archives, recovery can replay changes to a chosen time or recovery point. A production recovery plan must configure archiving, retain backups and WAL safely, and regularly test restores; having replication alone does not protect against accidental deletion replicated to the standby.

#### 7. Why is connection pooling commonly used with PostgreSQL?

Each server connection consumes resources, so very high connection counts can increase memory use and scheduling overhead. A pooler such as PgBouncer can reuse a smaller number of server connections. Transaction pooling can change session behavior: applications must not rely on session state, temporary tables, or other features that require the same server connection across transactions unless configured and supported appropriately.

### Advanced and Production

#### 8. What is row-level security (RLS), and what should an application consider?

RLS policies restrict which rows a role can read or modify. Enable it on a table and define policies for the relevant commands and roles. Table owners and roles with bypass privileges can bypass policies unless configured carefully, so use a restricted application role, set tenant context safely, and test both allowed and denied access paths. RLS supplements, rather than replaces, application authorization.

#### 9. What are advisory locks, and when are they appropriate?

Advisory locks are application-defined locks keyed by one or two integers. They can coordinate work that is not naturally represented by locking a row, such as ensuring one maintenance job runs at a time. PostgreSQL does not enforce what the key means, so every participating process must follow the same convention. Prefer transaction-scoped locks when possible to ensure release on commit or rollback.

#### 10. How would you prepare a PostgreSQL database for a major version upgrade?

Read the target version's release and upgrade notes, verify extension and driver compatibility, and choose a tested upgrade method such as `pg_upgrade` or logical replication. Measure upgrade time and disk requirements, test with a recent production-like copy, validate data and application behavior, and define a rollback or cutover plan. Take and verify backups before the production upgrade; do not rely on an untested backup as the only recovery path.
