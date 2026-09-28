# Algorithms — 10 Greedy Algorithms

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is a greedy algorithm?**

**Answer:** A greedy algorithm repeatedly makes a locally preferred choice and does not revisit earlier choices. It is correct only when the problem has properties that make those local choices part of a global optimum.

**Q2. Why is a locally optimal choice not always globally optimal?**

**Answer:** A choice that looks best in isolation may block a combination of later choices with a better total result. Greedy correctness must be proved for the specific problem rather than inferred from a few examples.

### Intermediate

**Q3. How can you prove a greedy strategy is correct?**

**Answer:** Common approaches include an exchange argument, a cut property, or showing that an optimal solution can be transformed to include the greedy choice without making it worse. Then show the remaining problem has the same structure.

**Q4. What is the greedy-choice property?**

**Answer:** It means some globally optimal solution begins with a locally optimal choice made by the algorithm. Together with optimal substructure, it supports solving the remaining problem recursively or iteratively.

### Practical and Advanced

**Q5. How does interval scheduling use a greedy strategy?**

**Answer:** To maximize the number of non-overlapping intervals, sort by finishing time and repeatedly choose the next compatible interval with the earliest finish. The earliest finish leaves the most room for later intervals, and an exchange argument proves the choice is safe.

**Q6. How do you decide whether a problem may need dynamic programming instead of a greedy algorithm?**

**Answer:** Look for decisions whose consequences depend on combinations of earlier choices and for cases where a locally best option blocks a better total solution. Try to prove the greedy choice; if it fails, model states and transitions with dynamic programming or another search method.
