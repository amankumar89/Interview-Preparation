# Core-Java — 08 Streams

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a stream in Java?

**Interview Answer:**
A stream is a sequence of data that supports sequential or parallel processing. In Java, there are two common meanings: I/O streams and the Java Stream API.

**Detailed Explanation:**
I/O streams handle byte or character data in files, sockets, and network communication. The Java Stream API processes collections in a declarative style using operations like `map`, `filter`, and `reduce`.

### Q2. What is the difference between `InputStream` and `OutputStream`?

**Interview Answer:**
`InputStream` reads bytes from a source; `OutputStream` writes bytes to a destination.

**Detailed Explanation:**
These are the foundation of byte-oriented file and network IO. They are commonly used for binary data such as images, compressed files, or raw protocol payloads.

### Q3. What is the difference between `Reader` and `Writer`?

**Interview Answer:**
`Reader` reads character data, while `Writer` writes character data. These are used for text-based I/O.

**Detailed Explanation:**
They handle character encoding and are more suitable for text files and text streams than raw byte streams. They are often paired with `FileReader` and `FileWriter` or buffered text streams.

### Q4. What is buffering in I/O streams?

**Interview Answer:**
Buffering reduces the number of slow disk or network operations by reading or writing chunks of data in larger blocks.

**Detailed Explanation:**
`BufferedInputStream`, `BufferedOutputStream`, `BufferedReader`, and `BufferedWriter` improve performance and are often used in production when moving data efficiently.

### Q5. What is the Java Stream API?

**Interview Answer:**
The Java Stream API allows functional-style processing of collections, such as filtering, mapping, sorting, and reducing values.

**Detailed Explanation:**
Streams are particularly useful for data transformation pipelines. They make code more concise but should be used carefully because misusing them can hide expensive operations or reduce readability.

### Q6. What is the difference between a stream and a collection?

**Interview Answer:**
A collection stores data; a stream processes data without necessarily storing it as a new collection.

**Detailed Explanation:**
Collections are data structures that hold values, while streams represent a sequence of operations over data. Streams are not mutation-friendly and do not replace the need for data structures.

### Q7. What are intermediate and terminal operations in the Java Stream API?

**Interview Answer:**
Intermediate operations, like `filter` and `map`, return another stream. Terminal operations, like `collect`, `forEach`, and `count`, produce a result or side effect.

**Detailed Explanation:**
Streams are lazy until a terminal operation is invoked. This allows the framework to optimize the pipeline and avoid unnecessary work.

### Q8. What is parallel stream processing?

**Interview Answer:**
A parallel stream splits work across multiple threads to speed up data processing on large collections.

**Detailed Explanation:**
Parallel streams can improve throughput for CPU-intensive tasks, but they are not always beneficial. The overhead of thread management and the cost of shared state may outweigh the benefit for small datasets or I/O-bound processes.

### Q9. What is a common stream performance pitfall?

**Answer:**
A common pitfall is using streams for trivial tasks where simple loops are clearer and faster. Another is calling expensive terminal operations repeatedly or doing heavy nested processing in a way that is hard to optimize.

### Q10. What is a common production issue with I/O streams?

**Answer:**
Not closing streams or readers is a common issue. It can leak file handles, network sockets, and memory resources, especially in long-running services.

## Practical Questions

### Q11. When should you use `BufferedReader`?

**Answer:**
Use it when reading text from a file or network stream in chunks to reduce per-character overhead and improve throughput.

### Q12. When should you avoid parallel streams?

**Answer:**
Avoid parallel streams when the work is small, the data structure is tiny, the operations are mostly I/O-bound, or the pipeline mutates shared state. For those cases, sequential processing is usually simpler and safer.
