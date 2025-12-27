# React Performance Optimization Exercises

## Exercise 1 – Memoized Search Filter

**Goal:** Practice `useMemo` for derived data.

### Setup

You have:

- An array of users (1000 fake users).
- An `<input>` for search text.

### Requirements

Show a filtered list: users whose name includes the search text.

Without `useMemo`, the filter runs on every render.

### Refactor to:

- Use `useMemo` to compute `filteredUsers` based on `[search, users]`.
- Add a `console.log("filtering")` to confirm it only runs when needed.

---

## Exercise 2 – Prevent Useless Re-renders in a Dashboard

**Goal:** Practice `React.memo` + `useCallback`.

### Setup

Create a Dashboard with:

- `<StatsCard />` (shows numbers).
- `<Chart />` (simple placeholder).
- `<ThemeSwitcher />` button to toggle dark/light mode.

### Initially

When toggling theme, all children re-render.

### Task

- Wrap `StatsCard` and `Chart` with `React.memo`.
- Use `useCallback` for functions passed to them as props.
- Verify via `console.log` that only relevant components re-render.

---

## Exercise 3 – Todo List Optimized

**Goal:** Apply the pattern from Q5 yourself.

### Setup

Build a Todo app:

- Add todos.
- Toggle done.
- Delete todo.

### Version 1

No memoization.

### Version 2

- Wrap `TodoItem` with `React.memo`.
- Use `useCallback` for `onToggle`, `onDelete`.
- Ensure only affected items re-render using `console.log`.

---

## Exercise 4 – Expensive Sorting Table

**Goal:** `useMemo` + stable props.

### Setup

Build a table of products with columns: name, price, rating.

Add dropdowns to choose:

- **Sort by:** name | price | rating
- **Order:** asc | desc

The sorting function should be intentionally heavy (simulate with for loop delay).

### Task

**First version:** sorting runs on every small state change → laggy.

**Then:**

- Use `useMemo` to compute `sortedProducts` from `[products, sortBy, sortOrder]`.
- Keep products array reference stable (state or `useMemo`).

---

## Exercise 5 – Context + useMemo

**Goal:** Practice memoizing a context value.

### Setup

Create a `ThemeContext` with value `{ theme, toggleTheme }`.

Wrap the app in `ThemeProvider`.

Inside the provider:

```javascript
const value = { theme, toggleTheme };
```

Add 2 consumers:

- `ThemeLabel` – displays current theme.
- `HeavyComponent` – logs when rendered + has some heavy computation.

### Task

Without optimization, toggling theme may cause extra re-renders.

**Use:**

```javascript
const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
```

- Combine with `useCallback` for `toggleTheme`.
- Observe reduced renders in `HeavyComponent` (with `React.memo`).

---

## Exercise 6 – Debounced Search with useCallback

**Goal:** Combine `useCallback` with debouncing.

### Setup

Build a search box that:

- Calls an API-like function `search(query)` (fake, with `setTimeout`).
- Every keystroke should not trigger the search immediately.

### Use

- A custom debounce hook or a manual timer (`setTimeout`).
- `useCallback` to memoize the debounced function.

### Optimize so that:

The debounced function doesn't get recreated on every keystroke unnecessarily.

---

## Exercise 7 – Large List + Conditional Memoization

**Goal:** See when memoization is worth it.

### Setup

Render a list of 500–1000 items:

Each item has some moderately heavy computation (e.g., formatting dates, parsing something).

### Step 1

Implement it simply.

### Step 2

- Wrap item component in `React.memo`.
- Pass down only necessary props.
- Use `useMemo` inside each item for the heavy computation.

### Compare

Rendering behavior with/without memoization using `console.time` / `console.timeEnd`.
