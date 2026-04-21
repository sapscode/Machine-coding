import React from "react";

// Profile tab component - handles text input fields (name, age, email)
// Receives shared form data and setter from parent TabForm
const Profile = ({ data, setData, error }) => {
	const { name, age, email } = data;

	// Handle input changes - updates specific field in form data
	// Interview pattern: Controlled components with single handler
	const handleChange = (e) => {
		const { name, value } = e.target;
		// Interview key concept: Computed property names [name]: value
		// Allows single handler to update different fields dynamically
		setData({ ...data, [name]: value });
	};

	return (
		<form className="form">
			<div className="input-fields">
				<div className="input">
					<label htmlFor="name">Name: </label>
					{/* Controlled text input - value comes from state */}
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						required
						onChange={handleChange}
					/>
					{/* Conditional error display - only shown if error exists for this field */}
					{error.name && <span className="errorMessage">{error.name}</span>}
				</div>

				<div className="input">
					<label htmlFor="age">Age: </label>
					<input
						type="number"
						name="age"
						id="age"
						value={age}
						required
						onChange={handleChange}
					/>
					{error.age && <span className="errorMessage">{error.age}</span>}
				</div>

				<div className="input">
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						required
						onChange={handleChange}
					/>
					{error.email && <span className="errorMessage">{error.email}</span>}
				</div>
			</div>
		</form>
	);
};

export default Profile;
