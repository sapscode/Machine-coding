import { useState } from "react";
import data from "./data";
import List from "./List";
// import "./index.css";

const App = () => {
	const [users, setUsers] = useState(data);
	return (
		<main>
			<div className="container">
				<h3>{users.length} Birthdays today !!</h3>
				<List users={users} />
				<button className="btn btn-block" onClick={() => setUsers([])}>
					Clear all
				</button>
			</div>
		</main>
	);
};
export default App;
