# PostgreSQL — 02 Indexes

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

#### 1. What is an index in PostgreSQL, and what is its cost?

An index is a data structure that can help PostgreSQL find rows without scanning an entire table. It can speed up reads, joins, and some uniqueness checks, but it consumes disk and memory, adds work to inserts, updates, and deletes, and needs maintenance. An index is useful only when its access cost is lower than the alternatives for the actual workload.

#### 2. What is the default PostgreSQL index type, and when is it useful?

B-tree is the default and is useful for equality and range comparisons, ordering, and many common operators. It supports queries such as `WHERE created_at >= ... ORDER BY created_at`. The planner may still choose a sequential scan when many rows match or table access would make index lookups more expensive.

#### 3. How does a multicolumn B-tree index work?

A multicolumn index is ordered by its indexed columns from left to right. An index on `(customer_id, created_at)` is generally useful for conditions on `customer_id`, and for conditions on both columns, but is less useful for filtering only on `created_at`. Put columns used by the most selective leading conditions first, considering the actual query patterns rather than a universal cardinality rule.

### Practical

#### 4. What are partial and expression indexes?

A partial index includes only rows satisfying a predicate, which can reduce index size when queries repeatedly target a subset:

```sql
CREATE INDEX idx_open_orders_created
ON orders (created_at)
WHERE status = 'open';
```

An expression index stores an expression's result and can support matching expressions in queries:

```sql
CREATE INDEX idx_users_lower_email ON users (lower(email));
```

The query predicate or expression must be compatible with the index for the planner to use it.

#### 5. When would you choose GIN, GiST, or BRIN instead of B-tree?

GIN is commonly used for values containing multiple searchable elements, such as JSONB keys or full-text search vectors. GiST is an extensible framework used by types and extensions for operations such as geometric or range searches. BRIN summarizes values across physical block ranges; it is compact and can work well when a large table's row order correlates with the indexed value, such as append-ordered timestamps. Verify operator support and workload-specific performance before choosing.

#### 6. What is an index-only scan, and why might PostgreSQL still visit the table?

An index-only scan can return requested columns from the index itself. PostgreSQL must also know that the tuple is visible to the query's MVCC snapshot; visibility-map information, maintained by vacuuming, lets it avoid visiting the heap. If visibility information is insufficient, the plan can perform heap fetches despite being labeled an index-only scan.

#### 7. How do you create an index without blocking normal writes for the whole build?

Use `CREATE INDEX CONCURRENTLY` for a live table. It allows inserts, updates, and deletes during most of the build, but performs additional work, takes longer, and has restrictions (for example, it cannot run inside a transaction block). If it fails, it can leave an invalid index that should be inspected and removed or rebuilt before assuming the index is usable.

### Advanced and Production

#### 8. What does `INCLUDE` do in a PostgreSQL index?

`INCLUDE` adds non-key columns to leaf entries so a query may be satisfied by an index-only scan, without making those columns part of the search ordering or uniqueness key:

```sql
CREATE INDEX idx_orders_customer ON orders (customer_id) INCLUDE (total);
```

Included columns increase index size and write cost, so include only columns that materially help common queries.

#### 9. Why can an index on a column fail to help a query?

The planner may estimate that a sequential scan is cheaper, especially when many rows match or the table is small. A condition that transforms the column, an incompatible cast or collation, a leading-wildcard pattern, or a predicate that does not imply a partial index's condition may prevent use. Check the actual plan and predicate shape before adding another index.

#### 10. How do you decide whether an index is unused or should be removed?

Review workload statistics such as `pg_stat_user_indexes` and `pg_stat_statements`, along with query plans, index size, and write cost over a representative observation window. Statistics reset and may not capture infrequent but important jobs, so confirm with application owners and monitoring before removal. Check constraint dependencies too: an index may enforce uniqueness even if query counters show few scans.
