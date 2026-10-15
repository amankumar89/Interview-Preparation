# HLD — 02 Scalability

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What does it mean for a system to scale?**

**Answer:** A system scales when it can handle increased workload while continuing to meet its performance and reliability goals. Scaling may require more compute, more efficient software, or changes to data and traffic distribution.

**Q2. What is the difference between vertical and horizontal scaling?**

**Answer:** Vertical scaling gives one machine more resources, such as CPU or memory. Horizontal scaling adds machines and distributes work among them. Vertical scaling is simpler initially but has hardware limits; horizontal scaling adds coordination and distributed-systems complexity.

### Intermediate

**Q3. How are latency and throughput different?**

**Answer:** Latency is the time taken by an operation, while throughput is the amount of work completed per unit time. A system can have high throughput but poor latency under queueing or contention, so both should be measured against workload and service-level objectives.

**Q4. How do you identify a system's scaling bottleneck?**

**Answer:** Measure resource use and latency across the request path, including CPU, memory, network, queues, database calls, and external dependencies. Correlate saturation and tail latency with traffic rather than assuming the application server is the limiting component.

### Practical and Production

**Q5. Why can adding application instances fail to improve capacity?**

**Answer:** A shared dependency may already be saturated, such as a database, connection pool, downstream API, or network link. More instances can increase pressure on that dependency and make the system less stable. Scale or protect the bottleneck before increasing upstream concurrency.

**Q6. How do you scale a stateless service horizontally?**

**Answer:** Run multiple instances behind a traffic distributor, externalize session and durable state, and use health checks and graceful shutdown. Set concurrency and resource limits, then scale based on meaningful signals such as request load and queue depth while respecting downstream capacity.

**Q7. What is a hot partition, and how can it be addressed?**

**Answer:** A hot partition receives a disproportionate share of requests or data, so one shard becomes a bottleneck while others are underused. Choose a better partition key, split or salt hot keys where semantics allow, or isolate unusually active tenants. Each option can complicate reads and aggregation.

**Q8. How would you prepare a service for a sudden traffic increase?**

**Answer:** Establish baseline and peak capacity through load tests, keep scaling signals and limits configured, and verify downstream headroom. Use admission control, queues, caching, or graceful degradation to protect critical paths, and rehearse the response to saturation rather than relying on autoscaling alone.
