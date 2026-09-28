# React.js — 09 Redux Toolkit

## Fundamentals

### Q1. What is Redux?

**Interview Answer:**

Redux is a predictable state management library for JavaScript applications. It centralizes application state and uses actions and reducers to update that state in a controlled way.

### Q2. Why is Redux used with React?

**Interview Answer:**

Redux is useful when multiple components need to share state, especially in larger applications with complex data flow. It provides a single source of truth and predictable updates.

### Q3. What is Redux Toolkit?

**Interview Answer:**

Redux Toolkit is the official, recommended way to write Redux logic. It reduces boilerplate and provides helpers like `createSlice`, `configureStore`, and `createAsyncThunk`.

### Q4. What is a slice?

**Interview Answer:**

A slice is a reducer logic unit containing the state, action creators, and reducers for a feature area such as users, cart, or auth.

```jsx
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
```

### Q5. What is `configureStore`?

**Interview Answer:**

`configureStore` creates the Redux store with sensible default middleware and setup. It is the modern replacement for the older `createStore` API.

### Q6. What is an action in Redux?

**Interview Answer:**

An action is a plain JavaScript object describing an event or intention. It usually includes a `type` and optional payload.

```js
{ type: "cart/addItem", payload: { id: 1 } }
```

### Q7. What is a reducer?

**Interview Answer:**

A reducer is a pure function that receives the previous state and an action and returns the next state. Reducers must not mutate the original state.

### Q8. What is immutability in Redux?

**Interview Answer:**

Reducers must return new state values instead of mutating existing objects. This guarantees predictable updates and makes change detection and time-travel debugging possible.

### Q9. What is a selector?

**Interview Answer:**

A selector is a function used to read data from the Redux state. It gives components a clear, reusable way to access the exact data they need.

```js
const selectUser = (state) => state.user;
```

### Q10. Why is Redux Toolkit easier than plain Redux?

**Interview Answer:**

It removes repetitive setup such as action creators, switch statements, and immutable update boilerplate. It also gives strong default conventions and improved developer ergonomics.

### Q11. What is `createAsyncThunk`?

**Interview Answer:**

`createAsyncThunk` is used for async operations such as API calls. It dispatches lifecycle actions like `pending`, `fulfilled`, and `rejected` automatically.

### Q12. What is a thunk?

**Interview Answer:**

A thunk is a function that delays or wraps logic. In Redux, thunks are used to handle async actions like data fetching inside the Redux flow.

### Q13. When should you not use Redux?

**Interview Answer:**

Redux is usually overkill for small apps or simple local UI state. If a feature only affects one component or a small subtree, `useState`, `useReducer`, or Context may be sufficient.

### Q14. What is the difference between Redux and Context?

**Interview Answer:**

Context is built-in and simple for app-wide shared state. Redux adds stronger structure and middleware support, which helps in bigger apps with many state transitions and async operations.

### Q15. What is the single source of truth?

**Interview Answer:**

The single source of truth is the centralized state in the store. All components read from it, and updates happen through actions, which keeps state predictable.

### Q16. What is a common Redux anti-pattern?

**Interview Answer:**

Putting non-shared, local UI state into the global store is a common anti-pattern. It increases complexity and makes components harder to reason about without real necessity.

### Q17. How do you structure a Redux app?

**Interview Answer:**

A typical structure keeps feature slices separate, with each slice owning its reducers, actions, and selectors. This makes large apps easier to maintain and scale.

### Q18. What are the benefits of Redux Toolkit in production?

**Interview Answer:**

It improves consistency, reduces setup friction, enforces better state patterns, and makes debugging easier when combined with Redux DevTools.

## Practical Questions

### Q19. How do you use a selector in a component?

**Interview Answer:**

Use `useSelector` to read state from the store and `useDispatch` to trigger actions from the component.

```jsx
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();
```

### Q20. What is the most important principle of Redux design?

**Interview Answer:**

Keep state updates predictable and centralized. Use actions to describe changes, reducers to produce new state, and selectors to read from that state. This makes the app easier to debug and maintain.
