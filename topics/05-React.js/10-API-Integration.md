# React.js — 10 API Integration

## Fundamentals

### Q1. How do React components usually fetch data from an API?

**Interview Answer:**

React components typically fetch data inside `useEffect` after mount, then store the response in state. Loading and error states are also managed in state.

```jsx
useEffect(() => {
  fetch("/api/users")
    .then((res) => res.json())
    .then(setData)
    .catch(setError);
}, []);
```

### Q2. Why do we fetch inside `useEffect`?

**Interview Answer:**

Because the data request is a side effect that should happen after the component renders. It is preferred over fetching during render because render should stay pure and predictable.

### Q3. What are the common states in API integration?

**Interview Answer:**

We typically manage `loading`, `error`, and `success` states. These states help the UI show loaders, handle errors, and render the final data.

### Q4. What is the difference between `fetch` and `axios`?

**Interview Answer:**

`fetch` is built into the browser and is simple, while `axios` is a popular library with cleaner syntax, request cancellation support, and better interceptors for larger apps.

### Q5. How do you handle loading states?

**Interview Answer:**

Set a loading flag before the request starts and show a spinner or skeleton until the response arrives. This improves user trust and UX.

### Q6. What is an error boundary in relation to API errors?

**Interview Answer:**

Error boundaries catch render errors, but API failures are usually handled with a local error state in the component. These are separate concerns: render failure versus network failure.

### Q7. How do you handle API errors in React?

**Interview Answer:**

Wrap the request in `try/catch`, check `response.ok`, and store the error message in state so the UI can display a friendly failure message.

### Q8. Why is it important to avoid calling APIs in render?

**Interview Answer:**

Rendering should be side-effect free. Calling an API during render can trigger repeated requests, poor performance, and infinite loops.

### Q9. What is cancellation of requests?

**Interview Answer:**

Cancellation stops an in-flight API request when the component unmounts or when a new request replaces the old one. This avoids memory leaks and stale responses.

### Q10. What is stale data?

**Interview Answer:**

Stale data is outdated information that remains visible after state changes or a background refresh. It often happens when an old response arrives after a newer one.

### Q11. How do you prevent stale responses?

**Interview Answer:**

Track a mounted flag or request ID, ignore outdated responses, or cancel the request when dependencies change. This makes the UI behave predictably.

### Q12. What is optimistic UI?

**Interview Answer:**

Optimistic UI immediately updates the interface as if a request succeeded, then rolls back if the API fails. It improves perceived performance for actions like likes, comments, or cart updates.

### Q13. What is data refetching?

**Interview Answer:**

Data refetching reloads fresh data after a mutation or on a timer. It is useful for dashboards, notifications, and user timelines that need current data.

### Q14. What is a common anti-pattern in API integration?

**Interview Answer:**

A common anti-pattern is putting fetch logic directly in multiple components without a clean abstraction. This duplicates logic, makes maintenance harder, and increases the risk of inconsistent error handling.

### Q15. How do you handle pagination or filters in API calls?

**Interview Answer:**

Use state for pagination and filters, then trigger a request whenever those values change. Keep the request logic clean and avoid duplicate fetches when inputs are unchanged.

### Q16. Why use `AbortController`?

**Interview Answer:**

`AbortController` allows an in-flight fetch to be canceled when the component cleans up or a new request is triggered. It is important in React apps with dynamic data fetching.

### Q17. What is the role of a custom hook in API integration?

**Interview Answer:**

A custom hook can encapsulate fetch logic, loading state, and error handling so multiple components can reuse it consistently. This keeps components cleaner and improves maintainability.

### Q18. What is the difference between API integration and state management?

**Interview Answer:**

API integration handles communication with the backend. State management handles application data flow and how UI components react to that data. They work together, but they are not the same responsibility.

## Practical Questions

### Q19. What is a common pattern for POST requests in React?

**Interview Answer:**

Submit the form data, set loading state, call the API, update local state or refetch the list, and show success or error feedback to the user.

### Q20. What is the biggest goal when integrating APIs in React?

**Interview Answer:**

The goal is to keep the UI responsive, predictable, and resilient. Good API integration combines proper loading/error states, request cancellation, and clear data flow so users do not experience stale or broken interfaces.
