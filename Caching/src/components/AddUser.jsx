// components/AddUser.jsx

import { createUser } from "../api/usersApi";

/*
  🔹 Q4: POST request → cache invalidation
*/
export function AddUser() {
	const handleAdd = async () => {
		await createUser({
			username: "user_" + Date.now()
		});
	};

	return <button onClick={handleAdd}>Add User</button>;
}
