# Docker Containers

## Container Lifecycle

```
Created → Running → Paused → Stopped (Exited) → Removed
```

- **Created** – container exists but hasn't started (`docker create`).
- **Running** – process is active (`docker start` / `docker run`).
- **Paused** – all processes are suspended via cgroups freezer (`docker pause`).
- **Stopped/Exited** – main process has exited; container object still exists, filesystem retained (`docker stop`).
- **Removed** – container and its writable layer are deleted (`docker rm`).

## Essential Container Commands

```bash
docker run -d --name web -p 8080:80 nginx        # create + start, detached, port-mapped
docker ps                                          # list running containers
docker ps -a                                       # list all containers (including stopped)
docker stop web                                    # graceful stop (SIGTERM, then SIGKILL after timeout)
docker kill web                                     # immediate stop (SIGKILL)
docker start web                                    # start a stopped container
docker restart web                                  # stop + start
docker rm web                                       # remove a stopped container
docker rm -f web                                     # force remove a running container
docker logs -f web                                   # stream logs
docker exec -it web bash                             # run a shell inside a running container
docker inspect web                                    # detailed JSON metadata
docker stats                                          # live resource usage (CPU/mem/net/IO)
docker top web                                        # processes running inside the container
docker cp web:/app/log.txt ./log.txt                  # copy files to/from a container
docker attach web                                     # attach to the container's main process stdio
```

## `docker run` — Key Flags

| Flag | Purpose |
|---|---|
| `-d` | Run in detached (background) mode |
| `-it` | Interactive with a pseudo-TTY (for shells) |
| `--name` | Assign a custom container name |
| `-p host:container` | Publish a container port to the host |
| `-v` / `--mount` | Mount a volume or bind mount |
| `-e KEY=value` | Set an environment variable |
| `--env-file` | Load environment variables from a file |
| `--rm` | Automatically remove the container when it exits |
| `--network` | Attach to a specific network |
| `--restart` | Restart policy (`no`, `on-failure`, `always`, `unless-stopped`) |
| `--memory`, `--cpus` | Resource limits |
| `--entrypoint` | Override the image's `ENTRYPOINT` |

## `docker stop` vs `docker kill`

- `docker stop` sends **SIGTERM** first, giving the process a grace period (default 10s) to shut down cleanly, then sends **SIGKILL** if it hasn't exited.
- `docker kill` sends **SIGKILL** (or another specified signal) immediately, forcibly terminating the process with no cleanup opportunity.
- Applications should have a `SIGTERM` handler to close DB connections, flush buffers, etc., for graceful shutdown.

## Restart Policies

```bash
docker run --restart=always myapp
```

- `no` (default) – never automatically restart.
- `on-failure[:max-retries]` – restart only if the container exits with a non-zero code.
- `always` – always restart regardless of exit status, even after a Docker daemon restart.
- `unless-stopped` – like `always`, but doesn't restart if the container was explicitly stopped by the user before a daemon restart.

## Resource Limits (via cgroups)

```bash
docker run -d --memory=512m --cpus=1.5 --name app myapp
```

- `--memory` caps RAM; if exceeded, the container's process is typically OOM-killed.
- `--cpus` limits CPU allocation (fractional values allowed, e.g., 0.5 = half a core).
- `--memory-swap`, `--cpu-shares` (relative weighting), `--pids-limit` are also available.
- Setting limits prevents a single "noisy neighbor" container from starving others on the same host.

## Container Networking Basics (see also 05-docker-networking.md)

- By default, containers on the same **bridge network** can reach each other by container name (via embedded DNS) if on a user-defined bridge (not the default `bridge` network, which requires `--link` or IP addressing).
- `-p 8080:80` publishes container port 80 to host port 8080, allowing external access.
- `--network host` shares the host's network namespace directly (no port mapping needed, but less isolation).

## Inspecting & Debugging Containers

```bash
docker logs --tail 100 -f mycontainer     # last 100 lines, follow
docker exec -it mycontainer sh            # get a shell inside
docker inspect mycontainer | jq .State    # check exit code, status, health
docker events                              # stream real-time Docker daemon events
docker diff mycontainer                    # show filesystem changes vs the image
```

Typical debugging flow for a crashing container:
1. `docker ps -a` to see exit code and status.
2. `docker logs <container>` to see stdout/stderr before it died.
3. `docker inspect <container>` → check `State.ExitCode`, `State.OOMKilled`, `State.Error`.
4. If needed, override the entrypoint to get a shell instead of the failing command: `docker run -it --entrypoint sh myimage`.

## Common Exit Codes

| Code | Meaning |
|---|---|
| 0 | Success — clean exit |
| 1 | General application error |
| 125 | Docker daemon error (e.g., invalid `docker run` flag) |
| 126 | Command found but not executable |
| 127 | Command not found |
| 137 | Container received SIGKILL (128+9) — often an OOM kill |
| 143 | Container received SIGTERM (128+15) |

## Common Interview Questions

**Q: What happens to data inside a container when it's removed?**
Any data written to the container's writable layer (not in a volume or bind mount) is permanently lost when the container is removed. This is why stateful data should always live in a **volume** or **bind mount**, not the container's own filesystem.

**Q: How do you limit a container's memory/CPU usage, and what happens if it exceeds the memory limit?**
Use `--memory` and `--cpus` flags (or equivalent Compose/Kubernetes resource specs). These map to Linux cgroups. If a container exceeds its memory limit, the kernel's OOM killer typically kills the offending process, and the container exits with code 137.

**Q: What's the difference between `docker exec` and `docker attach`?**
`docker exec` starts a **new process** inside an already-running container (commonly used to open a debug shell) — exiting that shell doesn't stop the container. `docker attach` connects your terminal directly to the container's **existing main process** (PID 1) stdin/stdout/stderr — if that process is a shell and you exit it, the container itself may stop.

**Q: How can you make a container automatically restart if it crashes?**
Use `--restart on-failure` or `--restart always`/`unless-stopped` at `docker run` time, or configure `restart:` policy in a Compose file, or rely on the orchestrator's (e.g., Kubernetes) restart/reschedule logic.
