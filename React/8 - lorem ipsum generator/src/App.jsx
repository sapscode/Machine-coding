import { useState } from "react";
import data from "./data";

const App = () => {
	const [para, setPara] = useState(1);
	const [texts, setTexts] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setTexts(data.slice(0, para));
	};
	return (
		<div className="section-center">
			<h4 className="title">Tired of boring lorem ipsum</h4>;
			<div className="title-underline"></div>
			<form className="lorem-form" onSubmit={handleSubmit}>
				<label htmlFor="nums">Paragraphs</label>
				<input
					type="number"
					id="nums"
					min="1"
					max="10"
					value={para}
					onChange={(e) => setPara(e.target.value)}
				/>
				<button type="submit" className="btn">
					Generate
				</button>
			</form>
			<div className="lorem-text">
				{texts.map((text, i) => {
					return <p key={i}>{text}</p>;
				})}
			</div>
		</div>
	);
};
export default App;
