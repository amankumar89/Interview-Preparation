# RAG — 08 Document Ingestion and Parsing

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What happens during document ingestion in a RAG system?**

**Answer:** Source documents are discovered, extracted into usable text or structured content, cleaned, enriched with metadata, split into chunks, embedded, and indexed. The pipeline should preserve enough provenance to trace retrieved content back to its source.

**Q2. Why does document parsing quality affect retrieval quality?**

**Answer:** Missing text, incorrect reading order, or corrupted tables produce poor chunks and embeddings. Retrieval cannot reliably recover information that was lost or misrepresented during extraction.

### Intermediate

**Q3. How should a pipeline handle PDFs with tables or multi-column layouts?**

**Answer:** Use extraction methods that preserve layout or represent tables in a structured, readable form. Validate extracted output on representative documents because plain text extraction can interleave columns or lose relationships between headers and values.

**Q4. Which metadata is useful to preserve for each chunk?**

**Answer:** Useful fields include source identifier, document title, page or section, tenant or access scope, timestamps, and content version. Metadata can support filtering, citations, access control, freshness, and targeted re-ingestion.

### Practical and Production

**Q5. How can an ingestion pipeline process changed documents without duplicating stale chunks?**

**Answer:** Track a stable document identifier and content version or hash. On change, replace or invalidate the prior version's chunks atomically where possible, then publish the new version only after extraction and indexing succeed.

**Q6. How should ingestion failures and unsupported files be handled?**

**Answer:** Validate file type and size, isolate parser failures, record actionable error metadata, and retry only transient failures. Keep failed documents observable and out of the searchable index until processing completes successfully.
