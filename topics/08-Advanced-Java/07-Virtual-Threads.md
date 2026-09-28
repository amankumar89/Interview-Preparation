# Advanced-Java — 07 Virtual Threads

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a virtual thread?

**Interview Answer:**
A virtual thread is a lightweight Java thread scheduled by the Java runtime rather than being permanently tied one-to-one to an operating-system thread. Finalized in Java 21, virtual threads make it practical to represent many concurrent tasks using a thread-per-task style.

**Detailed Explanation:**
Virtual threads preserve familiar thread APIs and are especially useful when tasks spend much of their time blocked on supported I/O. They improve the scalability of concurrency, not the speed of an individual operation or the CPU's processing capacity.

### Q2. How do you create virtual threads?

**Interview Answer:**
Use `Thread.startVirtualThread(task)`, a virtual-thread `Thread.Builder`, or an executor such as `Executors.newVirtualThreadPerTaskExecutor()`.

**Detailed Explanation:**
The per-task executor makes it easy to scope submitted tasks and close the executor when finished. Virtual threads are usually created per task; they are not intended to be pooled like expensive platform threads.

### Q3. When are virtual threads a good fit?

**Answer:**
They are a good fit for workloads with many concurrent tasks that spend substantial time waiting, such as request handling with blocking database or network calls. They let code keep a straightforward synchronous style while supporting high concurrency, subject to database connection limits and other downstream capacity.

### Q4. Are virtual threads faster than platform threads?

**Answer:**
Not for CPU-bound computation. Virtual threads reduce the cost of representing and scheduling large numbers of waiting tasks; they do not add CPU cores. For CPU-heavy work, bound parallelism to available processing capacity and measure performance.

## Practical Questions

### Q5. Should virtual threads be pooled?

**Answer:**
Generally, no. Create a virtual thread for each task and limit access to scarce resources separately, for example with a semaphore or connection pool. Pooling virtual threads can add unnecessary lifecycle complexity and obscure resource limits.

### Q6. Do virtual threads remove the need for backpressure?

**Answer:**
No. A large number of virtual threads can still overwhelm a database, remote service, file descriptors, or memory. Bound concurrency at the actual scarce resource, apply timeouts, and define overload behavior. Cheap threads do not make downstream capacity unlimited.

### Q7. What are thread-local concerns with virtual threads?

**Answer:**
Virtual threads support `ThreadLocal`, but creating many virtual threads can multiply per-thread values and increase memory use. Avoid using thread locals as a general way to share expensive state. Consider explicit context passing or scoped values where supported by the target JDK; check the feature's version and status.

### Q8. What is thread pinning?

**Answer:**
Pinning occurs when a virtual thread cannot unmount from its carrier platform thread while blocked, reducing scheduler flexibility. On JDK 21 through 23, blocking while holding a monitor could pin a virtual thread; this behavior was improved in JDK 24. Native or foreign calls can still have pinning implications. Check JFR events and current JDK documentation before optimizing.

## Advanced and Production Questions

### Q9. How should virtual-thread applications manage CPU-bound work?

**Answer:**
Virtual threads can execute CPU work, but each such task occupies a carrier while running. Large numbers of CPU-intensive tasks do not improve throughput and may increase scheduling overhead. Use bounded parallelism for CPU-bound stages and virtual threads for the blocking portions when that division suits the workload.

### Q10. How do you diagnose a virtual-thread performance issue?

**Answer:**
Use JFR and thread dumps that support virtual-thread observability, then inspect carrier utilization, blocking, pinning events, task latency, and downstream pool saturation. Also measure memory and the number of active tasks. Compare behavior on the exact production JDK because virtual-thread and monitor behavior changes across releases.

### Q11. What is structured concurrency, and how is it related?

**Answer:**
Structured concurrency treats related concurrent tasks as one lexical unit, making their lifetime, cancellation, and failure handling easier to manage. It complements virtual threads but is a separate API whose preview or final status depends on the JDK release. Check the target JDK documentation before relying on a particular API.

### Q12. What should be considered before migrating a blocking service to virtual threads?

**Answer:**
Check framework and library support, thread-local assumptions, synchronized or native blocking paths, downstream connection limits, cancellation behavior, and observability. Load-test realistic concurrency and resource constraints. Migration may simplify task management, but it does not replace capacity planning or timeouts.
