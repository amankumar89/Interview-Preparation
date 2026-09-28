# TypeScript — 01 Basics

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is TypeScript, and why is it used?

**Interview Answer:**

TypeScript is a superset of JavaScript that adds static types, better tooling, and safer refactoring. It helps developers catch errors earlier in development, especially in larger codebases and production systems.

```ts
const userId: number = 42;
const name: string = "Aman";
```

### Q2. How is TypeScript different from JavaScript?

**Interview Answer:**

JavaScript is dynamic and runtime-checked. TypeScript is compiled to JavaScript and performs type checking before runtime, giving better IDE support and fewer common bugs.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### Q3. What is the role of the TypeScript compiler?

**Interview Answer:**

The TypeScript compiler (`tsc`) checks code for type errors and transpiles TypeScript into JavaScript according to configuration settings such as `target`, `module`, and `strict`.

```bash
tsc app.ts
```

### Q4. What does static typing mean?

Static typing means variable types are known at compile time, so the compiler can warn on invalid operations before the code runs.

```ts
let count: number = 10;
count = "ten"; // Type error
```

### Q5. What is type inference?

Type inference allows TypeScript to infer a variable's type from its initializer without explicit annotations.

```ts
const value = 5;
// TypeScript infers number
```

### Q6. What is the difference between `any`, `unknown`, and `never`?

`any` disables type checking, `unknown` requires a type check before use, and `never` represents values that never occur.

```ts
let x: any = "hello";
let y: unknown = 42;

if (typeof y === "number") {
  console.log(y + 1);
}
```

### Q7. What is the `strict` mode in TypeScript?

**Interview Answer:**

`strict` enables a set of stronger checks, including strict null checks, exact property checks, and more precise function typing. It is highly recommended for production-grade projects.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Q8. Why is TypeScript useful in large teams?

It gives stronger contracts between developers, improves editor autocomplete, reduces refactoring risk, and makes API boundaries clearer.

### Q9. What is the difference between compile-time errors and runtime errors?

Compile-time errors are caught by TypeScript during type checking. Runtime errors happen when the JavaScript is executed in the browser or Node.js.

### Q10. What is transpilation?

Transpilation converts TypeScript source into JavaScript that can run in the target environment. This includes shrinking or adjusting syntax depending on the configured JavaScript version.

## Practical Questions

### Q11. How do you declare a variable with a type annotation?

```ts
const username: string = "Aman";
const isLoggedIn: boolean = true;
```

### Q12. What happens if you use a variable before assignment in TypeScript?

TypeScript may flag it depending on strict checks and control flow analysis.

```ts
let value: number;
console.log(value); // Possibly used before assignment
```

### Q13. Why does TypeScript not eliminate all runtime bugs?

Because types do not exist at runtime. TypeScript helps catch invalid logic earlier, but runtime validations are still necessary for user input, API data, and external systems.

### Q14. What is the `tsconfig.json` file used for?

It configures compiler behavior, includes or excludes files, and defines project settings like target, module system, strictness, and output directory.

### Q15. Why is TypeScript preferred for frontend and backend codebases?

It provides shared types across layers, improves maintainability, and supports refactoring with confidence across large application architectures.

### Q16. What are common beginner mistakes in TypeScript?

Common mistakes include overusing `any`, forgetting strict null checks, ignoring compile errors, and assuming type safety replaces runtime validation.

### Q17. What is the difference between JavaScript and TypeScript in production?

JavaScript is more flexible and faster to bootstrap. TypeScript adds friction at compile time but reduces defects, improves onboarding, and helps maintain large systems.

### Q18. What is the most important mindset when adopting TypeScript?

Treat types as documentation and guardrails, not as a burden. Good types make code easier to understand and safer to evolve over time.
