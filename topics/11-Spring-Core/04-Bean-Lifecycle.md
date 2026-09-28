# Spring-Core — 04 Bean Lifecycle

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### 1. What are the main stages of a Spring bean's lifecycle?

**Answer:** At a high level, Spring reads the bean definition, instantiates the bean, populates its dependencies and properties, invokes relevant awareness callbacks, runs bean post-processors and initialization callbacks, and then makes the finished bean available. When the context shuts down, managed beans can receive destruction callbacks.

The exact path can vary with scope, factory methods, post-processors, and whether a post-processor creates a proxy. The high-level sequence is more useful than assuming every bean follows an identical low-level path.

### 2. What are `BeanPostProcessor` and `BeanFactoryPostProcessor`?

**Answer:** A `BeanFactoryPostProcessor` works with bean definitions and factory metadata before ordinary beans are instantiated, allowing definitions to be modified. A `BeanPostProcessor` works with bean instances around initialization and can inspect or wrap them. Auto-proxying is implemented with bean post-processing infrastructure.

The distinction is important: use a factory post-processor for definition-level changes, not to inspect already-created application objects. Post-processors are infrastructure beans and must be registered early enough to participate in the relevant phase.

### 3. What initialization callbacks are available for a Spring bean?

**Answer:** Common choices are `@PostConstruct`, `InitializingBean.afterPropertiesSet()`, and a custom init method configured with `@Bean(initMethod = "...")` or XML. In the standard lifecycle, initialization callbacks run after dependency population; `@PostConstruct` is invoked by a post-processor before `afterPropertiesSet()`, followed by the configured custom init method. Bean post-processors also run before and after initialization.

Prefer annotation or configuration-based callbacks for application code. Implementing `InitializingBean` couples the class directly to Spring, so it is most suitable when that coupling is intentional.

### 4. What destruction callbacks are available, and when are they called?

**Answer:** Spring can invoke `@PreDestroy`, `DisposableBean.destroy()`, and a configured custom destroy method. For the standard managed-bean lifecycle, `@PreDestroy` and `DisposableBean.destroy()` run before the configured custom destroy method. These callbacks are normally invoked when the application context is closed cleanly.

They are not a guarantee of cleanup after a forced process termination. Prototype instances also do not receive automatic container-managed destruction callbacks, because the container relinquishes their lifecycle after handing them out.

### 5. What is the purpose of `Aware` interfaces?

**Answer:** An `Aware` interface lets a bean request a reference to selected container infrastructure, such as its bean name or a `BeanFactory` or `ApplicationContext`. Relevant callbacks occur after dependency population and before initialization callbacks.

Use constructor injection for ordinary application dependencies. `Aware` interfaces are appropriate for framework infrastructure or cases where a bean truly must interact with the container; relying on them throughout business code makes that code more container-coupled.

### 6. How can a `BeanPostProcessor` change the object that clients receive?

**Answer:** A post-processor can return a wrapper instead of the original object, often a proxy that adds behavior such as transactions or method interception. The object ultimately retrieved from the context may therefore not be the original instance, even though it implements the same exposed type or interfaces.

This explains why initialization and type behavior can be affected by post-processors. Custom post-processors should preserve the expected contracts and avoid creating incompatible wrappers.

### 7. An initialization callback calls a transactional method on the same bean, but no transaction starts. Why?

**Answer:** The bean may not yet be exposed through its final proxy when initialization callbacks execute. In addition, Spring's proxy-based AOP does not intercept a direct call from one method on an object to another method on that same object. The call can therefore bypass the transactional proxy.

Move the operation to a separate injected collaborator or invoke it through an appropriate externally obtained proxy after initialization. Avoid using lifecycle callbacks to run business workflows whose behavior depends on other application infrastructure being fully ready.
