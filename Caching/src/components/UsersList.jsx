// components/UsersList.jsx

import { useUsers } from "../hooks/useUsers";

/*
  🔹 Q7: Loading / error UI
  🔹 Q8: Cached data renders instantly
*/
export function UsersList() {
	const { users, loading, error } = useUsers(true);

	if (loading) return <p>Loading users...</p>;
	if (error) return <p>Error loading users</p>;

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.username}</li>
			))}
		</ul>
	);
}
