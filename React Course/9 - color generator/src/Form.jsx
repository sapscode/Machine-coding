import { useState } from "react";

const Form = () => {
	const [color, setColor] = useState("");
	return (
		<div className="container">
			<h4>Color Generator</h4>
			<form action="" className="color-form">
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
				<input
					type="text"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
				<button className="btn" type="submit" style={{ background: value }}>
					Submit
				</button>
			</form>
		</div>
	);
};
export default Form;
