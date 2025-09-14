import { useState } from "react";
import Categories from "./Categories";
import Menu from "./Menu";
import Title from "./Title";
import data from "./data";

const App = () => {
	const [menuItems, setMenuItems] = useState(data);

	const filterItems = (currentCategory) => {
		if (currentCategory === "All") {
			setMenuItems(data);
		} else {
			const items = data.filter((item) => item.category === currentCategory);
			setMenuItems(items);
		}
	};

	return (
		<main className="menu">
			<Title />;
			<Categories filterItems={filterItems} />
			<Menu menuItems={menuItems} />
		</main>
	);
};
export default App;
