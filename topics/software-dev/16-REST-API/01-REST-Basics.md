# REST-API — 01 REST Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is REST?**

**Answer:** REST is an architectural style for networked systems. It models domain objects as resources, identifies them with URLs, and uses a uniform interface, usually HTTP methods and representations, to operate on those resources.

**Q2. What is a resource in a REST API?**

**Answer:** A resource is a domain object or collection that a client can address, such as a user, order, or product. A URL identifies the resource, while JSON or another representation describes its current state.

### Intermediate

**Q3. What does statelessness mean in REST?**

**Answer:** Each request contains all information needed to process it. The server does not depend on conversational request state stored in memory between calls, which makes horizontal scaling and request routing easier.

**Q4. What is the difference between a resource URL and a controller action URL?**

**Answer:** A resource URL represents a thing, such as `/orders/42`; the HTTP method expresses the operation. Action-style paths such as `/getOrder` expose implementation details and usually create inconsistent APIs.

**Q5. What is HATEOAS, and is it required for every REST API?**

**Answer:** HATEOAS means that responses include links describing available next actions. It is part of the formal REST constraints, but many practical APIs use REST-like resource and HTTP conventions without fully implementing hypermedia.

### Practical and Production

**Q6. How would you decide whether an endpoint should return a single resource or a collection?**

**Answer:** Return a single resource when the URL identifies one entity, such as `GET /users/42`. Return a collection for a resource set, such as `GET /users`, and apply pagination rather than returning an unbounded list.

**Q7. What makes an API RESTful enough for production use?**

**Answer:** It should use stable resource naming, standard HTTP semantics, stateless requests, consistent representations and errors, explicit validation, authentication and authorization, observability, and documented compatibility rules. REST is a means to clear contracts, not a requirement to follow every theoretical constraint literally.
