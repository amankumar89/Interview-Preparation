# Spring-Boot — 07 Scheduling

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. How do you enable scheduled tasks in a Spring Boot application?**

**Answer:** Add `@EnableScheduling` to a configuration class and annotate a Spring-managed method with `@Scheduled`. The method should generally be a no-argument operation and should finish reliably without blocking the scheduler for a long time.

**Q2. What is the difference between `fixedRate` and `fixedDelay`?**

**Answer:** `fixedRate` targets a regular interval measured from the start time of one execution to the start of the next. `fixedDelay` measures the interval after one execution completes. Choose based on whether the cadence or the pause after completion is the important requirement.

**Q3. How do you configure a cron-based scheduled task?**

**Answer:** Set a cron expression on `@Scheduled`, preferably through an externalized property when operators need to change it without rebuilding. Specify a time zone when the task must follow a particular local calendar rather than the scheduler's default zone.

### Intermediate

**Q4. What happens if a scheduled task takes longer than its configured interval?**

**Answer:** The behavior depends on the trigger and scheduler configuration; executions may run late, serialize, or contend for scheduler threads. Do not assume that a periodic annotation provides parallel execution or durable job management. Measure task duration and configure an appropriate scheduler pool when concurrency is needed.

**Q5. How do `@Scheduled` and `@Async` work together?**

**Answer:** Scheduling triggers a method, while asynchronous execution delegates work to an executor. They use Spring proxying and require the relevant configuration; calling an annotated method from another method on the same object can bypass proxy behavior. Configure bounded thread pools and handle failures from asynchronous execution.

**Q6. Are Spring scheduled tasks safe to run on multiple application instances?**

**Answer:** Not by default. Each instance may run the same schedule independently, so a scaled deployment can execute the task multiple times. Use a distributed coordination mechanism when only one instance should claim a run, and make the work idempotent because coordination cannot eliminate every retry or failure scenario.

### Practical and Production

**Q7. How would you prevent a scheduled job from corrupting data if it runs twice?**

**Answer:** Make each operation idempotent, use unique job or business keys, and enforce important invariants transactionally in the database. Treat a distributed lock as coordination rather than the sole correctness guarantee, especially across crashes and lease expiry.

**Q8. What should you consider when scheduling a task that processes a large backlog?**

**Answer:** Process bounded batches, checkpoint progress safely, apply backpressure to downstream services, and make retries resume without repeating completed work. Monitor backlog size, duration, failures, and last successful completion, and provide a controlled way to pause or rerun the job.

**Q9. How would you test scheduled logic without making tests wait for a real cron interval?**

**Answer:** Move the business operation into a directly callable service method and unit-test that behavior independently. Test the scheduling configuration separately with controlled clocks or trigger configuration where practical, rather than relying on long sleeps that make tests slow and flaky.
