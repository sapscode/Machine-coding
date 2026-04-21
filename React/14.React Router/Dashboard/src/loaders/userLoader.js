/**
 * USER LOADER — fetches a single user by :id param BEFORE User.jsx renders
 *
 * HOW IT CONNECTS:
 *  1. App.jsx: { path: "users/:id", loader: userLoader, element: <User /> }
 *  2. :id is a dynamic segment → router provides it via params.id
 *  3. Users.jsx links: <NavLink to={`${id}`}> → navigates to /dashboard/users/5
 *  4. Router calls this loader with { params: { id: "5" } }
 *  5. Data available in User.jsx via useLoaderData()
 *
 * INTERVIEW KEY POINTS:
 *  - Loader receives { request, params } — params matches the :id in route path
 *  - throw new Response("...", { status: 404 }) → enables status-aware error UI
 *    UserError.jsx checks isRouteErrorResponse(error) and error.status
 *  - No need for useParams() in the loader — params are injected by the router
 *    (useParams is only needed inside components, not loaders)
 */
export async function userLoader({ params }) {
	const { id } = params;

	const res = await fetch(`https://dummyjson.com/users/${id}`);
	if (!res.ok) {
		throw new Response("User not found", { status: 404 });
	}

	const user = await res.json();
	return user;
}
