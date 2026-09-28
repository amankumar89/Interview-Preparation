# Core-Java — 03 String

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the `String` class in Java?

**Interview Answer:**
`String` is a class used to represent textual data. Strings in Java are objects, and they are widely used for names, messages, configuration values, and protocol payloads.

**Detailed Explanation:**
Java strings are immutable, which means once a `String` instance is created, its value cannot be changed. This design supports security, thread-safety, and efficient reuse in string pools.

### Q2. Why are strings immutable in Java?

**Interview Answer:**
String immutability ensures that values cannot be accidentally modified, which makes them safer and more predictable in concurrent and shared code.

**Detailed Explanation:**
When you perform operations like concatenation, Java creates a new string instead of modifying the old one. This is efficient enough for most workloads and avoids hidden side effects in large systems.

### Q3. What is the difference between `String`, `StringBuilder`, and `StringBuffer`?

**Interview Answer:**
`String` is immutable, `StringBuilder` is mutable and not thread-safe, and `StringBuffer` is mutable and thread-safe.

**Detailed Explanation:**
Use `String` for fixed values, `StringBuilder` for single-threaded performance-sensitive string assembly, and `StringBuffer` in synchronized multi-threaded contexts. The choice matters when generating SQL queries, JSON payloads, or logs.

### Q4. What is string interning?

**Interview Answer:**
String interning is the process of reusing string objects from the string pool when possible, especially for string literals.

**Detailed Explanation:**
This helps reduce memory usage. For example, two string literals with the same content may point to the same internal object. However, interning does not automatically apply to strings created using `new String(...)` unless you call `intern()`.

### Q5. What is the difference between `==` and `.equals()` for strings?

**Interview Answer:**
`==` compares references, while `.equals()` compares content. For strings, `.equals()` is the correct choice when comparing actual values.

**Detailed Explanation:**
This is a classic Java mistake. Two different `String` objects can contain the same text but still not be `==` equal. Using `equals()` avoids incorrect comparisons in business logic and validation code.

### Q6. What is `StringBuilder` used for?

**Interview Answer:**
`StringBuilder` is used when constructing or modifying strings repeatedly inside a single thread, such as building SQL queries or large JSON responses.

**Detailed Explanation:**
It provides mutable character storage and significantly better performance than repeated string concatenation with `+` in loops. It is not synchronized, so it should not be shared across threads without extra coordination.

### Q7. What is `StringBuffer` used for?

**Interview Answer:**
`StringBuffer` is a synchronized, thread-safe version of `StringBuilder` used when multiple threads may manipulate the same string buffer.

**Detailed Explanation:**
Because of synchronization overhead, it is typically slower than `StringBuilder`. Use it only when thread safety is required, or when a shared mutable string is genuinely needed across threads.

### Q8. How does substring behavior affect memory?

**Interview Answer:**
In older Java versions, creating a substring could retain the original underlying character array, which could prevent garbage collection. Modern Java versions are more careful, but memory size can still matter in large text processing tasks.

**Detailed Explanation:**
That is one reason to avoid excessive substring creation in performance-critical code. For large strings, careful design matters because even small hidden references can retain large memory blocks.

### Q9. What is the use of `String.format()`?

**Interview Answer:**
`String.format()` creates formatted text using format specifiers similar to `printf` in C.

**Detailed Explanation:**
It is useful for logs, messages, and reports. However, it can be slower than simple concatenation for frequent runtime formatting, so avoid it inside performance-critical loops unless readability is more important.

### Q10. What is a common production issue around strings?

**Answer:**
A common issue is building strings in loops with `+`, which creates many temporary objects and hurts performance. In large systems, this can increase memory pressure and CPU time significantly.

## Practical Questions

### Q11. How do you compare strings safely in Java?

**Answer:**
Use `equals()`, `equalsIgnoreCase()`, or `compareTo()` depending on the business rule. Avoid relying on `==` for value comparison, especially when strings come from user input or external systems.

### Q12. What is the right data structure choice for large string processing?

**Answer:**
For repeated modifications, prefer `StringBuilder` or `StringBuffer` depending on threading requirements. For fixed message values or data that should not change, `String` is usually the best choice.
