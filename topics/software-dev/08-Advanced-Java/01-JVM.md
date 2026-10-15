# Advanced-Java — 01 JVM

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the JVM, and how does it execute a Java program?

**Interview Answer:**
The Java Virtual Machine loads and verifies class files, then executes their bytecode using an interpreter and, when useful, a Just-In-Time (JIT) compiler. It also manages runtime memory, threads, and garbage collection.

**Detailed Explanation:**
The Java compiler (`javac`) translates source code into platform-independent bytecode. A JVM implementation translates that bytecode into instructions suitable for its host platform. The JVM specification defines behavior; implementations such as HotSpot provide the actual runtime and optimization strategies.

### Q2. What happens during class loading, linking, and initialization?

**Interview Answer:**
Class loading finds and creates a runtime representation of a class. Linking verifies the class, prepares its static storage, and resolves symbolic references as needed. Initialization runs its static initializers and assigns explicit static field values.

**Detailed Explanation:**
These are distinct phases, and some resolution may be lazy. A class is initialized before certain active uses, such as creating an instance or invoking one of its static methods. This distinction helps explain errors such as `ClassNotFoundException`, `NoClassDefFoundError`, and initialization failures.

### Q3. What are the main built-in class loaders?

**Interview Answer:**
The platform class loader loads platform classes, the application class loader loads application classpath or module-path classes, and the bootstrap loader loads core runtime classes.

**Detailed Explanation:**
Class loaders normally follow parent delegation: a loader asks its parent to load a class before trying itself. This avoids replacing core Java classes accidentally. Application servers, plugin systems, and test frameworks may use custom loaders to isolate dependencies or load code dynamically.

### Q4. What are the main JVM runtime memory areas?

**Interview Answer:**
Each thread has its own JVM stack and program counter. The heap is shared and stores objects; the method area holds class-level runtime information, commonly implemented by HotSpot using Metaspace; and native method stacks support native execution.

**Detailed Explanation:**
These are JVM specification concepts, not a promise of one exact physical layout. HotSpot also uses native memory for structures such as code cache and direct buffers. A Java object being on the heap does not mean all data used by its computation is there; local primitive values and references may be in stack frames or optimized into registers.

## Practical Questions

### Q5. What is the difference between interpretation and JIT compilation?

**Answer:**
An interpreter executes bytecode instruction by instruction. A JIT compiler compiles frequently executed code into native machine code and can apply runtime optimizations using observed behavior. A JVM may use tiered compilation to balance startup time with peak performance.

### Q6. What are warm-up and deoptimization?

**Answer:**
During warm-up, the JVM gathers execution profiles and compiles hot code, so early timings may not represent steady-state performance. If an optimization assumption becomes invalid, the JVM can deoptimize compiled code and resume execution in a less optimized form. Benchmarks should account for warm-up and use a harness such as JMH.

### Q7. What is escape analysis?

**Answer:**
Escape analysis determines whether an object can be observed outside a method or thread. If it cannot escape, the JIT may eliminate the allocation or scalar-replace the object's fields. This is an optimization, not a guarantee that the object is physically allocated on the stack.

### Q8. How would you investigate a JVM performance problem?

**Answer:**
First identify the symptom and collect evidence: latency and throughput metrics, CPU and allocation profiles, GC logs, thread dumps, and JVM configuration. Use tools such as Java Flight Recorder (JFR), `jcmd`, and `jstack` to locate CPU hotspots, lock contention, excessive allocation, or blocking. Change one relevant factor at a time and compare under representative load.

## Advanced and Production Questions

### Q9. What is the code cache?

**Answer:**
The code cache is native memory used to store JIT-compiled machine code and related metadata. If it becomes constrained, compilation may be limited and application performance can degrade. Check JVM warnings and compilation activity before changing its size; code-cache pressure is not the same as Java heap exhaustion.

### Q10. How can a class-loader leak occur?

**Answer:**
A class loader and its classes remain reachable while something still refers to them. In a redeployable application, a long-lived thread, `ThreadLocal`, static registry, or cached callback can retain an application class and prevent its loader from being collected. Diagnose with heap dumps and class-loader statistics, then release the owning references during shutdown.

### Q11. What is the difference between JVM options and Java system properties?

**Answer:**
JVM options configure runtime behavior, such as heap limits (`-Xmx`) or garbage collection. System properties are key-value settings made available through `System.getProperty`; they are commonly passed with `-Dname=value`. Application-specific properties are not automatically JVM tuning options.
