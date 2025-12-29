import { useMemo } from "react";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const useThemeContext = () => {
	return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	// something realistic and stable
	const [userPreferences, setUserPreferences] = useState({
		fontSize: "medium",
		showAnimations: true
	});

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const value = useMemo(() => {
		return {
			theme,
			toggleTheme,
			userPreferences,
			setUserPreferences
		};
	}, [theme, toggleTheme, userPreferences]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
