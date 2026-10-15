# Spring-Core — 06 Configuration

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### 1. What is Java-based configuration in Spring?

**Answer:** Java-based configuration declares beans and container setup in Java classes instead of XML. A class annotated with `@Configuration` can expose beans through `@Bean` methods, and can import other configuration classes or enable component scanning.

It provides compiler-checked references and works well alongside component scanning. XML remains supported and can coexist with Java configuration when an application needs it.

### 2. What does `@Bean` do, and how is its bean created?

**Answer:** `@Bean` tells Spring to register the object returned by a method as a bean. The method's name is the default bean name, and attributes can customize details such as its name, initialization method, or destruction method. Method parameters can themselves be resolved as dependencies by the container.

This is especially useful for configuring library classes that cannot be annotated directly or when object construction needs explicit arguments or setup.

### 3. Why does `@Configuration` matter for calls between `@Bean` methods?

**Answer:** In the default full configuration mode, Spring enhances a `@Configuration` class so that calls from one `@Bean` method to another are intercepted and resolved through the container. This preserves container semantics such as singleton scope rather than creating a new object through an ordinary Java call.

In lite mode, such as a class with `@Bean` methods but without full `@Configuration` enhancement, inter-method calls are ordinary Java calls and may create unmanaged or duplicate objects. To make dependencies explicit and avoid relying on method interception, declare them as `@Bean` method parameters.

### 4. What is component scanning, and how can its scope be controlled?

**Answer:** Component scanning searches selected packages for classes annotated with component stereotypes and registers them as bean definitions. `@ComponentScan` configures the search base packages and can apply include or exclude filters. By default, a configuration class's package is commonly used as the starting point when no package is specified.

Keep scan boundaries deliberate. Scanning too broadly can register unintended classes, create ambiguous candidates, or make application wiring difficult to reason about.

### 5. How can configuration classes be composed?

**Answer:** Use `@Import` to include another configuration class, and use `@ComponentScan` where discovery is appropriate. Splitting configuration by responsibility—such as persistence, messaging, or external integrations—can keep setup organized while still creating one coherent application context.

Prefer explicit composition over relying on accidental package layout. Be mindful that importing or scanning the same definitions through multiple paths may create naming conflicts or duplicate-registration problems.

### 6. How do `@Profile` and conditional bean registration help?

**Answer:** `@Profile` activates bean definitions only when the named profile is active, making it useful for environment-specific implementations such as a local stub versus a production integration. Spring also provides condition-based registration mechanisms for more detailed decisions.

Keep the application behavior understandable when profiles change: required beans should exist in every supported configuration, and production-critical integrations should not silently fall back to test implementations.

### 7. How can a property value be supplied to a bean in Spring Core?

**Answer:** Spring's environment and property-source abstractions expose configuration values, and `@Value` can inject a value into a field, method, or parameter when property sources and placeholder resolution are configured. A `PropertySource` can provide key-value properties to the environment; in modern Spring applications, the environment is commonly configured by the application framework.

For a small number of values, `@Value` can be sufficient. For a coherent group of related settings, a dedicated configuration object is easier to validate and pass around. The property-file loading mechanism depends on the application setup and should not be confused with Spring Boot's configuration conventions.

### 8. A `@Bean` method returns a new object each time it is called directly, even though it is singleton-scoped in Spring. Why?

**Answer:** The call may be an ordinary Java method call rather than a call intercepted by an enhanced full `@Configuration` class. This can happen in lite configuration mode or when invoking the method on an object that is not the container-managed enhanced configuration instance.

Avoid direct inter-bean method calls where possible. Declare the required bean as a method parameter; Spring will resolve it from the container regardless of whether the configuration class uses full enhancement.
