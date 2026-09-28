# Agentic-AI — 06 Security and Guardrails

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is prompt injection in an AI agent?**

**Answer:** Prompt injection is an attempt to make a model follow malicious or conflicting instructions embedded in user input or retrieved content. It is especially consequential for agents that can use tools or access sensitive data.

**Q2. Why should retrieved documents be treated as untrusted input?**

**Answer:** A document can contain instructions intended to manipulate the model, even if it came from a normally trusted knowledge source. Retrieved text should be treated as data, and the agent must not let it grant permissions or override authorization policy.

### Intermediate

**Q3. Why are system prompts alone insufficient as a security boundary?**

**Answer:** Model instructions are probabilistic and can be confused or overridden by adversarial content. Enforce permissions, validation, and data access in deterministic application code rather than relying on the model to police itself.

**Q4. What is least privilege for an agent's tools?**

**Answer:** Give each tool and agent only the narrow permissions needed for its task. Separate read and write capabilities, scope access to the current user or tenant, and avoid exposing broad credentials to model-controlled workflows.

### Practical and Production

**Q5. How should a high-impact tool action be guarded?**

**Answer:** Validate the proposed action against application policy, require explicit human approval when appropriate, and use an auditable execution path with bounded inputs and clear confirmation. Do not let the model directly execute arbitrary code or unrestricted commands.

**Q6. How would you test an agent for prompt-injection risks?**

**Answer:** Include adversarial user inputs and malicious instructions embedded in retrieved content, then verify that the agent respects access controls and refuses unauthorized tool actions. Test both model responses and the enforcement behavior of the surrounding application.

**Q7. What sensitive data should be considered in an AI agent's logs and traces?**

**Answer:** Prompts, retrieved passages, tool arguments, and outputs can contain personal, confidential, or credential data. Minimize collection, redact or restrict sensitive fields, define retention limits, and ensure observability access follows the same security boundaries as the application.
