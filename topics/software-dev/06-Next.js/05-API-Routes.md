# Next.js — 05 API Routes

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are API routes in Next.js?

**Interview Answer:**
API routes are server-side endpoints defined inside the `pages/api` folder or in the App Router via route handlers. They allow you to create backend endpoints directly inside a Next.js app.

**Detailed Explanation:**
This is useful when building a full-stack application without a separate backend service. You can handle form submissions, CRUD requests, and internal integrations from the same codebase.

### Q2. How do API routes differ from pages routes?

**Interview Answer:**
Pages routes render UI; API routes handle HTTP requests and return JSON or other server responses. They do not render HTML unless you intentionally build that behavior.

**Detailed Explanation:**
A page is for the browser-facing interface, while an API route is for programmatic interaction from the frontend, scripts, or other services.

### Q3. How do you define a basic API route in the Pages Router?

**Example:**

```js
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: "Next.js" });
}
```

**Answer:**
The default export is a request handler that receives `req` and `res`. It can inspect the HTTP method, validate data, and return a response.

### Q4. What HTTP methods are commonly used in an API route?

**Interview Answer:**
The common methods are `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`. The handler checks `req.method` to decide what logic should run.

**Detailed Explanation:**
Using the correct HTTP method is important for semantics and interoperability with clients, browsers, and other services. It also helps keep API contracts intuitive.

### Q5. How do you validate incoming request data in an API route?

**Interview Answer:**
You validate required fields, data types, and authorization checks before processing the request. Use runtime checks and server-side validation instead of trusting the client.

**Detailed Explanation:**
For example, if a request expects an email and a password, the route should ensure those fields are present and correctly shaped before interacting with a database or service.

### Q6. What is an API route in the App Router?

**Interview Answer:**
The App Router supports route handlers using the `app/api/.../route.js` convention. These handlers can respond to `GET`, `POST`, and other methods directly.

**Detailed Explanation:**
Route handlers are aligned with the App Router structure and can also be combined with server components and caching behavior. They are an important part of modern Next.js server-side development.

### Q7. How do you handle authentication checks in an API route?

**Interview Answer:**
Use cookies, tokens, or session data to verify the identity of the caller. Only proceed if the request passes authentication and authorization checks.

**Detailed Explanation:**
An API endpoint should never trust the client blindly. This is especially important for operations that modify data, create resources, or reveal private information.

### Q8. What are common security issues in API routes?

**Interview Answer:**
Common issues include missing auth checks, trusting user input, no rate limiting, no CSRF protection when needed, and exposing internal system details through error messages.

**Detailed Explanation:**
Security should be built into the API contract. It should validate payloads, sanitize inputs, enforce permission levels, and avoid disclosing stack traces or secrets in responses.

### Q9. What is CORS and when do API routes need it?

**Interview Answer:**
CORS is a browser security mechanism that restricts cross-origin requests. API routes may need to allow specific origins if a frontend app is served from a different domain.

**Detailed Explanation:**
If your frontend and backend are on different domains, you may need explicit CORS headers or a proxy setup. In a same-origin Next.js app that serves both UI and API routes, this is often less of a problem.

### Q10. What is a common API route production mistake?

**Answer:**
A common production mistake is putting business logic directly into the route without validation, structured error handling, or monitoring. This quickly causes brittle endpoints and makes debugging harder under load.

## Practical Questions

### Q11. Should you put DB logic directly inside API routes?

**Answer:**
For small apps, it is acceptable. For bigger apps, it is better to keep the route thin and push data access to a service layer or repository, so validation, logging, and reuse stay clean and maintainable.

### Q12. How do you make an API route more production-safe?

**Answer:**
Use request validation, typed payloads, centralized error handling, rate limiting, logging, and environment-based secrets. Also add tests for success, invalid input, and unauthorized access cases.
