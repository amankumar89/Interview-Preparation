# System-Design — 06 URL Shortener

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What requirements should be clarified for a URL-shortening service?**

**Answer:** Clarify redirect latency and availability, read-to-write ratio, custom aliases, link expiration, analytics, abuse controls, and whether destinations can be edited or deleted. Redirect behavior and privacy expectations affect both storage and caching choices.

**Q2. What API operations might the service expose?**

**Answer:** A minimal API creates a short code from a validated destination and redirects a code to its destination. Additional operations may authenticate owners, update or disable a link, set expiration, or retrieve aggregate analytics.

### Intermediate

**Q3. How can a service generate short codes?**

**Answer:** It can generate a unique numeric ID and encode it in Base62, or generate random codes and check for collisions. Sequence-based IDs are compact but may reveal volume and require distributed allocation; random IDs are less predictable but need collision handling and sufficient code space.

**Q4. How should the service handle code collisions?**

**Answer:** Enforce a unique constraint in the authoritative datastore. On collision, generate another candidate and retry with a bounded policy. Never rely only on an in-memory check, since concurrent requests or multiple regions can race.

**Q5. How would you design the redirect read path?**

**Answer:** Look up the code in a cache, fall back to a persistent key-value store, and return an appropriate redirect if the mapping exists and is active. Set cache lifetimes with expiration and deletion behavior in mind, and avoid letting stale cache entries bypass revocation.

### Advanced and Production

**Q6. How would you collect click analytics without slowing redirects?**

**Answer:** Return the redirect after resolving the mapping, then publish a compact click event asynchronously. Aggregate events in a stream or batch pipeline. Define sampling, bot filtering, privacy, and delivery-loss tolerance separately from redirect correctness.

**Q7. How can the design handle hot links and regional traffic?**

**Answer:** Cache popular mappings close to users, use a CDN or regional cache where suitable, and protect the origin from stampedes with request coalescing or short-lived negative caching. Ensure invalidation or expiration rules propagate consistently.

**Q8. How should custom aliases and malicious destinations be handled?**

**Answer:** Validate alias syntax and reserve system paths, enforce ownership and uniqueness, and rate-limit creation. Detect phishing or malware destinations, provide abuse reporting, and avoid unsafe redirects from untrusted schemes such as `javascript:`.

**Q9. A link is deleted, but users still get redirected due to caches. How would you prevent this?**

**Answer:** Define deletion propagation requirements, invalidate or tombstone cached mappings, and use short TTLs or version checks for links that require rapid revocation. For sensitive destinations, perform an authoritative status check rather than trusting a long-lived cache entry.
