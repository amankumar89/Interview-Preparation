# RAG and Embeddings

**Retrieval-Augmented Generation (RAG)** combines an LLM with an external knowledge source so the model can retrieve relevant information before generating an answer. **Embeddings** provide a way to represent text as vectors so semantically similar content can be searched efficiently.

## Why RAG Is Needed

An LLM's built-in knowledge may be incomplete, outdated, or unavailable for private organizational data.

Instead of asking the model to answer only from its parameters:

```text
User → LLM → Answer
```

a RAG system adds retrieval:

```text
User question
     ↓
Query embedding
     ↓
Vector search
     ↓
Relevant documents
     ↓
Prompt construction
     ↓
LLM
     ↓
Answer
```

This allows an application to ground generation in external information.

## Embeddings

An **embedding** is a numerical vector representing semantic information.

For example:

```text
"How do I reset my password?"
        ↓
[0.21, -0.08, 0.73, ...]
```

A semantically similar sentence such as:

```text
"I forgot my password. What is the reset process?"
```

should produce a vector relatively close to the first one.

Embeddings are used for:

- Semantic search.
- Document retrieval.
- Recommendation.
- Clustering.
- Duplicate detection.
- RAG.

## Similarity Search

A vector database compares the query vector with stored vectors.

**Cosine similarity** is commonly used:

```text
cosine_similarity(A, B) =
(A · B) / (||A|| ||B||)
```

A higher similarity generally indicates that the vectors point in more similar directions.

Other distance measures include Euclidean distance and dot product.

## Document Chunking

Large documents are usually divided into **chunks** before embedding.

For example:

```text
Document
  ├── Chunk 1
  ├── Chunk 2
  ├── Chunk 3
  └── Chunk 4
```

Good chunking balances enough context with retrieval precision.

Chunking strategies include:

- Fixed token or character windows.
- Paragraph-based splitting.
- Sentence-based splitting.
- Recursive splitting.
- Structure-aware splitting using headings or sections.

Overly small chunks may lose context. Overly large chunks may contain too much irrelevant information.

## Metadata

Each chunk can store metadata alongside its embedding:

```json
{
  "text": "Password reset instructions...",
  "source": "employee-handbook.pdf",
  "section": "Account Security",
  "page": 12,
  "department": "Engineering"
}
```

Metadata enables filtering before or during retrieval.

For example:

```text
Retrieve documents where department = "Engineering"
AND semantic similarity is high.
```

## Vector Databases

A **vector database** stores embeddings and supports similarity search.

Typical RAG components are:

```text
Documents
   ↓
Parser
   ↓
Chunker
   ↓
Embedding model
   ↓
Vector database
```

At query time:

```text
Question
   ↓
Embedding model
   ↓
Vector search
   ↓
Top-k chunks
```

Vector databases can also support metadata filters and hybrid retrieval.

## Retrieval Pipeline

A basic RAG pipeline has two phases.

### Indexing

```text
Documents
→ parse
→ clean
→ chunk
→ embed
→ store vectors + metadata
```

### Querying

```text
User question
→ embed question
→ retrieve top-k chunks
→ optionally rerank
→ build context
→ generate answer
```

The LLM should receive the retrieved context along with clear instructions about how to use it.

## Hybrid Search and Reranking

Semantic vector search is not always sufficient. Exact keywords can be important for names, IDs, error codes, and technical terminology.

**Hybrid search** combines semantic retrieval with lexical search.

A common pipeline is:

```text
Query
 ├── Vector search ──┐
 └── Keyword search ─┤
                     ↓
                 Candidate set
                     ↓
                  Reranker
                     ↓
                Best passages
```

A **reranker** evaluates retrieved candidates more precisely and can improve the quality of the final context.

## RAG Failure Modes

RAG can fail even when the LLM itself works correctly.

Common problems:

- Relevant document was never indexed.
- Chunk boundaries removed important context.
- Query embedding poorly represents the question.
- Retrieval returned irrelevant chunks.
- Too few documents were retrieved.
- Too many documents polluted the context.
- Access-control filtering was missing.
- The LLM ignored or misinterpreted retrieved evidence.

Therefore, RAG quality must be evaluated as a pipeline rather than only evaluating the final LLM response.

## RAG vs Fine-Tuning

RAG and fine-tuning solve different problems.

**RAG** is useful when the model needs access to changing or private information.

**Fine-tuning** is useful when the model needs to learn a particular behavior, format, or task pattern.

A system can use both:

```text
Fine-tuned model
       +
RAG knowledge retrieval
       ↓
Specialized grounded application
```

## Key Takeaways

- RAG gives an LLM access to external information at query time.
- Embeddings convert text into vectors for semantic comparison.
- Chunking strongly affects retrieval quality.
- Metadata enables filtering and better source control.
- Hybrid retrieval can combine semantic and keyword search.
- Reranking improves the ordering of retrieved candidates.
- RAG reliability depends on indexing, retrieval, grounding, generation, and evaluation.

## Practice Questions

1. Why would you use RAG instead of putting all company documents into an LLM prompt?
2. What is an embedding and why is it useful for semantic search?
3. What problems can poor chunking create?
4. When would hybrid search be better than pure vector search?
5. Explain the indexing and query phases of a RAG system.
