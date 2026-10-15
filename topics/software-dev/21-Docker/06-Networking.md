# Docker — 06 Networking

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is Docker's default bridge network?**

**Answer:** It is the default network used when a container is started without an explicit network. User-defined bridge networks are generally preferred because they provide automatic container-name DNS and clearer isolation between application groups.

**Q2. What is the difference between a container port and a host port?**

**Answer:** A container port is where the process listens inside the container network namespace. A host port is a port on the host that is mapped to it, such as `-p 8080:80`; containers on the same internal network can usually use the container port directly.

**Q3. What are common Docker network drivers?**

**Answer:** `bridge` connects containers on one Docker host, `host` removes normal network namespace isolation, `none` disables networking, and `overlay` connects containers across hosts in supported orchestration modes. The correct choice depends on topology and isolation requirements.

### Intermediate

**Q4. How can one container communicate with another?**

**Answer:** Attach both containers to the same user-defined network and connect using the peer container's service or container name and listening port. Do not rely on an ephemeral container IP because it can change when the container is recreated.

**Q5. Why does `localhost` often cause Docker connectivity bugs?**

**Answer:** Inside a container, `localhost` refers to that same container, not the host and not another service. A container should use the appropriate service name for a peer or an explicit host gateway mechanism when it intentionally needs to reach the host.

**Q6. What is the purpose of network segmentation?**

**Answer:** Separate networks limit which services can communicate and reduce accidental exposure. For example, an API can join both a frontend-facing network and a database network, while the database joins only the private network.

### Practical and Production

**Q7. How would you troubleshoot a network request between containers?**

**Answer:** Confirm both containers share the expected network, inspect their network settings and DNS resolution, verify the process is listening on the correct interface and port, and test with a temporary diagnostic container. Then check firewall, TLS, credentials, and application logs rather than assuming it is only a Docker issue.

**Q8. What is the security risk of using host networking?**

**Answer:** Host networking reduces isolation because the container shares the host's network namespace and can bind host interfaces directly. It may be useful for specialized performance or discovery requirements, but it should be an explicit decision with restricted privileges and carefully reviewed exposure.

**Q9. How do published ports affect exposure?**

**Answer:** Publishing a port can make a service reachable from outside the host, depending on the bind address and firewall. Bind administrative or internal services to a private interface where possible, and avoid publishing a database merely because another container needs to access it.
