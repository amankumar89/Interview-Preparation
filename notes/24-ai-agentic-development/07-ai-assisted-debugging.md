# AI-Assisted Debugging

**AI-assisted debugging** uses AI to analyze errors, inspect code, form hypotheses, and suggest fixes. It works best when the developer provides concrete evidence such as stack traces, logs, reproduction steps, failing tests, and relevant source code.

## Debugging Evidence

Useful information includes:

- Exact error message.
- Stack trace.
- Expected behavior.
- Actual behavior.
- Steps to reproduce.
- Recent changes.
- Relevant source code.
- Environment details.
- Failing test output.

For example:

```text
Expected:
GET /api/users/1 returns HTTP 200.

Actual:
GET /api/users/1 returns HTTP 500.

Exception:
NullPointerException in UserService.findById().
```

This is much more useful than:

```text
The API is broken. Fix it.
```

## Root Cause Analysis

AI may identify a symptom instead of the root cause.

For example:

```text
NullPointerException
```

A null check might hide the exception:

```java
if (user == null) {
    return null;
}
```

But the real problem may be that a repository or service returned an invalid state.

A better debugging request is:

```text
Identify where the invalid state is first introduced.
Explain the root cause before proposing the fix.
```

## Reproduction

Reliable debugging begins with reproduction.

A useful process is:

```text
Observe Failure
     ↓
Reproduce
     ↓
Collect Evidence
     ↓
Form Hypothesis
     ↓
Test Hypothesis
```

Without reproduction, the developer may fix an unrelated problem.

## Regression Tests

After fixing a bug, create a test that captures the failure.

For example:

```text
Original bug:
Expired password-reset token was accepted.

Regression test:
Given an expired token,
when reset-password is called,
then the API rejects the request.
```

This prevents the same bug from returning later.

## Agentic Debugging

A coding agent can perform multiple debugging steps:

```text
Read test failure
     ↓
Search relevant code
     ↓
Inspect related tests
     ↓
Form hypothesis
     ↓
Modify implementation
     ↓
Run tests
     ↓
Inspect results
```

The agent should continue until the acceptance criteria are satisfied or it reaches a clearly identified blocker.

## Verification

A fix should be verified using:

- Unit tests.
- Integration tests.
- Reproduction steps.
- Build checks.
- Static analysis.
- Manual verification where appropriate.

An AI saying "the issue is fixed" is not evidence by itself.

## Key Takeaways

- AI debugging is strongest when based on concrete evidence.
- Root cause analysis is more valuable than symptom suppression.
- Reproduction makes debugging more reliable.
- Regression tests preserve bug fixes.
- Test and build results provide objective verification.
- AI claims should never replace actual verification.

## Practice Questions

1. What information should be provided when asking AI to debug an exception?
2. Why is a null check not always a valid root-cause fix?
3. What is the purpose of reproduction in debugging?
4. What is a regression test?
5. How can a coding agent use test failures to debug?
6. How would you verify an AI-generated bug fix?