# Spring-Boot — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is Spring Boot, and how does it relate to the Spring Framework?**

**Answer:** Spring Boot builds on the Spring Framework to make applications easier to create and run. It provides opinionated defaults, auto-configuration, starter dependencies, and production-oriented features while still allowing the underlying Spring components to be customized.

**Q2. What problem do Spring Boot starters solve?**

**Answer:** A starter is a curated dependency descriptor for a common capability, such as web or data access. It brings in a compatible set of libraries and reduces manual dependency selection; it does not itself implement the feature.

**Q3. What does `@SpringBootApplication` do?**

**Answer:** It combines `@SpringBootConfiguration`, `@EnableAutoConfiguration`, and `@ComponentScan`. It marks a configuration class, enables conditional auto-configuration, and scans for components under its package by default.

### Intermediate

**Q4. How does Spring Boot auto-configuration work?**

**Answer:** Boot registers configuration classes whose conditions match the application environment, classpath, and existing beans. Many configurations are conditional on a class being present or a bean being absent, so user-defined beans can replace defaults. Auto-configuration is a starting point, not magic that overrides explicit application configuration.

**Q5. How would you investigate an unexpected auto-configuration or missing bean?**

**Answer:** Check the condition evaluation report, enable the appropriate debug logging, and inspect the dependency tree and component-scan boundaries. Confirm which conditions matched and whether an existing bean caused a default configuration to back off before adding exclusions or duplicate beans.

**Q6. What is the difference between `CommandLineRunner` and `ApplicationRunner`?**

**Answer:** Both run application startup logic after the Spring context has been created. `CommandLineRunner` receives raw string arguments, while `ApplicationRunner` receives parsed `ApplicationArguments`, including option and non-option arguments. They are useful for small startup tasks, not for long-running initialization that should delay readiness.

### Practical and Production

**Q7. How does an executable Spring Boot application start an embedded web server?**

**Answer:** The application entry point calls `SpringApplication.run`, which creates the application context and, for a web application, configures and starts the embedded server using the web starter and available server implementation. The resulting executable archive can be run with the Java runtime without separately deploying it to an application server.

**Q8. A dependency upgrade causes the application context to fail during startup. How would you diagnose it?**

**Answer:** Start with the deepest `Caused by` entry, then check dependency compatibility, missing configuration, bean creation errors, and auto-configuration conditions. Compare the resolved dependency tree with the last working build and reproduce with the same profile and environment variables used in deployment.

**Q9. How would you package and deploy a Spring Boot service consistently across environments?**

**Answer:** Build an immutable executable artifact or container image and promote that same artifact through environments. Supply environment-specific configuration and secrets at runtime, set resource and health-check policies in the deployment platform, and avoid baking credentials or environment-specific endpoints into the artifact.
