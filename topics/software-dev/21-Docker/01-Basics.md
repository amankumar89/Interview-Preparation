# Docker — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is Docker, and why is it used?**

**Answer:** Docker packages an application and its dependencies into an image that runs as an isolated container. It gives developers and deployment environments a repeatable runtime without requiring every application to be installed directly on the host.

**Q2. What is the difference between a container and a virtual machine?**

**Answer:** A virtual machine includes a complete guest operating system and runs on a hypervisor. A container shares the host kernel and isolates application processes, so it usually starts faster and uses fewer resources, although it provides a different isolation boundary from a VM.

**Q3. What are Docker images, containers, and registries?**

**Answer:** An image is an immutable template containing application files and metadata. A container is a running or stopped instance of an image. A registry stores and distributes images, such as Docker Hub or a private cloud registry.

### Intermediate

**Q4. How does Docker provide process isolation?**

**Answer:** Docker uses Linux kernel features such as namespaces for isolation and cgroups for resource accounting and limits. The container still uses the host kernel, so its security depends on the kernel, runtime, configuration, and the privileges granted to the container.

**Q5. What is the difference between `docker run` and `docker start`?**

**Answer:** `docker run` creates a new container from an image and starts it. `docker start` starts an existing stopped container. Re-running `docker run` creates another container unless a previously created container is explicitly reused.

**Q6. What happens when a container's main process exits?**

**Answer:** The container stops because its lifecycle is tied to its PID 1 process. Files in the writable container layer may remain while the stopped container exists, but they are not a reliable persistence mechanism and are lost when the container is removed.

### Practical and Production

**Q7. Which Docker commands do you commonly use to investigate a service?**

**Answer:** Use `docker ps -a` for container state, `docker logs` for application output, `docker inspect` for configuration and networking details, `docker exec` for a diagnostic command, and `docker stats` for live resource usage. Combine these with application and host metrics rather than treating them as the only source of truth.

**Q8. Why should containers generally run one main service?**

**Answer:** One main service gives each process an independent lifecycle, health check, scaling policy, and log stream. A container can have helper processes when there is a clear reason, but unrelated services are usually easier to operate as separate containers managed by Compose or an orchestrator.

**Q9. How would you make a containerized application reproducible?**

**Answer:** Pin the base image and dependency versions, define the build in a version-controlled Dockerfile, keep configuration outside the image, and build the same image once for all environments. Record image digests where supply-chain reproducibility matters.
