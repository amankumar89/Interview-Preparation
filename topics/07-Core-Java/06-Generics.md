# Core-Java — 06 Generics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are generics in Java?

**Interview Answer:**
Generics allow classes, interfaces, and methods to operate on type parameters while preserving type safety. They help avoid casting and reduce runtime errors.

**Detailed Explanation:**
Example: `List<String>` says the list can only contain strings. This is enforced at compile time and helps prevent invalid data mixes in large applications.

### Q2. Why are generics useful?

**Interview Answer:**
Generics improve type safety, reduce casting, and make code easier to read and maintain.

**Detailed Explanation:**
Without generics, collections such as `List` often required explicit casts. This introduced runtime `ClassCastException` risks and created code that was less safe and harder to understand.

### Q3. What is type erasure?

**Interview Answer:**
Type erasure removes generic type information at runtime and replaces it with the raw type or bounds. This is why generics are checked at compile time but not visible at runtime.

**Detailed Explanation:**
This design preserves backward compatibility and keeps the JVM simpler. However, it also means some reflection-based logic cannot directly inspect generic types at runtime.

### Q4. What is the difference between `List<String>` and `List<Object>`?

**Interview Answer:**
`List<String>` is a list of strings, while `List<Object>` is a list of any object. These are not interchangeable in Java due to generics invariance.

**Detailed Explanation:**
This is important for API design. A `List<String>` cannot be assigned to `List<Object>` because doing so would violate type safety. Wildcards are used when flexibility is required.

### Q5. What are bounded type parameters?

**Interview Answer:**
Bounded type parameters restrict the type argument to a specific class or interface hierarchy, such as `T extends Number`.

**Detailed Explanation:**
This is useful when a generic method or class needs to operate on numeric types. It ensures only valid types are allowed and avoids invalid generic usages.

### Q6. What are wildcards in generics?

**Interview Answer:**
Wildcards allow flexibility when parameter types are not exactly known, such as `? extends Number` or `? super Integer`.

**Detailed Explanation:**
`? extends T` means a type that is a subtype of `T`, while `? super T` means a supertype of `T`. These patterns are commonly used in `Collection` APIs and method signatures.

### Q7. What is PECS in Java generics?

**Interview Answer:**
PECS stands for Producer Extends, Consumer Super. It is a rule for choosing wildcards in method parameters.

**Detailed Explanation:**
If a generic type is being produced, use `extends`; if it is being consumed, use `super`. This guideline helps design flexible and type-safe APIs for collections and comparators.

### Q8. Can you create generic methods in Java?

**Interview Answer:**
Yes. A generic method declares its own type parameter independent of the class it belongs to.

**Detailed Explanation:**
Example: `public static <T> T getFirst(List<T> list)`. This is useful when methods need to operate generically without binding to a specific class-level type.

### Q9. What are raw types in Java?

**Interview Answer:**
Raw types are generic types used without type arguments, such as `List` instead of `List<String>`.

**Detailed Explanation:**
Raw types are allowed only for backward compatibility. They bypass compile-time type checking and are discouraged in modern Java because they can lead to unsafe casts and runtime errors.

### Q10. What is a common generic bug in production?

**Answer:**
A common bug is using raw types or writing generic APIs that are too wide, making type safety weaker than intended. Another issue is misunderstanding wildcard bounds, which leads to incorrect method signatures or invalid compile-time assumptions.

## Practical Questions

### Q11. Why do generics matter in collections?

**Answer:**
Generics are the foundation of safe collection usage in Java. They prevent mixing incompatible types and reduce the amount of boilerplate code needed to manage object casts.

### Q12. When would you use custom generic classes?

**Answer:**
When you want a data structure or service to work with many types while preserving compile-time safety and reusability, such as a `Result<T>`, a repository wrapper, or a generic cache.
