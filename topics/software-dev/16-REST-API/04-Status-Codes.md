# REST-API — 04 Status Codes

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What do the HTTP status code classes mean?**

**Answer:** `2xx` indicates success, `3xx` redirection or cache-related behavior, `4xx` a client-side request or authorization problem, and `5xx` a server or upstream failure.

**Q2. When should an API return `200`, `201`, and `204`?**

**Answer:** Use `200 OK` for a successful response with a representation, `201 Created` when a resource is created, usually with a `Location` header, and `204 No Content` when the operation succeeds without a response body.

### Intermediate

**Q3. What is the difference between `400 Bad Request` and `422 Unprocessable Content`?**

**Answer:** `400` broadly means the request cannot be understood or parsed. `422` is useful when syntax is valid but semantic validation fails, such as an invalid date range. The important requirement is consistency and documentation.

**Q4. When should an API return `401` versus `403`?**

**Answer:** `401 Unauthorized` means authentication is missing or invalid and may include a `WWW-Authenticate` challenge. `403 Forbidden` means the server understood the caller but the caller is not allowed to perform the operation.

**Q5. What is the purpose of `404 Not Found`?**

**Answer:** It indicates that the target resource or route could not be found. Some security-sensitive systems deliberately use `404` for an inaccessible resource to avoid revealing whether it exists.

### Practical and Production

**Q6. When should an API return `409 Conflict`?**

**Answer:** Use `409` when the request conflicts with the current resource state, such as creating a duplicate username or updating a version that has already changed. Return enough information for the client to resolve the conflict without leaking internal details.

**Q7. How should clients react to `429` and `5xx` responses?**

**Answer:** For `429 Too Many Requests`, respect `Retry-After` when provided and apply bounded backoff. For transient `5xx` responses, retry only safe or idempotent operations, use jitter and a retry limit, and avoid retry storms. Surface a useful error when the operation is not safely retryable.
