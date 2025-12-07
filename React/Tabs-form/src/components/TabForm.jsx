import { useState, useRef } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Setting from "./Setting";

const TabForm = () => {
	// Centralized state holding form data for all tabs
	const [data, setData] = useState({
		name: "",
		age: "",
		email: "",
		interests: [],
		theme: "light"
	});

	// Stores validation errors for active tab inputs
	const [error, setError] = useState({});

	// Controls which tab is currently visible
	const [activeTab, setActiveTab] = useState(0);

	// Optional: Refs to focus next/prev buttons programmatically if needed
	const nextRef = useRef(null);
	const prevRef = useRef(null);

	// Tab configuration — each entry has:
	//  - name → label for UI
	//  - component → which component to render
	//  - validate → logic to check validity before moving to next tab
	const tabs = [
		{
			name: "Profile",
			component: Profile,
			validate: () => {
				const err = {};
				// Name validation
				if (!data.name || data.name.length < 2) {
					err.name = "Please enter a valid name !";
				}
				// Age validation
				if (!data.age) {
					err.age = "Please enter age !";
				}
				// Email validation (basic regex)
				let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
				if (!data.email || !regex.test(data.email)) {
					err.email = "Please enter a valid email !";
				}

				setError(err);
				// Returns true only if no errors exist
				return Object.keys(err).length ? false : true;
			}
		},
		{
			name: "Interests",
			component: Interests,
			validate: () => {
				const err = {};
				// Must choose at least one interest
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
	const selectTab = (i) => {
		if (tabs[activeTab].validate()) {
			//checking the validte function of the tab
			setActiveTab(i);
		}
	};

	// Navigate between tabs using prev/next buttons
	const changeTab = (e) => {
		if (tabs[activeTab].validate()) {
			if (e.target.classList.contains("prev")) {
				setActiveTab((prev) => prev - 1);
			} else {
				setActiveTab((prev) => prev + 1);
			}
		}
	};

	// Dynamically determine which tab’s component to render
	const ActiveTabComponent = tabs[activeTab].component;

	return (
		<div className="tab-form">
			{/* ---------- Tab Header Section ---------- */}
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

			{/* ---------- Main Content Section ---------- */}
			<div className="content">
				<main>
					<ActiveTabComponent data={data} setData={setData} error={error} />
				</main>
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

			{/* ---------- Final Submit Section ---------- */}
			{activeTab === tabs.length - 1 && (
				<div className="submit-btn-container">
					<button className="btn">Submit</button>
				</div>
			)}
		</div>
	);
};

export default TabForm;
