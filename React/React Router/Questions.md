# React Router Interview Practice Set

Perfect — then let’s do this **properly**, like a **single, well-designed interview assignment** that forces you to touch **everything React Router expects**:

- `createBrowserRouter`
- nested routes
- layout routes
- params & search params
- protected routes
- loaders
- lazy loading
- error states
- 404 handling
- redirects
- NavLink & active states

Below are **4 exercises**, but they are **progressive and connected**.
If you complete all 4, you **will not have routing doubts** in interviews.

---

---

## Exercise 1: Routing Foundation & Layouts

### **Problem Statement**

Build the routing skeleton of a small **Dashboard application**.

### **Routes**

```
/
├── login
├── dashboard
│   ├── overview
│   ├── reports
│   └── settings
└── *
```

### **Requirements**

1. Use **`createBrowserRouter`**
2. Create a **RootLayout**

   - Contains header + `<Outlet />`

3. Create a **DashboardLayout**

   - Sidebar + `<Outlet />`

4. Use **nested routes**
5. Use `NavLink` for sidebar navigation

   - Active route must be visually highlighted

### **Expected Output**

- Header visible on all pages
- Sidebar visible only on `/dashboard/*`
- Clicking sidebar links switches content inside dashboard without page reload
- Active link is highlighted

### **What this exercise teaches**

- Layout routes
- Nested routes
- `<Outlet />`
- `NavLink` behavior
- Route tree thinking (VERY important)

---

## Exercise 2: Protected Routes & Redirect Logic

### **Problem Statement**

Protect all `/dashboard/*` routes behind authentication.

### **Requirements**

1. Create a fake auth state:

   ```js
   const isAuthenticated = false;
   ```

2. If user visits `/dashboard/*`:

   - Redirect to `/login`

3. After login:

   - Redirect back to the original page user wanted

4. Use:

   - `<Navigate />`
   - `useLocation`

### **Expected Output**

- Direct visit to `/dashboard/overview` → redirected to `/login`
- After login → user lands back on `/dashboard/overview`
- Refreshing protected route keeps auth logic working

### **What this exercise teaches**

- Route guards
- Redirect intent preservation
- Render-level navigation
- Real auth flow used in production apps

---

## Exercise 3: Lazy Loading + Error Handling

### **Problem Statement**

Improve performance and reliability using **route-level lazy loading**.

### **Requirements**

1. Lazy load:

   - `DashboardLayout`
   - All `/dashboard/*` pages

2. Use `React.lazy` + `Suspense`
3. Show a loading UI while route loads
4. Add `errorElement`:

   - Handle thrown errors from routes
   - Handle invalid URLs

### **Expected Output**

- Dashboard routes load **only when accessed**
- Loading indicator visible during route load
- If route throws error → error page shown
- Visiting `/random-url` shows a 404-style error page

### **What this exercise teaches**

- Route-based code splitting
- Error boundaries in routing
- Difference between UI errors vs route errors
- Production-grade routing resilience

---

## Exercise 4: Data Routing with Loaders & Params

### **Problem Statement**

Build a **Users section** inside the dashboard using data routers.

### **Routes**

```
/dashboard/users
/dashboard/users/:id
```

### **Requirements**

1. Use **route loaders** (no `useEffect`)
2. `/dashboard/users`

   - Loader fetches user list

3. `/dashboard/users/:id`

   - Loader fetches user details

4. Handle:

   - Loading state
   - Invalid user ID

5. Use:

   - `useLoaderData`
   - `useParams`

### **Expected Output**

- User list loads **before component renders**
- Clicking user navigates to detail page
- Invalid ID shows error UI (not blank screen)
- No duplicate fetch logic inside components

### **What this exercise teaches**

- Modern React Router data flow
- Loader vs `useEffect`
- Route-level data ownership
- Clean separation of concerns

---

## Final Interview Expectations

After completing all exercises, you should confidently explain:

- Why layouts are routes
- Why `<Outlet />` exists
- Why redirects should happen during render
- Why loaders beat `useEffect`
- Why lazy loading belongs at route level
- How error boundaries differ from try/catch
- How routing structure affects scalability

If you can **code + explain**, you’re senior-level here.

---

## How to Practice

1. Implement everything **without copy-paste**
2. Add `console.log` inside:
   - layouts
   - loaders
   - protected routes
3. Observe what rerenders and when

---

## Next Steps

I can provide:

- Complete reference solution
- Mock interview questions
- Implementation review
- Bonus edge cases interviewers love
