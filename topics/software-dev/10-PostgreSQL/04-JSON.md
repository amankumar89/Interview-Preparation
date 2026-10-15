# PostgreSQL — 04 JSON

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

#### 1. What is the difference between PostgreSQL `json` and `jsonb`?

Both store JSON values and validate JSON syntax. `json` preserves the input text and reparses it for processing. `jsonb` stores a decomposed representation, usually making processing and indexing more efficient, but it does not preserve whitespace, object-key order, or duplicate keys. Choose based on whether textual fidelity or query and indexing behavior matters.

#### 2. How do you access fields and array elements in a JSONB value?

The `->` and `->>` operators extract a JSON value and text respectively; `#>` and `#>>` accept a path:

```sql
SELECT profile -> 'address' AS address_json,
	   profile ->> 'name' AS name,
	   profile #>> '{address,city}' AS city
FROM customers;
```

Text extraction is convenient for comparisons, but casts may be needed for numeric or date operations.

#### 3. How do SQL `NULL`, JSON `null`, and a missing JSON key differ?

SQL `NULL` means the column has no SQL value. JSON `null` is a JSON value inside the document. A missing key has no corresponding path. Extraction with `->>` can yield SQL `NULL` for both a missing key and a JSON null, so use existence operators or explicit JSON-level checks when the distinction matters.

### Practical

#### 4. How do you test whether a JSONB document contains a value or key?

The containment operator `@>` tests whether the left JSONB value contains the right structure. The `?` operator tests whether a top-level key or string array element exists:

```sql
SELECT * FROM events
WHERE payload @> '{"kind":"login"}'::jsonb;

SELECT * FROM events
WHERE payload ? 'user_id';
```

These operators have different semantics and index support; use the one matching the intended structural test.

#### 5. How can you index JSONB queries?

A GIN index can accelerate supported JSONB operators:

```sql
CREATE INDEX idx_events_payload ON events USING GIN (payload);
```

The default `jsonb_ops` operator class supports a broad set of operations. `jsonb_path_ops` can be smaller and efficient for containment and JSONPath queries, but supports fewer operators. For a frequently filtered scalar path, a B-tree expression index such as `((payload ->> 'user_id'))` may be more appropriate.

#### 6. How do you update part of a JSONB document?

Use `jsonb_set` to replace or add a value at a path:

```sql
UPDATE users
SET preferences = jsonb_set(
	preferences,
	'{notifications,email}',
	'false'::jsonb,
	true
)
WHERE id = 42;
```

The final argument controls whether missing path elements should be created. PostgreSQL updates a row version, not an in-place fragment of the stored document, so frequent updates to large documents can be costly and contend on the row.

### Advanced and Production

#### 7. When should a value be a relational column instead of a JSON field?

Use a relational column when the value is central to filtering, joining, constraints, permissions, reporting, or frequent updates. JSONB is useful for sparse, evolving, or naturally document-shaped attributes, especially when fields vary between records. A common design keeps stable and highly queried fields relational while storing flexible attributes in JSONB.

#### 8. What is a common JSONB indexing mistake?

Creating a general GIN index and assuming it will support every expression and query shape. Index operator classes support particular operators, and an expression such as a cast or function may need its own matching expression index. Compare `EXPLAIN` plans for the actual predicate, and measure write and storage overhead before indexing a large document column.

#### 9. What are PostgreSQL JSONPath operators used for?

JSONPath supports expressive path queries over JSON values. The `@?` operator tests whether a path returns any items, while `@@` evaluates a path predicate as a boolean. JSONPath can simplify conditions that traverse nested arrays or objects, but validate its semantics for absent values and errors, and confirm the chosen index operator class can support the query.

#### 10. How should an application handle schema evolution for JSON documents?

Treat document shape as an application contract: define expected fields and types, validate writes, and plan how readers handle older or partially populated records. For fields that become essential, consider a migration to a relational column or a generated column with appropriate constraints and indexes. Avoid assuming every historical row already follows the newest document shape.
