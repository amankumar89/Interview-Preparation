# Spring-Core — 05 AOP

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### 1. What is Aspect-Oriented Programming (AOP), and when is it useful?

**Answer:** AOP modularizes behavior that applies across multiple parts of an application rather than belonging to one business operation. Typical examples include transactions, security checks, logging, metrics, and auditing. It lets the cross-cutting behavior be declared separately from the business code it affects.

AOP is not automatically the best answer to every repeated line of code. Use it when the behavior is genuinely cross-cutting and a declarative boundary makes the application clearer; otherwise, an ordinary collaborator may be easier to understand and debug.

### 2. Explain the terms aspect, join point, pointcut, advice, and proxy.

**Answer:** An **aspect** groups cross-cutting behavior. A **join point** is an execution point where that behavior could apply; in Spring's proxy-based AOP, method execution on a Spring bean is the central supported join point. A **pointcut** selects which join points are targeted. **Advice** is the action run at the selected points, such as before, after, or around a method.

A **proxy** is the object through which calls are intercepted and advice is applied. Spring typically creates the proxy around a bean rather than changing the target class's bytecode.

### 3. What advice types does Spring AOP support?

**Answer:** Spring AOP supports before advice, after-returning advice, after-throwing advice, after (finally) advice, and around advice. Around advice receives a `ProceedingJoinPoint` and decides whether and when to call `proceed()`, making it the most flexible and also the easiest to misuse.

Use the narrowest advice type that expresses the requirement. Around advice should normally proceed exactly once unless skipping or repeating the invocation is intentional and well-defined.

### 4. How does Spring AOP create proxies? What is the difference between JDK and class-based proxies?

**Answer:** Spring can create a JDK dynamic proxy that implements the target's interfaces, or a class-based proxy that subclasses the target class (commonly generated with CGLIB). Framework configuration and available interfaces influence the choice; class-based proxying may also be requested explicitly.

A JDK proxy is exposed through interfaces, so callers need to use a compatible interface type. A class-based proxy cannot subclass a final class, and final methods cannot be overridden for interception. Prefer programming to interfaces where that is natural, and check the actual proxy constraints when advice appears not to run.

### 5. Why does self-invocation bypass Spring AOP advice?

**Answer:** In proxy-based AOP, the caller must go through the proxy. When a method calls another method using `this`, the call stays on the target object and does not pass through the proxy, so advice on the called method is not applied.

The clearest fix is often to move the advised operation to another bean and call that collaborator. Depending on the design, restructuring the public boundary can also help. Self-injection or accessing the current proxy is possible in specialized cases, but it adds indirection and should not be the first choice.

### 6. How do pointcuts and advisors relate to advice?

**Answer:** A pointcut determines where advice applies, and an advisor associates a pointcut with advice. An aspect can group multiple pointcut and advice declarations. Narrow, intentional pointcuts reduce the chance of applying behavior to unrelated beans or methods.

When diagnosing unexpected behavior, check both parts: confirm that the target bean is eligible for proxying and that the pointcut actually matches the invoked method.

### 7. What are important limitations of Spring AOP compared with AspectJ?

**Answer:** Spring AOP is proxy-based and primarily intercepts method calls made through a Spring-managed proxy. It does not generally intercept self-invocation, direct object construction outside the container, or arbitrary field access. AspectJ can weave aspects into bytecode and supports a broader set of join points, but it requires weaving setup and adds operational complexity.

Choose Spring AOP for common container-managed cross-cutting concerns. Consider AspectJ only when proxy-based interception cannot express a real requirement and the team is prepared to manage weaving.

### 8. A `@Transactional` method works when called by a controller but not when called by another method on the same service. How do you investigate it?

**Answer:** First check whether the internal call is self-invocation; if it is, it bypasses the Spring proxy. Then verify that the bean is managed by the expected application context, that transaction infrastructure is enabled, and that the call crosses a proxy-compatible method boundary. Also consider proxy type constraints, visibility, and whether the method is being called during bean initialization.

The usual design fix is to move the transactional operation to a separate Spring bean and invoke it through injection. This makes the advised boundary explicit and avoids depending on internal proxy access.
