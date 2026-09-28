# AWS — 12 Infrastructure as Code

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is infrastructure as code (IaC)?**

**Answer:** IaC describes infrastructure declaratively or programmatically so it can be reviewed, versioned, and applied consistently. It reduces manual configuration drift and makes environments easier to reproduce.

**Q2. What is AWS CloudFormation?**

**Answer:** CloudFormation provisions and manages AWS resources from templates. A stack groups related resources and records the changes CloudFormation manages for that deployment.

### Intermediate

**Q3. How does AWS CDK differ from writing CloudFormation templates directly?**

**Answer:** CDK lets developers define infrastructure using supported programming languages and higher-level constructs, then synthesizes CloudFormation templates for deployment. The generated template remains important for understanding and reviewing the resulting resources.

**Q4. Why should infrastructure changes be reviewed before deployment?**

**Answer:** A small template change can replace or expose critical resources, alter permissions, or cause downtime. Review a change set or synthesized plan, check destructive replacements, and verify environment-specific parameters before applying it.

### Practical and Production

**Q5. How should secrets be handled in infrastructure code?**

**Answer:** Do not commit secret values in templates, configuration, or state artifacts. Reference a managed secrets store and grant workloads narrowly scoped access; protect deployment credentials and restrict access to any state that may reveal sensitive metadata.

**Q6. How do you reduce risk when deploying infrastructure changes to production?**

**Answer:** Use version control, automated validation, least-privilege deployment roles, and a reviewed change plan. Apply changes in stages where possible, understand rollback limitations for stateful resources, and monitor the service after deployment.
