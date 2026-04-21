import { useState, useRef } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Setting from "./Setting";

const TabForm = () => {
	// Interview pattern: State Lifting - centralized form data shared across all tabs
	// Single source of truth prevents data synchronization issues between components
	// Child components (Profile, Interests, Setting) receive both data and setData as props
	// This allows children to update parent state: Child calls setData → Parent re-renders all children with new data
	const [data, setData] = useState({
		name: "",
		age: "",
		email: "",
		interests: [],
		theme: "light"
	});

	// Stores validation errors for current tab
	// Cleared on each tab change to only show relevant errors
	// Passed to children so they can display field-level error messages
	const [error, setError] = useState({});

	// Controls which tab is currently displayed (0 = Profile, 1 = Interests, 2 = Setting)
	const [activeTab, setActiveTab] = useState(0);

	// Optional: Refs for programmatic button focus management if needed
	const nextRef = useRef(null);
	const prevRef = useRef(null);

	// Tab configuration pattern - defines structure, components, and validation logic
	// Interview pattern: Configuration-driven UI reduces code duplication and improves maintainability
	// Single source of truth: All tab metadata in one array eliminates scattered logic
	// Approach: Each tab is an object with name (label), component (to render), and validate (gate logic)
	// Benefits: Adding new tabs only requires pushing to this array, not modifying multiple functions
	const tabs = [
		{
			name: "Profile",
			component: Profile,
			// Validation runs before moving to next tab
			// Returns true/false to allow/prevent navigation
			validate: () => {
				const err = {};

				// Name validation: must exist and be at least 2 characters
				if (!data.name || data.name.length < 2) {
					err.name = "Please enter a valid name !";
				}

				// Age validation: must exist
				if (!data.age) {
					err.age = "Please enter age !";
				}

				// Email validation: uses regex pattern for format checking
				// Pattern: user@domain.extension
				let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
				if (!data.email || !regex.test(data.email)) {
					err.email = "Please enter a valid email !";
				}

				setError(err);
				// Block navigation if ANY errors exist
				// Object.keys(err).length returns number of errors
				return Object.keys(err).length ? false : true;
			}
		},
		{
			name: "Interests",
			component: Interests,
			// Array validation: must select at least one interest
			validate: () => {
				const err = {};

				// Array validation: must select at least one interest
				if (!data.interests || !data.interests.length) {
					err.interests = "Please select atleast one interest !";
				}

				setError(err);
				return Object.keys(err).length ? false : true;
			}
		},
		{
			name: "Setting",
			component: Setting,
			// No validation needed here
			validate: () => {
				return true;
			}
		}
	];

	// Select a specific tab (used when clicking tab headers)
	// Interview pattern: Validation gate - validate current tab before allowing navigation
	// Uses tabs[activeTab].validate() which runs validation logic specific to that tab
	// This ensures user can't skip to different tabs without completing current tab
	const selectTab = (i) => {
		if (tabs[activeTab].validate()) {
			//checking the validte function of the tab
			setActiveTab(i);
		}
	};

	// Navigate between tabs using prev/next buttons
	// Interview pattern: Same validation gate pattern as selectTab
	// Validates current tab before moving prev/next
	const changeTab = (e) => {
		if (tabs[activeTab].validate()) {
			if (e.target.classList.contains("prev")) {
				setActiveTab((prev) => prev - 1);
			} else {
				setActiveTab((prev) => prev + 1);
			}
		}
	};

	// Interview pattern: Dynamic component rendering from tabs array configuration
	// Looks up component for current active tab and renders it dynamically
	// This eliminates if/else or switch statements for showing different tab content
	const ActiveTabComponent = tabs[activeTab].component;

	return (
		<div className="tab-form">
			{/* Tab Headers - clicking validates current tab before switching */}
			{/* Interview pattern: Render all tab headers from centralized tabs array */}
			{/* tabs.map() eliminates hardcoding tab buttons - adds new tab by updating array only */}
			<div className="tabs-container">
				{tabs.map((tab, i) => {
					return (
						<div
							className={`tab ${activeTab === i && "selected"}`}
							key={i}
							onClick={() => selectTab(i)}
						>
							{tab.name}
						</div>
					);
				})}
			</div>

			{/* Main Content Area - renders active tab's component */}
			{/* Interview pattern: Child components receive both data and setData to enable state updates */}
			{/* When child calls setData, parent re-renders all children with updated state */}
			<div className="content">
				<main>
					{/* Dynamic component render - passes shared state as props to active tab */}
					<ActiveTabComponent data={data} setData={setData} error={error} />
				</main>

				{/* Navigation buttons - Interview pattern: Validation gate prevents navigation without completing tab */}
				{/* Button disabled states derived from tabs array length for reusability */}
				<div className="footer-btn-container">
					<button
						className="prev btn"
						type="button"
						disabled={activeTab === 0}
						ref={prevRef}
						onClick={changeTab}
					>
						⬅️
					</button>
					<button
						className="next btn"
						type="button"
						disabled={activeTab === tabs.length - 1}
						ref={nextRef}
						onClick={changeTab}
					>
						➡️
					</button>
				</div>
			</div>

			{/* Submit button only appears on final tab - controlled via tabs array length */}
			{/* Interview pattern: Conditional rendering - shows submit when user reaches last tab */}
			{activeTab === tabs.length - 1 && (
				<div className="submit-btn-container">
					<button className="btn">Submit</button>
				</div>
			)}
		</div>
	);
};

export default TabForm;
