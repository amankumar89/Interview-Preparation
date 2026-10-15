# Next.js — 03 Rendering

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are the main page rendering strategies in Next.js?

**Interview Answer:**
The main strategies are static generation, server-side rendering, client-side rendering, and incremental static regeneration. These strategies determine when and how HTML is produced.

**Detailed Explanation:**
Each strategy is useful for different data freshness and performance needs. Static pages are cheap to serve, SSR provides fresh output per request, and CSR is ideal for interactive widgets.

### Q2. What is Static Site Generation (SSG) in Next.js?

**Interview Answer:**
SSG pre-renders a page at build time and serves the generated HTML to users. It is ideal for content that changes infrequently, like blogs or documentation pages.

**Detailed Explanation:**
The static HTML can be cached globally by a CDN, which makes response times very low. SSG is often the best default for public pages with minimal per-user data.

### Q3. What is Server-Side Rendering (SSR) in Next.js?

**Interview Answer:**
SSR renders the page on the server for each request. This gives the user fresh HTML and is useful when data changes often or depends on request-specific information.

**Detailed Explanation:**
SSR is slower than SSG in pure serving cost because it must generate HTML per request, but it guarantees freshness. Authentication data, cookies, and user-specific headers can often require SSR.

### Q4. What is Incremental Static Regeneration (ISR)?

**Interview Answer:**
ISR lets a static page be regenerated in the background after a certain period, without rebuilding the entire site. It combines static speed with controlled freshness.

**Detailed Explanation:**
This is useful for product catalogs, news pages, or docs where content changes occasionally. `revalidate` controls how often the page re-renders, and stale content can still be served while the new version is refreshed.

### Q5. What is client-side rendering in Next.js?

**Interview Answer:**
Client-side rendering loads a minimal shell and then fetches data in the browser to render interactive UI. It is common for dashboards and apps that depend heavily on user interaction.

**Detailed Explanation:**
In Next.js, CSR is often used in Client Components, where state, effects, and browser APIs live. It performs well when page content is personalized or updates frequently after the initial load.

### Q6. How do you decide between SSG, SSR, and CSR?

**Interview Answer:**
Use SSG for pages that can be cached and are mostly static, SSR for request-dependent data, and CSR for highly interactive UI that does not need SEO-critical HTML.

**Detailed Explanation:**
The decision usually depends on freshness, SEO needs, personalization, bundle size, and data availability. A practical app often mixes all three strategies across different routes.

### Q7. What is streaming in Next.js?

**Interview Answer:**
Streaming allows parts of the page to be sent to the client progressively while the rest is still being prepared. It improves perceived loading speed for large pages.

**Detailed Explanation:**
The App Router supports loading boundaries and suspense-like fallback states. This helps users see skeletons or partial UI instead of waiting for the entire route to complete before rendering.

### Q8. What is the difference between static rendering and dynamic rendering?

**Interview Answer:**
Static rendering generates content ahead of time and caches it. Dynamic rendering depends on request data, cookies, headers, or user-specific state and must be compute-time specific.

**Detailed Explanation:**
In Next.js, dynamic rendering can happen through SSR routes or by opting a route segment out of static generation. Understanding this distinction is essential for correct caching and performance design.

### Q9. What is the role of `generateStaticParams` in the App Router?

**Interview Answer:**
`generateStaticParams` defines which dynamic route params should be statically generated at build time, such as a list of blog slugs.

**Detailed Explanation:**
This is helpful when a dynamic route has a known finite set of pages. It reduces runtime work and improves scalability because the route is pre-rendered for only the relevant ids.

### Q10. What is a common rendering mistake in production?

**Answer:**
A common mistake is using SSR or per-request fetching for pages that are effectively static, which increases server load and slows down the application. Another is using client-side fetching for SEO-critical content that could have been rendered on the server or statically generated.

## Practical Questions

### Q11. Why do large dashboards often use client rendering for some sections?

**Answer:**
Dashboards are often highly interactive and personalized. Rendering the main shell with server-side HTML while fetching data client-side for widgets can provide a good balance between performance and interactivity.

### Q12. How does Next.js improve the user experience during slow data loads?

**Answer:**
It supports loading states, streaming, and partial hydration so users see immediate feedback instead of waiting for the entire route to finish. This reduces perceived latency and keeps the app feeling responsive.
