# Advanced-Java — 02 Memory Management

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. How is memory organized in a Java process?

**Interview Answer:**
The JVM heap stores objects and arrays, while each thread has its own stack of method frames and local variables. The JVM also uses Metaspace and other native memory for class metadata, compiled code, direct buffers, and runtime structures.

**Detailed Explanation:**
The Java Memory Model describes visibility and ordering between threads; it is not a diagram of physical memory regions. Also, JVM memory is not limited to the Java heap, so a process can run out of native memory even when heap usage is moderate.

### Q2. What is stored in a stack frame?

**Interview Answer:**
A stack frame holds method-call state, including local variables, intermediate computation data, and information needed to return to the caller. Each thread has its own stack, so ordinary local variables are not directly shared between threads.

**Detailed Explanation:**
An object referenced by a local variable can still be shared if another thread can access that object. The location and representation of values can also be changed by JIT optimizations, so “all locals are on the stack” is an oversimplification.

### Q3. What is the difference between heap and stack memory?

**Answer:**
The heap is shared by threads and primarily holds objects. A thread's stack is private to that thread and holds active method frames. Heap pressure can lead to garbage-collection activity or `OutOfMemoryError`; excessive recursion or very large frames can cause `StackOverflowError`.

### Q4. What is Metaspace?

**Answer:**
In HotSpot, Metaspace stores class metadata in native memory. It replaced PermGen starting with Java 8. Dynamically loading many classes or retaining class loaders can cause Metaspace growth; setting a maximum Metaspace size can make exhaustion occur sooner but does not fix a leak.

## Practical Questions

### Q5. What is the difference between `StackOverflowError` and `OutOfMemoryError`?

**Answer:**
`StackOverflowError` usually means a thread exhausted its stack, often due to unbounded recursion. `OutOfMemoryError` means the JVM could not satisfy an allocation or runtime memory need, such as Java heap, Metaspace, or native memory. The message and a dump help identify which resource is exhausted.

### Q6. What does a memory leak mean in a garbage-collected language?

**Answer:**
A leak occurs when an application unintentionally retains objects that it no longer needs. The garbage collector cannot reclaim reachable objects, even if the application has lost their useful purpose. Common causes include unbounded caches, listeners that are never removed, static collections, and stale `ThreadLocal` values.

### Q7. How do you investigate steadily increasing heap usage?

**Answer:**
Check whether usage rises after garbage collection rather than only during allocation bursts. Capture heap dumps at comparable points, inspect dominator trees and retained sizes, and find the reference path keeping large object groups alive. Confirm the suspected owner in a reproducible workload before changing cache limits or collection behavior.

### Q8. What are direct buffers, and what is their memory trade-off?

**Answer:**
Direct buffers use memory outside the ordinary Java heap and can reduce copying for some I/O operations. They are still subject to lifecycle and native-memory limits, and their memory may not appear as heap usage. Use them when measurements justify the trade-off and monitor direct-memory and process-level usage.

## Advanced and Production Questions

### Q9. What is a GC root, and why does it matter when diagnosing retention?

**Answer:**
A GC root is an object or runtime reference from which reachability analysis begins, such as a live thread stack, static field, or JNI reference. If a path exists from a root to an object, the collector generally treats that object as reachable. Heap-dump analysis follows these paths to find the retaining owner.

### Q10. Why can process memory be much larger than `-Xmx`?

**Answer:**
`-Xmx` limits the Java heap, not total process memory. The process also needs native memory for thread stacks, Metaspace, code cache, direct buffers, native libraries, and JVM internals. Container limits should leave room for these areas and other process overhead.

### Q11. What is a `ThreadLocal` memory-retention risk?

**Answer:**
Values associated with a live thread can remain retained for the thread's lifetime. This is especially risky with pooled threads, where a worker outlives the request that set the value. Remove request-scoped values in a `finally` block, and avoid using thread-local state when explicit parameter passing or scoped context is clearer.
