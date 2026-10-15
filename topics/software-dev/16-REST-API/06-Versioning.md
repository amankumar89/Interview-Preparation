# REST-API — 06 Versioning

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Why do APIs need versioning?**

**Answer:** Versioning gives clients a stable contract while the server evolves. It provides a controlled way to introduce breaking changes instead of silently changing behavior that existing clients depend on.

**Q2. What is a breaking API change?**

**Answer:** A breaking change can cause an existing valid client request or response handling to fail, such as removing a field, changing a field type, changing authorization behavior, or altering the meaning of a status code.

### Intermediate

**Q3. What are common API versioning strategies?**

**Answer:** Common strategies include a path such as `/v1/orders`, a query parameter, a custom media type in `Accept`, or a header. Path versioning is easy to discover; media-type versioning keeps URLs stable but requires stronger tooling and documentation.

**Q4. Should every small change create a new API version?**

**Answer:** No. Backward-compatible additions, such as optional response fields, usually do not require a new version. Version only changes that cannot be safely supported under the existing contract.

**Q5. How should an API deprecate an old version?**

**Answer:** Publish a deprecation policy, identify affected clients, provide a migration guide and replacement version, communicate dates, and monitor usage. Headers such as `Deprecation` or `Sunset` can supplement documentation and communication.

### Practical and Production

**Q6. How can one service support multiple API versions safely?**

**Answer:** Keep version-specific request and response adapters near the boundary, translate into a shared internal model, and test each public contract. Avoid scattering version checks through business logic, and define separate metrics and retirement criteria for each version.

**Q7. How would you handle a breaking database change while keeping an API stable?**

**Answer:** Decouple the public contract from the schema and use an expand-migrate-contract sequence: add compatible schema support, backfill and dual-write or read as needed, migrate consumers, then remove obsolete storage. The API version should change only if the public contract changes.
