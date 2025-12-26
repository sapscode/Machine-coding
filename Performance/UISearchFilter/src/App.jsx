import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useDebounce from "./useDebounce";

const url = "https://dummyjson.com/users?limit=208";
function App() {
	const [users, setUsers] = useState([]);
	const [value, setValue] = useState("");
	const debouncedValue = useDebounce(value, 300);

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

	const handleInput = (e) => {
		setValue(e.target.value);
	};

	const filteredUsers = useMemo(() => {
		console.log("Memo ran");
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
					onChange={(e) => handleInput(e)}
				/>
			</div>
			<div className="user-list">
				{filteredUsers.map((user) => {
					return (
						<div className="user" key={user.id}>
							{`${user.firstName} ${user.lastName}`}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
