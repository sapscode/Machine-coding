import { useCallback, useState } from "react";
import "./App.css";
import StatsCard from "./Components/StatsCard";
import Chart from "./Components/Chart";
import ThemeSwitcher from "./Components/ThemeSwitcher";

function App() {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = useCallback(() => setIsDarkTheme((prev) => !prev), []);

	return (
		<div className={`contianer ${isDarkTheme ? "dark" : "light"}`}>
			<StatsCard />
			<Chart />
			<ThemeSwitcher isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
		</div>
	);
}

export default App;
