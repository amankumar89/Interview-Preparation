# React.js — 12 Testing

## Fundamentals

### Q1. Why is testing important in React applications?

**Interview Answer:**

Testing helps ensure UI behavior remains correct as changes are made. It reduces regressions, makes refactors safer, and provides confidence when shipping features to production.

### Q2. What are the main types of testing in frontend apps?

**Interview Answer:**

The most common categories are unit tests, integration tests, and end-to-end tests. Unit tests validate isolated logic, integration tests validate component interaction, and E2E tests validate complete user flows.

### Q3. What is React Testing Library?

**Interview Answer:**

React Testing Library is a testing tool that encourages testing behavior from a user’s perspective rather than implementation details. It is widely used in modern React apps.

### Q4. What is the difference between testing implementation and testing behavior?

**Interview Answer:**

Testing implementation checks internal details like state or method calls. Testing behavior verifies what the user sees and interacts with, which is more valuable and resilient to refactoring.

### Q5. How do you test a clicked button in React?

**Interview Answer:**

Render the component, find the button via accessible role or text, and trigger a click event. Then assert that the expected UI change occurs.

```jsx
render(<Counter />);
fireEvent.click(screen.getByRole("button", { name: /increment/i }));
expect(screen.getByText("1")).toBeInTheDocument();
```

### Q6. Why are accessible queries preferred?

**Interview Answer:**

Accessible queries match what users and assistive technologies interact with. They align with accessibility best practices and make tests more robust.

### Q7. What is a mock in testing?

**Interview Answer:**

A mock replaces a real dependency with a controlled fake implementation. This is useful for APIs, timers, and browser APIs that are not available or should not be invoked in the test.

### Q8. When should you mock a network request?

**Interview Answer:**

Mock the network layer when testing component behavior without calling a real backend. This keeps the test fast, deterministic, and independent of external services.

### Q9. How do you test asynchronous UI updates?

**Interview Answer:**

Use `findBy...` queries or `waitFor` to wait for async state changes after API requests or timers fire. This makes the test wait for the UI to settle correctly.

### Q10. What is a good test for a form?

**Interview Answer:**

A good form test fills inputs, submits the form, and verifies the expected feedback, validation message, or API call. It checks behavior rather than implementation details.

### Q11. What is snapshot testing?

**Interview Answer:**

Snapshot testing captures a rendered output and compares it to a stored snapshot. It is useful for simple UI structures but should not replace behavior-driven tests for critical logic.

### Q12. What is the risk of too much mocking?

**Interview Answer:**

Over-mocking can hide real integration issues and lead to tests that pass while the real app fails. Mock at the boundary only when needed, and prefer real behavior when possible.

### Q13. How do you test loading and error states?

**Interview Answer:**

Render the component with a mocked request that resolves or rejects, then assert that the loading indicator appears before success or error UI appears after the async step.

### Q14. What is integration testing in React?

**Interview Answer:**

Integration testing verifies that multiple components work together correctly, such as a form, button, and API call working as a single system.

### Q15. What is end-to-end testing?

**Interview Answer:**

End-to-end tests simulate real user flows in a browser, checking complete scenarios such as login, checkout, or page navigation. Tools like Playwright and Cypress are commonly used.

### Q16. What is the role of Jest in React tests?

**Interview Answer:**

Jest is a test runner that provides assertions, mocking, and test lifecycle support. It is commonly paired with React Testing Library in React apps.

### Q17. Why should tests focus on user-visible outputs?

**Interview Answer:**

User-visible behavior is the contract the app promises. If tests assert on internal implementation details, they become fragile and less valuable when refactoring.

### Q18. What is a common mistake in React tests?

**Interview Answer:**

A common mistake is asserting on state values or internal function calls instead of the UI result. This makes tests too coupled to implementation and less reliable over time.

## Practical Questions

### Q19. How do you test a component that uses `useEffect` for fetching?

**Interview Answer:**

Mock the fetch or API call, render the component, wait for the async effect to complete, and assert that the data appears in the UI. Use proper async queries or `waitFor`.

### Q20. What is the key principle of testing in production React code?

**Interview Answer:**

Write tests that verify the behavior users rely on, keep them stable across refactors, and cover important flows such as validation, loading, error handling, and happy paths. Good tests save a lot of time in production troubleshooting.
