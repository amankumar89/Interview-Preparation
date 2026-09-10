# Agent Evaluation

**Agent evaluation** measures whether an AI agent performs its intended tasks reliably, safely, and efficiently. Because agents can reason, retrieve information, call tools, and take multiple steps, evaluating only the final text is often insufficient.

## Why Agent Evaluation Is Difficult

A traditional function may have a deterministic result:

```text
input → function → output
```

An agent may instead produce:

```text
input
 ↓
reason
 ↓
retrieve
 ↓
tool call
 ↓
observe result
 ↓
reason again
 ↓
tool call
 ↓
final answer
```

Many different execution paths can lead to acceptable outcomes.

## Evaluation Dimensions

Important dimensions include:

- **Correctness**: Did the agent produce the right result?
- **Task success**: Did it accomplish the user's goal?
- **Tool accuracy**: Were the correct tools and arguments used?
- **Groundedness**: Is the answer supported by available evidence?
- **Safety**: Did it avoid unsafe or unauthorized actions?
- **Efficiency**: Did it use reasonable tokens, steps, and latency?
- **Robustness**: Does it handle unusual inputs and failures?

## Deterministic Checks

Some properties can be evaluated with ordinary assertions.

For example:

```python
assert response["status"] == "success"
assert response["order_id"] is not None
```

Deterministic checks are useful for:

- JSON schema.
- Required fields.
- Tool arguments.
- HTTP status.
- Database state.
- Permission checks.

## LLM-as-a-Judge

An LLM can evaluate another model's output using a rubric.

Example rubric:

```text
Score from 1–5:
- factual correctness
- relevance
- completeness
- clarity
- policy compliance
```

This can scale evaluation for subjective qualities, but the judge itself can be biased or inconsistent.

Therefore, judge-based evaluation should be calibrated against human judgments and deterministic checks.

## Test Datasets

An evaluation dataset should contain representative tasks.

Example:

```json
{
  "input": "Cancel order 123",
  "expected_behavior": "Verify authorization before cancellation"
}
```

A strong dataset includes:

- Normal cases.
- Edge cases.
- Ambiguous requests.
- Tool failures.
- Permission violations.
- Adversarial inputs.
- Long-context cases.

## Golden Datasets

A **golden dataset** contains carefully reviewed examples with expected outcomes or evaluation criteria.

Golden datasets are useful for regression testing.

When an agent changes:

```text
Old agent → evaluation suite → baseline

New agent → evaluation suite → compare
```

This helps detect regressions before deployment.

## Trajectory Evaluation

For agents, the execution path can be evaluated in addition to the final answer.

For example:

```text
User asks for account data
        ↓
Agent calls get_account()
        ↓
Agent calls unauthorized_export()
```

Even if the final response looks harmless, the tool trajectory reveals a security problem.

Trajectory evaluation can examine:

- Tool sequence.
- Tool arguments.
- Number of calls.
- Failed attempts.
- Recovery behavior.
- Unauthorized actions.

## Online Evaluation

Offline tests happen before deployment.

**Online evaluation** measures behavior in production using appropriate telemetry and safeguards.

Useful metrics include:

```text
task success rate
tool error rate
latency
token usage
human escalation rate
safety violation rate
```

Production evaluation should protect user privacy and avoid collecting unnecessary sensitive data.

## Evaluation and Observability

Evaluation works best with traces.

A trace can record:

```text
Request
  ↓
Agent decision
  ↓
Tool call
  ↓
Tool response
  ↓
Agent decision
  ↓
Final output
```

This makes failures easier to diagnose.

## Regression Testing

Every meaningful change can affect agent behavior.

Changes may include:

- Model version.
- Prompt.
- Tool definitions.
- Retrieval strategy.
- Memory.
- Safety rules.

A regression suite should be rerun after these changes.

## Key Takeaways

- Agent evaluation must consider both final outcomes and execution trajectories.
- Deterministic checks are valuable for structured and safety-critical behavior.
- LLM judges can scale subjective evaluation but require calibration.
- Golden datasets enable regression testing.
- Production metrics reveal failures that offline tests may miss.
- Tracing makes agent failures easier to diagnose.
- Evaluation should measure correctness, safety, efficiency, and robustness.

## Practice Questions

1. Why is evaluating only the final answer insufficient for agents?
2. What should a golden evaluation dataset contain?
3. What are the strengths and weaknesses of LLM-as-a-judge?
4. Give three examples of trajectory-level evaluation.
5. Design an evaluation suite for an agent that can modify production infrastructure.
