# Advanced-Java — 05 Concurrency

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What does thread safety mean?

**Interview Answer:**
Code is thread-safe when it behaves correctly under concurrent access according to its contract. This can be achieved through immutability, confinement, synchronization, atomic operations, or suitable concurrent data structures.

**Detailed Explanation:**
Thread safety is about invariants, not simply preventing exceptions. A collection may be individually thread-safe while a multi-step business operation using it is not atomic.

### Q2. What are atomicity, visibility, and ordering?

**Interview Answer:**
Atomicity means an operation appears indivisible; visibility means one thread can observe another thread's writes; ordering describes which operations are guaranteed to occur before others. Correct concurrent code must account for all three.

**Detailed Explanation:**
The Java Memory Model defines the guarantees provided by synchronization, volatile fields, thread start/join, and other constructs. Without a happens-before relationship, another thread is not guaranteed to observe a write promptly or in the expected order.

### Q3. What is the difference between `AtomicInteger` and a synchronized counter?

**Answer:**
`AtomicInteger` provides atomic operations such as increment using compare-and-set techniques. A synchronized counter protects updates with a monitor and can naturally guard multiple related fields or operations. Choose based on the required invariant and measured contention, not on an assumption that atomics are always faster.

### Q4. What is compare-and-set (CAS)?

**Answer:**
CAS changes a value only if it still equals an expected value, allowing lock-free coordination in suitable algorithms. A retry loop may be needed under contention. CAS on a single value does not automatically make a multi-variable invariant atomic.

## Practical Questions

### Q5. What is the ABA problem?

**Answer:**
With CAS, a value may change from A to B and back to A. A thread that only checks for A may miss the intermediate change. Version stamps or sequence numbers can detect this when the algorithm requires it; classes such as `AtomicStampedReference` provide a stamped reference abstraction.

### Q6. When would you use `ConcurrentHashMap`?

**Answer:**
Use it when multiple threads need concurrent access to a map with scalable per-key operations. Its individual methods are thread-safe, but a sequence such as “check then insert” needs an atomic map operation such as `computeIfAbsent` or explicit coordination. Avoid assuming that iteration is a globally consistent snapshot.

### Q7. What are `ReadWriteLock` and `StampedLock` for?

**Answer:**
`ReadWriteLock` allows multiple readers or one writer, which can help when reads greatly outnumber writes and lock contention is measured. `StampedLock` supports optimistic reads and is not reentrant; stamps must be validated or released correctly. Both add complexity and should be chosen only when a simpler lock is insufficient.

### Q8. How can you coordinate threads waiting for a condition?

**Answer:**
With intrinsic monitors, call `wait()` and `notify()` or `notifyAll()` while holding the same monitor, and always test the condition in a loop because wake-ups may be spurious. With explicit locks, `Condition` offers separate wait sets. Higher-level queues, latches, and semaphores are often clearer.

## Advanced and Production Questions

### Q9. What is false sharing?

**Answer:**
False sharing occurs when independent variables used by different CPU cores occupy the same cache line, causing cache-coherence traffic. It can reduce performance in highly contended, low-level workloads. Confirm it with profiling before introducing padding or layout-specific optimizations.

### Q10. What is the difference between lock-free and wait-free algorithms?

**Answer:**
In a lock-free algorithm, system-wide progress is guaranteed: some operation completes even if an individual thread can starve. In a wait-free algorithm, every operation completes in a bounded number of its own steps. These guarantees are stronger than merely avoiding monitor locks and are difficult to implement correctly.

### Q11. How do you choose between locking and lock-free code?

**Answer:**
Start with the simplest correct design. Locks are often easier to review and maintain, while lock-free algorithms can reduce blocking for specific measured bottlenecks but introduce retry behavior and subtle correctness risks. Benchmark representative contention and include tail latency, not only throughput.

### Q12. How should shared mutable state be handled in a request-processing service?

**Answer:**
Prefer immutable values and request-local state. For shared state, define the invariant and protect the complete operation with a suitable lock or atomic data structure. Bound queues and caches, make cancellation and shutdown explicit, and expose contention and queue-depth metrics.
