# Docker Compose

## What is Docker Compose?

Docker Compose is a tool for defining and running **multi-container** Docker applications using a single declarative YAML file (`docker-compose.yml` / `compose.yaml`). Instead of running many long `docker run` commands manually, you describe all services, networks, and volumes in one file and manage the whole stack with simple commands.

## Basic Structure

```yaml
version: "3.9"

services:
  web:
    build: ./web
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    networks:
      - appnet
    restart: unless-stopped

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - dbdata:/var/lib/postgresql/data
    networks:
      - appnet

volumes:
  dbdata:

networks:
  appnet:
```

(Note: modern Compose Spec no longer requires the top-level `version:` key, but it's still widely seen in existing projects.)

## Common Commands

```bash
docker compose up -d          # build (if needed) and start all services, detached
docker compose down            # stop and remove containers, networks (keeps volumes by default)
docker compose down -v          # also remove named volumes
docker compose ps               # list running services
docker compose logs -f web      # stream logs for a specific service
docker compose build            # (re)build images
docker compose exec web sh      # shell into a running service container
docker compose restart web      # restart one service
docker compose stop / start     # stop/start without removing containers
docker compose config           # validate & print the resolved configuration
```

## Key Concepts

- **Service** – a definition for one type of container (can be scaled to multiple replicas via `docker compose up --scale web=3` in non-Swarm mode, though this has limitations without a load balancer).
- **`depends_on`** – controls **startup order** only (container start, not readiness). For true "wait until ready" behavior, use healthchecks combined with `depends_on: condition: service_healthy`, or an app-level retry/wait mechanism.
- **Networks** – Compose automatically creates a default network for the project; services can reach each other by service name as hostname.
- **Volumes** – top-level `volumes:` declares named volumes that persist independent of `docker compose down` (unless `-v` is passed).
- **`.env` file** – Compose automatically reads a `.env` file in the project directory for variable substitution (`${VAR}`) inside the compose file.

## `depends_on` with Healthchecks

```yaml
services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
```

This ensures `app` only starts once `db`'s healthcheck reports healthy, not just once the `db` container process has started.

## Overriding Configuration per Environment

Compose supports merging multiple files:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Common pattern: a base `docker-compose.yml` plus environment-specific overrides (`docker-compose.override.yml` is loaded automatically if present alongside the base file).

## Compose vs Kubernetes

| Aspect | Docker Compose | Kubernetes |
|---|---|---|
| Scope | Single host | Multi-node cluster |
| Complexity | Simple, declarative YAML | Steeper learning curve, many object types |
| Scaling | Limited, manual (`--scale`) | Robust auto-scaling (HPA/VPA), self-healing |
| Networking | Simple bridge network per project | Advanced (Services, Ingress, CNI plugins) |
| Use case | Local dev, small deployments, simple CI test stacks | Production-grade, large-scale, highly available systems |
| Rolling updates | Not natively supported | Native rolling updates & rollbacks |

Compose is typically used for local development and testing; Kubernetes (or Docker Swarm) is used for production-grade orchestration across multiple machines.

## Common Interview Questions

**Q: Does `depends_on` guarantee a dependent service is fully "ready" before the next one starts?**
No — by default it only guarantees the container has been *started* (its process launched), not that the application inside is actually ready to accept connections (e.g., a database might still be initializing). Use `condition: service_healthy` with a proper `healthcheck`, or implement retry/backoff logic in the dependent application, to handle true readiness.

**Q: How do you persist database data across `docker compose down` and `up` cycles?**
Declare a named volume under the top-level `volumes:` key and mount it into the database service (e.g., `dbdata:/var/lib/postgresql/data`). Named volumes survive `docker compose down` by default; they're only removed if you explicitly run `docker compose down -v` or `docker volume rm`.

**Q: How does networking work between services in Compose by default?**
Compose creates one default bridge network per project and attaches every service to it. Each service becomes reachable by other services using its **service name** as a DNS hostname — e.g., an `app` service can connect to `db:5432` without needing to know its actual IP.

**Q: When would you choose Docker Compose over Kubernetes, and vice versa?**
Compose is ideal for local development, small single-host deployments, and CI test environments where simplicity and speed matter more than high availability. Kubernetes is preferred for production workloads needing multi-node scaling, self-healing, rolling deployments, service discovery across a cluster, and sophisticated traffic management — at the cost of significantly more operational complexity.
