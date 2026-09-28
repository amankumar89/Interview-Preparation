# Spring-Boot — 09 Testing

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is the difference between a unit test and an integration test in Spring Boot?**

**Answer:** A unit test checks a small unit, usually with dependencies replaced by test doubles. An integration test exercises multiple real application components together, such as the web layer, persistence layer, or configured application context.

**Q2. What does `@SpringBootTest` do?**

**Answer:** It loads the Spring application context for a test, allowing broad integration testing. It is more expensive than a focused unit or slice test, so it should be used when the test needs that wider context.

### Intermediate

**Q3. What is a Spring test slice?**

**Answer:** A test slice loads only a focused part of the application, such as MVC controllers or JPA repositories. Annotations such as `@WebMvcTest` and `@DataJpaTest` make tests faster and reduce unrelated configuration, but dependencies outside the slice must be supplied or mocked.

**Q4. When should a dependency be mocked in a Spring test?**

**Answer:** Mock a dependency when the test should isolate a unit or avoid an external system. Keep real components in integration tests when their interaction or configuration is itself important to verify.

### Practical and Production

**Q5. How would you test a REST endpoint's validation and error response?**

**Answer:** Use a web-layer test to send representative valid and invalid requests through the MVC stack. Assert the status, response body, and relevant headers, and verify that invalid input does not invoke downstream business operations.

**Q6. When is Testcontainers useful in a Spring Boot project?**

**Answer:** Testcontainers can run disposable instances of real dependencies, such as PostgreSQL or Kafka, for integration tests. It catches differences that in-memory substitutes may hide, at the cost of slower tests and a requirement for a container runtime in the test environment.

**Q7. How do you reduce a slow or flaky Spring integration test suite?**

**Answer:** Use unit tests and test slices for narrow behavior, reserve full-context tests for integration contracts, and avoid shared mutable state. Reuse expensive containers when supported, control asynchronous work and timeouts, and investigate nondeterministic dependencies instead of adding arbitrary delays.

**Q8. What is the difference between `MockMvc` and testing through a real HTTP port?**

**Answer:** `MockMvc` exercises Spring MVC request handling without starting a real network server, so it is fast and useful for controller behavior. A test using a random server port also covers the embedded server and actual HTTP communication, making it better for a smaller number of end-to-end web checks.

**Q9. How can a test supply configuration that is different from the normal application configuration?**

**Answer:** Use test property overrides, a test profile, or a test configuration source appropriate to the test. For values required by external services or containers, register the runtime-provided connection details rather than hard-coding machine-specific addresses.

**Q10. Why can a transactional test give a misleading result when it calls an HTTP endpoint?**

**Answer:** The test transaction and the server request may run on different threads and use different transactions. Rolling back the test thread's transaction does not necessarily roll back work committed by the HTTP request, so verify transaction boundaries explicitly and clean up any persisted data.

**Q11. How do you test application behavior that depends on an external service?**

**Answer:** Use a mock or stub when the test is isolating application decisions, and use a real disposable dependency when the integration contract matters. Keep the boundary explicit, avoid calling unstable production services from automated tests, and make test data and cleanup deterministic.

**Q12. What should a Spring Boot test verify beyond the returned response body?**

**Answer:** Assert relevant status codes, headers, content types, and observable side effects. For invalid requests, also verify that downstream work was not performed; for successful writes, verify persistence or emitted events at the appropriate test boundary.
