# Docker Networking

## Network Drivers (Types)

Docker supports several built-in network drivers, each suited to different use cases.

| Driver | Description | Use Case |
|---|---|---|
| `bridge` | Default driver; creates a private internal network on the host. Containers get an internal IP and can talk to each other. | Default for standalone containers on a single host |
| `host` | Removes network isolation; container shares the host's network namespace directly. | High-performance networking, when port mapping overhead must be avoided |
| `none` | No networking at all; container is fully isolated. | Security-sensitive workloads needing zero network access |
| `overlay` | Creates a distributed network across multiple Docker hosts (uses VXLAN). | Docker Swarm multi-host communication |
| `macvlan` | Assigns a MAC address to a container so it appears as a physical device on the network. | Legacy apps expecting direct L2 network access |
| `ipvlan` | Similar to macvlan but shares a MAC address, using L3 routing. | Environments with MAC address limits |

## Default Bridge vs User-Defined Bridge

- The **default `bridge` network** exists automatically but has limitations: containers can only reach each other by IP (not by name) unless legacy `--link` is used, and it provides weaker isolation between unrelated container groups.
- A **user-defined bridge network** (`docker network create mynet`) is strongly recommended in practice because it provides:
  - **Automatic DNS resolution** — containers can reach each other using their container name or network alias as a hostname.
  - **Better isolation** — only containers explicitly attached to that network can communicate.
  - Ability to dynamically connect/disconnect running containers.

```bash
docker network create mynet
docker run -d --name db --network mynet postgres
docker run -d --name app --network mynet myapp   # 'app' can reach db via hostname "db"
```

## Key Networking Commands

```bash
docker network ls                          # list networks
docker network create mynet                # create a user-defined bridge network
docker network inspect mynet                # show connected containers, subnet, gateway
docker network connect mynet mycontainer    # attach a running container to a network
docker network disconnect mynet mycontainer # detach
docker network rm mynet                     # remove an unused network
```

## Port Publishing

```bash
docker run -d -p 8080:80 nginx      # host:container — maps host port 8080 to container port 80
docker run -d -p 127.0.0.1:8080:80 nginx  # bind only to localhost on the host
docker run -d -P nginx               # publish all EXPOSEd ports to random host ports
```

Internally, Docker sets up `iptables` NAT rules to forward traffic from the host port to the container's internal IP:port.

## Container-to-Container Communication

- **Same user-defined network:** communicate directly via container name (DNS) — no port publishing needed, since traffic never leaves the Docker network.
- **Different networks:** not reachable unless explicitly connected to a shared network, or traffic is routed through the host with published ports.
- **Docker Compose:** automatically creates a dedicated network per project, and service names become resolvable hostnames.

## `host` Network Mode

```bash
docker run --network host nginx
```

- The container shares the host's network stack directly — no NAT, no isolated IP.
- Pros: lower latency, no port-mapping overhead.
- Cons: no port isolation (container binds directly to host ports, so conflicts are possible), weaker security isolation. Not available on Docker Desktop for Mac/Windows in the same way as native Linux.

## DNS Resolution Inside Docker

- Docker runs an embedded DNS server (at `127.0.0.11`) inside each container connected to a user-defined network, resolving other container names/aliases to their internal IPs.
- You can also set custom DNS servers with `--dns`.

## Common Interview Questions

**Q: Why can't two containers on the default `bridge` network reach each other by name?**
The default `bridge` network doesn't provide automatic DNS-based service discovery between containers (that feature is specific to user-defined networks). On the default bridge, you'd need to use `--link` (deprecated) or communicate via container IP addresses directly.

**Q: How do containers on the same host but different Docker networks communicate?**
They can't communicate directly unless: (1) one or both containers are also attached to a shared network via `docker network connect`, or (2) traffic is routed externally through the host using published ports.

**Q: What's the difference between `EXPOSE` in a Dockerfile and `-p` in `docker run`?**
`EXPOSE` is purely documentation metadata in the image — it doesn't actually open any port. `-p` (or `-P`) at runtime is what actually creates the NAT/port-forwarding rule that makes a container's port reachable from the host or outside world.

**Q: When would you use `macvlan` instead of `bridge`?**
When you need containers to appear as distinct physical devices directly on the LAN, with their own MAC/IP addresses reachable by other devices on the network — common for legacy applications, network appliances, or monitoring tools that expect direct L2 network presence rather than NAT'd bridge networking.

**Q: How does Docker Compose handle networking by default?**
Compose automatically creates a single default network per project (named `<project>_default`), attaches all services to it, and makes each service reachable by other services using its Compose service name as the hostname.
