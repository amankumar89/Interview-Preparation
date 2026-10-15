# LLM-Fundamentals — 09 Inference and Serving

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What happens during autoregressive language-model inference?**

**Answer:** The model processes the input context and repeatedly predicts a distribution for the next token. A decoding strategy selects a token, appends it to the context, and repeats until a stop condition or output limit is reached.

**Q2. What is the difference between prefill and decode in LLM serving?**

**Answer:** Prefill processes the prompt tokens to build model state, while decode generates output tokens incrementally. Prefill work is driven by input length; decode latency and compute grow with generated tokens.

### Intermediate

**Q3. What is a key-value cache in transformer inference?**

**Answer:** It stores attention keys and values for prior tokens so they do not need to be recomputed for every generated token. This improves decode efficiency but consumes memory proportional to context length, model dimensions, and concurrent requests.

**Q4. How do batching and continuous batching affect serving?**

**Answer:** Batching shares accelerator work across requests and can improve throughput. Continuous batching admits and removes requests as they progress, improving utilization for variable-length generations, but scheduling must balance throughput and latency goals.

### Practical and Production

**Q5. Which metrics help diagnose LLM serving performance?**

**Answer:** Track time to first token, inter-token latency, end-to-end latency, throughput, queue time, token counts, error rates, and accelerator memory/utilization. Segment by model, input/output length, and workload class while avoiding sensitive prompt logging.

**Q6. How would you control inference cost without silently harming quality?**

**Answer:** Measure cost and quality together, then consider routing requests to suitable model sizes, limiting unnecessary context and output tokens, caching safe repeatable results, and batching. Validate changes with representative evaluations and monitor for regressions.
