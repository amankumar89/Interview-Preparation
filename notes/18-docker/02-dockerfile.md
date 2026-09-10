# Dockerfile — Instructions & Best Practices

## What is a Dockerfile?

A Dockerfile is a plain-text file containing a sequence of instructions that Docker reads top-to-bottom to automatically build an image. Each instruction creates a new layer in the image.

## Key Instructions

| Instruction | Purpose |
|---|---|
| `FROM` | Sets the base image to build from. Must be the first instruction (except `ARG` before it). |
| `RUN` | Executes a command in a new layer at build time (e.g., installing packages). |
| `COPY` | Copies files/directories from the build context into the image. |
| `ADD` | Like `COPY`, but also supports remote URLs and auto-extracts local tar archives. |
| `CMD` | Default command to run when the container starts; can be overridden at `docker run`. |
| `ENTRYPOINT` | Configures the container to run as an executable; harder to override than `CMD`. |
| `WORKDIR` | Sets the working directory for subsequent instructions. |
| `ENV` | Sets environment variables available at build time and runtime. |
| `ARG` | Defines a build-time-only variable, passed via `--build-arg`. |
| `EXPOSE` | Documents the port the container listens on (does not actually publish it). |
| `VOLUME` | Creates a mount point and marks it to hold externally-mounted data. |
| `USER` | Sets the user (and optionally group) to run subsequent instructions and the container process as. |
| `LABEL` | Adds metadata (key-value pairs) to the image. |
| `HEALTHCHECK` | Defines a command Docker runs periodically to check container health. |

## `CMD` vs `ENTRYPOINT`

This is one of the most common interview questions.

- **`CMD`** provides default arguments; easily overridden by any arguments passed to `docker run`.
  ```dockerfile
  CMD ["nginx", "-g", "daemon off;"]
  ```
  Running `docker run myimage echo hi` replaces the entire `CMD`.

- **`ENTRYPOINT`** configures the container to run as a fixed executable; arguments passed to `docker run` are appended, not replaced (unless `--entrypoint` is used).
  ```dockerfile
  ENTRYPOINT ["python3", "app.py"]
  ```
  Running `docker run myimage --debug` results in `python3 app.py --debug`.

- **Combined pattern** (very common): `ENTRYPOINT` defines the fixed binary, `CMD` supplies default arguments that can be overridden.
  ```dockerfile
  ENTRYPOINT ["python3", "app.py"]
  CMD ["--port", "8080"]
  ```
  `docker run myimage --port 9090` → `python3 app.py --port 9090`.

## `COPY` vs `ADD`

- `COPY` is straightforward file/directory copying from the build context — **preferred by default** for clarity and predictability.
- `ADD` has extra "magic": it can fetch remote URLs and automatically extracts local compressed archives (`.tar`, `.tar.gz`, etc.) into the destination.
- Best practice: use `COPY` unless you specifically need `ADD`'s archive-extraction behavior, since `ADD`'s implicit behavior can cause unexpected results.

## Build Context

The **build context** is the set of files sent to the Docker daemon when you run `docker build <path>`. Everything in that path (unless excluded) is sent, so:

- Keep the build context small and scoped to what's needed.
- Use a **`.dockerignore`** file to exclude files (e.g., `.git`, `node_modules`, `*.log`) to speed up builds and avoid leaking secrets into the image.

## Layer Caching & Build Optimization

Docker caches each layer and reuses it if the instruction and its inputs haven't changed. Best practices to maximize cache hits:

1. **Order instructions from least to most frequently changing.** Put dependency installation (rarely changes) before copying application source code (changes often).
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install          # cached unless package.json changes
   COPY . .                 # invalidates cache only when source changes
   CMD ["node", "server.js"]
   ```
2. **Combine related `RUN` commands** with `&&` to reduce layer count and enable proper cleanup in the same layer:
   ```dockerfile
   RUN apt-get update && apt-get install -y curl \
       && rm -rf /var/lib/apt/lists/*
   ```
   (If you `apt-get update` in one layer and `rm -rf` in a later layer, the cache from the earlier layer still bloats the image.)
3. Use specific, pinned base image tags (not `latest`) for reproducible builds.

## Multi-Stage Builds

Multi-stage builds let you use multiple `FROM` statements in one Dockerfile, where later stages can selectively copy artifacts from earlier stages. This produces small, production-ready images without build tools/dependencies bloating the final image.

```dockerfile
# Stage 1: build
FROM golang:1.22 AS builder
WORKDIR /src
COPY . .
RUN go build -o app .

# Stage 2: run
FROM alpine:3.19
COPY --from=builder /src/app /app
ENTRYPOINT ["/app"]
```

Benefits:
- Final image only contains the compiled binary/runtime artifacts, not the compiler, SDK, or intermediate files.
- Dramatically smaller image size → faster pulls, smaller attack surface.
- No need for separate build scripts outside Docker.

## Writing a Good Dockerfile — Best Practices

1. **Use minimal base images** (e.g., `alpine`, `distroless`, `slim` variants) to reduce size and attack surface.
2. **Pin versions** (base image tags, package versions) for reproducible builds.
3. **Don't run as root** — create and switch to a non-root user with `USER`.
4. **Minimize layers** by combining commands where sensible.
5. **Leverage `.dockerignore`** to exclude unnecessary files from context.
6. **Use multi-stage builds** to keep final images lean.
7. **Avoid storing secrets** in the image (use build secrets, environment variables at runtime, or secret managers — never `ENV`/`ARG` with credentials baked into layers).
8. **Set `WORKDIR`** instead of chaining `cd` inside `RUN`.
9. **Add a `HEALTHCHECK`** so orchestrators can detect unhealthy containers.
10. **Use explicit `EXPOSE`** to document intended ports even though it's informational only.

## Example: Production-Ready Node.js Dockerfile

```dockerfile
# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# --- Final stage ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server.js"]
```

## Common Interview Questions

**Q: What's the difference between `ARG` and `ENV`?**
`ARG` is only available during the image build process (not in the running container) and is set via `--build-arg`. `ENV` is available both at build time and persists into the running container's environment.

**Q: Why should you avoid running containers as root?**
Running as root inside a container means that if an attacker breaks out of the container (e.g., via a kernel exploit) or exploits a misconfiguration, they get root-level access on the host or broader blast radius. Running as a non-root user limits potential damage — this is a core container security best practice.

**Q: How do you reduce Docker image size?**
Use smaller base images (alpine/distroless), multi-stage builds, minimize layers, remove unnecessary package manager caches in the same `RUN` layer, and avoid installing unnecessary dev dependencies in production images.

**Q: What does `EXPOSE` actually do?**
It's purely documentation/metadata — it tells other developers and tools which port the app listens on. It does **not** publish the port to the host; you still need `-p`/`--publish` at `docker run` time (or in Compose) to actually make the port accessible outside the container.
