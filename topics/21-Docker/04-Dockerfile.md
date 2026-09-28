# Docker — 04 Dockerfile

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is a Dockerfile?**

**Answer:** A Dockerfile is a declarative build recipe for an image. Instructions such as `FROM`, `WORKDIR`, `COPY`, `RUN`, `ENV`, `EXPOSE`, and `CMD` describe the filesystem changes and default runtime metadata.

**Q2. What is the difference between `CMD` and `ENTRYPOINT`?**

**Answer:** `CMD` supplies a default command or default arguments and is easy to replace at runtime. `ENTRYPOINT` defines the executable that normally remains fixed, while `CMD` can provide its default arguments. Exec-form JSON syntax avoids an extra shell and handles signals more predictably.

**Q3. What is the difference between `COPY` and `ADD`?**

**Answer:** `COPY` copies files from the build context or another build stage. `ADD` also has special behavior for local archives and some URL sources, which can be surprising. Prefer `COPY` unless the specific `ADD` behavior is intentional.

### Intermediate

**Q4. What is a multi-stage Docker build?**

**Answer:** It uses multiple `FROM` stages, such as a build stage with compilers and a smaller runtime stage. `COPY --from=build` transfers only the generated artifacts, keeping development tools and source files out of the final image.

**Q5. Why does Dockerfile instruction order matter?**

**Answer:** Docker caches each layer, and changing an instruction invalidates that layer and subsequent ones. Copy lockfiles and install dependencies before copying frequently changing source files when the build system allows it.

**Q6. What is `.dockerignore` used for?**

**Answer:** It excludes files from the build context sent to the Docker daemon or builder. It improves build speed and prevents accidental inclusion of secrets, dependency directories, generated output, and version-control metadata.

### Practical and Production

**Q7. Which Dockerfile practices improve security?**

**Answer:** Start from a maintained trusted base, pin important inputs, run as a non-root user, keep the final image minimal, avoid secrets in build arguments or layers, and scan the result. Use a read-only filesystem and dropped capabilities where the runtime supports them.

**Q8. Why should `RUN apt-get update` and package installation be in one layer?**

**Answer:** Package indexes can become stale if the update and install steps are cached separately. Combining them allows the install to use the index from the same build step, and removing package lists afterward avoids leaving unnecessary cache data in the image.

**Q9. How would you make a Dockerfile build fail reliably when a command fails?**

**Answer:** Use exec-form commands or an explicit shell with appropriate error settings for shell pipelines, and verify that scripts return non-zero exit codes on failure. Avoid hiding errors with `|| true` unless the ignored failure is deliberate and documented by the build logic.
