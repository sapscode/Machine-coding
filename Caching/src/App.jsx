// App.jsx

import { UsersList } from "./components/UsersList";
import { AddUser } from "./components/AddUser";
import { prefetchUsers } from "./api/usersApi";

/*
  🔹 Q6: Prefetch on hover
*/
function App() {
	return (
		<div>
			<h1>Users App</h1>

			<button onMouseEnter={prefetchUsers}>Go to Users</button>

			<AddUser />
			<UsersList />
		</div>
	);
}

export default App;
