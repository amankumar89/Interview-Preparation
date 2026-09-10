# Agentic Workflows

**Agentic workflows** are software workflows in which an AI system can make decisions, use tools, observe results, and continue taking actions toward a goal. They combine language-model reasoning with application logic, tools, state, and feedback mechanisms.

## Workflow vs Agent

A deterministic workflow follows predefined steps:

```text
Input
  ↓
Step A
  ↓
Step B
  ↓
Step C
  ↓
Output
```

An agentic workflow can dynamically decide the next action:

```text
Goal
  ↓
Decide
  ↓
Use Tool
  ↓
Observe Result
  ↓
Decide Again
  ↓
Complete
```

The key difference is that the agent can select actions based on intermediate results.

## Components of an Agentic Workflow

A typical agentic system contains:

- **Model** — generates decisions or actions.
- **Instructions** — define behavior and constraints.
- **Tools** — allow interaction with external systems.
- **Context** — provides relevant information.
- **State** — stores information about the current task.
- **Guardrails** — restrict unsafe behavior.
- **Evaluation** — determines whether the task succeeded.
- **Observability** — records what happened.

## Tool-Based Workflows

Tools allow agents to interact with systems.

Examples:

```text
Agent
 ├── Search tool
 ├── Database tool
 ├── File tool
 ├── REST API tool
 └── Code execution tool
```

A tool should have a clear purpose and validated input.

For example, instead of giving an agent unrestricted database access, expose:

```text
getCustomerById(customerId)
```

rather than:

```text
executeArbitrarySQL(sql)
```

The narrower tool provides a safer boundary.

## Planning

Agents can plan before execution.

A plan might be:

```text
1. Inspect the existing authentication implementation.
2. Identify the refresh-token flow.
3. Locate related tests.
4. Implement the required change.
5. Run tests.
6. Fix failures.
7. Review the final diff.
```

Planning can improve complex tasks but can also add latency and unnecessary reasoning for simple operations.

## Human-in-the-Loop

A **human-in-the-loop** workflow requires human approval for selected actions.

For example:

```text
Agent proposes production database migration
              ↓
        Human approval
              ↓
        Execute migration
```

Human approval is particularly useful for:

- Destructive actions.
- Financial transactions.
- Production deployments.
- Security changes.
- Irreversible operations.

## Deterministic and Agentic Combination

Production systems often combine both approaches.

For example:

```text
Agent decides which support ticket to investigate
              ↓
Deterministic validation
              ↓
Agent analyzes ticket
              ↓
Deterministic authorization
              ↓
Agent proposes response
              ↓
Human approval
```

This allows flexible reasoning while keeping critical controls deterministic.

## Key Takeaways

- Agentic workflows allow AI systems to dynamically choose actions toward a goal.
- Tools provide agents with capabilities outside text generation.
- State, guardrails, evaluation, and observability are important production components.
- Deterministic workflows are often preferable for predictable operations.
- Human approval is valuable for high-impact or irreversible actions.
- Production systems commonly combine deterministic logic with agentic behavior.

## Practice Questions

1. What is an agentic workflow?
2. How is an agentic workflow different from a deterministic workflow?
3. What components are commonly found in an agentic system?
4. Why should tools have narrow responsibilities?
5. When should human approval be required?
6. Design an agentic workflow for handling customer support tickets.