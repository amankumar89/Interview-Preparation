# REST-API — 02 HTTP

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What are the main parts of an HTTP request?**

**Answer:** A request has a method, target URL, headers, and optionally a body. The method describes the intended operation, headers carry metadata, and the body carries data such as JSON for a create or update request.

**Q2. What is the purpose of the `Content-Type` and `Accept` headers?**

**Answer:** `Content-Type` describes the format of the request body. `Accept` tells the server which response formats the client can process. They are independent: a client may send JSON and request a different response representation.

### Intermediate

**Q3. How do `PUT` and `PATCH` differ?**

**Answer:** `PUT` generally replaces the representation at a known URI and is idempotent. `PATCH` applies a partial change and may be idempotent depending on the patch operation and implementation.

**Q4. What is the difference between headers and query parameters?**

**Answer:** Headers carry request metadata or cross-cutting information such as authorization, caching, and content negotiation. Query parameters usually refine the target resource, for example filtering, sorting, or pagination.

**Q5. When should data be placed in the request body instead of the URL?**

**Answer:** Put submitted resource data in the body, especially for create or update operations. Keep identifiers and small retrieval controls in the URL. Avoid placing secrets or large sensitive values in URLs because URLs are commonly logged and cached.

### Practical and Production

**Q6. How should an API handle an unsupported media type?**

**Answer:** Validate `Content-Type` and return `415 Unsupported Media Type` when the request format is not supported. For an unsupported requested response format from `Accept`, return `406 Not Acceptable` when negotiation cannot succeed.

**Q7. What HTTP caching controls are useful for a REST API?**

**Answer:** `Cache-Control` defines freshness and reuse rules, while `ETag` or `Last-Modified` supports conditional requests. A client can send `If-None-Match` and receive `304 Not Modified`, avoiding transfer of an unchanged representation.
