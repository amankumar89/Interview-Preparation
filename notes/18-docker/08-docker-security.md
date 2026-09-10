# Docker Security

## Container Security Model — Key Facts

Containers share the host kernel, so container isolation is **weaker** than VM isolation by design. A kernel-level exploit or dangerous misconfiguration can potentially let a process "escape" the container and affect the host or other containers. Security is therefore about layered defense, not a single control.

## Core Best Practices

### 1. Don't Run as Root

```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```
Running as a non-root user limits the damage if an attacker compromises the application process inside the container — they don't automatically get root privileges.

### 2. Use Minimal Base Images

Smaller images (alpine, distroless, scratch) have fewer installed packages and therefore a smaller attack surface — fewer libraries with potential CVEs, no unnecessary shells or package managers for an attacker to abuse post-compromise.

### 3. Scan Images for Vulnerabilities

Use tools like **Trivy**, **Docker Scout**, **Snyk**, **Grype**, or **Clair** to scan images for known CVEs in OS packages and language dependencies — ideally as part of the CI/CD pipeline, failing the build on critical vulnerabilities.

```bash
docker scout cves myimage:latest
trivy image myimage:latest
```

### 4. Never Bake Secrets into Images

Secrets in `ENV`, `ARG`, or `COPY`'d files remain in image layer history even if "deleted" in a later layer (since layers are immutable and additive). Instead:
- Use **runtime environment variables** injected at `docker run`/Compose/K8s deploy time.
- Use **Docker BuildKit secrets** (`--secret`) for build-time secrets that aren't persisted into the final image layers.
- Use a dedicated **secrets manager** (Vault, AWS Secrets Manager, Kubernetes Secrets) for production.

```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm install
```

### 5. Limit Container Capabilities

By default, Docker grants containers a reduced (but still broad) set of Linux capabilities. Further restrict with:

```bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp
```

- `--cap-drop=ALL` then selectively `--cap-add` only what's needed follows the principle of least privilege.
- Avoid `--privileged` mode in production — it disables almost all isolation, giving the container near-full access to the host's devices and kernel capabilities.

### 6. Use Read-Only Filesystems Where Possible

```bash
docker run --read-only --tmpfs /tmp myapp
```
Prevents an attacker (or buggy process) from writing to or tampering with the container's filesystem at runtime; use `tmpfs` for any directories that genuinely need write access (like `/tmp`).

### 7. Set Resource Limits

```bash
docker run --memory=512m --cpus=1 --pids-limit=100 myapp
```
Prevents denial-of-service scenarios where one compromised or buggy container exhausts host resources (memory, CPU, fork bombs) and starves other workloads.

### 8. Avoid Mounting the Docker Socket Unnecessarily

```bash
-v /var/run/docker.sock:/var/run/docker.sock
```
This is a common but dangerous pattern (used by some CI tools) — a container with access to the host's Docker socket can effectively control the entire Docker daemon, equivalent to root access on the host. Avoid unless absolutely required, and understand the implications if you must use it.

### 9. Keep Docker & Host Updated

Regularly patch the Docker Engine, host OS kernel, and base images to pick up security fixes for known vulnerabilities.

### 10. Use Content Trust / Image Signing

```bash
export DOCKER_CONTENT_TRUST=1
```
Enables Docker Content Trust, ensuring only signed images (via Notary) can be pulled/run, protecting against tampered or malicious images being substituted in the supply chain. Sigstore/cosign is a modern alternative widely used today.

### 11. Network Segmentation

Use user-defined networks to isolate groups of containers so that, for example, a public-facing web tier cannot directly reach an internal database tier except through intended paths.

## Security-Related `docker run` Flags Summary

| Flag | Effect |
|---|---|
| `--user` | Run as a specific non-root UID/GID |
| `--read-only` | Mount container's root filesystem as read-only |
| `--cap-drop` / `--cap-add` | Fine-tune Linux capabilities |
| `--security-opt=no-new-privileges` | Prevents privilege escalation via setuid binaries |
| `--pids-limit` | Cap number of processes (mitigates fork bombs) |
| `--memory`, `--cpus` | Resource limits (DoS mitigation) |
| `--privileged` | **Avoid** — disables most isolation |

## Common Interview Questions

**Q: What is `--privileged` mode and why is it risky?**
`--privileged` grants the container almost all capabilities of the host, including direct access to host devices and the ability to load kernel modules — effectively removing most of the isolation Docker provides. It should only be used for specific trusted use cases (e.g., running Docker-in-Docker, certain hardware access scenarios) and never for general application workloads.

**Q: How would you prevent secrets from leaking into a Docker image?**
Never use `ENV`, `ARG`, or `COPY` to embed secrets directly — they persist in the image layer history even if later "removed." Instead, inject secrets at runtime via environment variables or mounted files from a secrets manager, or use BuildKit's `--mount=type=secret` for build-time-only secrets that never get committed to the final image.

**Q: What's the principle of least privilege as applied to containers?**
Grant a container only the permissions, capabilities, and access it strictly needs to function — run as non-root, drop unnecessary Linux capabilities, use read-only filesystems where possible, avoid mounting sensitive host paths/sockets, and restrict network access to only what's required.

**Q: How do you detect known vulnerabilities in your Docker images?**
Integrate an image vulnerability scanner (Trivy, Docker Scout, Snyk, Grype, Clair) into the CI/CD pipeline to scan images against CVE databases before they're pushed to a registry or deployed, and fail the pipeline on critical/high-severity findings.

**Q: Why is mounting `/var/run/docker.sock` into a container considered dangerous?**
It gives the container the ability to talk directly to the host's Docker daemon API — meaning it could create new privileged containers, mount arbitrary host paths, or otherwise gain root-equivalent control over the host, effectively breaking container isolation entirely.
