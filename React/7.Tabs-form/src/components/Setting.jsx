import React from "react";

// Setting tab component - handles radio button for theme selection
// Single selection from multiple options (light/dark)
const Setting = ({ data, setData }) => {
	const { theme } = data;

	// Handle theme change - radio buttons only allow one selection
	// Interview pattern: Single select control using radio buttons
	const handleChange = (e) => {
		setData({ ...data, theme: e.target.value });
	};

	return (
		<form>
			<div className="input-fields">
				<div className="input">
					<label htmlFor="dark">Dark </label>
					{/* Controlled radio button - only one theme can be selected */}
					{/* Note: name attribute must be same for all radio buttons in group */}
					<input
						type="radio"
						name="theme"
						id="dark"
						value="dark"
						checked={theme === "dark"}
						onChange={handleChange}
					/>
				</div>

				<div className="input">
					<label htmlFor="light">Light</label>
					<input
						type="radio"
						name="theme"
						id="light"
						value="light"
						checked={theme === "light"}
						onChange={handleChange}
					/>
				</div>
			</div>
		</form>
	);
};

export default Setting;
