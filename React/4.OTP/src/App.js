import { useEffect, useRef, useState } from "react";
import "./styles.css";

const inputDigits = 6;
export default function App() {
	// Array of 6 empty strings representing each OTP digit
	const [digits, setDigits] = useState(new Array(inputDigits).fill(""));

	// useRef to store references to all input elements for programmatic focus
	// Using ref callback pattern in JSX: ref={(el) => (buttonRefs.current[i] = el)}
	const buttonRefs = useRef([]);

	// Keyboard event handler - manages navigation and input logic
	const handleKeyDown = (e, i) => {
		switch (e.key) {
			case "Backspace":
				e.preventDefault();
				// If current input is empty, move to previous field and clear it
				// Otherwise, clear current field and stay on it
				if (digits[i] === "") {
					if (i > 0) {
						updateDigit(i - 1, "");
						moveFocus(i - 1);
					}
				} else {
					updateDigit(i, "");
				}
				break;
			case "Enter":
				e.preventDefault();
				// Submit OTP only if all 6 digits are filled
				// every() is a common pattern for form validation
				if (digits.every((digit) => digit !== "")) {
					alert(`Your OTP is ${digits.join(``)}`);
				}
				break;
			// Arrow key navigation between input fields
			case "ArrowRight":
				e.preventDefault();
				if (i < inputDigits - 1) moveFocus(i + 1);
				break;
			case "ArrowLeft":
				e.preventDefault();
				if (i > 0) moveFocus(i - 1);
				break;
		}
	};

	// Helper to update a specific digit in the array
	const updateDigit = (idx, val) => {
		setDigits((prev) => {
			const newArr = [...prev];
			newArr[idx] = val;
			return newArr;
		});
	};

	// Handle text input - only accept single numeric characters
	const handleChange = (e, i) => {
		const value = e.target.value.slice(-1).trim(); // Get only last character entered

		// Validation: only allow non-empty, numeric values
		if (value !== "" && !isNaN(value)) {
			updateDigit(i, value);
			// Auto-advance focus to next input after digit is entered (UX improvement)
			if (value && i < inputDigits - 1) moveFocus(i + 1);
		}
	};

	// Focus management using refs - directly manipulate DOM for better UX
	const moveFocus = (idx) => {
		buttonRefs.current[idx]?.focus(); // Optional chaining prevents errors
	};

	// Initialize focus on first input when component mounts
	useEffect(() => {
		moveFocus(0);
	}, []);

	return (
		<div className="App">
			<h1>OTP Validation</h1>
			<div className="input-container">
				{/* Render 6 controlled OTP input boxes */}
				{digits.map((digit, i) => {
					return (
						<input
							key={i}
							type="text"
							onChange={(e) => handleChange(e, i)}
							onKeyDown={(e) => handleKeyDown(e, i)}
							className="input-box"
							value={digit}
							// Ref callback: stores each input element reference
							// Used later for programmatic focus management
							ref={(el) => (buttonRefs.current[i] = el)}
						/>
					);
				})}
			</div>
		</div>
	);
}
