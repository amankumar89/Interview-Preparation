# Next.js — 08 App Router and Server Components

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is the App Router in Next.js?**

**Answer:** The App Router is Next.js's file-system routing model built around the `app` directory. It supports nested layouts, route segments, loading and error boundaries, and React Server Components.

**Q2. What is a React Server Component in Next.js?**

**Answer:** It is a component rendered on the server and, by default in the App Router, does not ship its component JavaScript to the browser. It can render data-dependent UI while keeping server-only code and credentials out of the client bundle.

**Q3. What is the difference between a Server Component and a Client Component?**

**Answer:** A Server Component runs on the server and is optimized for data access and rendering HTML. A Client Component runs in the browser and is used for interaction, state, effects, and browser APIs.

**Q4. Why does the App Router matter for modern Next.js development?**

**Answer:** It enables better organization of routes, nested layouts, and route-level loading/error states. It also makes server-first rendering the default model and reduces the need for custom routing infrastructure.

### Intermediate

**Q5. When does a component need the `"use client"` directive?**

**Answer:** A component needs it when it uses client-only capabilities such as state, effects, event handlers, or browser APIs. The directive marks a client entry point; its imported component subtree may also become part of the client bundle.

**Q6. Can a Server Component render a Client Component, and can the reverse happen?**

**Answer:** A Server Component can render a Client Component and pass serializable props to it. A Client Component cannot import a Server Component directly, but it can receive server-rendered content through a slot such as `children`.

**Q7. What is a layout in the App Router?**

**Answer:** A layout is a UI wrapper shared between nested routes. It stays persistent across navigation within the same segment tree and is often used for global navigation, sidebars, or page shells.

**Q8. What is the purpose of `loading.tsx` and `error.tsx` in a route segment?**

**Answer:** A `loading` file defines a fallback UI while route data or components are loading. An `error` file provides the fallback UI for a segment-level error boundary and allows recovery without crashing the whole app.

### Practical and Production

**Q9. How do layouts, `loading`, and `error` files affect a route?**

**Answer:** Layouts provide shared UI around nested segments. A `loading` file provides a Suspense fallback while route content loads, and an `error` file supplies a segment-level error boundary; error boundaries are client components and should offer a recovery path where possible.

**Q10. How do you decide whether data fetching belongs in a Server Component or a Client Component?**

**Answer:** Prefer server-side fetching for data that can be loaded before rendering, especially when it reduces client JavaScript or protects secrets. Use client-side fetching when the UI needs browser-driven updates, user interaction, or live refresh, and define caching and authorization behavior explicitly.

**Q11. What is the role of `generateMetadata` in the App Router?**

**Answer:** `generateMetadata` lets a route segment define metadata such as title and description in a server environment, improving SEO and social sharing without requiring client components.

**Q12. What are some common App Router pitfalls in production?**

**Answer:** Common pitfalls include accidentally making a route client-only without a strong reason, placing secrets in client components, failing to define cache behavior for data, or ignoring route-level loading and error states for complex nested flows.

**Q13. Why are Server Components a better fit for secrets and database access?**

**Answer:** Because they stay on the server, they can access private environment variables, database clients, and internal APIs without exposing those credentials to the browser bundle. This reduces attack surface and keeps client bundles smaller.

**Q14. How do you design a production architecture with mixed Server and Client Components?**

**Answer:** Keep data fetching, authentication, and private logic in Server Components. Let Client Components handle browser-specific interaction and small UI state. Use props and serializable data boundaries so the server and browser responsibilities stay clear and testable.
