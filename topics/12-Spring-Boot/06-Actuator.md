# Spring-Boot — 06 Actuator

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is Spring Boot Actuator?**

**Answer:** Actuator provides operational endpoints and integrations for inspecting and managing a running application. Common uses include checking health, viewing selected application information, and exposing metrics to a monitoring system.

**Q2. What is the difference between an Actuator endpoint being enabled and exposed?**

**Answer:** Enabling controls whether an endpoint is available in the application; exposure controls which management transports, such as HTTP or JMX, make it reachable. An endpoint should be exposed only when its operational value and security implications are understood.

**Q3. What does the health endpoint report?**

**Answer:** It reports application health and may include indicators for dependencies such as a database. Detailed component information can be sensitive, so configure who can access it and which details are returned.

### Intermediate

**Q4. How would you expose an Actuator endpoint over HTTP?**

**Answer:** Add the Actuator dependency and configure the required endpoint exposure through management properties. Keep the exposed set minimal, and ensure network policy and authentication restrict access to operational endpoints.

**Q5. What is the difference between liveness and readiness checks?**

**Answer:** Liveness indicates whether a process is functioning or should be restarted; readiness indicates whether it can currently receive traffic. A temporary dependency outage should not automatically make liveness fail and cause a restart loop. Configure probes to reflect the deployment platform's traffic and restart decisions.

**Q6. How can application metrics be collected through Spring Boot?**

**Answer:** Spring Boot integrates with Micrometer to instrument common framework components and publish metrics to supported monitoring systems. Add focused custom measurements where useful, use low-cardinality tags, and avoid labels containing user IDs or other unbounded values.

### Practical and Production

**Q7. How would you add a health check for an application-specific dependency?**

**Answer:** Implement a health indicator that performs a bounded, safe check and reports an appropriate status without placing excessive load on the dependency. Decide whether that dependency should affect readiness, liveness, or only diagnostic health based on what the service can do when it is unavailable.

**Q8. Why is exposing every Actuator endpoint publicly a security risk?**

**Answer:** Some endpoints can reveal environment details, configuration, mappings, or other operational data, and some configurations may allow state changes. Expose only necessary endpoints, protect them with authorization and network controls, and do not return secrets in health or info details.

**Q9. An orchestrator keeps restarting a service during a downstream outage. What would you investigate?**

**Answer:** Compare the liveness and readiness probe configuration with the health indicators included in each group. If a recoverable dependency outage is incorrectly failing liveness, change the probe composition so the service is removed from traffic when appropriate without being restarted continuously.
