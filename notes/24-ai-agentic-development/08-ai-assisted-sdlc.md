# AI-Assisted SDLC

**AI-assisted SDLC** means using AI throughout the software development lifecycle, including requirements, design, implementation, testing, code review, deployment, and maintenance. AI can accelerate many activities, but product decisions, architecture, security, and production responsibility remain human responsibilities.

## Requirements

AI can help transform informal requirements into structured engineering artifacts.

For example:

```text
Business requirement:
Users should be able to reset their password.
```

AI can help produce:

```text
User Story:
As a user, I want to reset my password so that I can regain access.

Acceptance Criteria:
- User can request a reset link.
- Reset tokens expire.
- Invalid tokens are rejected.
- Existing passwords remain unchanged until reset succeeds.
```

Developers and product owners must validate the generated requirements.

## System Design

AI can help with:

- API design.
- Database schema ideas.
- Architecture alternatives.
- Sequence diagrams.
- Failure scenarios.
- Technology comparisons.

For example, an AI can compare:

```text
Monolith
vs
Microservices
vs
Modular Monolith
```

The final choice should consider actual system requirements such as scale, team size, operational complexity, latency, and consistency.

## Implementation

AI can assist with:

- Boilerplate.
- Controllers.
- Services.
- DTOs.
- Repositories.
- React components.
- API clients.
- Validation.
- Tests.

A safe implementation workflow is:

```text
Requirement
 ↓
Plan
 ↓
Small Change
 ↓
Test
 ↓
Review Diff
 ↓
Next Change
```

## Code Review

AI can review code for:

- Potential bugs.
- Security problems.
- Missing tests.
- Complexity.
- Error handling.
- Naming.
- Duplication.

For example:

```text
Review this pull request for authentication vulnerabilities.
Focus on authorization, token validation, sensitive-data exposure,
and missing tests.
```

AI review should complement human review.

## CI/CD

AI can help analyze:

- Build failures.
- Test failures.
- Deployment logs.
- Dependency issues.
- Pipeline configuration.

However, production deployment should use appropriate permissions and approval controls.

## Maintenance

AI is useful for:

- Legacy code explanation.
- Refactoring.
- Documentation.
- Migration planning.
- Incident analysis.
- Dependency updates.

For large migrations, changes should be incremental and verified.

## Key Takeaways

- AI can assist throughout the entire software development lifecycle.
- AI can help with requirements, design, implementation, testing, review, and maintenance.
- Architecture decisions require human judgment and system-specific context.
- Automated tests and CI provide objective feedback.
- Production operations require appropriate authorization and safeguards.
- AI assistance should improve engineering speed without removing engineering accountability.

## Practice Questions

1. How can AI help convert business requirements into technical requirements?
2. Which architecture decisions should not be blindly delegated to AI?
3. How can AI assist during code review?
4. How can AI help diagnose CI/CD failures?
5. What safeguards should exist around AI-assisted production deployment?
6. Design an AI-assisted SDLC for a Spring Boot and React application.