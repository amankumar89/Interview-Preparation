# Docker — 02 Images

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Beginner

**Q1. What is a Docker image made of?**

**Answer:** An image consists of read-only filesystem layers plus metadata such as the default command, environment variables, working directory, and exposed ports. Each layer represents changes from an instruction or source image and can be reused by other images.

**Q2. What is an image tag, and why is `latest` not a version?**

**Answer:** A tag is a human-readable reference to an image manifest, such as `1.4.2` or `latest`. `latest` is only a conventional tag and can point to different content over time, so production deployments should use an immutable version or digest.

**Q3. How do you build, list, pull, and remove images?**

**Answer:** Use `docker build -t name:tag .`, `docker image ls`, `docker pull name:tag`, and `docker image rm name:tag`. Removing an image may require removing containers or other tags that still reference it.

### Intermediate

**Q4. How does Docker image layer caching work?**

**Answer:** Docker reuses a layer when the instruction and its relevant inputs match a previous build. A change invalidates that instruction and later layers, so stable dependency installation steps should normally appear before frequently changing source-code copies.

**Q5. What is the difference between an image ID and a digest?**

**Answer:** An image ID identifies the local image configuration and content. A registry digest identifies a pushed manifest by its cryptographic content address, for example `repository@sha256:...`; pinning the digest makes the exact registry content explicit.

**Q6. What is a multi-architecture image?**

**Answer:** A multi-architecture image is an image index containing platform-specific manifests, such as `linux/amd64` and `linux/arm64`. Docker selects the matching manifest for the host when pulling, while builders can use `buildx` to publish multiple platforms.

### Practical and Production

**Q7. How would you reduce an image's size?**

**Answer:** Use a suitable minimal runtime base, a multi-stage build, a `.dockerignore` file, and only copy runtime artifacts into the final stage. Remove package-manager caches and unnecessary build tools, but do not sacrifice required certificates, debugging capability, or security updates merely to save a few megabytes.

**Q8. How do you scan and promote images safely?**

**Answer:** Scan dependencies and the final image for known vulnerabilities, review the base image and package sources, sign or attest the build when supported, and promote the same immutable digest between environments. A scanner result needs triage because severity, exploitability, reachability, and available fixes all matter.

**Q9. What causes a Docker image cache to become ineffective?**

**Answer:** Frequently changing instructions early in the Dockerfile, copying the entire build context, unpinned dependencies, and changing build arguments can invalidate cache layers. Inspect the build output and reorder stable operations before dynamic inputs.
