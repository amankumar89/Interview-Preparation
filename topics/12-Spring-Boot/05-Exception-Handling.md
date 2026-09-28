# Spring-Boot — 05 Exception Handling

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. How do you handle exceptions consistently across Spring MVC controllers?**

**Answer:** Use `@ControllerAdvice` or `@RestControllerAdvice` with `@ExceptionHandler` methods to centralize exception-to-response mapping. This avoids repeating error construction in every handler and keeps controller code focused on request behavior.

**Q2. What is the difference between `@ControllerAdvice` and `@RestControllerAdvice`?**

**Answer:** `@RestControllerAdvice` combines `@ControllerAdvice` with response-body semantics for its handler methods. A regular `@ControllerAdvice` can handle both view-oriented and response-body cases, but response-body behavior must be declared where needed.

**Q3. Should every exception return HTTP 500?**

**Answer:** No. Return a suitable 4xx status for a client-caused problem such as invalid input or a missing resource, and use 5xx for unexpected server failures. Avoid mapping all exceptions to success statuses or exposing internal failures as client errors.

### Intermediate

**Q4. How should an application distinguish expected business exceptions from unexpected failures?**

**Answer:** Represent expected domain outcomes with deliberate exception types or result handling and map them to documented responses. Let unexpected failures reach a centralized fallback that logs diagnostic context and returns a generic server error without leaking implementation details.

**Q5. What is `ProblemDetail`, and when might you use it?**

**Answer:** `ProblemDetail` is Spring Framework's representation for HTTP API errors following the Problem Details model. It can provide a consistent status, type, title, detail, and instance, with carefully chosen extension fields for application-specific error codes or correlation identifiers.

**Q6. How should validation exceptions be handled in a centralized error handler?**

**Answer:** Convert field and object violations into a predictable response that identifies which inputs failed and why, using messages appropriate for clients. Do not return raw exception messages or rejected values indiscriminately, and ensure the response has the documented client-error status.

### Practical and Production

**Q7. What information should be logged when an unexpected exception occurs?**

**Answer:** Log the exception with a correlation or trace identifier and enough request context to diagnose it, while excluding credentials, tokens, and sensitive payload data. Avoid logging the same exception at multiple layers without adding information, which creates noisy and misleading alerts.

**Q8. A global exception handler unexpectedly converts an error into a 200 response. What would you inspect?**

**Answer:** Check the handler's returned status, response annotations, and any default error path that may treat the return value as a normal body. Add an integration test for the failing request that asserts both the HTTP status and the response shape, not just the serialized message.

**Q9. How should an API avoid leaking implementation details while still helping clients resolve errors?**

**Answer:** Return stable error codes and safe, actionable messages, and keep stack traces and internal diagnostics in protected logs. Include a request identifier so support teams can locate the corresponding server-side event without exposing that event's contents to the client.
