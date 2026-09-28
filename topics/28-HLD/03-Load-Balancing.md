# HLD — 03 Load Balancing

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is load balancing, and why is it used?**

**Answer:** A load balancer distributes incoming work across multiple backends. It can improve capacity and availability by avoiding dependence on a single application instance and routing around unhealthy instances.

**Q2. What is the difference between Layer 4 and Layer 7 load balancing?**

**Answer:** Layer 4 routing uses transport information such as IP addresses and ports. Layer 7 routing can inspect application-level information such as HTTP host, path, or headers, enabling richer routing at the cost of additional processing and configuration.

### Intermediate

**Q3. How do round-robin and least-connections routing differ?**

**Answer:** Round robin cycles through eligible backends, which works well when they have similar capacity and requests have similar cost. Least-connections favors backends with fewer active connections, which can help with uneven request duration but does not necessarily reflect CPU load or request cost.

**Q4. What is session affinity, and what tradeoff does it introduce?**

**Answer:** Session affinity routes a client's requests to the same backend, often using a cookie or client identifier. It can simplify legacy in-memory sessions, but creates uneven load and makes failures disruptive. Shared session storage or stateless tokens usually allow more flexible routing.

### Practical and Production

**Q5. What should a health check verify?**

**Answer:** A liveness check should detect whether a process is irrecoverably stuck; a readiness check should determine whether it can safely receive traffic, including required dependencies when appropriate. Checks should be fast and bounded. Making every transient dependency failure fail liveness can cause restart loops.

**Q6. What is connection draining, and when is it useful?**

**Answer:** Connection draining stops sending new work to a backend while allowing in-flight requests or connections to finish before shutdown. It is useful during deployments and scaling events. The drain period should be bounded and coordinated with request timeouts and termination behavior.

**Q7. How can a load balancer become a source of failure or overload?**

**Answer:** It can be misconfigured, lose capacity, or keep routing to backends that are technically reachable but overloaded. Deploy redundant load-balancer instances or managed equivalents, monitor routing and saturation, and use readiness signals, timeouts, and admission control across the full request path.

**Q8. How would you route traffic across regions?**

**Answer:** A global routing layer can direct clients by latency, geography, or regional health, while regional load balancers distribute traffic locally. The design must account for health-check convergence, failover capacity, data consistency, and whether clients can safely retry in another region.
