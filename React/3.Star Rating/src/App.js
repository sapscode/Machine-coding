import { useState } from "react";
import Stars from "./Stars";
import "./styles.css";

export default function App() {
	// parent holds rating state
	const [rating, setRating] = useState(0);
	return (
		<div className="App">
			{/* Controlled component */}
			<Stars totalStars={5} rating={rating} setRating={setRating} />
		</div>
	);
}
