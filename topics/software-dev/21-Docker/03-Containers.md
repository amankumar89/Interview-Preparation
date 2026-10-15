# Docker — 03 Containers

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. How do you run a container in the foreground and in detached mode?**

**Answer:** `docker run image` attaches the terminal to the container, while `docker run -d image` starts it in the background. Options such as `--name`, `-p`, `-e`, `-v`, and `--rm` configure its identity, ports, environment, storage, and cleanup behavior.

**Q2. What is the difference between `EXPOSE` and publishing a port?**

**Answer:** `EXPOSE` documents a port in the image metadata; it does not make the port reachable from the host. `docker run -p 8080:80 image` publishes host port 8080 to container port 80 and creates the required forwarding rule.

**Q3. How do you view and follow container logs?**

**Answer:** Use `docker logs container` to read logs and `docker logs -f container` to follow them. This works best when the application writes logs to standard output and error; applications writing only to files need a deliberate log collection strategy.

### Intermediate

**Q4. What is PID 1's special role inside a container?**

**Answer:** The main process is PID 1. It receives container stop signals and becomes the parent of orphaned processes, so it must handle signals and child reaping correctly. An init process or a runtime option can help applications that do not behave well as PID 1.

**Q5. What is the difference between a bind mount and a named volume?**

**Answer:** A bind mount maps a specific host path and is useful for local development or host-managed files. A named volume is managed by Docker and is generally more portable for persistent application data. Neither should be treated as a substitute for backups.

**Q6. How do restart policies work?**

**Answer:** Policies such as `no`, `on-failure`, `unless-stopped`, and `always` determine whether Docker restarts a stopped container. They help with process recovery but do not replace application health checks, dependency readiness, or an orchestrator's deployment controls.

### Practical and Production

**Q7. A container starts and immediately exits. How would you debug it?**

**Answer:** Check `docker ps -a`, inspect the exit code, read `docker logs`, and inspect the resolved command and environment. Run the image interactively with a shell when available, verify required files and permissions, and confirm that the main process is not completing normally or failing during startup.

**Q8. How should secrets be supplied to containers?**

**Answer:** Supply secrets through the deployment platform's secret mechanism or a short-lived external secret provider. Avoid committing them in Dockerfiles, image layers, source code, or ordinary environment files. Also restrict who can inspect the container and its environment.

**Q9. How can you limit container resources?**

**Answer:** Configure memory, CPU, process-count, and sometimes device limits using runtime or orchestrator settings. Test limits under realistic load and monitor throttling, out-of-memory kills, and application latency; a limit without an appropriate reservation and alert is incomplete capacity management.
