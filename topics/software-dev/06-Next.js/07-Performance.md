# Next.js — 07 Performance

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. Why is performance important in Next.js applications?

**Interview Answer:**
Next.js applications often serve content-rich pages, so poor performance leads to lower conversion rates, slower user experience, and worse SEO. Performance concerns include JavaScript size, image load time, and slow data fetching.

**Detailed Explanation:**
Performance improvements usually produce business value as well: faster pages can reduce bounce rate, improve accessibility, and lower infrastructure cost when the app is served more efficiently.

### Q2. What are the built-in performance features in Next.js?

**Interview Answer:**
Next.js includes route-based code splitting, image optimization, font optimization, static generation, caching, and automatic prefetching for navigation.

**Detailed Explanation:**
These features help reduce the amount of work the browser and server do before the user can interact. They are especially valuable for large React apps where bundle size and network latency are major concerns.

### Q3. What is image optimization in Next.js?

**Interview Answer:**
Next.js provides the `Image` component, which optimizes image resizing, lazy loading, and modern format delivery automatically when configured correctly.

**Detailed Explanation:**
This is important because large images are one of the biggest causes of slow pages. The `Image` component also helps avoid layout shifts by reserving space with known dimensions.

### Q4. How do fonts affect performance, and how can Next.js help?

**Interview Answer:**
Fonts can contribute to layout shifts and extra network requests. Next.js offers optimized font loading to reduce these issues and improve perceived performance.

**Detailed Explanation:**
Using local or optimized font files and reducing the number of font families in use helps keep pages fast. This also improves readability and reduces the time until text becomes visible.

### Q5. What is route prefetching and why does it matter?

**Interview Answer:**
Route prefetching loads upcoming pages in the background, which reduces wait time when a user navigates. Next.js does this automatically for `Link` components in many cases.

**Detailed Explanation:**
Prefetching helps create a faster, more app-like user experience. It is particularly effective on large sites where users move across many pages but only need a small subset at a time.

### Q6. What is code splitting and why is it useful?

**Interview Answer:**
Code splitting breaks a large bundle into smaller chunks so the browser downloads only what it needs when it needs it.

**Detailed Explanation:**
This reduces initial load time and prevents unnecessary JavaScript from slowing the first render. Next.js does this automatically at the route level and for dynamic imports.

### Q7. How do caching and revalidation improve performance?

**Interview Answer:**
Caching reduces repeated work by reusing computed or fetched results. Revalidation refreshes these results when they are stale, balancing performance and freshness.

**Detailed Explanation:**
For static pages and fetches, caching reduces database and CPU load. In a production system, a proper cache strategy can drastically improve response time without sacrificing critical freshness.

### Q8. What are common performance anti-patterns in Next.js?

**Answer:**
Common anti-patterns include shipping large client bundles, fetching too much data for each page, rendering huge lists without virtualization, loading non-critical resources eagerly, and ignoring image and font optimization.

### Q9. What is a good strategy for large lists in a Next.js app?

**Answer:**
Use pagination, virtualization, server-side filtering, and limited data loads. Rendering thousands of DOM nodes at once can slow the browser dramatically even when the server is fast.

### Q10. What is a common production performance mistake?

**Answer:**
A common mistake is optimizing only the UI while ignoring the data layer. If a page does many expensive database queries or large API calls, no amount of client-side code splitting will solve the underlying latency.

## Practical Questions

### Q11. How would you measure performance in a Next.js production app?

**Answer:**
Use tools like Lighthouse, browser performance profiling, Core Web Vitals, server response metrics, and API timing data. Measure LCP, FID, CLS, network waterfall, and server latency under realistic traffic conditions.

### Q12. What usually gives the biggest performance win for a Next.js app?

**Answer:**
The biggest wins often come from reducing unnecessary JavaScript, optimizing images and fonts, and avoiding slow or duplicate data fetches. These improvements affect the user experience across the entire app, not just one screen.
