# System-Design — 10 Requirements and Capacity Estimation

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Why clarify requirements before drawing a system architecture?**

**Answer:** Requirements define what the system must do and the quality constraints it must meet. Clarifying users, core workflows, scale, latency, availability, and consistency prevents designing components for assumptions the problem never required.

**Q2. What is the difference between functional and non-functional requirements?**

**Answer:** Functional requirements describe system behavior, such as creating an order. Non-functional requirements describe qualities or constraints, such as latency, availability, durability, security, and cost.

### Intermediate

**Q3. How do you estimate storage capacity at a high level?**

**Answer:** Estimate records written per unit time, average stored size, retention duration, and expected growth. Include indexes, replication, metadata, and encoding overhead as explicit approximations rather than treating payload size as total storage.

**Q4. How do you estimate request throughput from daily active usage?**

**Answer:** Estimate requests per user over a time window, divide by the window length for an average rate, then account for peak-to-average ratio and workload shape. State assumptions and use separate read/write estimates when their costs differ.

### Practical and Production

**Q5. How precise should capacity estimates be in an interview?**

**Answer:** They should be internally consistent and identify dominant costs, not claim false precision. State assumptions, calculate in round numbers, show the resulting bottleneck, and explain which measurements would replace estimates in a real system.

**Q6. How do requirements influence architectural tradeoffs?**

**Answer:** A strict latency target may favor caching or precomputation, while strong consistency may constrain replication choices. Rank requirements by importance and explain the cost or complexity accepted when they conflict.

**Q7. What is a useful way to structure a system-design interview answer?**

**Answer:** Clarify requirements, estimate scale, define APIs and data, sketch a baseline architecture, then analyze bottlenecks and failure modes. Evolve the design only to meet stated needs and summarize tradeoffs and operational concerns.

**Q8. How do you estimate peak requests per second from daily active users?**

**Answer:** Estimate the fraction of users active in the busiest interval and the requests each active user generates, then divide by the interval duration. Cross-check with average daily traffic and an explicit peak-to-average factor; state assumptions because request shape matters more than a precise-looking result.

**Q9. How do you estimate bandwidth and storage for a media-heavy system?**

**Answer:** Multiply request or upload rate by average payload size for bandwidth, and multiply retained objects by their stored size for raw capacity. Then account separately for metadata, replicas, indexes, compression, retention, and derived variants such as thumbnails.

**Q10. How should capacity estimates account for growth and headroom?**

**Answer:** Project expected growth over a stated planning horizon and reserve capacity for peaks, failures, and maintenance. Headroom is not a substitute for load testing; validate assumptions with production measurements and revisit estimates as workload mix changes.

**Q11. An estimate shows one database node can handle average traffic. Is that enough to choose a single-node design?**

**Answer:** No. Check peak load, storage growth, failover requirements, maintenance windows, hot partitions, and recovery objectives. Average throughput alone does not capture tail latency or the capacity needed after a node or zone fails.
