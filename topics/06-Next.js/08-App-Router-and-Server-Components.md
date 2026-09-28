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

### Intermediate

**Q3. When does a component need the `"use client"` directive?**

**Answer:** A component needs it when it uses client-only capabilities such as state, effects, event handlers, or browser APIs. The directive marks a client entry point; its imported component subtree may also become part of the client bundle.

**Q4. Can a Server Component render a Client Component, and can the reverse happen?**

**Answer:** A Server Component can render a Client Component and pass serializable props to it. A Client Component cannot import a Server Component directly, but it can receive server-rendered content through a slot such as `children`.

### Practical and Production

**Q5. How do layouts, `loading`, and `error` files affect a route?**

**Answer:** Layouts provide shared UI around nested segments. A `loading` file provides a Suspense fallback while route content loads, and an `error` file supplies a segment-level error boundary; error boundaries are client components and should offer a recovery path where possible.

**Q6. How do you decide whether data fetching belongs in a Server Component or a Client Component?**

**Answer:** Prefer server-side fetching for data that can be loaded before rendering, especially when it reduces client JavaScript or protects secrets. Use client-side fetching when the UI needs browser-driven updates, user interaction, or live refresh, and define caching and authorization behavior explicitly.
