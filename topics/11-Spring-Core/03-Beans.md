# Spring-Core — 03 Beans

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### 1. What is a Spring bean?

**Answer:** A Spring bean is an object that is instantiated, configured, and managed by a Spring IoC container. It may be declared with a component stereotype such as `@Component`, `@Service`, `@Repository`, or `@Controller`, or exposed through a `@Bean` method in a configuration class.

Not every object in an application needs to be a bean. Container management is valuable when an object needs dependency injection, shared scope, lifecycle callbacks, or framework integration.

### 2. What is the difference between `@Component` and `@Bean`?

**Answer:** `@Component` marks a class for discovery through component scanning. Its bean is typically created using the class's constructor and injection metadata. `@Bean` marks a method whose return value should be registered as a bean; it is declared inside a configuration class.

Use component scanning for application classes you own and want Spring to discover. Use `@Bean` when construction requires explicit logic, when configuring a third-party class, or when the creation method communicates configuration clearly.

### 3. What bean scopes does Spring provide?

**Answer:** The standard core scopes are `singleton` and `prototype`. A singleton means one bean instance per bean definition per Spring container; it does not mean one instance for the entire JVM. A prototype definition produces a new instance each time that bean is requested from the container.

In web-aware application contexts, additional scopes include `request`, `session`, `application`, and `websocket`. These are tied to web lifetimes and require the relevant scope context to be active.

### 4. Is a Spring singleton bean thread-safe?

**Answer:** No. Singleton scope controls instance sharing, not synchronization. Concurrent requests may call the same singleton bean at the same time. Stateless services are usually safe because they keep request-specific data in method-local variables and delegate state management to suitable collaborators.

If a singleton stores mutable shared state, the design must provide correct synchronization or use an appropriate concurrency-safe mechanism. Changing the bean to prototype does not automatically fix state sharing if the instance is itself shared elsewhere.

### 5. How does Spring handle destruction of prototype-scoped beans?

**Answer:** Spring creates and configures a prototype bean but does not manage its complete destruction lifecycle after handing it to the caller. In particular, the container does not automatically invoke destruction callbacks for prototype instances. The code that obtains and owns such an instance must arrange cleanup when required.

This matters for resources such as streams or connections. If the resource should be managed centrally, consider a different ownership model rather than assuming prototype scope implies automatic cleanup.

### 6. What is the difference between a bean name and a bean type?

**Answer:** The type describes the Java class or interface through which a bean can be used; the name is its identity in the container. A component's default name is generally derived from its class name, while `@Component("... ")` or `@Bean("...")` can specify a name. A `@Bean` method's name is normally its default bean name.

Dependency injection is commonly type-driven, with qualifiers or names helping disambiguate candidates. Code should not depend on names unless bean identity is part of the configuration contract.

### 7. When should you use `@Primary` and `@Qualifier`?

**Answer:** Use `@Primary` to mark a default candidate when one implementation is the usual choice for a type. Use `@Qualifier` at an injection point to select a particular implementation for that use case. A qualifier is a semantic label and can be custom, not merely a bean name.

If different parts of the application need different implementations, explicit qualifiers make the choice visible and reduce accidental dependence on which bean happened to be registered first.

### 8. A singleton needs a new stateful helper for each operation. What should you consider?

**Answer:** Directly injecting a prototype into the singleton does not provide a new helper on each operation; it normally injects one instance during singleton construction. Inject an `ObjectProvider<Helper>` and call `getObject()` for each required instance, or use another factory abstraction. Keep helper creation at the point where its lifecycle is understood, and ensure the code that owns it also handles any cleanup it requires.
