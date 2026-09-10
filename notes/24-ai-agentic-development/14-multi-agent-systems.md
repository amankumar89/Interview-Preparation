# Multi-Agent Systems

A **multi-agent system** uses multiple specialized AI agents that collaborate to solve a problem. Instead of asking one general-purpose agent to perform every step, responsibilities can be divided among agents with different goals, tools, or expertise.

## Why Use Multiple Agents

A single agent can become difficult to manage when a workflow contains many independent responsibilities.

For example:

```text
User
 ↓
Manager Agent
 ├── Research Agent
 ├── Coding Agent
 ├── Testing Agent
 └── Documentation Agent
```

Each agent can focus on a narrower task.

Benefits can include:

- Specialization.
- Parallel work.
- Separation of responsibilities.
- Independent tool permissions.
- Easier workflow decomposition.

Multi-agent systems also introduce communication and coordination overhead, so multiple agents are not automatically better.

## Agent Roles

Agents can be specialized by responsibility.

For example:

```text
Planner Agent → creates task plan
Research Agent → gathers information
Implementation Agent → writes code
Review Agent → evaluates output
```

A **supervisor agent** can coordinate the workflow:

```text
Supervisor
    ↓
Assign task
    ↓
Specialist
    ↓
Result
    ↓
Evaluate
    ↓
Next task
```

## Sequential Collaboration

In a sequential architecture, agents operate one after another.

```text
Researcher
    ↓
Writer
    ↓
Reviewer
    ↓
Publisher
```

The output of one agent becomes the input of the next.

This is easy to reason about but can be slower because steps depend on each other.

## Parallel Collaboration

Independent tasks can run concurrently.

```text
              ┌── Research A ──┐
User → Planner ├── Research B ──┼→ Aggregator
              └── Research C ──┘
```

Parallel execution can reduce latency when tasks do not depend on one another.

The system still needs synchronization and conflict handling.

## Supervisor Architecture

A supervisor coordinates specialist agents.

```text
             Supervisor
            /    |                /     |           Research  Coding   Testing
```

The supervisor decides:

- Which agent should act.
- What information to provide.
- When to continue.
- When to retry.
- When the task is complete.

This is useful for dynamic workflows where the required steps are not known in advance.

## Handoff Architecture

In a **handoff** architecture, one agent transfers control to another.

```text
Support Agent
     ↓
Billing Agent
     ↓
Technical Agent
```

Handoffs work well when responsibility naturally changes during a conversation.

## Shared State

Agents often need a shared state object.

For example:

```json
{
  "goal": "Prepare release",
  "research": "...",
  "implementation": "...",
  "tests": "...",
  "status": "review"
}
```

Shared state should have clear ownership rules. Otherwise, multiple agents can overwrite or contradict one another.

## Communication

Agents can communicate through:

- Direct messages.
- Shared state.
- Task queues.
- Event streams.
- Databases.
- Tool calls.

A message should contain enough context for the receiving agent without unnecessarily duplicating the entire history.

## Conflict Resolution

Agents may disagree.

For example:

```text
Security Agent → Reject deployment
Release Agent  → Approve deployment
```

The system needs a policy for resolving conflicts.

Possible approaches:

- Priority rules.
- Human approval.
- Supervisor arbitration.
- Evidence-based review.
- Voting for appropriate tasks.

For high-impact operations, explicit human approval can be safer than automatic arbitration.

## Multi-Agent Failure Modes

Common problems include:

- Agents repeatedly calling each other.
- Infinite loops.
- Duplicate work.
- Conflicting state updates.
- Excessive token usage.
- Tool permission leakage.
- One faulty agent contaminating downstream results.

Systems should use:

```text
max_iterations
timeouts
budgets
validation
logging
```

## When Not to Use Multi-Agent Systems

A multi-agent architecture may be unnecessary when:

- One agent can complete the task reliably.
- Tasks are tightly coupled.
- Coordination costs exceed benefits.
- Debugging complexity is unacceptable.
- Latency is critical.

Start with the simplest architecture that satisfies the requirements.

## Key Takeaways

- Multi-agent systems divide work among specialized agents.
- Sequential workflows are simple but can increase latency.
- Parallel workflows improve throughput for independent tasks.
- Supervisors dynamically coordinate specialist agents.
- Shared state needs explicit ownership and consistency rules.
- Multi-agent systems require limits, validation, and observability.
- Multiple agents should be used when specialization or parallelism provides a real benefit.

## Practice Questions

1. When is a multi-agent architecture preferable to a single agent?
2. Compare sequential and parallel agent collaboration.
3. What responsibilities should a supervisor agent have?
4. How can shared state cause problems in a multi-agent system?
5. Design a multi-agent workflow for reviewing and releasing a software feature.
