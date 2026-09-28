# Next.js — 02 Routing

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is file-based routing in Next.js?

**Interview Answer:**
File-based routing means the folder and file structure of your app defines the application's routes. For example, `pages/about.js` maps to `/about` and `app/blog/[id]/page.js` maps to dynamic blog URLs.

**Detailed Explanation:**
This approach reduces explicit router configuration. Routing is convention-based and easy to reason about, especially in medium and large applications where route structure is part of the project architecture.

### Q2. How does routing work in the `pages` directory versus the `app` directory?

**Interview Answer:**
In the `pages` directory, a file inside the folder becomes a route. In the `app` directory, routes are defined by the `page.js` file inside a segment, and nested layouts and route groups are supported.

**Detailed Explanation:**
The App Router is more powerful because it supports layout nesting, loading states, error boundaries, and server components. The Pages Router is still widely used and simpler for smaller apps.

### Q3. What is a dynamic route in Next.js?

**Interview Answer:**
A dynamic route matches variable URL values, such as `/product/123` or `/user/jane`. In the `pages` router, this is usually `[id].js`; in the App Router, it is `[id]/page.js`.

**Detailed Explanation:**
The value can be read from the route params or query object, allowing the same page component to serve many different records without creating a separate file for each route.

### Q4. What is a nested route in Next.js?

**Interview Answer:**
A nested route is a route inside another route segment, such as `/dashboard/settings/profile`.

**Detailed Explanation:**
Next.js supports nested folders in the `app` router, and a nested segment can have its own layout, loading UI, and error boundary. This helps organize application UI cleanly and independently for each route area.

### Q5. What are catch-all and optional catch-all routes?

**Interview Answer:**
Catch-all routes use brackets like `[...slug]` to match multiple nested segments, and optional catch-all routes use `[[...slug]]` to also allow the base path. They are useful for CMS-style or documentation URLs.

**Detailed Explanation:**
This pattern allows flexible URL handling without enumerating every route. For instance, `/docs/getting-started/install` can be mapped into a single page component that interprets the slug array.

### Q6. How do you navigate between routes in Next.js?

**Interview Answer:**
You can use the `Link` component for client-side navigation, and `router.push()` for programmatic navigation. In the App Router, `Link` remains the main primitive for navigation.

**Detailed Explanation:**
`Link` performs client-side transitions and prefetches routes when possible, which improves performance. Using `Link` instead of full-page reloads keeps the app responsive and preserves state more naturally.

### Q7. What is route prefetching in Next.js?

**Interview Answer:**
Next.js prefetches linked pages in the background so navigation feels faster. This is especially helpful for pages that are imported or visible near the viewport.

**Detailed Explanation:**
Prefetching works best for static and server-rendered routes. It reduces latency for users who click soon after page load, contributing to a smooth navigation experience.

### Q8. What are route groups and layout nesting in the App Router?

**Interview Answer:**
Route groups use parentheses like `(marketing)` or `(dashboard)` to organize routes without affecting the URL path. Layouts let parent UI wrap child routes while preserving state across navigation.

**Detailed Explanation:**
This is useful for having separate navigation shells or authentication boundaries within the same URL tree. For example, marketing pages can share a public layout while dashboard pages share a protected shell.

### Q9. What is a redirect in Next.js?

**Interview Answer:**
A redirect sends users from one URL to another. It is commonly used for legacy paths, auth flow, or canonical URLs.

**Detailed Explanation:**
You can configure redirects in `next.config.js` or implement them in route logic. Redirects should be intentional and consistent with SEO and user expectations; otherwise they can cause confusion or poor crawl behavior.

### Q10. What is a rewrite in Next.js?

**Interview Answer:**
A rewrite maps one URL to another without changing what the user sees in the browser. It is often used for proxying or internal routing.

**Detailed Explanation:**
Unlike redirects, rewrites keep the visible URL stable while the app can internally serve content from another route or external origin. They are useful when you want clean public URLs with internal implementation flexibility.

## Practical Questions

### Q11. When would you prefer dynamic routes over query parameters?

**Answer:**
Use dynamic routes when the URL segment itself is important and should be meaningful for users or SEO, such as `/products/iphone-15` or `/blog/nextjs-routes`. Use query parameters for filters or optional state like `?category=books&page=2`.

### Q12. What is a common routing bug in production?

**Answer:**
A common bug is creating a route structure that looks correct but conflicts with dynamic or catch-all routes. For example, a generic `[...slug]` route can accidentally capture routes intended for a more specific page if the ordering or matching rules are not carefully designed.
