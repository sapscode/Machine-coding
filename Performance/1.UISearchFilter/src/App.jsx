import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useDebounce from "./useDebounce";

const url = "https://dummyjson.com/users?limit=208";

/**
 * PERFORMANCE CONCEPTS DEMONSTRATED:
 *
 * 1. Debouncing  — separates the UI input state from the expensive computation trigger.
 *    Every keystroke updates `value` (fast, cheap), but the filter only runs once
 *    the user pauses typing (debounced). Without this, filtering 200+ users would
 *    fire on EVERY character typed.
 *
 * 2. useMemo     — memoizes the filtered list so it is NOT recomputed on every render.
 *    Only re-runs when `users` (source data) or `debouncedValue` (search term) changes.
 *    Anti-pattern: storing filteredUsers in a separate useState — that would cause an
 *    extra render cycle (set state → re-render) instead of deriving it inline.
 *
 * 3. Derived state — filteredUsers is NOT stored in state. It is computed from existing
 *    state (users + debouncedValue). Keeping derived values out of state avoids the
 *    "sync problem" (source state and derived state going out of sync) and saves a render.
 *
 * 4. Single fetch — useEffect with [] runs once on mount. Avoids re-fetching on every
 *    render. The full list is fetched once; all subsequent filtering is client-side.
 */
function App() {
	// Raw users list — source of truth, never mutated
	const [users, setUsers] = useState([]);

	// Controlled input value — updates on every keystroke to keep the input responsive.
	// PERF NOTE: This triggers a re-render on every keystroke, but the render is cheap
	// (just updating the input value). The expensive work — filtering — is gated behind
	// the debounced value below, so it doesn't run on every keystroke.
	const [value, setValue] = useState("");

	// Debounced version of the input value.
	// - Lags behind `value` by 300ms of inactivity.
	// - PERF: This is the actual dependency for the expensive filter computation.
	//   If the user types "john", `debouncedValue` only updates once, not 4 times.
	// - See useDebounce.jsx for how the cleanup in useEffect cancels pending timers.
	const debouncedValue = useDebounce(value, 300);

	// Fetch all users once on mount.
	// - Empty dependency array [] means this runs only once (like componentDidMount).
	// - PERF: All filtering is done client-side from this single fetch. A real-world
	//   alternative is server-side search (send debouncedValue to API), which reduces
	//   the data the client has to hold in memory but adds network latency per query.
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await fetch(url);
				const res = await data.json();
				setUsers(res.users);
			} catch (err) {
				console.error(err);
			}
		};

		fetchUsers();
	}, []);

	// Simple event handler — just syncs the input DOM value to React state.
	// No memoization needed (useCallback) since it's not passed as a prop to a child.
	const handleInput = (e) => {
		setValue(e.target.value);
	};

	/**
	 * PERF: useMemo — memoized derived data.
	 *
	 * WHY useMemo here:
	 *   - .filter() over 200+ users is non-trivial; we don't want it running on every render.
	 *   - Without useMemo, it would re-run even on unrelated state changes.
	 *
	 * WHY NOT useState for filteredUsers:
	 *   - Would require a separate useEffect to keep it in sync with `users` and `debouncedValue`.
	 *   - That useEffect would cause an extra render cycle after every dependency change.
	 *   - useMemo computes synchronously during render — one render, one filter pass.
	 *
	 * Dependencies: [users, debouncedValue]
	 *   - `users` changes only once (after fetch). After that, only `debouncedValue` drives recomputation.
	 *   - The console.log helps verify the filter runs only when expected (not on every keystroke).
	 */
	const filteredUsers = useMemo(() => {
		console.log("Filtering ran"); // Should fire only after debounce delay, not every keystroke

		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`;
			return fullName.toLowerCase().includes(debouncedValue.toLowerCase());
		});
	}, [users, debouncedValue]);

	// Rendering the filtered list.
	// PERF NOTE: For very large lists (thousands of items), consider virtual scrolling
	// (e.g. react-window) to avoid rendering all DOM nodes at once. With 200 users
	// this is fine.
	return (
		<div className="container">
			<div className="input">
				<input
					type="text"
					placeholder="Enter user's name"
					value={value} // controlled — reflects every keystroke immediately
					onChange={handleInput}
				/>
			</div>

			<div className="user-list">
				{/* key={user.id} — stable unique key prevents unnecessary DOM reconciliation */}
				{filteredUsers.map((user) => (
					<div className="user" key={user.id}>
						{user.firstName} {user.lastName}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
