import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useDebounce from "./useDebounce";

const url = "https://dummyjson.com/users?limit=208";

function App() {
	// Raw users list (source data)
	const [users, setUsers] = useState([]);

	// Controlled input value (updates on every keystroke)
	const [value, setValue] = useState("");

	// Debounced version of input
	// - Updates only after user stops typing
	// - Used for expensive work (filtering)
	const debouncedValue = useDebounce(value, 300);

	// Fetch all the users once on mount only
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

	//Input handler
	const handleInput = (e) => {
		setValue(e.target.value);
	};

	/**
	 * Derived data
	 * - Filtering is heavy computation → useMemo
	 * - Runs only when users or debouncedValue changes
	 * - No extra state to hold the value, no extra render
   * - just return a new array of filtered users directly, while keeping the orignal arary of items untouched
	 */
	const filteredUsers = useMemo(() => {
		console.log("Filtering ran");

		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`;
			return fullName.toLowerCase().includes(debouncedValue.toLowerCase());
		});
	}, [users, debouncedValue]);

	return (
		<div className="container">
			<div className="input">
				<input
					type="text"
					placeholder="Enter user's name"
					value={value}
					onChange={handleInput}
				/>
			</div>

			<div className="user-list">
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
