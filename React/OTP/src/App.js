import { useEffect, useRef, useState } from "react";
import "./styles.css";

const inputDigits = 6;
export default function App() {
	const [digits, setDigits] = useState(new Array(inputDigits).fill(""));
	const buttonRefs = useRef([]);

	const handleKeyDown = (e, i) => {
		switch (e.key) {
			case "Backspace":
				e.preventDefault();
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
				if (digits.every((digit) => digit !== "")) {
					alert(`Your OTP is ${digits.join(``)}`);
				}
				break;
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

	const updateDigit = (idx, val) => {
		setDigits((prev) => {
			const newArr = [...prev];
			newArr[idx] = val;
			return newArr;
		});
	};

	const handleChange = (e, i) => {
		const value = e.target.value.slice(-1).trim();
		if (value !== "" && !isNaN(value)) {
			updateDigit(i, value);
			if (value && i < inputDigits - 1) moveFocus(i + 1);
		}
	};

	const moveFocus = (idx) => {
		buttonRefs.current[idx]?.focus();
	};

	useEffect(() => {
		moveFocus(0);
	}, []);

	return (
		<div className="App">
			<h1>OTP Validation</h1>
			<div className="input-container">
				{digits.map((digit, i) => {
					return (
						<input
							key={i}
							type="text"
							onChange={(e) => handleChange(e, i)}
							onKeyDown={(e) => handleKeyDown(e, i)}
							className="input-box"
							value={digit}
							ref={(el) => (buttonRefs.current[i] = el)}
						/>
					);
				})}
			</div>
		</div>
	);
}
