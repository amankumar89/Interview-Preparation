# REST-API — 07 API Security

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. How is authentication different from authorization?**

**Answer:** Authentication establishes who the caller is. Authorization determines what that authenticated caller is allowed to do on a resource. A valid identity does not automatically grant access to every endpoint.

**Q2. How should an API protect credentials in transit?**

**Answer:** Use HTTPS with correctly validated certificates, redirect or reject plaintext HTTP, and protect internal hops as required by the threat model. Never send passwords, tokens, or API keys over an unencrypted connection.

### Intermediate

**Q3. What is the difference between an API key and an access token?**

**Answer:** An API key commonly identifies an application or client and is often long-lived. An access token represents delegated authorization and should normally be scoped, short-lived, revocable, and transmitted using a secure mechanism such as the `Authorization` header.

**Q4. What is broken object-level authorization?**

**Answer:** It occurs when an endpoint checks that a request is authenticated but fails to verify access to the specific object identified by the request. Every resource lookup must enforce ownership, tenant, role, or policy rules rather than trusting an ID supplied by the client.

**Q5. How should an API validate input securely?**

**Answer:** Validate type, size, format, allowed values, and business constraints at the boundary. Use parameterized queries or safe ORM APIs, encode output for its context, reject unexpected fields where appropriate, and avoid relying on client-side validation.

### Practical and Production

**Q6. What protections should be applied to a public REST API?**

**Answer:** Use TLS, strong authentication, least-privilege authorization, rate and size limits, schema validation, audit logging, secret rotation, abuse detection, safe error responses, dependency patching, and monitoring for suspicious access patterns. Add CSRF protection when browser credentials are sent automatically.

**Q7. How should sensitive data be handled in logs and errors?**

**Answer:** Do not log passwords, tokens, payment data, or unnecessary personal information. Redact known sensitive fields, restrict log access, define retention limits, use correlation IDs instead of copying credentials, and return generic external errors while preserving actionable internal diagnostics.
