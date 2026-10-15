# Spring-Boot — 08 Caching

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What does Spring's caching abstraction provide?**

**Answer:** It provides annotations and a common API for cache operations while delegating storage to a configured cache provider. The abstraction lets application code express caching intent without depending directly on one provider's client API.

**Q2. What do `@Cacheable`, `@CachePut`, and `@CacheEvict` do?**

**Answer:** `@Cacheable` can return a cached value instead of invoking the method; `@CachePut` always invokes the method and stores its result; and `@CacheEvict` removes one or more entries. Select the operation based on whether the method should be skipped, executed and refreshed, or used to invalidate data.

**Q3. How do you enable annotation-driven caching?**

**Answer:** Add a supported cache provider or choose an appropriate simple cache setup, then enable caching with `@EnableCaching`. Confirm which provider Boot auto-configures, because behavior such as persistence, eviction, and TTL depends on that provider.

### Intermediate

**Q4. How does Spring determine a cache key?**

**Answer:** If no key is specified, Spring uses a key generator based on the method arguments. Define an explicit key or key generator when arguments do not uniquely identify the result, and avoid including sensitive or unnecessarily large values in keys.

**Q5. What do the `condition` and `unless` attributes on `@Cacheable` control?**

**Answer:** `condition` determines before invocation whether the method result is eligible for caching. `unless` can reject caching after the result is known, for example when a returned value is `null` or represents an unsuccessful lookup.

**Q6. Why might a method annotated with `@Cacheable` still execute every time?**

**Answer:** Caching is typically applied through Spring proxies, so self-invocation within the same object can bypass the interceptor. Also verify that caching is enabled, the bean is managed by Spring, the provider is configured, and the cache name and key are consistent.

### Practical and Production

**Q7. How should cached data be invalidated when the underlying data changes?**

**Answer:** Evict or update the relevant entries as part of the write workflow, choosing transaction and event timing carefully. For multiple application instances, use a shared cache or a reliable invalidation mechanism; a local in-memory eviction affects only one instance.

**Q8. What are common causes of stale or unbounded cache data?**

**Answer:** Missing invalidation, overly long or absent TTLs, and high-cardinality keys can all cause problems. Set expiry and capacity policies appropriate to the data, monitor hit rate and memory use, and do not cache mutable data without a clear consistency strategy.

**Q9. How would you test code that uses Spring's cache annotations?**

**Answer:** Test that repeated calls reuse a result and that writes or explicit evictions refresh the expected entry, using the same proxy-based invocation path as production. Clear caches between tests or use isolated cache names to prevent state leaking between test cases.
