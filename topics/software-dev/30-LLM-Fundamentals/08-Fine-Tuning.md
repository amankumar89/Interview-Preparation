# LLM-Fundamentals — 08 Fine-Tuning

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is fine-tuning a language model?**

**Answer:** Fine-tuning continues training a pretrained model on a selected dataset to adapt its behavior or capabilities. It changes model parameters, unlike prompting or retrieval, which provide additional context at inference time.

**Q2. When might fine-tuning be preferable to prompt engineering?**

**Answer:** Fine-tuning may help when a stable behavior, format, or domain-specific pattern must be learned across many requests. Prompting is usually faster to iterate and should be tested first when instructions and examples can achieve the required result.

### Intermediate

**Q3. How does supervised fine-tuning work?**

**Answer:** The model is trained on examples pairing inputs with desired outputs, typically optimizing next-token prediction over the target response. Dataset quality, coverage, and formatting strongly affect the resulting behavior.

**Q4. What is parameter-efficient fine-tuning?**

**Answer:** Parameter-efficient methods, such as low-rank adaptation, train a smaller set of added or selected parameters while keeping most base-model weights frozen. They can reduce compute and storage costs, though tradeoffs depend on the task and implementation.

### Practical and Production

**Q5. How do you prepare and evaluate a fine-tuning dataset?**

**Answer:** Remove duplicates and sensitive data, check label quality and representation of expected cases, and split evaluation data so it is not used for training. Compare the tuned model against the base model on task-specific metrics and representative human-reviewed examples.

**Q6. What risks should be considered before fine-tuning a production model?**

**Answer:** Risks include overfitting, degraded general capability, data leakage, memorization of sensitive examples, and operational cost. Version datasets and models, evaluate regressions, document provenance, and maintain a rollback path.
