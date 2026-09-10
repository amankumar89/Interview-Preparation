# Prompting

**Prompting** is the practice of giving an AI model instructions and context that guide it toward a desired result. Effective prompts make the goal, constraints, relevant information, and expected output clear, which is especially important when using AI for software development.

## Prompt Structure

A useful engineering prompt commonly contains:

```text
Goal:
Context:
Requirements:
Constraints:
Expected Output:
Verification:
```

For example:

```text
Goal:
Add pagination to the book API.

Context:
The application uses Spring Boot and Spring Data JPA.

Requirements:
Support page, size, and sorting parameters.

Constraints:
Do not change existing response fields.

Verification:
Add controller tests and run the existing test suite.
```

## Clear Instructions

Vague prompts create ambiguity.

Weak:

```text
Fix authentication.
```

Better:

```text
Fix the refresh-token flow.
Keep the existing API response structure.
Handle expired and invalid refresh tokens.
Add tests for both cases.
```

The second prompt gives the model a specific target.

## Context Engineering

**Context engineering** is the deliberate selection of information supplied to an AI system so it has enough relevant information to make a good decision.

Useful context can include:

- Relevant source files.
- Interfaces.
- Database schemas.
- Tests.
- Error messages.
- Requirements.
- Architecture rules.
- Existing conventions.

Too little context causes incorrect assumptions. Too much irrelevant context can make it harder to identify the important information.

## Constraints

Constraints tell the model what must not change.

Examples:

```text
Do not change the public API.
Do not introduce a new dependency.
Do not modify the database schema.
Do not disable authentication.
```

Constraints are especially useful for repository-level coding tasks.

## Examples

Providing examples can help when the desired format or behavior is specific.

For example:

```text
Use this DTO naming convention:

CreateUserRequest
UpdateUserRequest
UserResponse

Follow the same pattern for the new Book API.
```

The example gives the model an existing pattern to follow.

## Iterative Prompting

Large tasks are often easier when divided into smaller requests.

Instead of:

```text
Build the entire e-commerce application.
```

Use:

```text
1. Design the product domain.
2. Implement product APIs.
3. Add validation.
4. Add tests.
5. Implement the frontend.
```

Smaller tasks make verification easier.

## Verification Instructions

Prompts should sometimes explicitly require verification.

Example:

```text
Implement the change, run the relevant tests,
inspect the final diff, and report any remaining issues.
```

This encourages the AI to complete the development loop rather than stopping after generating code.

## Key Takeaways

- Good prompts define the goal, context, constraints, output, and verification.
- Context engineering determines what information the AI receives.
- Explicit constraints reduce unwanted changes.
- Examples help the AI follow existing patterns.
- Large coding tasks are safer when divided into smaller verifiable tasks.
- Verification instructions encourage complete development workflows.

## Practice Questions

1. What are the main parts of a good engineering prompt?
2. What is context engineering?
3. Why are constraints useful when prompting coding agents?
4. Rewrite "fix my Spring Boot API" as a precise prompt.
5. Why should large coding tasks be divided into smaller tasks?
6. Write a prompt for adding JWT authentication to an existing application.