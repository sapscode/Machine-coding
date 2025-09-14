import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import Tours from "./Tours";

const URL = "https://www.course-api.com/react-tours-project";

const App = () => {
	const [tours, setTours] = useState([]);

	async function fetchTours() {
		const response = await fetch(URL);
		if (!response.ok) {
			throw new Error(response.status);
		}
		const data = await response.json();
		setTours(data);
	}

	useEffect(() => {
		fetchTours();
	}, []);

	const removeTour = (id) => {
		const filterdTours = tours.filter((tour) => tour.id !== id);
		setTours(filterdTours);
	};

	return (
		<main>
			<div className="title">
				<h2>{tours.length ? "Our Tours" : "No Tours Left"}</h2>
				<div className="title-underline"></div>
			</div>
			{tours.length ? (
				<Tours tours={tours} removeTour={removeTour} />
			) : (
				<button className="btn" onClick={fetchTours}>
					Refresh
				</button>
			)}
		</main>
	);
};
export default App;
