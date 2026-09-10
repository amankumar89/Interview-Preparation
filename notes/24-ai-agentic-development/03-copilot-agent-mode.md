# Copilot Agent Mode

**Agent mode** is an agentic development approach in which an AI coding assistant works toward a developer-defined goal by inspecting project context, planning changes, using available tools, modifying files, and evaluating results. Unlike simple code completion, an agent can perform multiple connected actions instead of producing only one isolated code suggestion.

## Agent Mode vs Code Completion

Code completion generally follows:

```text
Developer writes code
        ↓
AI suggests code
        ↓
Developer accepts or rejects
```

An agentic workflow is broader:

```text
Developer Goal
      ↓
Understand Repository
      ↓
Plan Changes
      ↓
Modify Files
      ↓
Run Tools / Tests
      ↓
Observe Results
      ↓
Correct Problems
      ↓
Verify Final Result
```

The agent can therefore participate in a complete development task.

## Agent Planning

A coding agent should first understand the task and identify relevant files.

For example:

```text
Add pagination to GET /api/books.
Preserve the existing response fields.
Use Spring Data Pageable.
Add controller and service tests.
Run the relevant test suite.
```

The agent may need to inspect:

- Controller.
- Service.
- Repository.
- DTO.
- Existing tests.
- Configuration.
- Related API consumers.

Planning reduces unnecessary modifications.

## Tool Use

An agent becomes more useful when it can use tools.

Common tools include:

- File search.
- File reading.
- File editing.
- Terminal commands.
- Test execution.
- Build tools.
- Version-control operations.

The model decides which action is appropriate based on the task and previous results.

## Agent Loop

A common agent loop is:

```text
Goal
 ↓
Plan
 ↓
Act
 ↓
Observe
 ↓
Evaluate
 ↓
Correct
 ↓
Verify
```

For example, an agent may:

1. Inspect an existing service.
2. Modify the implementation.
3. Run tests.
4. Read a compilation error.
5. Correct the code.
6. Run tests again.
7. Inspect the final changes.

## Acceptance Criteria

Agent tasks should have clear acceptance criteria.

Example:

```text
Implement password reset.

Requirements:
- Add forgot-password endpoint.
- Add reset-password endpoint.
- Do not expose whether an email exists.
- Store reset tokens securely.
- Add tests for expired tokens.
- Preserve existing authentication behavior.
```

Acceptance criteria give the agent a measurable target.

## Human Approval

Certain operations should remain under human control.

Examples include:

- Production deployments.
- Destructive database operations.
- Deleting large sets of files.
- Modifying security policies.
- Changing secrets.
- Irreversible data migrations.

An agent should not be given unrestricted authority simply because it can technically execute an action.

## Agent Failure Modes

Agents can:

- Misunderstand requirements.
- Modify unrelated files.
- Introduce unnecessary dependencies.
- Fix symptoms instead of root causes.
- Generate weak tests.
- Assume APIs that do not exist.
- Stop after partial success.

Developer review is therefore essential.

## Key Takeaways

- Agent mode is a goal-oriented coding workflow rather than simple autocomplete.
- Agents can inspect files, modify code, execute tools, and respond to feedback.
- Clear acceptance criteria improve agent performance.
- Tests and build results provide objective feedback to the agent.
- High-impact or irreversible actions should require human approval.
- The final diff must still be reviewed by a developer.

## Practice Questions

1. How does agent mode differ from normal code completion?
2. Explain the plan-act-observe-verify loop.
3. Why are acceptance criteria important for coding agents?
4. Give three operations that should require human approval.
5. What are common failure modes of coding agents?
6. Design an agent task for implementing a new Spring Boot REST endpoint.