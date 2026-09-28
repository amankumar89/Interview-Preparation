# HLD — 01 HLD Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is high-level design (HLD)?**

**Answer:** HLD describes a system's major components, their responsibilities, communication paths, and data stores. It focuses on architecture and tradeoffs rather than class-level implementation details.

**Q2. How does HLD differ from low-level design (LLD)?**

**Answer:** HLD answers questions such as which services and databases are needed and how they interact. LLD specifies the internals of a component, including classes, methods, schemas, and algorithms. HLD sets boundaries that LLD can refine.

### Intermediate

**Q3. What information should a useful HLD diagram show?**

**Answer:** Show users or clients, major services, data stores, external dependencies, and the direction of important request and data flows. Label protocols or asynchronous paths where they clarify behavior. Keep implementation details out unless they affect an architectural decision.

**Q4. How do you decide where to draw service boundaries?**

**Answer:** Group responsibilities that change together and have clear ownership, while separating capabilities with different scaling, reliability, security, or deployment needs. Avoid creating services solely to mirror database tables; extra boundaries add network and operational costs.

### Practical and Production

**Q5. Why is a stateless application tier often easier to scale?**

**Answer:** Any healthy instance can handle a request, so traffic can be distributed across instances and failed instances replaced without transferring local session state. State still needs a reliable home, such as a database or distributed cache, and that store must be designed for its own capacity and availability.

**Q6. How should an HLD represent synchronous and asynchronous interactions?**

**Answer:** Show synchronous calls when the caller needs an immediate result, and show a broker or event path when work can complete later or needs buffering and independent consumers. Make acknowledgement, retry, and user-visible completion behavior explicit for asynchronous flows.

**Q7. How do you explain an architectural tradeoff in an interview?**

**Answer:** Connect the choice to a requirement, describe the benefit and cost, and state what would change the decision. For example, a cache can reduce read latency and database load, but introduces invalidation complexity and the possibility of stale reads.

**Q8. What should you do when requirements are incomplete?**

**Answer:** Ask focused questions about core workflows, scale, latency, availability, consistency, and security. If an answer is unavailable, state a reasonable assumption and design so the assumption can be revisited instead of silently treating it as fact.
