import React from "react";

// Interests tab component - handles multiple checkbox selections
// Maintains an array of selected interests in form data
const Interests = ({ data, setData, error }) => {
	const { interests } = data;

	// Check if a given interest is already selected
	// Interview pattern: Array.includes() for membership testing
	const checkInterest = (interest) => {
		return interests.includes(interest);
	};

	// Add/remove interests from array when checkbox toggled
	// Interview pattern: Array state management for multiple selections
	const handleChecked = (e) => {
		const { name, checked } = e.target;
		if (checked) {
			// Add selected interest - spread to copy, then add new item
			setData((prev) => ({ ...prev, interests: [...prev.interests, name] }));
		} else {
			// Remove unselected interest - use filter to exclude
			// Interview pattern: Array.filter() for removing items preserves immutability
			setData((prev) => ({
				...prev,
				interests: prev.interests.filter((interest) => interest !== name)
			}));
		}
	};

	return (
		<form>
			<div className="input-fields">
				<div className="input">
					<label htmlFor="coding">Coding</label>
					{/* Controlled checkbox - checked state from array membership check */}
					<input
						type="checkbox"
						name="coding"
						checked={checkInterest("coding")}
						onChange={handleChecked}
					/>
				</div>

				<div className="input">
					<label htmlFor="music">Music</label>
					<input
						type="checkbox"
						name="music"
						checked={checkInterest("music")}
						onChange={handleChecked}
					/>
				</div>

				<div className="input">
					<label htmlFor="travel">Travel</label>
					<input
						type="checkbox"
						name="travel"
						checked={checkInterest("travel")}
						onChange={handleChecked}
					/>
				</div>

				<div className="input">
					<label htmlFor="gym">Gym</label>
					<input
						type="checkbox"
						name="gym"
						checked={checkInterest("gym")}
						onChange={handleChecked}
					/>
				</div>

				{error.interests && (
					<span className="errorMessage">{error.interests}</span>
				)}
			</div>
		</form>
	);
};

export default Interests;
