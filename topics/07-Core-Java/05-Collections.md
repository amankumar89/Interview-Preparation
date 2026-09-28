# Core-Java — 05 Collections

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the Java Collections Framework?

**Interview Answer:**
The Java Collections Framework is a set of interfaces and classes for storing and manipulating groups of objects, such as lists, sets, queues, and maps.

**Detailed Explanation:**
It provides common abstractions like `List`, `Set`, `Queue`, and `Map`, and concrete implementations such as `ArrayList`, `HashSet`, `LinkedHashMap`, and `PriorityQueue`. This reduces repetitive code and provides consistent APIs.

### Q2. What is the difference between `List`, `Set`, and `Map`?

**Interview Answer:**
A `List` stores ordered, indexable elements; a `Set` stores unique elements without an index; and a `Map` stores key-value pairs.

**Detailed Explanation:**
These interfaces represent different semantics. Lists allow duplicates and order, sets enforce uniqueness, and maps associate keys to values for lookup. The correct choice depends on business rules and access patterns.

### Q3. What is `ArrayList` and when is it used?

**Interview Answer:**
`ArrayList` is a resizable array-based implementation of `List`. It is used when you need fast random access and appends.

**Detailed Explanation:**
It works well for most general-purpose lists because its indexing cost is constant time. It is less ideal for frequent insertions or deletions in the middle, where `LinkedList` may be better.

### Q4. What is `LinkedList` and when is it used?

**Interview Answer:**
`LinkedList` stores elements in nodes, allowing efficient insertion and deletion at the front or middle compared to `ArrayList`.

**Detailed Explanation:**
It is useful for queues, stacks, and operations that frequently modify the beginning or middle of the structure. However, random access is slower because traversal is required.

### Q5. What is the difference between `HashSet` and `TreeSet`?

**Interview Answer:**
`HashSet` stores elements in a hash table for fast lookup and does not guarantee order. `TreeSet` stores elements in sorted order and is slower but predictable in ordering.

**Detailed Explanation:**
Use `HashSet` for fast membership tests and when order does not matter. Use `TreeSet` when you need sorted behavior or range-based traversal.

### Q6. What is the difference between `HashMap` and `TreeMap`?

**Interview Answer:**
`HashMap` provides constant-time average lookup and does not guarantee order. `TreeMap` keeps keys sorted and provides ordered traversal, but with a higher cost.

**Detailed Explanation:**
`HashMap` is generally the default choice for lookup-heavy scenarios. `TreeMap` is useful when sorted keys are required or when you need predictable iteration order.

### Q7. What is `LinkedHashMap`?

**Interview Answer:**
`LinkedHashMap` is a map that preserves insertion order while still providing hash-based lookup.

**Detailed Explanation:**
This is useful when order of insertion matters, such as request metadata, configuration entries, or caches that need predictable iteration.

### Q8. What is the purpose of `equals()` and `hashCode()` in collections?

**Interview Answer:**
These methods define object equality and hashing behavior, especially for `Set` and `Map` keys.

**Detailed Explanation:**
If you override `equals()` without updating `hashCode()`, or vice versa, collection behavior becomes inconsistent. This can cause duplicate entries or lookup failures in sets and maps.

### Q9. What is the difference between fail-fast and fail-safe iterators?

**Interview Answer:**
Fail-fast iterators throw `ConcurrentModificationException` when the collection is modified structurally during iteration. Fail-safe iterators operate on a snapshot or copy and do not fail immediately.

**Detailed Explanation:**
`ArrayList` iterators are fail-fast. Collections like `CopyOnWriteArrayList` are fail-safe. Fail-safe iterators are useful in concurrent applications but may reflect stale data.

### Q10. What are common collection anti-patterns in production?

**Answer:**
Common problems include using `Vector` or raw `ArrayList` without type safety, ignoring `equals()` and `hashCode()`, selecting the wrong collection for the access pattern, and iterating while mutating the same structure.

## Practical Questions

### Q11. When should you choose `HashSet` over `ArrayList`?

**Answer:**
Use `HashSet` when you need uniqueness and fast membership checks, such as tracking active user IDs or deduplicating records. Use `ArrayList` when order and indexed access matter more.

### Q12. How do you choose between `HashMap` and `ConcurrentHashMap`?

**Answer:**
Use `HashMap` in single-threaded or non-concurrent code. Use `ConcurrentHashMap` when multiple threads access the map concurrently and you need thread safety without locking the entire structure.
