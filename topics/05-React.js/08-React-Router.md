# React.js — 08 React Router

## Fundamentals

### Q1. What is React Router?

**Interview Answer:**

React Router is the standard library for handling navigation in React applications. It enables client-side routing, nested routes, redirects, and route guards.

### Q2. What is client-side routing?

**Interview Answer:**

Client-side routing updates the URL and rerenders the app without reloading the whole page. This creates a smoother user experience for single-page applications.

### Q3. What are the main Router components?

**Interview Answer:**

Common Router components include `BrowserRouter`, `Routes`, `Route`, `Link`, and `NavLink`. They help define route structure and navigation behavior.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

### Q4. What is the difference between `Link` and `NavLink`?

**Interview Answer:**

`Link` navigates to a path. `NavLink` adds styling when the current route matches, which is useful for navigation menus and active states.

### Q5. What is a route parameter?

**Interview Answer:**

A route parameter is a dynamic segment in the URL, such as `/users/42`. It can be extracted using `useParams()`.

```jsx
<Route path="/users/:id" element={<UserProfile />} />
```

### Q6. How do you read URL params in React Router?

**Interview Answer:**

Use the `useParams` hook inside the route component to read the dynamic values.

```jsx
const { id } = useParams();
```

### Q7. What is nested routing?

**Interview Answer:**

Nested routing allows child routes to render inside a parent route. It is commonly used for dashboards, admin panels, and layout-based route structures.

### Q8. How do you handle a 404 page?

**Interview Answer:**

Use a catch-all route with a path like `*` that renders a not-found component when no other route matches.

```jsx
<Route path="*" element={<NotFound />} />
```

### Q9. What is route guarding?

**Interview Answer:**

Route guarding restricts access to a route based on conditions such as login state, role, or permission. A protected route usually checks authentication before rendering the target page.

### Q10. What is `useNavigate`?

**Interview Answer:**

`useNavigate` allows programmatic navigation from code, such as redirecting after login or when a form is submitted.

```jsx
const navigate = useNavigate();
navigate("/dashboard");
```

### Q11. What is `useLocation` used for?

**Interview Answer:**

`useLocation` gives access to the current URL, including pathname, search params, and hash. It is useful for analytics, route-aware logic, and query handling.

### Q12. How do you handle query parameters?

**Interview Answer:**

Use `useSearchParams` or parse `location.search` to access query parameters in the URL. This is useful for filtering, pagination, and search state.

### Q13. What is the difference between `BrowserRouter` and `HashRouter`?

**Interview Answer:**

`BrowserRouter` uses clean URLs with the browser history API. `HashRouter` uses a hash segment in the URL, which can be useful in static hosting environments or older deployment setups.

### Q14. Why is route configuration important in large apps?

**Interview Answer:**

A clear route structure makes navigation easier to maintain, supports protected areas, and ensures the app remains scalable as the number of screens grows.

### Q15. What is lazy route loading?

**Interview Answer:**

Lazy loading splits code by route so only the required modules are loaded when a user navigates there. This can improve initial load performance and reduce bundle size.

```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));
```

### Q16. What happens when a route does not match any path?

**Interview Answer:**

React Router renders nothing or a fallback route, depending on the configuration. A catch-all route is usually used to show a friendly not-found page.

### Q17. What are route guards in production apps?

**Interview Answer:**

Route guards ensure a user cannot access pages they are not allowed to see, such as admin routes or restricted private pages. They often redirect to login or show an unauthorized message.

### Q18. What is the main challenge with client-side routing?

**Interview Answer:**

The app must handle deep links correctly, maintain state across navigation, and be careful with server configuration when used with browser history. This is especially important in production deployment.

## Practical Questions

### Q19. How do you create a protected route in React Router?

**Interview Answer:**

Wrap the target route with a component that checks if the user is authenticated. If not, redirect them to the login screen.

```jsx
function ProtectedRoute({ children }) {
  const isAuth = true;
  return isAuth ? children : <Navigate to="/login" replace />;
}
```

### Q20. What is the most important principle for route design?

**Interview Answer:**

Routes should reflect the user’s mental model of the application. Keep navigation intuitive, protect sensitive pages, and ensure route state is easy to understand and test.
