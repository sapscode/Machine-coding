import React from "react";
import { useThemeContext } from "../ThemeProvider";

const HeavyComponent = React.memo(() => {
	const { userPreferences } = useThemeContext();

	console.log("HeavyComponent rendered");

	const style = {
		fontSize: userPreferences.fontSize === "large" ? "20px" : "16px"
	};

	return <div style={style}>Heavy Component</div>;
});

export default HeavyComponent;
