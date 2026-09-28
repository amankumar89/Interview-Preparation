# Core-Java — 04 Arrays

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is an array in Java?

**Interview Answer:**
An array is a fixed-size collection of elements of the same type. It stores values in contiguous memory and provides indexed access.

**Detailed Explanation:**
Arrays are useful when the number of elements is known in advance and random access is required. They are highly efficient for numeric data and simple data structures, but they do not grow dynamically.

### Q2. How do you declare and initialize an array?

**Example:**

```java
int[] numbers = {1, 2, 3, 4};
String[] names = new String[5];
```

**Answer:**
You can initialize arrays with literals or by specifying a fixed length and later assigning elements. Access is done using an index starting from zero.

### Q3. What is the difference between a single-dimensional and multi-dimensional array?

**Interview Answer:**
A single-dimensional array is a list, while a multi-dimensional array is an array of arrays, such as a matrix.

**Detailed Explanation:**
In Java, a 2D array is an array where each element is itself an array. This is useful for games, grids, and tabular data. Multi-dimensional arrays can be jagged if each row has a different length.

### Q4. What is a jagged array?

**Interview Answer:**
A jagged array is a 2D array whose rows may have different lengths.

**Detailed Explanation:**
This is useful when each row stores a different number of values, such as uneven data sets or triangular matrices. It provides flexibility but must be handled carefully in loops.

### Q5. What happens if you access an invalid array index?

**Interview Answer:**
Java throws `ArrayIndexOutOfBoundsException` when the index is outside the valid range.

**Detailed Explanation:**
This is one of the most common runtime errors in Java loops. Always validate index ranges before accessing elements, especially when processing user input or external data.

### Q6. What are common array operations?

**Interview Answer:**
Common operations include traversal, searching, sorting, insertion, deletion, and transformation. Arrays are often used with loops for these tasks.

**Detailed Explanation:**
Because arrays have fixed size, insertion and deletion are often costly compared to `List` implementations. Sorting can be done with `Arrays.sort()`, and searching can use binary search for sorted arrays.

### Q7. What is the `Arrays` utility class?

**Interview Answer:**
`Arrays` provides static methods for sorting, searching, comparing, filling, and converting arrays.

**Detailed Explanation:**
This utility class saves boilerplate and helps maintain consistent code. Example: `Arrays.sort(numbers)`, `Arrays.binarySearch(numbers, target)`, and `Arrays.fill(array, value)`.

### Q8. How do arrays compare to `ArrayList`?

**Interview Answer:**
Arrays are fixed-size and faster for primitive data or highly predictable workloads. `ArrayList` is dynamic and more flexible for general-purpose collections.

**Detailed Explanation:**
Use arrays when performance and memory predictability matter most. Use `ArrayList` when you need dynamic resizing, more built-in methods, or easier collection operations.

### Q9. What is `ArrayList` under the hood?

**Interview Answer:**
`ArrayList` wraps a resizable array and grows automatically when capacity is exceeded.

**Detailed Explanation:**
This makes it easier to work with dynamic data than a raw array, but it also means extra growth logic and possible reallocation when the list expands. Understanding this helps explain performance trade-offs.

### Q10. What is a common array bug in production?

**Answer:**
Common bugs include off-by-one errors, using uninitialized values, forgetting to check bounds, and sorting arrays incorrectly. These issues often appear in loops and indexing logic.

## Practical Questions

### Q11. How do you copy an array safely?

**Answer:**
Use `System.arraycopy()` or `Arrays.copyOf()`. These methods are safer and clearer than manually iterating in many cases.

### Q12. When should you avoid arrays in Java?

**Answer:**
Avoid arrays when your data size is dynamic, when you need frequent insertion/deletion, or when collection APIs like `List`, `Set`, and `Map` provide more convenient semantics and lower development risk.
