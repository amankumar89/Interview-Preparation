# AWS — 11 Networking and Edge

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What role does Amazon Route 53 play in an application architecture?**

**Answer:** Route 53 is a managed DNS service that can route DNS queries to application endpoints using supported routing policies and health checks. DNS changes are subject to caching and TTL behavior, so they do not guarantee instantaneous failover for every client.

**Q2. What is Amazon CloudFront?**

**Answer:** CloudFront is a content delivery network that caches and serves content from edge locations closer to users. It can also forward selected requests to an origin such as S3 or an application load balancer.

### Intermediate

**Q3. What is the difference between an Application Load Balancer and a Network Load Balancer?**

**Answer:** An Application Load Balancer operates at the HTTP-aware application layer and supports features such as host- and path-based routing. A Network Load Balancer operates at the connection layer for high-performance TCP, TLS, or UDP use cases; the best choice depends on protocol and routing requirements.

**Q4. How can CloudFront serve private content from an S3 origin?**

**Answer:** Configure CloudFront to authenticate to the S3 origin using an origin access control and keep the bucket private. The application can separately authorize viewers, for example with signed URLs or cookies when access must be time-limited.

### Practical and Production

**Q5. What should you consider when designing a multi-region DNS failover?**

**Answer:** Define health checks, failover criteria, data consistency expectations, and recovery behavior. DNS caching can delay traffic changes, and routing traffic to a healthy endpoint is insufficient if its data is stale or unavailable.

**Q6. How do you troubleshoot a request that fails through CloudFront but succeeds at the origin?**

**Answer:** Check the distribution behavior, origin configuration, headers and query strings forwarded, cache key, TLS settings, and origin access policy. Compare response status and request identifiers in CloudFront and origin logs, then invalidate cached errors only after correcting the cause.
