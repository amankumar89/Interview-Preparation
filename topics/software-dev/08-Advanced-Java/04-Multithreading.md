# Advanced-Java — 04 Multithreading

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the difference between a process and a thread?

**Interview Answer:**
A process is an operating-system execution unit with its own address space and resources. Threads are execution paths within a process; they share process memory while maintaining separate stacks and execution state.

**Detailed Explanation:**
Threads can communicate efficiently through shared objects, but that sharing creates synchronization and visibility risks. Processes provide stronger isolation, with more expensive communication across process boundaries.

### Q2. How can you create work for a Java thread?

**Interview Answer:**
Represent the work with `Runnable` or `Callable`, then choose an execution mechanism such as a `Thread`, an executor, or a virtual thread. Keeping the task separate from the mechanism makes code easier to test and manage.

**Detailed Explanation:**
`Runnable` does not return a result; `Callable<V>` can return a value and throw checked exceptions. In application code, executors are usually preferable to manually creating platform threads for every task because they provide lifecycle and resource-management controls.

### Q3. What is a race condition?

**Answer:**
A race condition occurs when the program's result depends on the timing or interleaving of concurrent operations. For example, two threads incrementing the same unsynchronized counter can both read the same old value and overwrite each other's updates.

### Q4. What does `synchronized` guarantee?

**Answer:**
It provides mutual exclusion for a monitor and establishes visibility ordering: unlocking a monitor happens-before a later lock of that same monitor. It also supports reentrant locking. It does not make unrelated state safe unless access follows a consistent synchronization strategy.

## Practical Questions

### Q5. What does `volatile` guarantee, and what does it not guarantee?

**Answer:**
Writing a volatile field makes that write visible to subsequent reads of the same field under the Java Memory Model and establishes ordering constraints. It does not make compound operations such as `count++` atomic. Use synchronization or an atomic class when an operation must be indivisible.

### Q6. How should a thread respond to interruption?

**Answer:**
Interruption is a cooperative cancellation signal. If a method catches `InterruptedException` but cannot propagate it, it should normally restore the flag with `Thread.currentThread().interrupt()` and then exit or otherwise honor cancellation. Do not swallow the signal and continue indefinitely.

### Q7. What is a deadlock, and how can it be prevented?

**Answer:**
Deadlock occurs when threads wait forever for resources held by one another. Reduce the risk with a consistent lock ordering, small critical sections, time-bounded lock acquisition where appropriate, and avoiding calls to unknown code while holding a lock. Thread dumps can reveal cycles of lock ownership and waiting.

### Q8. What is the difference between daemon and user threads?

**Answer:**
The JVM can exit when only daemon threads remain; user threads keep it alive. Daemon status is not a reliable resource-cleanup mechanism because daemon work may stop abruptly at process exit. Use explicit shutdown and resource management instead.

## Advanced and Production Questions

### Q9. What is a happens-before relationship?

**Answer:**
Happens-before is a Java Memory Model ordering rule. If one action happens-before another, the first action's effects are visible to the second as specified by the model. Examples include monitor unlock before a later lock of the same monitor, and actions before `Thread.start()` being visible to the started thread.

### Q10. Why is immutability useful in concurrent code?

**Answer:**
An object whose state cannot change after construction can be shared without coordinating later writes, provided it is safely published and its fields do not expose mutable state. Immutability reduces synchronization needs and makes behavior easier to reason about.

### Q11. A service's thread count and latency keep rising. What do you inspect?

**Answer:**
Take thread dumps over time and classify threads as runnable, blocked, or waiting. Look for lock contention, deadlocks, blocked I/O, unbounded thread creation, and tasks that never finish. Correlate the findings with executor metrics, request volume, timeouts, and downstream health before changing thread counts.
