import { useState } from "react";
import reviews from "./data";
import Card from "./Card";
const App = () => {
	const [index, setIndex] = useState(0);
	return (
		<main>
			<Card
				{...reviews[index]}
				index={index}
				setIndex={setIndex}
				length={reviews.length}
			/>
		</main>
	);
};
export default App;
