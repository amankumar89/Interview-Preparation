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
