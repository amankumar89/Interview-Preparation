# Tools and Function Calling

**Tool use** allows an LLM application to interact with external systems instead of only generating text. **Function calling** gives the model a structured way to request an operation, while application code executes the operation and returns the result.

## Why Tools Are Needed

An LLM cannot reliably perform real-world operations from text generation alone.

For example, a travel assistant may need to:

```text
User
 ↓
LLM
 ↓
search_flights(...)
 ↓
Flight API
 ↓
Tool result
 ↓
LLM
 ↓
Response
```

Tools allow an AI system to access current data, databases, APIs, calculators, files, and business systems.

## Tool Definitions

A tool should have a clear name, description, and input schema.

For example:

```json
{
  "name": "get_weather",
  "description": "Get current weather for a city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string"
      }
    },
    "required": ["city"]
  }
}
```

The schema constrains the arguments the model should provide.

## Function Calling

With **function calling**, the model does not directly execute the function. It produces a structured tool request.

Conceptually:

```text
User: "What's the weather in Mumbai?"

LLM:
  tool = get_weather
  arguments = {"city": "Mumbai"}

Application:
  execute get_weather("Mumbai")

Tool:
  {"temperature": 29, "condition": "Cloudy"}

LLM:
  "It's currently 29°C and cloudy in Mumbai."
```

The application remains responsible for execution.

## Tool Execution Loop

A typical agent loop is:

```text
Receive user request
       ↓
Send request + available tools to LLM
       ↓
Does model request a tool?
   ┌───┴───┐
   No     Yes
   ↓       ↓
Answer   Validate arguments
           ↓
       Execute tool
           ↓
       Return result
           ↓
          LLM
           ↓
     Final answer or
       another tool
```

Multiple tool calls may be required to complete one task.

## Tool Validation

Never blindly trust model-generated arguments.

Validate:

- Required fields.
- Data types.
- Allowed enum values.
- Resource ownership.
- Authorization.
- Numeric ranges.
- String lengths.
- Business rules.

For example:

```text
LLM requests:
delete_user(user_id="123")

Application checks:
1. Is the user authenticated?
2. Is the caller authorized?
3. Does user 123 exist?
4. Is deletion allowed?
5. Is confirmation required?
```

The LLM is not a security boundary.

## Read Tools vs Write Tools

Tools can be classified by their side effects.

**Read tools** retrieve information:

```text
get_order()
search_products()
get_customer()
```

**Write tools** change state:

```text
create_order()
send_email()
delete_file()
transfer_money()
```

Write operations require stronger authorization, validation, confirmation, idempotency, and auditing.

## Tool Results

Tool results should contain structured information whenever possible.

For example:

```json
{
  "status": "success",
  "order_id": "ORD-1024",
  "total": 1499,
  "currency": "INR"
}
```

Structured results make it easier for the model and application to process the response consistently.

## Idempotency

An operation is **idempotent** when repeating it produces the same intended final state.

This matters when an agent retries a tool call.

For example, a payment operation should not charge a customer twice because the model or network retried the request.

A common approach is an idempotency key:

```text
create_payment(
  amount=1000,
  idempotency_key="request-abc123"
)
```

The backend can recognize duplicate requests.

## Tool Permissions

Tools should follow the principle of least privilege.

Instead of giving an agent unrestricted database access:

```text
Agent → entire database
```

prefer:

```text
Agent → approved API → limited operation
```

For example, expose:

```text
get_customer_orders(customer_id)
```

rather than:

```text
execute_arbitrary_sql(query)
```

## Tool Errors

Tools should return useful errors without exposing sensitive internals.

Example:

```json
{
  "status": "error",
  "code": "ORDER_NOT_FOUND",
  "message": "The requested order does not exist."
}
```

The model can then recover, ask the user for clarification, or explain that the operation could not be completed.

## Key Takeaways

- Tools extend LLMs beyond text generation.
- Function calling lets the model request structured operations.
- The application executes tools; the model does not become trusted code.
- Tool arguments must be validated and authorized.
- Write tools need stronger safety controls than read tools.
- Idempotency protects state-changing operations from duplicate execution.
- Least-privilege tool design reduces security risk.

## Practice Questions

1. Why should an LLM never be treated as a security boundary?
2. Explain the function-calling loop from user request to final response.
3. Why do write tools require stronger controls than read tools?
4. How does idempotency prevent duplicate side effects?
5. Design a safe tool for an agent that can cancel an order.
