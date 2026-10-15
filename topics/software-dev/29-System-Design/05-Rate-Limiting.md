# System-Design — 05 Rate Limiting

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is rate limiting, and why is it used?**

**Answer:** Rate limiting restricts how many requests a client or workload can make in a period. It protects capacity, controls cost, reduces abuse, and enforces product quotas. A useful policy defines the identity, limit, time behavior, and response to excess requests.

**Q2. What is a fixed-window rate limiter?**

**Answer:** It counts requests in fixed time buckets and resets the count at each boundary. It is simple and inexpensive, but a client can send nearly twice the nominal limit in a short burst across adjacent windows.

### Intermediate

**Q3. How do token-bucket and leaky-bucket limiters differ?**

**Answer:** A token bucket accumulates tokens up to a capacity and allows bursts while enforcing a long-term rate. A leaky bucket drains work at a controlled rate, smoothing bursts. Choose based on whether short bursts should be accepted or requests should be paced.

**Q4. What is a sliding-window limiter?**

**Answer:** A sliding-window log counts exact request timestamps within the recent interval but can use substantial memory. A weighted sliding-window counter approximates the count using adjacent fixed windows, reducing storage while avoiding the sharpest boundary bursts.

**Q5. Which key should a rate limiter use?**

**Answer:** Select a key aligned with the policy, such as user ID, API key, account, IP address, or a combination. IP-only limits can penalize users behind shared NAT, while user-only limits may not protect unauthenticated endpoints. Normalize identity at a trusted boundary.

### Practical and Production

**Q6. How can a rate limiter work across multiple application instances?**

**Answer:** Store shared counters in a low-latency datastore or use a distributed enforcement service. Counter updates must be atomic enough for the policy, and the design should account for datastore latency, hot keys, expiration, clock behavior, and what happens if the limiter is unavailable.

**Q7. What should an API return when a client exceeds its limit?**

**Answer:** Return HTTP 429 Too Many Requests and, when known, provide a retry delay such as `Retry-After`. Document quota headers and distinguish a user quota from global overload so clients can respond sensibly.

**Q8. Should a limiter fail open or fail closed if its backing store is down?**

**Answer:** It depends on the protected resource. Failing open preserves availability but can expose a costly or sensitive service to abuse; failing closed protects the resource but can deny legitimate traffic. Local fallback limits, conservative cached policy, and explicit monitoring can reduce the risk of either choice.

**Q9. A campaign causes a sudden burst of legitimate traffic. How do you prevent the limiter from blocking healthy demand while protecting the service?**

**Answer:** Separate per-client fairness limits from system-wide admission control, allow a bounded burst where safe, and scale or queue work that can tolerate delay. Observe rejection rates and backend saturation, then adjust quotas or capacity deliberately rather than removing protection globally.
