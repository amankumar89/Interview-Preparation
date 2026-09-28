# Advanced-Java — 06 Executors

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the Executor framework?

**Interview Answer:**
The Executor framework separates task submission from the mechanism that runs tasks. `ExecutorService` adds lifecycle management and result-bearing task submission through `Future`.

**Detailed Explanation:**
It centralizes thread creation, reuse, queuing, and shutdown. Callers can submit work without owning the details of which thread executes it, which makes resource limits and application lifecycle easier to manage.

### Q2. What is the difference between `execute()` and `submit()`?

**Interview Answer:**
`execute(Runnable)` submits a task without returning a result. `submit()` returns a `Future`, which can report completion, retrieve a result, or request cancellation. Exceptions from submitted tasks are observed through the `Future` when its result is retrieved.

### Q3. What are common executor types?

**Answer:**
`newFixedThreadPool` uses a fixed number of workers but an unbounded queue. `newSingleThreadExecutor` serializes tasks, also with an unbounded queue. `newCachedThreadPool` can create many platform threads. Scheduled executors support delayed and periodic work, while work-stealing pools target fork/join tasks. Understand queue and thread limits before choosing a factory.

### Q4. What is the difference between `Future` and `CompletableFuture`?

**Answer:**
`Future` represents a result that can be queried or waited on. `CompletableFuture` supports composing dependent stages and handling results asynchronously. Non-async continuation methods may run on the thread that completes the prior stage; async methods without an explicit executor commonly use the common pool.

## Practical Questions

### Q5. Why can an unbounded executor queue be dangerous?

**Answer:**
If tasks arrive faster than workers can process them, the queue can grow without bound, increasing latency and consuming heap until the process becomes unstable. Use explicit capacity, an overload policy, and metrics for queue depth, task age, and rejections.

### Q6. How should an executor be shut down?

**Answer:**
Call `shutdown()` to reject new work while allowing submitted tasks to finish. Wait for termination with a timeout, then use `shutdownNow()` if the application must request interruption of remaining tasks. Tasks should respond to interruption; shutdown should be part of the owning component's lifecycle.

### Q7. What are `RejectedExecutionHandler` policies?

**Answer:**
They define what happens when an executor cannot accept a task because it is shut down or saturated. Policies can reject with an exception, discard work, discard an older queued task, or run work in the submitting thread. Select a policy that matches the task's delivery guarantees; silently dropping important work is usually incorrect.

### Q8. How do you size a thread pool?

**Answer:**
There is no universal formula. CPU-bound work is often limited near available processors, while blocking workloads may need more concurrency, but downstream capacity and memory must also be considered. Measure utilization, wait time, queueing, throughput, and tail latency under representative load, then set explicit limits.

## Advanced and Production Questions

### Q9. What is the difference between fixed and work-stealing pools?

**Answer:**
A fixed pool uses a configured number of workers and a shared work queue in the standard implementation. A work-stealing pool uses per-worker queues and lets idle workers steal tasks, which suits many small, recursively decomposed tasks. It is not automatically suitable for blocking I/O or tasks requiring strict execution ordering.

### Q10. Why should blocking work be separated from CPU-bound work?

**Answer:**
Blocking tasks occupy workers while they wait, which can starve CPU work in the same limited pool. Separate pools or an appropriate virtual-thread approach can isolate these workloads. Also apply timeouts and concurrency limits to protect downstream services.

### Q11. How do you handle exceptions in asynchronous task chains?

**Answer:**
For `Future`, retrieve the result and handle `ExecutionException` and cancellation explicitly. For `CompletableFuture`, use stages such as `handle`, `exceptionally`, or `whenComplete` according to whether the error should be transformed, recovered, or only observed. Ensure failures are not lost in fire-and-forget tasks.

### Q12. A service has high executor queue latency. What should you inspect?

**Answer:**
Inspect active worker count, queue size and age, task duration distribution, rejection count, CPU utilization, blocking time, and downstream latency. Determine whether capacity is insufficient, tasks are stuck, or arrival rate exceeds sustainable throughput. Add backpressure or reject early where appropriate instead of only increasing the queue.
