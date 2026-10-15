# Docker — 05 Compose

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What problem does Docker Compose solve?**

**Answer:** Compose defines and runs a multi-container application from a YAML file. It lets developers describe services, networks, volumes, environment, and dependencies as one repeatable application model.

**Q2. What is a Compose service?**

**Answer:** A service is a named definition for one kind of container, such as an API, database, or worker. Compose can create one or more container instances from that definition and connect them to the declared networks and volumes.

**Q3. How do you start and stop a Compose application?**

**Answer:** Use `docker compose up` to create and start services, `docker compose up -d` for detached mode, and `docker compose down` to stop and remove the application resources. Use `--build` when an image needs rebuilding and `--volumes` only when persistent data should also be removed.

### Intermediate

**Q4. How does service discovery work in Compose?**

**Answer:** Services on the same Compose network can reach each other by service name using Docker's internal DNS. The container should connect to the service's container port, not the host-published port used by a developer's machine.

**Q5. What is the limitation of `depends_on`?**

**Answer:** Basic `depends_on` controls startup order but does not prove that a dependency is ready to accept requests. Use health checks and a readiness-aware dependency strategy, and make the application retry transient connection failures.

**Q6. How can Compose configuration vary between environments?**

**Answer:** Use environment interpolation, separate override files, profiles, and runtime secret/configuration mechanisms. Keep the service model consistent where possible and avoid embedding credentials or local-only host paths in the shared base file.

### Practical and Production

**Q7. How would you persist database data in Compose?**

**Answer:** Mount a named volume at the database's data directory, define its lifecycle deliberately, and back it up using database-aware tools. A volume prevents data loss during container replacement but does not protect against deletion, corruption, or host failure.

**Q8. A Compose API cannot connect to its database. What do you check?**

**Answer:** Verify both services are running, use the database service name rather than `localhost`, check the container port and credentials, inspect network membership, and read both service logs. Confirm the database is ready and that the API handles startup ordering and retries.

**Q9. Is Docker Compose a production orchestrator?**

**Answer:** Compose is useful for local development, tests, and simple controlled deployments. It lacks many orchestration features such as multi-node scheduling, automated failover, rolling deployment control, and broad service-discovery guarantees, so larger production environments commonly use an orchestrator or managed platform.
