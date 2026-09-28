# Advanced-Java — 08 Advanced Features

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is reflection in Java?

**Interview Answer:**
Reflection lets a program inspect classes, fields, methods, constructors, and annotations at runtime, and in some cases invoke or access them dynamically.

**Detailed Explanation:**
Frameworks use reflection for dependency injection, serialization, and test discovery. It can weaken encapsulation, increase complexity, and make code harder to analyze or optimize. Under the Java Platform Module System, reflective access across module boundaries may require explicit openness.

### Q2. What are annotations, and how are they processed?

**Interview Answer:**
Annotations attach metadata to declarations. They can be retained only in source, in class files, or at runtime, and can be processed by compilers, build tools, or runtime frameworks.

**Detailed Explanation:**
`@Retention` controls availability, while `@Target` limits where an annotation can be used. An annotation has no behavior by itself; a processor or runtime component must interpret it.

### Q3. What are records?

**Interview Answer:**
Records, finalized in Java 16, are concise data-carrier classes that provide component fields, accessors, and value-oriented implementations of methods such as `equals`, `hashCode`, and `toString`.

**Detailed Explanation:**
Records are shallowly immutable: their component fields are final, but a referenced mutable object can still change. They can declare constructors and methods, but are not a replacement for every class, especially when the type needs mutable identity or must extend another class.

### Q4. What are sealed classes and interfaces?

**Interview Answer:**
Sealed types, finalized in Java 17, restrict which classes or interfaces may extend or implement them using `permits`. Direct subclasses must declare an allowed form such as `final`, `sealed`, or `non-sealed`.

**Detailed Explanation:**
Sealed hierarchies model a controlled set of alternatives and can make pattern matching more exhaustive. They are useful when the domain has a known set of variants, but should not be used when third parties need unrestricted extension.

## Practical Questions

### Q5. What is pattern matching for `instanceof`?

**Answer:**
Finalized in Java 16, it combines a type check with a pattern variable, avoiding a separate cast when the check succeeds: `if (value instanceof String text) { ... }`. It improves readability but does not change the need to design correct type hierarchies.

### Q6. What is the Java Platform Module System?

**Answer:**
JPMS, introduced in Java 9, organizes applications into named modules with explicit dependencies and exported packages. A module descriptor (`module-info.java`) can declare `requires`, `exports`, and `opens`. It helps define stronger boundaries, though classpath applications can still be used.

### Q7. What is `ServiceLoader` used for?

**Answer:**
`ServiceLoader` discovers implementations of a service interface at runtime. It supports pluggable designs, such as choosing a provider without hard-coding implementation classes. In modular applications, providers are declared with `provides ... with ...`; classpath-based provider configuration is also supported.

### Q8. How do method handles differ from reflection?

**Answer:**
Method handles, provided by `java.lang.invoke`, are typed references to executable operations that can be composed and adapted. Reflection represents members as reflective objects and commonly performs dynamic invocation. Method handles are useful for dynamic-language runtimes and frameworks needing flexible invocation, but are not automatically faster in every use case.

## Advanced and Production Questions

### Q9. What is a `VarHandle`?

**Answer:**
A `VarHandle` provides typed, controlled access to variables with explicit memory-ordering modes and atomic operations. It can be used for advanced concurrent algorithms and low-level libraries. Prefer ordinary fields, locks, or atomic classes unless the required access semantics justify this complexity.

### Q10. Why is Java native serialization often avoided for external data?

**Answer:**
Native Java deserialization can instantiate object graphs and has a history of gadget-based security risks. It also couples data formats to Java class structure. For untrusted input, prefer explicit, constrained formats and validation; if native serialization is unavoidable, use strict deserialization filters and compatibility controls.

### Q11. What is the difference between compile-time and runtime annotation processing?

**Answer:**
Compile-time annotation processors run during compilation and can generate source or report errors before deployment. Runtime processing inspects retained annotations while the application runs, often using reflection. Compile-time processing can move work and failures earlier, while runtime processing supports dynamic discovery.

### Q12. How do you choose between a record, sealed hierarchy, and ordinary class?

**Answer:**
Use a record for a transparent data carrier with value-oriented semantics, a sealed hierarchy when the set of permitted variants should be controlled, and an ordinary class when identity, mutable lifecycle, or flexible inheritance is part of the model. These features can be combined, but the domain model should drive the choice.
