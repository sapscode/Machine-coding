import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
	// State for current input value
	const [chipInput, setChipInput] = useState("");
	// State for list of chips
	const [chips, setChips] = useState([]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && chipInput.trim() !== "") {
			e.preventDefault();
			setChips((prev) => [...prev, chipInput]); // Add the new chip to the list
			setChipInput(""); // Clear the input after adding
		}
	};

	// Since order is preserved exactly as inserted, we can remove that element based on the index
	const removeChip = (idx) => {
		setChips((prev) => prev.filter((_, i) => i !== idx));
	};

	return (
		<div className="App">
			<h1>Chips input</h1>
			{/* Input field for adding new chips */}
			<input
				type="text"
				placeholder="Type and press Enter..."
				onKeyDown={handleKeyDown}
				value={chipInput}
				onChange={(e) => setChipInput(e.target.value)}
				className="chip-input"
			></input>
			{/* Container for displaying all chips */}
			<div className="chips">
				{chips?.map((chip, i) => {
					return (
						<div className="chip" key={i}>
							<span className="chip-content">{chip}</span>
							<button className="remove-btn" onClick={() => removeChip(i)}>
								x
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
