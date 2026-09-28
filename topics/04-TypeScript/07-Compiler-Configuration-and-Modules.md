# TypeScript — 07 Compiler Configuration and Modules

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is the role of `tsconfig.json`?**

**Answer:** It defines how the TypeScript compiler checks and emits a project. It can specify the target JavaScript version, module system, strictness, input files, path aliases, and output directory.

**Q2. What is the difference between `target` and `module`?**

**Answer:** `target` controls the JavaScript language features emitted by TypeScript. `module` controls how imports and exports are represented, for example as ES modules or CommonJS.

### Intermediate

**Q3. What does `strict` enable, and why is it useful?**

**Answer:** `strict` enables a group of stronger type checks, including strict null checking and stricter function type checks. It catches more errors during development, though adopting it in a legacy project may require staged migration.

**Q4. How do TypeScript module resolution and runtime module loading differ?**

**Answer:** TypeScript resolves imports while checking and compiling, using settings such as `moduleResolution`, package metadata, and file extensions. The runtime or bundler then has its own rules for loading the emitted imports; successful type-checking does not guarantee that runtime resolution will succeed.

### Practical and Advanced

**Q5. When would you use `paths` in `tsconfig.json`, and what is a common pitfall?**

**Answer:** `paths` can provide stable aliases for imports and simplify large project structures. It informs TypeScript's resolver but does not automatically configure Node.js or a bundler, so runtime and test tooling must be configured consistently.

**Q6. What is the difference between a type-only import and a regular import?**

**Answer:** `import type` is used only by the type checker and is erased from emitted JavaScript. A regular import may remain at runtime, so using type-only imports can avoid unnecessary runtime dependencies and help prevent module cycles.
