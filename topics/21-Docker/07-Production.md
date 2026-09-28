# Docker — 07 Production

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What makes a Docker container suitable for production?**

**Answer:** It should have a small maintained image, deterministic versioned inputs, a non-root runtime, explicit configuration, health behavior, useful logs, resource limits, and a documented deployment process. The container is only one part of the production system.

**Q2. Why should containers be treated as replaceable?**

**Answer:** Immutable images and externalized state allow a failed or updated container to be recreated consistently. This simplifies rollback and scaling, while databases, uploads, queues, and other durable state use managed storage or services outside the container filesystem.

**Q3. What should a container health check measure?**

**Answer:** It should test whether the service is ready to perform its intended work, not merely whether a process exists. Keep the check fast and authenticated as needed, and distinguish liveness from readiness so a temporary dependency failure does not cause unnecessary restart loops.

### Intermediate

**Q4. How do you handle configuration across environments?**

**Answer:** Build one image and inject environment-specific configuration at runtime through environment variables, mounted configuration, or a secret manager. Validate required settings at startup, avoid baking credentials into layers, and keep configuration changes auditable.

**Q5. How should container logs be managed?**

**Answer:** Write structured logs to standard output and error, let the runtime or platform collect them, and configure retention and rotation. Include correlation identifiers and avoid logging secrets or unbounded request bodies; application metrics and traces should complement logs.

**Q6. What is a good Docker image update strategy?**

**Answer:** Rebuild regularly from maintained base images, scan dependencies, test the image, tag it immutably, and deploy through a staged rollout. Monitor health and key business metrics, then retain a known-good digest for fast rollback.

### Practical and Production

**Q7. How would you secure a production container?**

**Answer:** Run as a non-root user, use a minimal trusted image, drop unnecessary Linux capabilities, use a read-only root filesystem where possible, restrict network access, and avoid privileged mode. Apply runtime security profiles, scan and sign artifacts, patch the host and runtime, and limit access to registries and secrets.

**Q8. A service is healthy locally but fails under production load. How would you investigate it?**

**Answer:** Compare image, configuration, kernel, resource limits, and dependency versions across environments. Inspect CPU, memory, throttling, OOM events, file descriptors, connection pools, latency, and downstream saturation, then reproduce with a representative load test before changing limits or restart policies.

**Q9. How do you achieve safe deployment and rollback for containers?**

**Answer:** Publish an immutable image, deploy it with readiness checks and a controlled rollout, and keep the previous image available. Roll back by changing the deployed digest or version rather than rebuilding an uncertain artifact, and make database migrations backward-compatible when old and new versions may overlap.

**Q10. What is container orchestration, and when is it needed?**

**Answer:** Orchestration automates scheduling, service discovery, scaling, health-based replacement, and deployment of containers across infrastructure. It becomes valuable when availability, multi-node operation, rolling updates, or workload scheduling exceed what manually managed hosts or Compose can reliably provide.
