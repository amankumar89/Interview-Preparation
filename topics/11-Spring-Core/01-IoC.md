# Spring-Core — 01 IoC

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### 1. What is Inversion of Control (IoC), and what problem does it solve?

**Answer:** IoC is a design principle in which an object does not take responsibility for finding or constructing all of its collaborators. Instead, that control is delegated to an external mechanism. In a Spring application, the IoC container creates and configures objects, supplies their dependencies, and manages their lifecycle.

Without IoC, application classes often instantiate concrete dependencies directly, making them harder to replace and test. With IoC, a service can depend on an abstraction while the container supplies an appropriate implementation.

### 2. What is the relationship between IoC and Dependency Injection?

**Answer:** IoC is the broader principle; Dependency Injection (DI) is one way to implement it. With DI, an object's collaborators are provided from outside rather than looked up or constructed by that object. Spring also offers dependency lookup through its container APIs, but application code is generally easier to test and maintain when it uses injection instead.

### 3. What is the Spring IoC container?

**Answer:** The container is Spring's runtime component that reads bean definitions, creates and configures beans, resolves dependencies, and applies lifecycle callbacks and post-processors. A bean definition describes how an object should be created and managed; the actual bean is the object held by the container.

Common ways to supply bean definitions include component scanning (`@Component` and its stereotypes), Java configuration (`@Configuration` and `@Bean`), and XML configuration. These mechanisms can be combined when needed.

### 4. How do `BeanFactory` and `ApplicationContext` differ?

**Answer:** `BeanFactory` is the basic container contract for creating and retrieving beans. `ApplicationContext` extends it with application-level facilities such as event publication, message resolution, resource loading, and integration with post-processors.

In ordinary applications, `ApplicationContext` is the usual choice. A bare `BeanFactory` is useful when a deliberately minimal container is required, but it does not provide the same out-of-the-box application infrastructure.

### 5. How does Spring resolve a dependency while creating a bean?

**Answer:** Spring uses the bean definition and injection metadata to identify the required dependency, then searches the relevant context for a matching bean. Resolution can use type, qualifier, bean name, primary-candidate metadata, and—in supported injection points—collections or providers of matching beans. If a required dependency is missing or ambiguous, context creation or bean resolution fails with a diagnostic exception.

The exact timing depends on the bean and its scope. A singleton's dependencies are normally resolved while the singleton is created; a lazy or prototype bean may be created later.

### 6. What is the difference between eager and lazy bean initialization?

**Answer:** By default, singleton beans are created eagerly when the application context is initialized, which exposes many configuration errors early. `@Lazy` can defer creation until the bean is first requested; laziness can also be configured for a definition or context.

Lazy initialization can reduce startup work, but it moves creation failures to the first use and does not necessarily make the entire dependency graph lazy. An eagerly created bean that directly requires a lazy bean can still trigger its creation during startup.

### 7. A service calls `new` to construct a repository, so replacing the repository in a test is awkward. How does IoC help?

**Answer:** Move construction responsibility to Spring and have the service receive a repository abstraction through its constructor. Production configuration can supply the real repository, while a test can supply a fake or mock. The service then expresses what it needs without deciding how that dependency is built.

This improves testability, but IoC is not a reason to register every value as a bean. Ordinary local values and short-lived objects should remain ordinary objects unless they need container-managed configuration, sharing, or lifecycle behavior.
