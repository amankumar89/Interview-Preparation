# Docker Basics

## What is Docker?

Docker is an open-source platform used to build, ship, and run applications inside lightweight, portable, self-sufficient units called **containers**. A container packages an application together with everything it needs to run — code, runtime, system tools, libraries, and settings — so it behaves the same way regardless of where it is deployed (developer laptop, test server, production cloud).

## Why Docker? (Problem it solves)

Before containers, teams struggled with the "it works on my machine" problem — an app would behave differently across dev, test, and prod environments due to differences in OS versions, library versions, or configuration. Docker solves this by:

- **Consistency** – the same image runs identically everywhere.
- **Isolation** – each container has its own filesystem, process space, and network stack.
- **Portability** – images can run on any machine with a Docker engine, regardless of underlying OS distribution.
- **Efficiency** – containers share the host OS kernel, so they start in seconds and use far less resource overhead than VMs.
- **Faster CI/CD** – images can be built once and promoted through pipelines unchanged.

## Containers vs Virtual Machines

| Aspect | Containers | Virtual Machines |
|---|---|---|
| Virtualization level | OS-level (shares host kernel) | Hardware-level (full guest OS) |
| Startup time | Seconds (or less) | Minutes |
| Size | MBs | GBs |
| Isolation | Process-level isolation (namespaces/cgroups) | Full isolation via hypervisor |
| Performance | Near-native | Overhead from virtualized hardware |
| Density | Many containers per host | Fewer VMs per host |
| Use case | Microservices, fast scaling, CI/CD | Running multiple different OS kernels, strong isolation needs |

A VM virtualizes an entire machine including its own kernel; a container virtualizes only the user space, using the host's kernel.

## Docker Architecture

Docker uses a **client-server architecture**:

1. **Docker Client** – the CLI (`docker` command) or API clients that users interact with. Sends commands to the daemon.
2. **Docker Daemon (`dockerd`)** – runs on the host machine, listens for API requests, and manages Docker objects (images, containers, networks, volumes).
3. **Docker Registry** – stores Docker images (e.g., Docker Hub, private registries like AWS ECR, GitHub Container Registry). `docker pull`/`docker push` interact with a registry.
4. **containerd** – a daemon that manages the container lifecycle (start, stop, pause) at a lower level; Docker uses it under the hood.
5. **runc** – the low-level OCI-compliant runtime that actually creates and runs containers using Linux kernel primitives.

Flow: `docker run` (client) → API request to `dockerd` → daemon checks local image cache → pulls from registry if missing → passes to `containerd` → `runc` creates the container using namespaces & cgroups.

## Core Docker Objects

- **Image** – a read-only template with instructions for creating a container (application code + dependencies + OS libraries).
- **Container** – a runnable instance of an image; the writable layer on top of the image's read-only layers.
- **Dockerfile** – a text file with instructions to build an image.
- **Volume** – a mechanism for persisting data generated/used by containers, outside the container's writable layer.
- **Network** – allows containers to communicate with each other and the outside world.
- **Registry** – a storage/distribution system for images.

## How Docker Achieves Isolation (Linux primitives)

Docker relies on two core Linux kernel features:

1. **Namespaces** – provide isolation of resources so each container thinks it has its own instance of that resource:
   - `pid` – process IDs
   - `net` – network interfaces
   - `mnt` – filesystem mount points
   - `uts` – hostname
   - `ipc` – inter-process communication
   - `user` – user/group IDs

2. **Control Groups (cgroups)** – limit and account for resource usage (CPU, memory, disk I/O, network) per container, preventing one container from starving others.

Together, namespaces provide **isolation** and cgroups provide **resource control**.

## Union File System (UnionFS) & Image Layers

Docker images are built in **layers**, where each Dockerfile instruction (`RUN`, `COPY`, `ADD`, etc.) creates a new, read-only layer. Layers are stacked using a union filesystem (commonly `overlay2` today).

- Layers are **cached** — if a layer hasn't changed, Docker reuses it on rebuild, speeding up builds.
- When a container runs, Docker adds a thin **writable layer** on top of the image's read-only layers (the "container layer").
- Multiple containers can share the same underlying image layers, saving disk space.

## Common Interview Questions

**Q: Is Docker a virtualization technology?**
No, technically Docker is a containerization technology, which is a lighter-weight form of OS-level virtualization — it shares the host kernel rather than virtualizing hardware like a hypervisor does.

**Q: Can a container run on Windows and be deployed on Linux?**
No, by default a Linux container needs a Linux kernel (directly or via a Linux VM on Windows/Mac using Docker Desktop). Windows containers need a Windows kernel. Images are OS/architecture-specific.

**Q: What happens when you run `docker run image_name`?**
1. Docker CLI sends the request to the daemon.
2. Daemon checks if the image exists locally; if not, pulls it from the configured registry.
3. Daemon creates a new container using that image (new writable layer, network interface, etc.).
4. Daemon starts the container's process (the `ENTRYPOINT`/`CMD`).
5. Docker streams output back to the client if run in foreground mode.

**Q: What's the difference between an image and a container?**
An image is a static, read-only template (like a class); a container is a running, live instance of that image (like an object). You can create many containers from one image.
