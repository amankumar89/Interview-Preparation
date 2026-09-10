# Docker Images

## What is a Docker Image?

An image is a lightweight, immutable, read-only template composed of a stack of layers, containing everything needed to run an application: code, runtime, libraries, environment variables, and configuration. Containers are instantiated from images by adding a writable layer on top.

## Image Naming & Tags

An image reference has the form:

```
[registry-host[:port]/]repository[:tag]
```

Example: `docker.io/library/nginx:1.27-alpine`

- If no registry is specified, Docker Hub is assumed.
- If no tag is specified, `:latest` is assumed — but `latest` is just a convention, **not** automatically the newest build; avoid relying on it in production.
- **Digest** (`@sha256:...`) can be used instead of a tag to pin an exact, immutable image content hash.

## Common Image Commands

```bash
docker pull nginx:1.27          # download image from registry
docker images                   # list local images
docker image inspect nginx      # detailed metadata (layers, env, config)
docker rmi nginx:1.27           # remove an image
docker tag myapp:1.0 myrepo/myapp:1.0   # create a new tag pointing to same image
docker push myrepo/myapp:1.0    # upload to a registry
docker history nginx            # show layer history and sizes
docker save -o myimage.tar myapp:1.0    # export image to a tar archive
docker load -i myimage.tar      # import image from a tar archive
docker build -t myapp:1.0 .     # build image from Dockerfile in current dir
```

## Building Images

```bash
docker build -t myapp:1.0 -f Dockerfile.prod .
```

- `-t` tags the resulting image.
- `-f` specifies a Dockerfile if it's not named `Dockerfile` or not in the context root.
- `.` (or another path/URL) specifies the **build context**.
- `--no-cache` forces a rebuild of every layer, ignoring cache.
- `--build-arg KEY=value` passes build-time variables declared with `ARG`.

## Image Layers Recap

- Each instruction in a Dockerfile (mainly `RUN`, `COPY`, `ADD`) creates a new layer.
- Layers are content-addressable and cached; identical layers are shared across images, saving disk space.
- `docker history <image>` shows each layer and how much disk space it added.

## Multi-Architecture Images

Docker supports **manifest lists** (multi-arch images) — a single tag (e.g., `nginx:latest`) can point to different underlying images depending on the CPU architecture (amd64, arm64, etc.) of the host pulling it. Built using `docker buildx` with the `--platform` flag:

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t myrepo/myapp:1.0 --push .
```

## Distroless & Minimal Images

- **Alpine-based images** use musl libc and BusyBox, resulting in very small images (~5MB base) but occasionally causing subtle compatibility issues with glibc-dependent binaries.
- **Distroless images** (from Google) contain only the application and its runtime dependencies — no shell, package manager, or other OS utilities — minimizing attack surface significantly, at the cost of harder in-container debugging.
- **Scratch** (`FROM scratch`) is an empty base image, useful for statically compiled binaries (e.g., Go apps) to produce the smallest possible image.

## Registries

A registry stores and distributes images.

- **Docker Hub** – default public registry.
- **Private registries** – AWS ECR, Google Artifact Registry, Azure ACR, GitHub Container Registry (GHCR), Harbor, or a self-hosted `registry:2` image.
- Authentication: `docker login <registry-url>`.
- Organizations typically use private registries for proprietary images and enforce image scanning before pushing/pulling.

## Image Security Practices

1. **Scan images** for known vulnerabilities (e.g., `docker scout`, Trivy, Snyk, Clair) before deploying.
2. **Use minimal base images** to reduce the attack surface.
3. **Pin exact versions/digests** rather than floating tags like `latest`.
4. **Sign images** (Docker Content Trust / Notary, or Sigstore/cosign) to verify authenticity and prevent tampering.
5. **Never bake secrets** into image layers — even if deleted in a later layer, the secret often remains recoverable in the layer history.
6. **Regularly rebuild** images to pick up security patches from the base image.

## Common Interview Questions

**Q: If you delete a file in a later Dockerfile layer, is it really gone from the image?**
No — because layers are additive and immutable, the file still physically exists in the earlier layer; a later layer just marks it as deleted (a "whiteout" file) so it's not visible in the final filesystem view. The image size is not reduced, and if that layer is extracted or inspected directly, the "deleted" content can still be recovered. This is why secrets should never be added in one layer and removed in another — combine the add-and-remove into a single `RUN` layer, or better, avoid embedding secrets at all.

**Q: What's the difference between `docker save` and `docker export`?**
`docker save` exports one or more **images** (with all layers and metadata/history) to a tar archive, restorable with `docker load`. `docker export` exports a **container's** filesystem as a flat tarball (no layer history, no metadata), restorable with `docker import` as a new image (single layer).

**Q: How do you keep image sizes small?**
Use minimal/distroless base images, multi-stage builds, combine `RUN` layers with cleanup in the same layer, avoid installing unnecessary packages, and use `.dockerignore` to keep irrelevant files out of the build context (and therefore out of `COPY`/`ADD` layers).

**Q: What's the risk of using the `latest` tag in production?**
It's a mutable, floating pointer — whoever pushes a new `latest` changes what gets pulled, so deployments become non-reproducible and can silently pick up breaking changes. Best practice is to pin specific version tags or image digests for production deployments.
