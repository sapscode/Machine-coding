import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

const url = "https://dummyjson.com/users/search?q=";
function App() {
	const [user, setUser] = useState("");
	const [input, setInput] = useState("");

	const { data, isLoading, error, isError } = useQuery({
		queryKey: ["search", user],
		queryFn: async () => {
			const res = await fetch(`${url}${user}`);
			if (!res.ok) throw new Error("Failed to load users");
			const data = await res.json();
			return data.users;
		},
		enabled: user.length > 0
	});

	useEffect(() => {
		const id = setTimeout(() => {
			setUser(input);
		}, 300);

		return () => clearTimeout(id);
	}, [input]);

	return (
		<>
			<input
				type="text"
				placeholder="enter user"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			{isLoading && <div>Loading...</div>}
			{isError && <div>{`Something went wrong ${error.message}`}</div>}
			{data?.map((u) => {
				return <div key={u.id}>{u.firstName}</div>;
			})}
		</>
	);
}

export default App;
