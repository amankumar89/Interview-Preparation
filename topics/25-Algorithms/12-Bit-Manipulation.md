# Algorithms — 12 Bit Manipulation

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What do the bitwise AND, OR, and XOR operators do?**

**Answer:** AND produces a set bit only when both input bits are set; OR produces a set bit when either is set; XOR produces a set bit when the input bits differ. They operate on integer bit representations.

**Q2. How can you test whether the $k$th bit of an integer is set?**

**Answer:** Create a mask with `1 << k` and test whether `(value & mask) != 0`. Ensure the shift count and integer width match the language's semantics.

### Intermediate

**Q3. How can you clear the lowest set bit of a positive integer?**

**Answer:** Use `n & (n - 1)`. Subtracting one flips the lowest set bit and the trailing zero bits, so the AND removes that lowest set bit.

**Q4. How can XOR find a unique value when every other value occurs twice?**

**Answer:** XOR all values together. Equal values cancel because `x ^ x` is zero, and XOR with zero preserves the remaining unique value.

### Practical and Advanced

**Q5. How can you count the number of set bits in an integer?**

**Answer:** Repeatedly clear the lowest set bit and count iterations, which takes time proportional to the number of set bits. Many languages also provide a hardware-optimized population-count operation.

**Q6. What portability issues should you consider with bit manipulation?**

**Answer:** Integer width, signed representation, shift behavior, and overflow rules differ across languages. Prefer unsigned or fixed-width types when appropriate, and avoid assuming that a shift by the type width or more has a portable result.
