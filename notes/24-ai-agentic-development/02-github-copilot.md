# GitHub Copilot

**GitHub Copilot** is an AI-powered development assistant that helps developers write, understand, modify, test, and document software. It uses the context available from the development environment and repository to generate suggestions and assist with development tasks.

## Code Completion

Copilot can provide inline suggestions while a developer writes code.

For example:

```java
public Optional<User> findUserByEmail(String email) {
    return userRepository
        // Copilot can suggest the remaining implementation
}
```

The developer can accept, reject, or modify the suggestion.

Code completion is useful for:

- Boilerplate.
- Getters and setters.
- Mapping code.
- API clients.
- Repetitive transformations.
- Common framework patterns.

## Copilot Chat

**Copilot Chat** allows developers to interact with an AI assistant using natural language.

Typical requests include:

```text
Explain this class.
```

```text
Find potential bugs in this method.
```

```text
Generate unit tests for this service.
```

```text
Convert this JavaScript component to TypeScript.
```

Chat is useful when the developer needs explanation, suggestions, or generated code rather than inline completion.

## Repository Context

AI output becomes more useful when the model has relevant project context.

Useful context includes:

- Source files.
- Interfaces.
- Tests.
- Configuration.
- Project documentation.
- Existing architecture.
- Error messages.
- Coding conventions.

For example, asking:

```text
Add authentication.
```

is less precise than:

```text
Add JWT authentication to the existing Spring Boot application.
Use the current security configuration and preserve the existing
authentication response format. Add tests for invalid and expired tokens.
```

## Repository Instructions

A repository can define instructions for AI coding tools.

Instructions can describe:

- Project architecture.
- Naming conventions.
- Testing commands.
- Important directories.
- API conventions.
- Security requirements.
- Framework versions.
- Rules about generated files.

This reduces repeated prompting and helps AI-generated changes remain consistent with the project.

## Copilot for Code Explanation

Copilot can explain unfamiliar code.

A developer can ask:

```text
Explain this React component.
Identify its state, props, side effects, and API dependencies.
```

The explanation can help developers understand existing systems before modifying them.

## Copilot for Testing

Copilot can generate tests for:

- Java methods.
- Spring Boot controllers.
- React components.
- TypeScript utilities.
- REST APIs.

A good request includes expected behavior:

```text
Generate JUnit 5 tests for this service.
Cover successful creation, duplicate email,
validation failure, and database exception handling.
```

## Copilot for Refactoring

Copilot can suggest refactoring improvements such as:

- Extracting reusable functions.
- Simplifying conditions.
- Removing duplication.
- Improving types.
- Improving naming.
- Splitting large classes.

Refactoring should preserve behavior unless a behavior change is explicitly requested.

## Copilot and Developer Responsibility

Copilot output should be treated as a suggestion.

Before accepting generated code, check:

- Does it compile?
- Does it follow project conventions?
- Does it satisfy the requirement?
- Does it introduce vulnerabilities?
- Does it handle edge cases?
- Are tests sufficient?
- Does it modify unnecessary files?

## Key Takeaways

- GitHub Copilot assists developers with code generation and understanding.
- Copilot can work through inline suggestions and conversational interactions.
- Good repository context improves AI-generated results.
- Repository instructions help enforce project-specific conventions.
- Copilot-generated code must be reviewed and tested.
- AI assistance does not remove developer responsibility.

## Practice Questions

1. What is GitHub Copilot?
2. How does Copilot Chat differ from inline code completion?
3. Why is repository context important for Copilot?
4. What should a repository instruction file contain?
5. How would you use Copilot to generate tests for a Spring Boot service?
6. What checks should a developer perform before accepting Copilot-generated code?