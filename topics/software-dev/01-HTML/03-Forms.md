# HTML — 03 Forms

<!--
This file is a living interview question bank.
Generate questions from beginner → intermediate → advanced → scenario/production.
See AGENTS.md and .agentic/MASTER_PROMPT.md.
-->

## Fundamentals

### Q1. What is the purpose of an HTML form?

**Interview Answer:**

A form groups controls for collecting user input and submitting it to a server or handling it with client-side code. The `action` identifies the destination and `method` describes how the data is sent.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Sign up</button>
</form>
```

### Q2. Why are `label` and `name` important?

`label` gives a control an accessible, clickable name. The `name` becomes the key submitted with the form data. An input without a `name` is generally not included in a native form submission.

### Q3. What are common HTML input types?

Common types include `text`, `email`, `password`, `number`, `date`, `checkbox`, `radio`, `file`, `search`, and `hidden`. The type influences validation, mobile keyboards, semantics, and browser UI.

## Core Concepts

### Q4. What is the difference between `GET` and `POST` for forms?

`GET` places successful controls in the URL and is appropriate for safe, repeatable retrieval such as search. `POST` sends the data in the request body and is appropriate for state-changing operations or larger/private input. HTTPS is required for transport confidentiality in either case.

### Q5. What is the difference between `disabled` and `readonly`?

Disabled controls cannot be focused or edited and are not submitted. Read-only controls can be focused and submitted but cannot be edited. Neither should be treated as a security control because clients can modify the request.

### Q6. How do checkboxes and radio buttons submit values?

Only checked checkboxes submit a name/value pair. Radio buttons with the same `name` form one mutually exclusive group, and the selected radio submits its value.

```html
<label
  ><input type="checkbox" name="terms" value="accepted" /> Accept terms</label
>
<label><input type="radio" name="plan" value="pro" /> Pro</label>
<label><input type="radio" name="plan" value="basic" /> Basic</label>
```

### Q7. What is native constraint validation?

The browser can validate constraints such as `required`, `type="email"`, `min`, `max`, `minlength`, `maxlength`, and `pattern` before submission. `checkValidity()` reports validity and `reportValidity()` displays the browser's validation UI.

## Practical Questions

### Q8. How do you associate a field with an error message?

Give the field an accessible label and associate the error with `aria-describedby`. Set `aria-invalid="true"` when the current value is invalid, and place a clear error message near the field.

```html
<label for="password">Password</label>
<input
  id="password"
  name="password"
  type="password"
  aria-describedby="password-error"
  aria-invalid="true"
/>
<p id="password-error">Use at least 12 characters.</p>
```

### Q9. What does the `autocomplete` attribute do?

It tells the browser what kind of value a control expects, allowing useful autofill and password-manager behavior. Use standardized tokens such as `email`, `name`, `street-address`, and `one-time-code` rather than disabling autocomplete without a valid reason.

### Q10. How do you upload a file with a form?

Use `input type="file"` and set the form's encoding to `multipart/form-data`.

```html
<form action="/avatar" method="post" enctype="multipart/form-data">
  <label for="avatar">Profile photo</label>
  <input id="avatar" name="avatar" type="file" accept="image/png,image/jpeg" />
  <button type="submit">Upload</button>
</form>
```

The server must validate size, type, content, authorization, and storage behavior independently.

## Debugging and Production

### Q11. Why does clicking a button unexpectedly submit a form?

Inside a form, a `button` defaults to `type="submit"`. Set `type="button"` for non-submitting controls such as a password visibility toggle, and keep `type="submit"` for the actual submission control.

### Q12. Is client-side validation enough?

No. Client-side validation improves feedback and reduces bad requests, but users can bypass it or alter the request. The server must validate every field, enforce authorization, normalize data, and protect state-changing requests against CSRF where applicable.

### Q13. How should a multi-step form be made reliable?

Give each step a clear heading, preserve entered values, expose progress, support keyboard navigation, validate at the appropriate boundary, and make it possible to return to previous steps. On the server, treat each step's data as untrusted and handle retries idempotently when submission can be repeated.
