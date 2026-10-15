# Spring-Boot — 03 REST API

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is the difference between `@Controller` and `@RestController`?**

**Answer:** `@RestController` combines controller registration with response-body semantics, so handler return values are written as response data, commonly JSON. A regular `@Controller` is often used when handler return values identify views, though it can also expose response bodies with `@ResponseBody`.

**Q2. How do you read JSON input and return JSON output from a Spring Boot endpoint?**

**Answer:** A handler can accept a request DTO annotated with `@RequestBody` and return a response DTO. HTTP message converters, commonly backed by Jackson for JSON, handle serialization and deserialization based on the request and response media types.

**Q3. How should an endpoint choose an HTTP status code?**

**Answer:** Use a status that describes the outcome: for example, `200 OK` for a successful read, `201 Created` for creation, `204 No Content` for a successful operation without a body, and an appropriate 4xx or 5xx status for failures. For a created resource, include a `Location` header when its URI is available.

### Intermediate

**Q4. Why should a REST API use request and response DTOs instead of exposing persistence entities?**

**Answer:** DTOs decouple the external contract from the database model, let the API expose only intended fields, and make validation and compatibility changes easier to control. Returning entities directly can leak internal fields, trigger persistence behavior during serialization, and couple clients to schema changes.

**Q5. How should a collection endpoint support pagination and sorting?**

**Answer:** Accept bounded page or cursor parameters and an allowlist of sortable fields, then return the items with enough metadata or continuation information for clients. Enforce a maximum page size and use a stable ordering so records are not arbitrarily repeated or skipped as data changes.

**Q6. What does idempotency mean for an HTTP operation, and when is it useful?**

**Answer:** An operation is idempotent when repeating the same request has the same intended effect as performing it once. This matters for retries after network failures. For non-idempotent actions such as payment creation, an API can accept an idempotency key and persist the result associated with that key.

### Practical and Production

**Q7. How would you evolve a public REST API without unexpectedly breaking existing clients?**

**Answer:** Prefer additive changes, preserve existing field meanings, and avoid changing status codes or validation semantics silently. For breaking changes, define a versioning and deprecation policy, communicate a removal timeline, and monitor usage before retiring the older contract.

**Q8. How would you investigate a client receiving 415 or 406 from an endpoint?**

**Answer:** Check the request `Content-Type` against the types the endpoint can consume and the `Accept` header against the types it can produce. Confirm the relevant message converter is on the classpath and avoid treating malformed or unsupported media types as generic server failures.

**Q9. What should an API response include when a request fails?**

**Answer:** Return a stable, documented error representation with a useful status and safe machine-readable code or detail. Do not expose stack traces, SQL, secrets, or internal class names; include a request or trace identifier when it helps correlate the response with server-side diagnostics.
