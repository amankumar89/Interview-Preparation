# AI System Design

**AI system design** applies software architecture principles to systems that use LLMs, retrieval, tools, memory, and agents. A good design balances correctness, latency, cost, reliability, security, scalability, and operational complexity.

## AI System Components

A production AI application commonly contains:

```text
Client
  ↓
API / Application Layer
  ↓
Agent Orchestrator
  ├── LLM
  ├── RAG
  ├── Tools
  ├── Memory
  └── Guardrails
  ↓
External Systems
```

Not every application needs every component.

## Requirements

Start system design with requirements.

Functional requirements might include:

- Answer questions.
- Search company documents.
- Create tickets.
- Summarize conversations.

Non-functional requirements might include:

- Response latency.
- Availability.
- Security.
- Cost limits.
- Auditability.
- Data retention.

AI-specific requirements include:

- Groundedness.
- Tool correctness.
- Model fallback behavior.
- Evaluation coverage.

## Request Flow

A typical RAG agent request might look like:

```text
User request
    ↓
Authentication
    ↓
Intent / task handling
    ↓
Memory retrieval
    ↓
Knowledge retrieval
    ↓
LLM reasoning
    ↓
Tool calls if required
    ↓
Validation / guardrails
    ↓
Final response
```

The exact order depends on the application.

## Model Selection

Model selection should consider:

- Capability.
- Latency.
- Cost.
- Context size.
- Structured output support.
- Tool-use quality.
- Reliability.
- Privacy requirements.

A useful architecture can route different tasks to different models:

```text
Simple classification → small model
Complex reasoning → stronger model
Embeddings → embedding model
Reranking → reranker
```

## RAG Architecture

A scalable RAG system often separates indexing from querying.

```text
            INDEXING
Documents → Parse → Chunk → Embed → Vector DB

             QUERY
Question → Embed → Retrieve → Rerank → LLM
```

The ingestion pipeline may run asynchronously, while query serving needs to be optimized for latency.

## Tool Architecture

Avoid exposing raw infrastructure directly to the model.

Prefer:

```text
Agent
 ↓
Typed application tool
 ↓
Authorization
 ↓
Business service
 ↓
Database / external API
```

This keeps business rules in deterministic application code.

## Reliability

AI systems are probabilistic, so reliability requires multiple layers.

Examples:

```text
Input validation
      ↓
Model
      ↓
Retrieval validation
      ↓
Tool authorization
      ↓
Output validation
      ↓
Fallback / retry
```

Retries should be selective. Blindly retrying a state-changing operation can create duplicate side effects.

## Latency

Latency can come from:

- LLM calls.
- Embedding calls.
- Vector search.
- Reranking.
- Tool APIs.
- Sequential agent steps.

Parallelizing independent operations can reduce latency:

```text
              ┌── Memory retrieval ──┐
Request ──────┼── Document retrieval ┼→ Context
              └── User profile ──────┘
```

Streaming can improve perceived responsiveness even when total execution time remains similar.

## Cost

AI cost is influenced by:

```text
input tokens
+ output tokens
+ number of model calls
+ embedding operations
+ tool/API costs
```

Cost controls include:

- Prompt optimization.
- Context filtering.
- Caching.
- Smaller models for simple tasks.
- Fewer unnecessary agent iterations.
- Batch processing where appropriate.

## Caching

Potential cache targets include:

- Embeddings.
- Retrieval results.
- Deterministic tool responses.
- Frequently requested model outputs.

Caching must respect data freshness and authorization boundaries.

## Observability

Production systems should capture useful traces and metrics.

Examples:

```text
request_id
model
latency
token usage
retrieved documents
tool calls
tool failures
final status
```

Observability enables debugging and evaluation.

## Scalability

Scale individual components independently where possible:

```text
API servers
    ↓
Agent workers
    ↓
Model provider
    ↓
Vector database
    ↓
Tool services
```

Asynchronous queues are useful for long-running workflows.

## Key Takeaways

- AI system design combines traditional architecture with probabilistic model behavior.
- Requirements should include AI-specific concerns such as groundedness and tool correctness.
- Keep authorization and business rules in deterministic application code.
- Latency and cost grow with model calls, context size, and agent iterations.
- Reliability requires validation, guardrails, fallbacks, and observability.
- RAG indexing and query serving should be designed as separate workloads.
- Scale and monitor each major subsystem independently.

## Practice Questions

1. Design a production architecture for an internal company RAG assistant.
2. Where should authorization happen in an agentic system?
3. What factors determine LLM latency and cost?
4. How would you make a multi-step agent workflow resilient to tool failures?
5. Which components would you cache in a high-traffic AI application?
