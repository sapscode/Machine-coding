import React from "react";

const ThemeSwitcher = React.memo(({ isDarkTheme, toggleTheme }) => {
	console.log("ThemeSwitcher");
	return (
		<button className="btn" onClick={toggleTheme}>
			{isDarkTheme ? "🌙" : "🌞"}
		</button>
	);
});
export default ThemeSwitcher;
