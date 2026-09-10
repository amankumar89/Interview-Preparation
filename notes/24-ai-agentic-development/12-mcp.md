# Model Context Protocol (MCP)

**Model Context Protocol (MCP)** is a standardized way for AI applications to connect models with external tools, resources, and prompts. It separates the AI client from the implementation details of individual integrations, making tool connectivity more reusable.

## The Problem MCP Solves

Without a common protocol, each AI application may implement custom integrations:

```text
AI App → GitHub-specific integration
AI App → Database-specific integration
AI App → Slack-specific integration
AI App → File-system-specific integration
```

MCP provides a common interface:

```text
AI Host / Client
       ↓
      MCP
       ↓
MCP Server
 ├── Tools
 ├── Resources
 └── Prompts
```

This allows compatible clients and servers to communicate through a standardized protocol.

## MCP Architecture

The major concepts are:

- **Host**: The AI application that provides the user-facing environment.
- **MCP client**: The component inside the host that communicates with an MCP server.
- **MCP server**: A program exposing capabilities to the client.
- **Tools**: Operations the model can request.
- **Resources**: Data or contextual information that can be exposed.
- **Prompts**: Reusable prompt templates or interaction patterns.

A host can connect to multiple MCP servers:

```text
                 ┌── MCP Server: GitHub
AI Host ─ Client ├── MCP Server: Database
                 ├── MCP Server: Files
                 └── MCP Server: Internal APIs
```

## MCP Tools

An MCP server can expose tools such as:

```text
search_issues()
get_pull_request()
create_ticket()
query_customer()
```

The AI client can discover available tools and decide when a tool is relevant.

The server remains responsible for executing the operation.

## MCP Resources

**Resources** expose contextual data rather than necessarily representing an action.

Examples include:

```text
file://project/README.md
database://schema
docs://engineering/api
```

Resources can provide information that helps the model understand a task.

## MCP Prompts

**Prompts** are reusable interaction templates exposed through an MCP server.

For example:

```text
review_pull_request
```

could provide a standardized prompt structure for reviewing a pull request according to an organization's engineering rules.

## Tool Discovery

A major advantage of MCP is capability discovery.

Conceptually:

```text
Client connects
      ↓
Server advertises capabilities
      ↓
Client discovers tools/resources/prompts
      ↓
Model can use relevant capabilities
```

This avoids hard-coding every available tool into an individual application.

## MCP Transport

MCP implementations communicate using protocol-defined message exchanges. The exact transport can vary by deployment, with local and remote scenarios using different connection mechanisms.

The important architectural idea is that the client and server communicate through a defined protocol rather than an application-specific function interface.

## MCP vs Direct API Integration

A direct integration might look like:

```text
Application → GitHub SDK → GitHub API
```

With MCP:

```text
AI Application → MCP Client → MCP Server → GitHub API
```

The MCP server can encapsulate authentication, API details, validation, and tool definitions.

This makes integrations easier to reuse across compatible AI clients.

## Security Considerations

MCP does not automatically make an integration safe.

Important controls include:

- Authentication.
- Authorization.
- Input validation.
- Least privilege.
- Secret management.
- Tool approval.
- Audit logging.
- Network isolation.
- Output validation.

A dangerous MCP server could expose destructive operations, so users and administrators should treat connected servers as trusted software with potentially meaningful access.

## MCP in Agentic Systems

MCP fits naturally into agent architectures:

```text
User
 ↓
Agent / LLM
 ↓
MCP client
 ↓
MCP servers
 ├── Search
 ├── Database
 ├── GitHub
 └── Internal systems
```

The agent can reason about which capability to use while the protocol provides a standardized integration layer.

## Key Takeaways

- MCP standardizes how AI applications connect to external capabilities.
- Hosts contain MCP clients that communicate with MCP servers.
- Servers can expose tools, resources, and prompts.
- MCP separates AI reasoning from integration implementation.
- MCP can make integrations reusable across compatible AI clients.
- MCP itself does not replace authentication, authorization, or security controls.

## Practice Questions

1. What problem does MCP solve compared with custom integrations?
2. Explain the roles of host, MCP client, and MCP server.
3. What is the difference between an MCP tool and resource?
4. Why does MCP not eliminate the need for authorization?
5. Design an MCP server for an internal engineering knowledge system.
