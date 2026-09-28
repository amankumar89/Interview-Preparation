# Core-Java — 09 Lambda

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is a lambda expression in Java?

**Interview Answer:**
A lambda expression is a concise way to represent an anonymous function. It is used to implement functional interfaces with a single abstract method.

**Detailed Explanation:**
Lambda expressions reduce boilerplate in Java APIs such as `Runnable`, `Callable`, and collection operations like `map` and `filter`. They make code shorter and easier to read when the behavior is simple and clear.

### Q2. What is a functional interface?

**Interview Answer:**
A functional interface is an interface with exactly one abstract method. It can be implemented using a lambda expression.

**Detailed Explanation:**
Examples include `Runnable`, `Comparator`, and `Predicate`. The `@FunctionalInterface` annotation can be used to signal intent and catch accidental extra abstract methods.

### Q3. What is the syntax of a lambda expression?

**Example:**

```java
List<String> names = List.of("A", "B", "C");
names.forEach(name -> System.out.println(name));
```

**Answer:**
A lambda uses parameters, an arrow `->`, and a body. It can be a single expression or a block containing multiple statements.

### Q4. How is a lambda different from an anonymous class?

**Interview Answer:**
A lambda is more concise and often easier to read. Anonymous classes are more verbose and can be used when you need additional state or multiple methods.

**Detailed Explanation:**
Lambda expressions are ideal for functional interfaces with a single operation, while anonymous classes are useful when you need more complexity or a larger implementation body.

### Q5. What is a method reference?

**Interview Answer:**
A method reference is a shorthand way to refer to an existing method in place of a lambda expression.

**Detailed Explanation:**
Examples include `String::toUpperCase`, `System.out::println`, and `Objects::isNull`. Method references often improve readability when you are passing an existing function as a callback.

### Q6. What is the purpose of `Predicate`, `Function`, `Consumer`, and `Supplier`?

**Interview Answer:**
These are built-in functional interfaces representing predicates, functions, consumers, and suppliers.

**Detailed Explanation:**
`Predicate<T>` tests a value and returns a boolean, `Function<T,R>` transforms one type to another, `Consumer<T>` consumes a value without returning one, and `Supplier<T>` supplies a value without input.

### Q7. Can lambdas access local variables?

**Interview Answer:**
Yes, lambdas can capture effectively final local variables from the enclosing scope.

**Detailed Explanation:**
This means the variable cannot be modified after its value has been captured. The Java compiler enforces this to ensure thread safety and consistent behavior in closures.

### Q8. What are common lambda pitfalls?

**Answer:**
Common pitfalls include using lambdas in a way that captures mutable state, making code too dense to read, and treating streams as a replacement for clear business logic. In large systems, readability and maintainability still matter over cleverness.

### Q9. How are lambdas used with streams?

**Answer:**
Lambdas are frequently used in stream pipelines such as `filter`, `map`, and `sorted`. They help express transformation logic in a declarative style.

### Q10. What is a common production issue with lambdas?

**Answer:**
A common issue is overusing lambdas in ways that obscure business logic or capture state unexpectedly. When used carelessly, they can make debugging and code review harder.

## Practical Questions

### Q11. When should you avoid lambda expressions?

**Answer:**
Avoid them when the logic is large, needs multiple methods, or is difficult to understand in a single expression. In those cases, a regular method or class is clearer.

### Q12. Why are lambdas important in modern Java?

**Answer:**
They support functional programming patterns, simplify APIs, and interplay well with the Stream API. This helps Java remain expressive while preserving strong type safety and backward compatibility.
