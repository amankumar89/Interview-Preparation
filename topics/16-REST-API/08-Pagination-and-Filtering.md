# REST-API — 08 Pagination and Filtering

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. Why should a collection endpoint support pagination?**

**Answer:** Pagination limits response size and database work, improves latency, and gives clients a predictable way to navigate large collections. It also protects a service from requests that attempt to retrieve an unbounded result set.

**Q2. What information should a paginated response provide?**

**Answer:** It should provide the returned items and enough navigation or continuation information for the chosen pagination model. Depending on the API, this may include a next-page cursor, links, page size, or a total count when that count is affordable and useful.

### Intermediate

**Q3. What is the difference between offset and cursor pagination?**

**Answer:** Offset pagination identifies a result by its position and is simple for small or relatively stable collections. Cursor pagination continues from a stable sort key and is often more efficient and consistent for large or frequently changing datasets.

**Q4. Why must paginated results use deterministic ordering?**

**Answer:** Without a stable order, records can move between pages or appear more than once. Include a unique tie-breaker in the sort order, such as an identifier after a timestamp.

### Practical and Production

**Q5. How can a cursor be designed safely?**

**Answer:** Encode the last observed sort values and bind the cursor to relevant filters and ordering. Treat it as untrusted input, validate or sign it when tampering matters, and avoid exposing sensitive internal data in a readable cursor.

**Q6. How should an API handle arbitrary filtering and sorting parameters?**

**Answer:** Define an explicit set of supported fields and operators, validate types and limits, and parameterize database values. Do not interpolate client-provided field names or expressions directly into SQL.
