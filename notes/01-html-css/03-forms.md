# Forms

HTML forms collect user input and submit it to a server, or hand it off to JavaScript for processing. They are built from the `<form>` element and a set of input-related elements, each with its own validation and behavior rules.

## The Form Element

```html
<form action="/submit" method="POST">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />
  <button type="submit">Submit</button>
</form>
```

`action` is the URL the form data is sent to; `method` is the HTTP method (`GET` appends data to the URL, `POST` sends it in the request body). Every input needs a `name` attribute — without it, the field's value is not included when the form is submitted.

## Input Types

The `<input>` element's `type` attribute changes both its behavior and the UI the browser renders:

```html
<input type="text" />
<input type="email" />
<input type="password" />
<input type="number" min="0" max="100" />
<input type="checkbox" />
<input type="radio" name="plan" value="basic" />
<input type="date" />
<input type="file" />
```

Using the right type matters beyond convenience — `type="email"` triggers email-format validation and shows an email-optimized keyboard on mobile; `type="number"` restricts input and shows numeric controls.

## Labels

`<label>` associates descriptive text with a form control, either by wrapping it or via the `for`/`id` pairing:

```html
<label for="username">Username</label>
<input type="text" id="username" name="username" />
```

This isn't just visual — clicking the label focuses the input, and screen readers announce the label when the field receives focus. Inputs without an associated label are an accessibility failure.

## Other Form Controls

`<textarea>` provides multi-line text input. `<select>` with nested `<option>` elements creates a dropdown:

```html
<select name="country">
  <option value="us">United States</option>
  <option value="in">India</option>
</select>
```

`<fieldset>` groups related controls, with `<legend>` providing a caption for the group — commonly used for radio button sets.

## Validation

HTML supports built-in validation without JavaScript:

```html
<input type="text" required minlength="3" maxlength="20" pattern="[A-Za-z]+" />
```

`required` prevents empty submission, `minlength`/`maxlength` bound text length, and `pattern` takes a regular expression the value must match. The browser blocks submission and shows a native error message if validation fails. This is convenient but should not be relied on alone — server-side validation is still necessary, since client-side checks can be bypassed.

## Submitting Forms

A `<button type="submit">` (or an `<input type="submit">`) triggers form submission. `type="button"` does nothing on its own and is typically used with JavaScript. `type="reset"` clears the form back to its default values. Pressing Enter inside a text field also submits the form by default.

## Practice Questions

1. Why does an `<input>` need a `name` attribute to be submitted with the form?
2. What's the difference between `GET` and `POST` as a form's `method`?
3. Why is associating a `<label>` with its input important, beyond appearance?
4. Why shouldn't you rely solely on HTML's built-in validation attributes like `required` and `pattern`?
5. What does `<fieldset>` and `<legend>` add when grouping a set of radio buttons?
