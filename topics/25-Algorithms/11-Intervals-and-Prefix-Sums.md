# Algorithms — 11 Intervals and Prefix Sums

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is a prefix sum?**

**Answer:** A prefix-sum array stores cumulative sums so a range sum can be computed by subtracting two prefix values. With zero-based inclusive indices, a range $[l, r]$ is `prefix[r + 1] - prefix[l]` when the prefix array includes an initial zero.

**Q2. When are prefix sums useful?**

**Answer:** They are useful when many range-sum queries are made on data that does not change. Preprocessing takes $O(n)$ time and each range query then takes $O(1)$ time.

### Intermediate

**Q3. How do you merge overlapping intervals?**

**Answer:** Sort intervals by start time, then scan from left to right. Extend the current interval when the next one overlaps; otherwise, emit the current interval and start a new one.

**Q4. Why must interval endpoint conventions be explicit?**

**Answer:** Whether intervals are closed or half-open changes whether intervals touching at an endpoint overlap. State the convention and use it consistently in comparisons, especially for scheduling and range queries.

### Practical and Advanced

**Q5. How can a difference array support range updates?**

**Answer:** For an update adding a value to a range, record the value at the range start and its inverse just after the range end. A prefix scan reconstructs the final values, making many range updates efficient when all updates can be applied before querying individual positions.

**Q6. When are prefix sums insufficient for range-query problems?**

**Answer:** They do not efficiently support arbitrary point updates when many queries follow, because an update can affect many later prefix values. A Fenwick tree or segment tree is more appropriate when updates and queries are interleaved.
