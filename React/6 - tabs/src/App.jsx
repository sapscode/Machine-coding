import { useState } from "react";
import { useEffect } from "react";
import SidePanel from "./SidePanel";
import Job from "./Job";

const url = "https://www.course-api.com/react-tabs-project";

const App = () => {
	const [jobs, setJobs] = useState([]);
	const [curr, setCurr] = useState(0);
	const [loading, setLoading] = useState(true);

	const fetchUsers = async () => {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.message);

		const data = await response.json();
		setLoading(false);
		setJobs(data);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}
	return (
		<div className="jobs-center">
			<SidePanel jobs={jobs} curr={curr} setCurr={setCurr} />
			<Job jobs={jobs} curr={curr} />
		</div>
	);
};
export default App;
