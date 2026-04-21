/**
 * USERS LIST PAGE — consumes data from usersLoader via useLoaderData()
 *
 * HOW IT CONNECTS:
 *  1. usersLoader.js fetches /users API and returns { users: [...] }
 *  2. useLoaderData() gives us that exact return value here
 *  3. No useEffect, no useState, no loading state — data is ready on first render
 *  4. <NavLink to={`${id}`}> = relative link → resolves to /dashboard/users/:id
 *     That triggers userLoader.js and renders User.jsx
 *
 * INTERVIEW KEY POINTS:
 *  - useLoaderData() returns whatever the route's loader returned
 *  - Data is guaranteed to be loaded BEFORE this component renders
 *  - NavLink to={`${id}`} is RELATIVE (no leading /) → appends to current path
 *    from /dashboard/users + "5" = /dashboard/users/5
 */
import { NavLink, useLoaderData } from "react-router-dom";
import "./Users.css";

const Users = () => {
	// Destructure users array from loader's response { users: [...], total, ... }
	const { users } = useLoaderData();
	return (
		<div className="users-list">
			{users.map((user) => {
				const { id, firstName, lastName, age } = user;
				return (
					<div key={id} className="user">
						{/* Relative NavLink: "5" resolves to /dashboard/users/5 */}
						{<NavLink to={`${id}`}>{`${firstName} ${lastName}`}</NavLink>}
					</div>
				);
			})}
		</div>
	);
};

export default Users;
