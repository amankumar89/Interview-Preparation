# Algorithms — 09 Backtracking

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is backtracking?**

**Answer:** Backtracking explores candidate solutions incrementally. When a partial choice cannot lead to a valid solution, the algorithm undoes that choice and explores another branch.

**Q2. What are the common parts of a backtracking algorithm?**

**Answer:** Define the current state, the choices available, a condition for a complete solution, and a validity or pruning check. Recursively explore a choice, then restore the state before trying the next choice.

### Intermediate

**Q3. How does backtracking differ from brute-force enumeration?**

**Answer:** Both may explore many candidates, but backtracking checks partial candidates and prunes a branch as soon as it cannot produce a valid result. Poor pruning can still leave exponential runtime.

**Q4. How do you avoid accidental state sharing between recursive branches?**

**Answer:** Either create a new state for each branch or carefully undo every mutation after the recursive call. Missing an undo step can cause one branch's choices to leak into another.

### Practical and Advanced

**Q5. How would you use backtracking to generate all subsets of a set?**

**Answer:** For each item, branch into including or excluding it, and record the current selection when all items have been considered. This generates $2^n$ subsets, so the output itself is exponential.

**Q6. What techniques can reduce the search space in a constraint problem?**

**Answer:** Choose the most constrained variable first, reject invalid partial states early, order promising choices first, and use bounds when searching for an optimum. These techniques improve practical performance but do not always change worst-case complexity.
