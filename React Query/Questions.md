Got it 👍 — **coding-style practice questions**, not theory.

Here are **3 interview-level React Query coding questions** that are *very commonly asked* or used as take-home / pair-coding exercises. If you can code these **cleanly**, you’re solid.

---

## 1️⃣ Build a cached users list (basic but MUST be perfect)

### ❓ Question

Fetch and display a list of users from an API using **React Query** such that:

* API is **not refetched** when the component remounts
* Loading & error states are handled
* Multiple components reuse the same data

### 🧠 What this tests

* `useQuery`
* Query keys
* Cache reuse
* No unnecessary `useEffect`

### 🔑 Core expectation

```js
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000
});
```

**Interviewers expect**

* No `useEffect`
* No manual loading state
* Clean JSX

---

## 2️⃣ Search with React Query + debouncing (VERY common)

### ❓ Question

Create a search input that:

* Fetches results based on a query string
* Avoids API calls while typing
* Caches previous searches
* Shows previous data while fetching new results

### 🧠 What this tests

* Dynamic `queryKey`
* `enabled`
* `keepPreviousData`

### 🔑 Core expectation

```js
useQuery({
  queryKey: ["search", debouncedValue],
  queryFn: () => searchUsers(debouncedValue),
  enabled: !!debouncedValue,
  keepPreviousData: true
});
```

**Interviewers look for**

* Query key depends on input
* No race conditions
* Smooth UX (no empty flicker)

---

## 3️⃣ Mutation + list update (MOST IMPORTANT)

### ❓ Question

Implement a form that:

* Adds a new item using `useMutation`
* Updates the list immediately after success
* Handles error state

### 🧠 What this tests

* `useMutation`
* Cache invalidation
* Real-world data sync

### 🔑 Core expectation

```js
const mutation = useMutation(addItem, {
  onSuccess: () => {
    queryClient.invalidateQueries(["items"]);
  }
});
```

**Bonus (advanced)**

* Use `onMutate` for optimistic updates
* Rollback on error

---

## Interview ranking (importance)

| Rank | Question              | Must know? |
| ---- | --------------------- | ---------- |
| ⭐⭐⭐  | Mutation + invalidate | YES        |
| ⭐⭐   | Search + debounce     | YES        |
| ⭐    | Basic fetch           | YES        |

---

## If you want next (coding-only)

I can give you:

* **Full solution code** for each
* **One single combined exercise** (search + pagination + mutation)
* **Interview rubric** (what interviewer checks line-by-line)

Tell me what you want to practice next.
