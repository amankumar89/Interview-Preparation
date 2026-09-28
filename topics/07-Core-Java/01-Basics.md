# Core-Java — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is Java?

**Interview Answer:**
Java is a high-level, object-oriented, platform-independent programming language developed by Sun Microsystems and now maintained by Oracle. Java code is compiled to bytecode and run by the Java Virtual Machine (JVM).

**Detailed Explanation:**
Java is designed around the slogan “write once, run anywhere.” The JVM abstracts away OS-specific details, which is why Java applications can run on Windows, Linux, and macOS with minimal changes.

### Q2. What is the difference between JDK, JRE, and JVM?

**Interview Answer:**
JDK is the Java Development Kit used to develop Java applications. JRE is the Java Runtime Environment used to run Java programs. JVM is the engine that executes Java bytecode.

**Detailed Explanation:**
The JDK includes the compiler, standard libraries, and tools needed for development. The JRE includes the runtime libraries and JVM. The JVM is responsible for memory management, bytecode execution, and platform-specific behavior.

### Q3. What is the `main` method in Java?

**Interview Answer:**
The `main` method is the entry point of a Java application. It must have the signature `public static void main(String[] args)`.

**Detailed Explanation:**
The JVM looks for this method when starting a Java program. The keyword `static` means the method belongs to the class and can be called without creating an instance. The `args` array contains command-line arguments.

### Q4. What are primitive data types in Java?

**Interview Answer:**
Java has eight primitive types: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, and `boolean`.

**Detailed Explanation:**
These types are not objects and have fixed sizes. They are used for efficient storage and are the foundation for arithmetic and logical operations. Objects like `Integer` wrap primitives when object behavior is needed.

### Q5. What is the difference between local variables, instance variables, and static variables?

**Interview Answer:**
Local variables are declared inside methods, instance variables belong to an object, and static variables belong to the class and are shared across all instances.

**Detailed Explanation:**
Instance variables get memory when an object is created. Static variables are initialized once per class and are commonly used for configuration values, counters, or constants. Local variables have scope only within the block where they are declared.

### Q6. What is the difference between `==` and `.equals()`?

**Interview Answer:**
`==` compares references for objects and values for primitives. `.equals()` compares object content and is usually overridden to compare meaningful data.

**Detailed Explanation:**
For strings, `==` checks whether both references point to the same object, while `equals()` checks whether the string values are the same. This distinction is critical when comparing objects in collections.

### Q7. What is a variable and what is a constant?

**Interview Answer:**
A variable stores a value that can change during program execution. A constant is a value that should not change once initialized.

**Detailed Explanation:**
In Java, constants are commonly declared with `final`, and by convention are written in uppercase. Example: `final int MAX_RETRIES = 3;`. Using `final` improves safety and communicates intent clearly.

### Q8. How does Java compile and run source code?

**Interview Answer:**
Java source files are compiled by the Java compiler into `.class` files containing bytecode. The JVM then interprets or JIT-compiles the bytecode to machine code at runtime.

**Detailed Explanation:**
This separation allows Java to remain platform-independent at the source and bytecode level while still achieving good performance. The JVM also handles memory management and garbage collection.

### Q9. Why is Java considered platform independent?

**Interview Answer:**
Java source code is compiled to bytecode, not platform-specific machine code. The JVM translates this bytecode to the relevant machine instructions for the operating system.

**Detailed Explanation:**
This design reduces platform-specific code and allows one codebase to run across environments. The trade-off is that the JVM must be installed on the target machine.

### Q10. What is a common beginner mistake in Java?

**Answer:**
A frequent mistake is confusing primitive values with object references, especially when using `==` instead of `.equals()`. Another common bug is forgetting that Java is case-sensitive and that method names, class names, and variable names must match exactly.

## Practical Questions

### Q11. What is the role of `public`, `private`, and `protected`?

**Answer:**
These are access modifiers that control visibility. `public` is accessible everywhere, `private` is accessible only inside the class, and `protected` allows access within the same package or subclasses.

### Q12. Why is Java strict about type safety?

**Answer:**
Type safety helps catch invalid operations earlier and makes code easier to reason about. It reduces runtime bugs, especially in large enterprise systems where data types are critical for API contracts and business logic.
