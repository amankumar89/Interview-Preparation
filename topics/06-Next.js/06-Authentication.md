# Next.js — 06 Authentication

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is authentication in a Next.js app?

**Interview Answer:**
Authentication verifies who a user is. In Next.js, this is commonly handled with cookies, JWTs, or an auth library such as NextAuth.js while protecting routes and API logic.

**Detailed Explanation:**
Authentication is the step of checking a user’s identity before allowing access to private content. It is different from authorization, which decides what that user is allowed to do.

### Q2. What is the difference between authentication and authorization?

**Interview Answer:**
Authentication answers, “Who is this user?” and authorization answers, “What is this user allowed to do?”

**Detailed Explanation:**
A user may be authenticated but still not be allowed to access admin pages or modify another user’s record. Both checks need to exist for secure systems.

### Q3. What is a common way to protect pages in Next.js?

**Interview Answer:**
You often check the user session or token on the server before rendering the page or redirecting unauthenticated users to a login page.

**Detailed Explanation:**
In the App Router, this is often done in server components or route handlers, with redirects and `cookies()` data used to verify identity. A protected page should not rely only on client-side UI checks.

### Q4. What are cookies used for in Next.js auth?

**Interview Answer:**
Cookies can store session identifiers, tokens, or session data that the server verifies on future requests. They are a common mechanism for keeping a user logged in.

**Detailed Explanation:**
Cookies are not automatically secure; they must be configured with `HttpOnly`, `SameSite`, and secure settings where appropriate. This helps prevent client-side JavaScript theft and reduces CSRF risks.

### Q5. What is JWT and when is it used?

**Interview Answer:**
JWT stands for JSON Web Token. It is a compact token used to represent claims about a user and is commonly exchanged between the client and server for authentication.

**Detailed Explanation:**
A JWT can be stored in a cookie or in local storage, but storing it in local storage is less ideal for production because of browser-side theft risks. A server-side session pattern is often safer for web apps.

### Q6. What is NextAuth.js?

**Interview Answer:**
NextAuth.js is a popular authentication library for Next.js. It supports credentials, OAuth providers, and session management with a simple integration model.

**Detailed Explanation:**
It is widely used because it handles common flows like sign in, session retrieval, and protected routes. It also reduces repetitive auth boilerplate for multi-provider apps.

### Q7. How do you protect an API route in Next.js?

**Interview Answer:**
Check for a valid session or token before processing the request. If the caller is unauthenticated or unauthorized, return a `401` or `403` status code.

**Detailed Explanation:**
This ensures that private data is never exposed through public endpoints. API routes should always perform auth checks on the server instead of trusting the frontend.

### Q8. What is middleware in Next.js auth workflows?

**Interview Answer:**
Middleware runs before a request is handled and can redirect users, rewrite routes, or inspect headers/cookies for authentication and authorization decisions.

**Detailed Explanation:**
It is useful for redirecting unauthenticated users away from protected pages or enforcing a session cookie policy earlier in the request lifecycle. This reduces unnecessary rendering work.

### Q9. Why is CSRF protection important in auth flows?

**Interview Answer:**
CSRF protection prevents malicious sites from making authenticated requests on behalf of a user without their consent.

**Detailed Explanation:**
This is especially important when using cookies for session-based auth. Developers should use secure cookie settings and token-based patterns where appropriate to reduce the attack surface.

### Q10. What is a common authentication production mistake?

**Answer:**
A common mistake is trusting client-side checks alone. For example, hiding a login button or checking for a `user` object in the frontend does not secure a protected route or API endpoint. The real protection must happen on the server.

## Practical Questions

### Q11. Should you store JWTs in localStorage?

**Answer:**
It is generally not recommended for web apps because localStorage is accessible to JavaScript and can be stolen via XSS. Cookies with secure configuration or server-managed sessions are usually safer.

### Q12. How do you design a secure login flow for a production app?

**Answer:**
Use strong password handling, rate limiting, secure session management, environment-based secrets, proper redirects, and explicit authorization checks for every protected action. Add monitoring for failed login attempts and abnormal token usage.
