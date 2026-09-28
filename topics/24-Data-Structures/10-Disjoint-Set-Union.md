# Data-Structures — 10 Disjoint-Set Union

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What problem does a disjoint-set union (DSU) structure solve?**

**Answer:** DSU maintains a collection of non-overlapping sets and supports finding which set contains an item and merging two sets. It is also called union-find.

**Q2. What are the main DSU operations?**

**Answer:** `find(x)` returns the representative of the set containing `x`, and `union(a, b)` merges the sets containing `a` and `b`. A connectivity query checks whether two elements have the same representative.

### Intermediate

**Q3. What is path compression?**

**Answer:** During `find`, path compression makes visited nodes point closer to the root representative. This flattens the set forest and speeds up later operations.

**Q4. Why combine path compression with union by rank or size?**

**Answer:** Union by rank or size attaches the smaller or shallower tree beneath the larger one, avoiding tall trees. Together with path compression, the amortized time per operation is nearly constant: $O(\alpha(n))$, where $\alpha$ is the inverse Ackermann function.

### Practical and Advanced

**Q5. How can DSU be used to detect a cycle in an undirected graph?**

**Answer:** Process each edge and check whether its endpoints already have the same representative. If they do, the edge connects vertices already connected by another path and creates a cycle; otherwise, union their sets.

**Q6. When is DSU not a good fit for a connectivity problem?**

**Answer:** Standard DSU efficiently handles additions and merges, but it does not naturally support deleting edges or splitting sets. Problems with deletions may need offline processing, rollback DSU, or a different dynamic-connectivity approach.
