# Advanced-Java — 03 Garbage Collection

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What does garbage collection do?

**Interview Answer:**
Garbage collection automatically reclaims memory occupied by objects that are no longer reachable by the application. It reduces manual memory-management errors, but does not prevent leaks caused by unnecessarily retained references.

**Detailed Explanation:**
The JVM decides when and how collection occurs. Application code should not depend on a particular object being collected at a particular time, and calling `System.gc()` is only a request that the JVM may ignore.

### Q2. How does the JVM determine whether an object is eligible for collection?

**Interview Answer:**
The collector traces references from GC roots. Objects that cannot be reached through the references considered by the collector are eligible for reclamation.

**Detailed Explanation:**
GC roots include live thread references, static references, and certain native references. Eligibility does not mean immediate reclamation: collection timing depends on the collector and runtime conditions.

### Q3. Why do many collectors use generations?

**Answer:**
Many applications create numerous short-lived objects. Generational collectors exploit this observation by collecting newer objects more frequently and treating longer-lived objects differently. The exact layout and collection phases vary by collector, and the generational model is not universal.

### Q4. What is the difference between stop-the-world and concurrent work?

**Answer:**
Stop-the-world phases pause application threads so the collector can perform work safely. Concurrent phases run alongside application threads and can reduce pause time, but consume CPU and may require extra memory or rework if the application changes the object graph during collection.

## Practical Questions

### Q5. What are the main characteristics of G1 GC?

**Answer:**
G1 divides the heap into regions and aims to meet a pause-time goal by selecting regions expected to yield useful reclamation. It is a general-purpose collector and is the default in many modern HotSpot configurations, though defaults can vary by JDK. A pause-time goal is a target, not a hard real-time guarantee.

### Q6. When might you evaluate ZGC or Shenandoah?

**Answer:**
Evaluate low-latency collectors when pause times are a demonstrated source of user-visible latency and the supported JDK/runtime offers the required collector. Compare end-to-end latency, throughput, CPU, memory overhead, and operational support under realistic load. No collector removes the need to control allocation and object retention.

### Q7. What is the difference between minor, major, and full GC?

**Answer:**
These terms are commonly used but are not perfectly consistent across collectors or JVM versions. “Minor” often means a young-generation collection, while “full GC” commonly refers to a broader heap collection. Use the collector's GC logs and documentation to interpret the actual event rather than relying on labels alone.

### Q8. How should you approach GC tuning?

**Answer:**
Start with GC logs and service-level goals: pause-time percentiles, throughput, allocation rate, promotion, and heap occupancy after collection. First address avoidable allocation or retention issues. Then evaluate collector and heap settings with repeatable load tests; tuning only from average pause time can hide long pauses or throughput regressions.

## Advanced and Production Questions

### Q9. What are soft, weak, and phantom references?

**Answer:**
They express different strengths of reachability. Weakly reachable objects may be cleared eagerly; soft references may be retained until memory pressure but are not a reliable cache policy; phantom references support post-mortem cleanup coordination through a reference queue. Prefer explicit bounded caches and resource-management APIs for ordinary application needs.

### Q10. Why should finalization not be used for resource cleanup?

**Answer:**
Finalization has unpredictable timing, can delay reclamation, and has problematic security and performance characteristics. It is deprecated for removal. Close files, sockets, and other resources deterministically with `try`-with-resources; use `Cleaner` only as a fallback safety mechanism, not as the primary lifecycle strategy.

### Q11. Production memory is high and GC pauses are increasing. How do you triage it?

**Answer:**
Correlate GC logs and JFR data with latency, allocation rate, heap-after-GC, CPU, and container memory. A rising post-GC live set suggests retention or a workload change; frequent collections with a stable live set may indicate allocation pressure or an undersized heap. Capture a heap dump when safe, inspect retaining paths, and validate any tuning change with the same workload and service-level metrics.
