const Tabs = ({ activeTab, onTabChange }) => {
	// Tab labels defined as data so UI scales easily
	const tabs = ["Home", "Profile", "Settings"];

	return (
		<div className="tabs-bar">
			{tabs.map((tab, index) => (
				<div
					key={tab} // Using tab name as key is safer than index
					// Highlight the active tab based on parent state
					className={`tab ${activeTab === index ? "selected" : ""}`}
					// Request parent to update the active tab
					// Tabs itself does not change state
					onClick={() => onTabChange(index)}
				>
					{tab}
				</div>
			))}
		</div>
	);
};

export default Tabs;
