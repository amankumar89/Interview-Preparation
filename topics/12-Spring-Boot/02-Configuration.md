# Spring-Boot — 02 Configuration

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Which configuration file formats does Spring Boot commonly support?**

**Answer:** Spring Boot commonly reads Java properties files and YAML files, such as `application.properties` and `application.yaml`. Both can express the same configuration; teams should prefer the format that is clearest and most consistent in the repository.

**Q2. How do you provide an application property through an environment variable?**

**Answer:** Relaxed binding maps property names such as `server.port` to environment-variable forms such as `SERVER_PORT`. This lets deployment environments override defaults without changing the packaged application configuration.

**Q3. What are Spring profiles used for?**

**Answer:** Profiles conditionally activate configuration and beans for a named environment or application mode. For example, `application-dev.yaml` can hold local development defaults, while production-specific values should generally come from the deployment environment or a configuration service.

### Intermediate

**Q4. What is the difference between `@Value` and `@ConfigurationProperties`?**

**Answer:** `@Value` injects individual values and supports expressions. `@ConfigurationProperties` binds a related group of properties to a typed object, supports relaxed binding and validation, and is generally easier to maintain for structured application configuration.

**Q5. How would you bind and validate a group of application settings?**

**Answer:** Define a configuration-properties class with a prefix, register it for binding, and apply Jakarta Bean Validation constraints when validation is enabled. For example, a connection timeout can be bound to a `Duration` and constrained to a positive value, causing invalid configuration to fail early at startup.

**Q6. How does Spring Boot decide which property value wins when a property is defined more than once?**

**Answer:** Boot combines property sources with a defined precedence, where higher-priority sources such as command-line arguments and environment variables can override file-based defaults. The exact source order depends on how configuration is supplied, so diagnose the active environment and property sources rather than assuming the value in one file is effective.

### Practical and Production

**Q7. How should you handle secrets such as database passwords in a Spring Boot application?**

**Answer:** Keep secrets out of source control and packaged configuration. Inject them at runtime through a secret manager, orchestrator, or protected environment-specific mechanism, restrict access, and define rotation and audit procedures.

**Q8. When would you use `spring.config.import` or a centralized configuration service?**

**Answer:** Use configuration imports to include additional configuration sources, such as mounted configuration or an optional external source, when the deployment model needs them. A centralized configuration service is useful when many services need governed, versioned configuration, but it adds an availability and security dependency that must be designed for.

**Q9. A value looks correct in `application.yaml` but the application uses something else. What would you check?**

**Answer:** Check active profiles, environment variables, command-line arguments, imported configuration, and deployment-specific property sources. Verify the actual bound value safely at startup or through diagnostics, taking care not to log credentials or other sensitive values.
