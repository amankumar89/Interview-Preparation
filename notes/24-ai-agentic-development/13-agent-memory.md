# Agent Memory

**Agent memory** allows an AI agent to retain and use information across interactions or within a task. Memory can improve personalization, continuity, and long-running workflows, but it also introduces problems involving relevance, privacy, correctness, and stale information.

## Why Agents Need Memory

Without memory, an agent may treat each interaction as isolated:

```text
Conversation 1 → Agent
Conversation 2 → Agent
```

With memory:

```text
Conversation
     ↓
Memory system
     ↓
Relevant memories
     ↓
Future agent context
```

Memory is especially useful for long-running tasks where important information cannot fit naturally into every prompt.

## Short-Term Memory

**Short-term memory** is information available within the current interaction or task.

It may include:

- Recent messages.
- Current goals.
- Tool results.
- Intermediate reasoning state.
- Temporary variables.
- Current task status.

For example:

```text
User: "Find flights to Delhi."
Agent: "What date?"
User: "Friday."
```

The agent needs the earlier destination while processing the later message.

## Long-Term Memory

**Long-term memory** persists beyond the immediate interaction.

Examples include:

```text
User prefers concise explanations.
Project uses PostgreSQL.
Customer's account tier is Enterprise.
```

Long-term memory should only store information that is useful, appropriate, and safe to retain.

## Memory Types

A useful conceptual classification is:

**Semantic memory** stores facts.

```text
"The project uses Java 21."
```

**Episodic memory** stores events or past interactions.

```text
"The user previously chose PostgreSQL for the project."
```

**Procedural memory** stores learned procedures or preferences for how tasks should be performed.

```text
"Deployments require the staging environment to pass tests first."
```

These categories can be implemented using different storage mechanisms.

## Memory Storage

Memory can be stored in:

- Relational databases.
- Document databases.
- Key-value stores.
- Vector databases.
- Specialized memory services.

A memory record might look like:

```json
{
  "content": "The application uses PostgreSQL.",
  "type": "semantic",
  "source": "project-conversation",
  "created_at": "2026-09-10T10:00:00Z"
}
```

Metadata helps with filtering, expiration, provenance, and retrieval.

## Memory Retrieval

Storing everything is not enough. The agent must retrieve relevant memories.

A common approach is:

```text
Current query
    ↓
Memory retrieval
    ↓
Relevant memories
    ↓
Context assembly
    ↓
LLM
```

Retrieval can use:

- Semantic similarity.
- Keyword matching.
- Metadata filtering.
- Recency.
- Importance.
- User or project scope.

A scoring approach might conceptually combine these factors:

```text
score =
  relevance
  + importance
  + recency
  + scope match
```

## Memory Write Policies

Agents should not automatically remember every statement.

A memory policy can ask:

```text
Is this information useful later?
Is it stable?
Is it appropriate to store?
Does the user expect it to persist?
Is there a source or confidence level?
```

This reduces noisy or incorrect memories.

## Memory Updating and Forgetting

Memories can become stale.

For example:

```text
Old:
"Project uses PostgreSQL."

Later:
"Project migrated to MySQL."
```

The memory system needs an update strategy.

Possible approaches include:

- Versioning.
- Replacement.
- Expiration.
- Confidence decay.
- Explicit correction.
- Source-based invalidation.

A robust system should avoid blindly keeping contradictory memories.

## Memory and Privacy

Memory creates additional privacy considerations because information may persist beyond the original conversation.

Systems should define:

- What can be stored.
- How long it is retained.
- Who can access it.
- How it can be corrected.
- How it can be deleted.
- How sensitive information is handled.

Memory should be scoped carefully so one user's information cannot leak into another user's context.

## Memory vs RAG

Memory and RAG are related but serve different purposes.

```text
RAG:
Retrieve external knowledge relevant to a question.

Memory:
Retrieve information about prior interactions, state, preferences, or learned context.
```

An agent can use both:

```text
User request
   ├── Memory retrieval
   └── Knowledge retrieval
            ↓
       Context assembly
            ↓
           LLM
```

## Key Takeaways

- Agent memory provides continuity across interactions or within long tasks.
- Short-term memory handles current context; long-term memory persists useful information.
- Semantic, episodic, and procedural memory represent different kinds of information.
- Memory retrieval is as important as memory storage.
- Agents need policies for writing, updating, and forgetting memories.
- Memory introduces privacy, access-control, and stale-information risks.
- Memory and RAG can be combined but solve different problems.

## Practice Questions

1. What is the difference between short-term and long-term agent memory?
2. Give one example of semantic memory and one of episodic memory.
3. Why should an agent avoid storing every user message as a memory?
4. How should a system handle a memory that becomes outdated?
5. How is agent memory different from RAG?
