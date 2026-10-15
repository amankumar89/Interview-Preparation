# AWS — 10 Container Services

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is Amazon ECS?**

**Answer:** Amazon Elastic Container Service is a managed service for scheduling and operating containerized workloads. It can run tasks on EC2 capacity or on AWS Fargate, which abstracts server management for the task.

**Q2. What is Amazon EKS?**

**Answer:** Amazon Elastic Kubernetes Service is a managed Kubernetes control plane. Teams use Kubernetes APIs and ecosystem tools while AWS operates the control-plane availability and integration.

### Intermediate

**Q3. How does Fargate differ from running containers on EC2?**

**Answer:** Fargate removes the need to provision and patch the underlying worker instances for supported workloads. EC2 gives more control over host configuration and can be cost-effective at steady utilization, but the team manages capacity and host lifecycle.

**Q4. How do ECS tasks and services differ?**

**Answer:** A task is a running instance of a task definition. A service maintains a desired number of tasks and can integrate with deployment and load-balancing behavior.

### Practical and Production

**Q5. What should you consider when exposing a containerized service to traffic?**

**Answer:** Configure health checks, target registration, security groups, networking, and a deployment strategy that allows unhealthy tasks to be replaced. Readiness should reflect whether the application can actually serve requests, not merely whether the process exists.

**Q6. How do you manage secrets for containers running on ECS or EKS?**

**Answer:** Use an appropriate AWS secrets service and grant narrowly scoped task or workload identities permission to retrieve required values. Avoid baking secrets into images or source control, and define rotation and exposure controls.
