/**
 * USERS LOADER — fetches user list BEFORE Users.jsx renders
 *
 * HOW IT CONNECTS:
 *  1. App.jsx: { path: "users", loader: usersLoader, element: <Users /> }
 *  2. When user navigates to /dashboard/users, router calls this FIRST
 *  3. Data is available in Users.jsx via useLoaderData() — no useEffect needed
 *  4. If this throws → errorElement (<ErrorPage />) renders instead of <Users />
 *
 * INTERVIEW KEY POINTS:
 *  - LOADER vs useEffect:
 *    • Loader: data fetched BEFORE component mounts (no loading state needed)
 *    • useEffect: component mounts empty, then fetches, then re-renders with data
 *    → Loaders give better UX (no flash of empty content)
 *  - throw new Response() creates a route error → caught by errorElement
 *    Unlike throw new Error(), Response carries status code for smarter error UI
 *  - res.json() is returned (not awaited) — React Router awaits it for you
 */
export async function usersLoader() {
	const res = await fetch("https://dummyjson.com/users");

	if (!res.ok) {
		// throw Response (not Error) → caught by errorElement, carries status code
		// UserError.jsx uses isRouteErrorResponse() to check this
		throw new Response("Failed to fetch users", { status: 500 });
	}

	return res.json(); // { users: [...], total, skip, limit }
}
