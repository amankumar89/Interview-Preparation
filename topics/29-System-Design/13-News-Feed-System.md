# System-Design — 13 News Feed System

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What are the main operations in a news feed system?**

**Answer:** Users publish posts, follow other users, and retrieve a personalized or chronological feed. Clarify ranking, visibility rules, freshness, pagination, and expected behavior when accounts or posts are removed.

**Q2. What is the difference between fan-out on write and fan-out on read?**

**Answer:** Fan-out on write distributes a new post into followers' feed stores at publish time, making reads fast but writes expensive for popular authors. Fan-out on read gathers followed authors' posts when a feed is requested, reducing write amplification but increasing read work.

### Intermediate

**Q3. How can a hybrid fan-out strategy help with celebrity accounts?**

**Answer:** Use write-time fan-out for ordinary accounts and fetch posts from high-follower accounts at read time. This avoids creating enormous write bursts while keeping most feed reads efficient.

**Q4. How should a feed API paginate results?**

**Answer:** Use a stable cursor based on ordering fields such as creation time and post identifier. Offset pagination can become expensive and unstable as new posts arrive; the cursor should also respect visibility and ranking rules.

### Practical and Production

**Q5. How do you handle a deleted or newly private post already present in feed caches?**

**Answer:** Recheck authorization at read time or propagate invalidation so cached feed entries cannot expose inaccessible content. Define acceptable propagation delay and use tombstones or versioning to make deletion observable across asynchronous workers.

**Q6. How can ranking changes be introduced safely?**

**Answer:** Keep ranking separate from candidate generation where possible, version the ranking logic, and compare changes through offline evaluation or controlled experiments. Monitor latency, engagement, and safety outcomes, with a rollback path.

**Q7. What consistency tradeoffs exist between posting and feed visibility?**

**Answer:** Asynchronous fan-out may make a post appear in followers' feeds after a delay, while synchronous distribution increases publish latency and load. Specify freshness expectations and provide read paths that can include a user's own recent posts when necessary.
