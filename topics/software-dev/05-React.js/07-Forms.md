# React.js — 07 Forms

## Fundamentals

### Q1. What is a controlled form input in React?

**Interview Answer:**

A controlled input is an input whose value is stored in React state. The UI is driven by state, and updates happen via `onChange` events.

```jsx
function Form() {
  const [name, setName] = useState("");

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

### Q2. What is an uncontrolled form input?

**Interview Answer:**

An uncontrolled input stores its value in the DOM rather than in React state. It is often accessed via refs when the value is not needed frequently.

```jsx
function Form() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} />;
}
```

### Q3. Why are controlled components preferred in React forms?

**Interview Answer:**

Controlled components make validation, resetting, and dynamic UI easy because the input value always mirrors the application state. They are generally easier to reason about in React apps.

### Q4. What is form validation?

**Interview Answer:**

Form validation checks whether user input is valid before submission. It can happen on submit, on blur, or as the user types. Validation is crucial for password rules, email checks, and required fields.

### Q5. How do you handle form submission in React?

**Interview Answer:**

You attach an `onSubmit` handler to the form and prevent default browser submission behavior. Then you can validate and send data to the server or update app state.

```jsx
<form
  onSubmit={(e) => {
    e.preventDefault();
    console.log("submitted");
  }}
>
  <input name="email" />
</form>
```

### Q6. What is the purpose of `event.preventDefault()` in forms?

**Interview Answer:**

It prevents the browser from performing the default form submit action, which would reload the page. This lets React handle the submission in JavaScript.

### Q7. How do you store multiple form fields?

**Interview Answer:**

You can store each field in its own state value or keep all form values in a single object. A single object is common for real apps because it is easier to validate and submit as a unit.

```jsx
const [form, setForm] = useState({ name: "", email: "" });
```

### Q8. What is a common pattern for updating a form object in state?

**Interview Answer:**

Use a generic handler that updates the field matching the input name while preserving the rest of the object.

```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};
```

### Q9. How do you reset a form?

**Interview Answer:**

Reset the form state back to the initial values and optionally clear the DOM values if using uncontrolled inputs. For controlled components, resetting state is enough.

### Q10. What is the difference between `onChange` and `onInput`?

**Interview Answer:**

`onChange` is the React event used for input changes and is the standard for form fields. `onInput` is more native-browser-oriented and is less commonly used in React patterns.

### Q11. How do you validate email fields in React?

**Interview Answer:**

Use a regex or a validation library, then compare the input value against expected rules. Better UI often shows inline errors when the field is invalid.

### Q12. What is a checkbox or radio form pattern in React?

**Interview Answer:**

Checkboxes and radio buttons also need controlled values. The checked state usually comes from React state, and the handler updates the boolean or selected value.

### Q13. Why are file inputs tricky in React?

**Interview Answer:**

File inputs are usually read-only from the UI perspective because they represent a file object from the browser. They are often handled using `input type="file"` with `ref` or `FileReader`.

### Q14. What is form accessibility best practice?

**Interview Answer:**

Associate labels with inputs, provide clear error messaging, use semantic `<form>`, and ensure keyboard navigation works properly. Screen-reader support is critical for production forms.

### Q15. How do you handle async form submission?

**Interview Answer:**

Use loading and error states, disable the submit button while the request is in progress, and show success or validation feedback after the request finishes.

### Q16. What is a common form bug in React?

**Interview Answer:**

A common bug is updating state incorrectly by mutating the existing object instead of returning a new one. This breaks React’s change detection and can lead to stale form values.

### Q17. What is a real-world pattern for multi-step forms?

**Interview Answer:**

Store the form values in a single state object and progress through steps by updating a `currentStep` state. Each step only renders a subset of fields while all data remains in one shape.

### Q18. When would you use `useRef` instead of state in forms?

**Interview Answer:**

Use `useRef` for temporary or non-UI values such as focusing an input, tracking the previous value, or reading a DOM element. For user-entered values that affect rendering, state is usually the correct choice.

## Practical Questions

### Q19. How do you implement debounced input search in React?

**Interview Answer:**

Store the search term in state and use a timeout to delay API requests until the user stops typing. This reduces unnecessary requests and improves performance.

### Q20. What is the most important rule in form handling?

**Interview Answer:**

Keep the user data flow explicit and validated. React state should represent the current form state, and user actions should update it in a predictable, immutable way.
