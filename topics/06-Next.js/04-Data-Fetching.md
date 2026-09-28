# Next.js — 04 Data Fetching

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What are the common ways to fetch data in Next.js?

**Interview Answer:**
The main approaches are server-side fetch in route components, static data fetching during build time, and client-side data fetching from hooks or libraries such as `fetch` or React Query.

**Detailed Explanation:**
The correct approach depends on whether data is static, user-specific, or frequently changing. Next.js gives flexibility to handle each case while controlling caching and rendering behavior.

### Q2. What is `getStaticProps` and when is it used?

**Interview Answer:**
`getStaticProps` is a Pages Router method used to fetch data at build time so a page can be statically generated.

**Detailed Explanation:**
It is useful when the page content is mostly static and can be cached. A common example is a blog home page or a product listing that updates on a controlled schedule.

### Q3. What is `getServerSideProps` and when is it used?

**Interview Answer:**
`getServerSideProps` fetches data on each request, making it useful for user-specific or frequently changing content.

**Detailed Explanation:**
Examples include a shopping cart summary, account profile, or personalized dashboard. Because it runs per request, it is more computationally expensive than SSG but ensures fresh data.

### Q4. What is the difference between `getStaticProps` and `getServerSideProps`?

**Interview Answer:**
`getStaticProps` runs at build time and is ideal for cached, static content, while `getServerSideProps` runs on every request and is ideal for dynamic content.

**Detailed Explanation:**
The trade-off is between performance and freshness. Static pages scale better and are faster to serve, but they may not reflect the latest data unless revalidated.

### Q5. What is `revalidate` in Next.js and why is it useful?

**Interview Answer:**
`revalidate` allows static pages to update in the background after a time interval, without a full rebuild or redeploy.

**Detailed Explanation:**
This gives static pages a freshness window while preserving CDN-level performance. It is very useful for product catalogs, content pages, and landing pages that need periodic updates.

### Q6. What is data fetching in the App Router?

**Interview Answer:**
In the App Router, you fetch data directly in Server Components using `async` functions and `fetch`, with support for caching and revalidation options.

**Detailed Explanation:**
This model moves data access closer to the component tree and allows server-side logic to stay server-only. It also makes route rendering and caching more explicit and easier to optimize.

### Q7. How does `fetch` work with caching in Next.js?

**Interview Answer:**
`fetch` in Next.js can be cached by default for static-like behavior or configured with `cache: 'no-store'`, `revalidate`, or custom time-based behavior depending on the route and runtime.

**Detailed Explanation:**
Caching is crucial for performance. Developers must be deliberate about when to keep responses fresh versus when to serve a cached result to prevent stale data or high server costs.

### Q8. When should you fetch data on the client side instead of on the server?

**Interview Answer:**
Use client-side fetching for interactive dashboard widgets, filters, or data that changes after page load based on user interactions.

**Detailed Explanation:**
If the page or component does not need SEO-critical HTML and depends on browser events, a client fetch is usually correct. This reduces unnecessary server work and keeps UI responsive.

### Q9. What are the common mistakes in Next.js data fetching?

**Answer:**
Common mistakes include fetching too much data on the client, forgetting to cache expensive requests, using SSR when static generation would be enough, and mixing database calls with UI code in a way that creates slow rendering or repeated expensive queries.

### Q10. How do you avoid N+1 data fetching problems in Next.js?

**Answer:**
Fetch related data in as few queries as possible, batch requests, and use a data access layer or server function that resolves all required data together. This reduces latency and avoids repeated database calls for each item in a list.

## Practical Questions

### Q11. When would you choose React Query over built-in `fetch` in Next.js?

**Answer:**
Use React Query when you need client-side caching, background refetching, optimistic updates, request deduplication, and complex UI state synchronization. It is a good fit for dashboards and frequently changing data surfaces.

### Q12. What is the risk of fetching user-specific data in a static page?

**Answer:**
It can expose the wrong content to the wrong user or cache sensitive data incorrectly. If authorization or request-specific information is involved, the data should be dynamically rendered or isolated per user with cache-safe patterns.
