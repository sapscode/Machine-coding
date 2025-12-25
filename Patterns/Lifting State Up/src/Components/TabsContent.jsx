import Home from "./Home";
import Profile from "./Profile";
import Settings from "./Settings";

const TabsContent = ({ activeTab }) => {
	// Mapping tab index to its corresponding component
	// Keeps logic simple and avoids if/else chains
	const tabs = [<Home />, <Profile />, <Settings />];

	// Render content based on active tab
	return <div>{tabs[activeTab]}</div>;
};

export default TabsContent;
