# Core-Java — 07 Exception Handling

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an exception in Java?

**Interview Answer:**
An exception is an event that disrupts the normal flow of a program. Java uses exceptions to signal errors and unexpected conditions.

**Detailed Explanation:**
Exceptions are objects derived from `Throwable`. They can represent problems like invalid input, missing resources, or inability to parse data. Java forces a disciplined way to respond to errors rather than ignoring them.

### Q2. What is the difference between checked and unchecked exceptions?

**Interview Answer:**
Checked exceptions must be declared or handled explicitly, while unchecked exceptions are not required to be declared or caught.

**Detailed Explanation:**
`RuntimeException` and its subclasses are unchecked. Examples include `NullPointerException` and `IllegalArgumentException`. Checked exceptions, such as `IOException`, are often used for external resource failures.

### Q3. What are the keywords used in exception handling?

**Interview Answer:**
Java provides `try`, `catch`, `finally`, and `throw`/`throws` for handling exceptions.

**Detailed Explanation:**
The `try` block contains code that may fail, the `catch` block handles errors, and `finally` runs no matter what. `throw` is used to create an exception, and `throws` declares it in a method signature.

### Q4. What is `finally` used for?

**Interview Answer:**
`finally` ensures cleanup code runs whether or not an exception occurs.

**Detailed Explanation:**
It is often used to close database connections, file streams, or sockets. This helps avoid resource leaks and ensures deterministic cleanup in production systems.

### Q5. What is the difference between `throw` and `throws`?

**Interview Answer:**
`throw` is used to explicitly raise an exception during execution, while `throws` declares that a method may throw a checked exception.

**Detailed Explanation:**
`throw` is used inside a method body, while `throws` appears in the method signature. This distinction is essential for communicating error expectations to callers.

### Q6. What are custom exceptions?

**Interview Answer:**
Custom exceptions are application-specific exception classes that help represent domain-specific error conditions.

**Detailed Explanation:**
For example, an application might define `InsufficientFundsException` or `UserNotFoundException` instead of using generic runtime errors. This makes debugging and business logic clearer.

### Q7. What is try-with-resources?

**Interview Answer:**
Try-with-resources automatically closes resources like files or database connections when the block ends.

**Detailed Explanation:**
This is the preferred way to handle `AutoCloseable` resources because it reduces boilerplate and lowers the risk of leaks. It is safer and more readable than manually calling `close()` in a `finally` block.

### Q8. What is the difference between exception propagation and handling?

**Interview Answer:**
Propagation means allowing an exception to move up the call stack, while handling means catching it and deciding on a recovery action.

**Detailed Explanation:**
A service layer may catch a low-level exception and translate it into a domain-specific error for the controller or consumer. This is an important design pattern for clean API behavior.

### Q9. What are the best practices for exception handling?

**Interview Answer:**
Catch only the exceptions you can handle, log useful context, avoid swallowing exceptions silently, and provide meaningful messages.

**Detailed Explanation:**
In production systems, swallowed exceptions are difficult to debug. You should prefer actionable error handling that preserves diagnosability, security, and user experience.

### Q10. What is a common production mistake in exception handling?

**Answer:**
A common mistake is catching broad exceptions like `Exception` or `Throwable` and continuing without meaningful recovery. This hides root causes and can make systems fail unpredictably.

## Practical Questions

### Q11. Why should you not use exceptions for normal control flow?

**Answer:**
Exceptions are expensive and intended for exceptional conditions, not regular logic paths. Overusing them for standard branching can hurt performance and readability.

### Q12. How do you design a robust error-handling strategy?

**Answer:**
Use domain-specific exceptions, guard clauses, clear logging, and a consistent contract for API clients. Make recovery explicit and avoid exposing internals through raw stack traces in production responses.
