# Next.js — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is Next.js?

**Interview Answer:**
Next.js is a React framework for building production-ready web applications. It adds routing, server-side rendering, static generation, API routes, performance optimizations, and deployment-friendly conventions on top of React.

**Detailed Explanation:**
It is designed to make React applications easier to ship at scale. With Next.js, you get file-based routing, code splitting, image optimization, and rendering strategies like SSR, SSG, and ISR without building the infrastructure yourself.

### Q2. What are the main advantages of using Next.js over a plain React app?

**Interview Answer:**
It provides routing, rendering strategies, backend API support, optimized asset handling, SEO support, and a simpler production setup. It reduces boilerplate for common web app concerns.

**Detailed Explanation:**
A plain React app usually needs React Router, a build setup, a backend for APIs, and custom SSR decisions. Next.js includes these functionalities with convention-based structure and sensible defaults.

### Q3. What is the difference between client-side rendering and server-side rendering in Next.js?

**Interview Answer:**
Client-side rendering generates the UI in the browser after JavaScript loads, while server-side rendering produces HTML on the server before sending it to the client.

**Detailed Explanation:**
SSR improves initial page load and SEO because the browser receives HTML immediately. CSR is useful for interactive UI after hydration, but it can delay the first meaningful paint if the app is large.

### Q4. What are the common rendering modes in Next.js?

**Interview Answer:**
The most common modes are SSR, SSG, CSR, and ISR. Static pages can be generated at build time, while dynamic pages can be rendered on the server per request or revalidated periodically.

**Detailed Explanation:**
Next.js lets you mix rendering strategies by route. This flexibility helps with marketing pages, dashboards, and authenticated content that require different freshness and performance trade-offs.

### Q5. What is the purpose of the `pages` directory and the `app` directory?

**Interview Answer:**
They are the main routing directories in Next.js. `pages` was the original routing model, while `app` is the newer App Router introduced for nested layouts, server components, and advanced route behavior.

**Detailed Explanation:**
The `pages` directory uses file-based routing with components exported from route files. The `app` directory supports a more structured layout system where routes manage UI segments and loading/error states more explicitly.

### Q6. What is a page in Next.js?

**Interview Answer:**
A page is a React component that maps to a route. For example, `pages/about.js` or `app/about/page.js` corresponds to the `/about` URL.

**Detailed Explanation:**
Pages are the primary unit of routing. They can fetch data, render markup, and use built-in features like SEO metadata, dynamic routes, and layout composition depending on the router used.

### Q7. What is a project structure in a typical Next.js app?

**Example:**

```text
my-app/
  app/
    layout.js
    page.js
    globals.css
  pages/
    api/
      hello.js
  public/
  next.config.js
  package.json
```

**Answer:**
A Next.js app usually contains application routes, public assets, config files, and package metadata. The structure is convention-based, reducing boilerplate and keeping routing predictable.

### Q8. What is the role of `next.config.js`?

**Interview Answer:**
It is the main configuration file for a Next.js project. It lets you define redirects, rewrites, environment configuration, image settings, webpack behavior, and other framework-level options.

**Detailed Explanation:**
Configurations are important in production because they can optimize image delivery, change routing behavior, enable advanced instrumentation, and support custom builds without rewriting the application code.

### Q9. How does Next.js help with SEO?

**Interview Answer:**
It supports server-rendered HTML, page metadata, and semantic structure. Search engines and social crawlers can index pages more reliably because the initial HTML is available without running JavaScript first.

**Detailed Explanation:**
Head metadata can be managed with components like `Head` in the Pages Router or the metadata API in the App Router. This is especially useful for product pages, blogs, and marketing sites.

### Q10. What is hydration in Next.js?

**Interview Answer:**
Hydration is the process where the browser attaches React event listeners and state logic to the server-rendered HTML so the page becomes interactive.

**Detailed Explanation:**
After the server sends HTML, the client bundle loads and React reuses the markup. This is essential for client-side interactivity without losing the server-rendered DOM structure.

## Practical Questions

### Q11. How would you explain Next.js to a junior developer?

**Answer:**
Next.js is a framework that makes React apps more complete by giving them routing, backend capabilities, server rendering, and ready-to-use production features. It is commonly used for websites, dashboards, and apps where performance and SEO matter.

### Q12. What is a common production mistake when starting with Next.js?

**Answer:**
A common mistake is treating it like a plain React app without understanding rendering strategies. Developers often fetch data in client components when static or server-side rendering would be simpler and faster, or they ignore caching and route-level performance optimization.
