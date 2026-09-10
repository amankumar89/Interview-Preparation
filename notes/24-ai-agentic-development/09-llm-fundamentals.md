# LLM Fundamentals

**Large Language Models (LLMs)** are neural networks trained on large amounts of text to predict and generate language. They are the foundation of many modern AI applications, including chat assistants, retrieval-augmented generation, coding agents, and autonomous workflows.

## What an LLM Is

An LLM learns statistical patterns in sequences of tokens. Given a sequence of tokens, the model estimates what token is likely to come next.

The model does not store language as a simple dictionary of facts. Instead, training adjusts billions of numerical parameters so that the network learns relationships among words, concepts, syntax, and patterns of reasoning.

A simplified generation process is:

```text
Prompt → tokenize → neural network → next-token probabilities → token selection → repeat
```

For example:

```text
Input: "The capital of France is"
Likely continuation: "Paris"
```

The same mechanism can generate much more complex responses because the model has learned rich patterns from training data.

## Tokens and Tokenization

A **token** is a unit of text processed by an LLM. A token can be a whole word, part of a word, punctuation, or another text fragment.

For example, a sentence may be split conceptually like this:

```text
"Building AI agents is useful."
→ ["Building", " AI", " agents", " is", " useful", "."]
```

Tokenization matters because model context limits, input costs, and output limits are generally measured in tokens rather than characters or words.

Important implications:

- Longer prompts consume more context.
- Repeated instructions increase token usage.
- Code can tokenize differently from natural language.
- Different languages can have different tokenization efficiency.

## Transformer Architecture

Most modern LLMs are based on the **Transformer** architecture. Transformers process sequences using attention mechanisms rather than relying primarily on sequential recurrence.

A simplified transformer flow is:

```text
Tokens
  ↓
Token embeddings
  ↓
Transformer layers
  ├── Self-attention
  ├── Feed-forward network
  ├── Residual connections
  └── Normalization
  ↓
Output representation
  ↓
Next-token probabilities
```

The transformer architecture allows models to capture relationships between distant parts of a sequence efficiently during training.

## Embeddings

An **embedding** represents an item such as a token as a vector of numbers.

Conceptually:

```text
"Java" → [0.12, -0.41, 0.77, ...]
```

The dimensions encode learned relationships rather than human-readable properties.

Embeddings are useful beyond generation. They are heavily used in semantic search, recommendation systems, clustering, and retrieval-augmented generation.

## Attention

**Self-attention** lets the model determine which tokens in the current context are relevant to one another.

For example:

```text
"The developer put the book on the table because it was heavy."
```

Attention helps the model associate "it" with relevant context based on learned language patterns.

At a high level, attention computes relationships using queries, keys, and values:

```text
Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V
```

Multiple attention heads allow different relationship patterns to be modeled simultaneously.

## Pretraining

**Pretraining** is the large-scale training stage where a model learns general language and world patterns from a large corpus.

A common objective is next-token prediction:

```text
"The server returned a"
→ ["response", "error", "result", ...]
```

The model is trained to assign high probability to the correct continuation.

Pretraining provides broad capabilities, but it does not automatically make a model reliable, safe, or aligned with a particular application's instructions.

## Instruction Tuning and Alignment

After pretraining, models may undergo **instruction tuning** so they respond more effectively to human instructions.

Additional alignment techniques can teach models to:

- Follow user intent.
- Refuse certain requests.
- Produce structured responses.
- Prefer helpful and safe behavior.
- Follow system or developer constraints.

This distinction is important:

```text
Pretraining → general language capability
Instruction tuning → better instruction following
Alignment → behavior preferences and safety constraints
```

## Context Windows

A model's **context window** is the amount of tokenized information it can consider in a request and its conversation context.

The context can include:

- System instructions.
- Developer instructions.
- User messages.
- Previous conversation.
- Retrieved documents.
- Tool results.

A larger context window does not automatically mean perfect recall. Long contexts can still contain irrelevant information, conflicting instructions, or information that the model fails to use effectively.

## Temperature and Sampling

LLMs typically generate text by sampling from a probability distribution over possible next tokens.

**Temperature** controls how sharply or broadly that distribution is sampled.

Conceptually:

```text
Low temperature  → more predictable output
Higher temperature → more varied output
```

For deterministic tasks such as structured extraction, lower randomness is often useful. For creative generation, more variation may be desirable.

Other decoding strategies include top-k and top-p sampling.

## Hallucinations

An **LLM hallucination** occurs when a model produces information that is unsupported, incorrect, or fabricated.

Hallucinations happen because the basic generation objective is to produce likely continuations, not to guarantee factual truth.

Common causes include:

- Missing information.
- Ambiguous prompts.
- Outdated knowledge.
- Pressure to answer despite uncertainty.
- Poor retrieval.
- Incorrect tool results.

Reliable applications reduce hallucination risk through retrieval, tool use, validation, constrained output, and evaluation.

## Key Takeaways

- LLMs generate text by predicting tokens using learned neural representations.
- Transformers use attention to model relationships within context.
- Tokens affect context limits and computational cost.
- Pretraining provides general capabilities; instruction tuning improves instruction following.
- Embeddings represent semantic information as vectors.
- Temperature and sampling influence generation behavior.
- Hallucinations are a fundamental reliability challenge for LLM applications.

## Practice Questions

1. Why does an LLM operate on tokens rather than directly on raw sentences?
2. What role does self-attention play in a transformer?
3. How are pretraining and instruction tuning different?
4. What happens when a prompt exceeds an LLM's context window?
5. Why can an LLM hallucinate even when it produces a confident answer?
