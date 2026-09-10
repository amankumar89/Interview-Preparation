# AI Agentic Interview Questions

Agentic AI interviews test whether you understand how LLMs, retrieval, tools, memory, security, evaluation, and system architecture work together. Strong answers should explain not only definitions but also design trade-offs and failure modes.

## LLM Fundamentals Questions

1. **What is an LLM?**

An LLM is a neural network trained on large amounts of tokenized data to model language and generate sequences of tokens.

2. **What is a transformer?**

A transformer is a neural network architecture that uses attention mechanisms and feed-forward layers to process sequences and model relationships between tokens.

3. **What is a token?**

A token is a unit of text processed by a language model. It can represent a word, part of a word, punctuation, or another text fragment.

4. **Why do LLMs hallucinate?**

Because generation optimizes for likely continuations rather than guaranteeing factual truth. Missing context, poor retrieval, ambiguity, and unsupported assumptions can produce incorrect answers.

## RAG Questions

5. **What is RAG?**

RAG retrieves relevant external information and provides it to an LLM as context before generation.

6. **Explain a RAG pipeline.**

```text
Documents → parse → chunk → embed → vector DB

Question → embed → retrieve → rerank → prompt → LLM
```

7. **Why is chunking important?**

Poor chunking can remove context or produce overly broad retrieval results. Chunk size and boundaries directly affect retrieval quality.

8. **What is hybrid search?**

Hybrid search combines semantic vector retrieval with lexical or keyword retrieval to improve coverage for both conceptual and exact-match queries.

## Tool and Function Calling Questions

9. **What is function calling?**

It is a structured mechanism where the model requests a function with arguments, while application code validates and executes the function.

10. **Can an LLM directly execute a function?**

The model can request a tool call, but the application should remain responsible for validating, authorizing, and executing it.

11. **How do you secure agent tools?**

Use authentication, authorization, least privilege, input validation, rate limits, audit logs, timeouts, and stronger approval controls for high-impact actions.

12. **What is idempotency and why does it matter?**

Idempotency ensures repeated requests do not create unintended duplicate effects. It is particularly important for payments, orders, and other state-changing operations.

## MCP Questions

13. **What is MCP?**

MCP is a protocol for connecting AI applications with external tools, resources, and prompts through a standardized interface.

14. **What are the main MCP components?**

The main concepts include hosts, MCP clients, MCP servers, tools, resources, and prompts.

15. **How is MCP different from an API?**

An API exposes application functionality, while MCP standardizes how AI applications can discover and interact with capabilities such as tools and resources. An MCP server may itself call APIs.

## Agent Architecture Questions

16. **What is an AI agent?**

An AI agent is a system that uses a model to interpret goals, decide actions, interact with tools or environments, observe results, and continue until a stopping condition is reached.

17. **What is the agent loop?**

```text
Goal
 ↓
Reason / decide
 ↓
Act
 ↓
Observe
 ↓
Reason again
 ↓
Stop or continue
```

18. **When should you use multiple agents?**

Use multiple agents when specialization, parallelism, or independent permissions provides a clear benefit. Do not add agents merely for architectural complexity.

19. **What is a supervisor agent?**

A supervisor coordinates specialist agents, assigns tasks, evaluates results, and determines when the overall task is complete.

## Memory Questions

20. **What is agent memory?**

Agent memory stores useful information that can be retrieved later to provide continuity, context, or persistent state.

21. **How is memory different from RAG?**

Memory focuses on prior interaction state, preferences, facts, or experiences, while RAG primarily retrieves external knowledge.

22. **What are memory risks?**

Stale information, incorrect memories, cross-user leakage, sensitive-data retention, and prompt injection stored as memory are important risks.

## Evaluation Questions

23. **How do you evaluate an AI agent?**

Measure task success, correctness, groundedness, tool accuracy, safety, latency, cost, robustness, and execution trajectory.

24. **What is LLM-as-a-judge?**

An LLM evaluates another model's output against a rubric. It can scale subjective evaluation but should be validated because judges can be inconsistent or biased.

25. **Why evaluate trajectories?**

An agent may produce a correct final answer while taking unsafe or unauthorized actions internally. Tool calls and intermediate execution behavior can reveal these failures.

## Security Questions

26. **What is prompt injection?**

Prompt injection is an attempt to manipulate model behavior by placing instructions in user input or untrusted content.

27. **What is indirect prompt injection?**

It occurs when malicious instructions originate from external data such as a webpage, document, email, or tool result.

28. **Why is least privilege important for agents?**

Agents can make decisions probabilistically. Limiting their permissions reduces the impact of incorrect or manipulated decisions.

29. **Should an LLM perform authorization?**

No. Authorization must be enforced by deterministic application code or infrastructure independent of the model's generated output.

## System Design Questions

30. **Design a production RAG assistant.**

A strong answer should cover:

```text
Client
 ↓
API + authentication
 ↓
Retrieval service
 ├── Vector DB
 ├── Metadata filters
 └── Reranker
 ↓
LLM
 ↓
Response validation
 ↓
Client
```

Also discuss ingestion, access control, evaluation, observability, caching, latency, and cost.

31. **How would you reduce agent latency?**

Use parallel retrieval where possible, reduce unnecessary model calls, select appropriate models, cache reusable results, stream responses, and avoid excessive agent iterations.

32. **How would you reduce AI cost?**

Reduce unnecessary context and model calls, use smaller models for simple tasks, cache repeated work, optimize retrieval, and impose agent budgets.

33. **How would you handle tool failure?**

Return structured errors, allow controlled retries for safe operations, use fallbacks where appropriate, and stop or escalate when the failure cannot be safely recovered.

## Practical Design Questions

34. Design an AI customer support agent with order lookup and ticket creation.

35. Design a secure SQL agent that can answer analytics questions without allowing destructive database operations.

36. Design a coding agent that can modify a Git repository while preventing unauthorized production changes.

37. Design an agent evaluation framework for a tool-using customer support system.

38. Explain when you would choose RAG, fine-tuning, or both.

## Key Takeaways

- Interview answers should connect concepts to practical system design.
- RAG, tools, memory, and MCP solve different integration problems.
- Agents require deterministic security boundaries around probabilistic model behavior.
- Multi-agent architectures should be justified by specialization or parallelism.
- Evaluation must measure both outcomes and agent trajectories.
- Production AI systems require observability, reliability, cost, latency, and security controls.
- Strong interview answers explain trade-offs rather than only definitions.

## Practice Questions

1. Explain an AI agent to an interviewer who understands traditional backend systems but not LLMs.
2. Design a secure RAG system for an enterprise with multiple tenants.
3. Compare direct API integration, function calling, and MCP.
4. Design a multi-agent coding system and explain its failure modes.
5. How would you evaluate whether an AI agent is safe enough for production?
