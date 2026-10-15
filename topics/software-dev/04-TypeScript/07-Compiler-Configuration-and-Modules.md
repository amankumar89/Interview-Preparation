# TypeScript — 07 Compiler Configuration and Modules

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the role of `tsconfig.json`?

**Interview Answer:**

`tsconfig.json` configures TypeScript's compiler and project rules. It defines the target JavaScript version, module system, strictness, include/exclude patterns, and output settings.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true
  }
}
```

### Q2. What is the difference between `target` and `module`?

`target` controls the syntax and runtime compatibility of the emitted JavaScript. `module` controls how ES module syntax is converted or emitted, such as `ESNext`, `CommonJS`, or `NodeNext`.

### Q3. What does `strict` enable?

`strict` enables a bundle of stricter checks, including `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, and several others. It is a strong default for production-grade code.

### Q4. What is `moduleResolution`?

It tells TypeScript how to resolve module import paths, such as `node`, `classic`, or `bundler`. This affects whether project imports work correctly and how path aliases are interpreted.

### Q5. What is the purpose of `include` and `exclude` in `tsconfig.json`?

These control which files belong to the TypeScript project and which are ignored or excluded from compilation.

```json
{
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Q6. What is `noEmit` used for?

`noEmit` tells TypeScript to type-check without writing `.js` output. It is useful in editor tooling, CI checks, and verifying code without compiling artifacts.

### Q7. What is the difference between a regular import and a type-only import?

A regular import is included in emitted JavaScript. A type-only import is erased after compilation and helps avoid runtime dependencies.

```ts
import type { User } from "./types";
import { formatUser } from "./utils";
```

### Q8. What is a barrel file?

A barrel file re-exports modules from a directory, making imports cleaner and easier to centralize.

```ts
export * from "./user";
export * from "./settings";
```

### Q9. Why are path aliases useful?

Path aliases let you use cleaner imports like `@/components/Button` instead of relative paths such as `../../../components/Button`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Q10. What problem can occur with path aliases in a real project?

TypeScript may resolve correctly, but the bundler or runtime may not know the alias unless it is configured separately. This often causes confusion in tests, Node.js, and build pipelines.

## Intermediate Concepts

### Q11. What is `esModuleInterop` and why is it used?

It improves interoperability between CommonJS and ES module syntax, especially when consuming packages that were written for CommonJS style `require` exports.

### Q12. What does `declaration` do?

It emits declaration files (`.d.ts`) for library code so consumers get type definitions.

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

### Q13. What is `allowJs`?

`allowJs` allows JavaScript files to be included in a TypeScript project, which is useful when gradually migrating a JS project to TS.

### Q14. How does `outDir` affect compilation?

`outDir` writes the compiled JavaScript to a target folder rather than placing it next to the source files.

### Q15. What is the difference between CommonJS and ES modules in TypeScript?

CommonJS uses `require`/`module.exports`, while ES modules use `import`/`export`. TypeScript can compile to either depending on project settings and target runtime.

### Q16. Why does module resolution matter in monorepos?

Monorepos often have workspace packages and shared source directories. Correct module resolution ensures imports point to the right local package and avoids hidden runtime bugs.

## Advanced and Production

### Q17. What is a common issue when mixing TypeScript and runtime bundlers?

The compiler and the runtime may resolve modules differently. If path aliases, package exports, or extension resolution differ, a project can type-check but fail at runtime.

### Q18. How do you make TypeScript configuration production-safe?

Use a standard `tsconfig`, enforce `strict`, align compiler options with the runtime and bundler, and validate builds in CI. Treat configuration as part of deployment correctness, not just local development comfort.
