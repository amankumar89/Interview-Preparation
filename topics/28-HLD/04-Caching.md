# HLD — 04 Caching

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Why is caching used in a distributed system?**

**Answer:** A cache keeps frequently or recently used data closer to the caller, reducing response time and load on slower systems such as databases or remote services. It is most useful when the saved work outweighs the cost of maintaining and accessing the cache.

**Q2. What is the cache-aside pattern?**

**Answer:** The application checks the cache first. On a miss, it loads data from the source, returns it, and populates the cache. On writes, the application usually updates the source and invalidates or refreshes the corresponding cache entry.

### Intermediate

**Q3. How does write-through caching differ from write-back caching?**

**Answer:** Write-through updates the cache and backing store as part of the write path, improving cache freshness but adding write latency. Write-back acknowledges a cache write before asynchronously persisting it, which can improve write performance but risks data loss if the cache fails before persistence.

**Q4. How should a cache expiration policy be chosen?**

**Answer:** Choose a TTL based on how stale the application can tolerate data becoming, how often it changes, and the cost of refetching it. A TTL is a bound on cache lifetime, not a guarantee that every reader sees the newest value immediately.

### Practical and Production

**Q5. What causes a cache stampede, and how can it be mitigated?**

**Answer:** Many requests can observe the same expired or missing entry and simultaneously load it from the source. Mitigations include request coalescing, short-lived locks, early refresh, randomized TTLs, and serving stale data when acceptable.

**Q6. What is cache invalidation, and why is it difficult?**

**Answer:** Invalidation removes or refreshes cached data when its source changes. It is difficult because updates and reads may race across multiple processes, and dependent or derived entries may also need updating. Explicit invalidation, versioned keys, and bounded TTLs can reduce stale-data windows.

**Q7. How can a hot cache key limit system throughput?**

**Answer:** A highly popular key can overload one cache node or create contention even when overall cache capacity is sufficient. Depending on consistency needs, replicate the key, use local near-caches, spread equivalent keys, or apply request coalescing. Measure skew before adding replicas, since replicas add invalidation work.

**Q8. What should happen when the cache is unavailable?**

**Answer:** Define whether requests fall back to the source, serve stale data, or fail for each operation. A full fallback can overload the database, so use concurrency limits, circuit breakers, and controlled degradation. Caches should not be treated as durable storage unless specifically designed for that role.
