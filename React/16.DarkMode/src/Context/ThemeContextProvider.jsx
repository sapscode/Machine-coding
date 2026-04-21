/**
 * THEME CONTEXT — ThemeContextProvider.jsx
 *
 * KEY CONCEPTS:
 *   1. Context API — createContext + useContext to avoid prop drilling
 *   2. localStorage — persist theme across page refreshes
 *   3. data-theme attribute on <html> — CSS variables swap based on this (see App.css)
 *   4. Custom hook (useThemeContext) — clean way for any component to consume the context
 *
 * FLOW:
 *   - On mount: reads "theme" from localStorage → initializes isDarkMode
 *   - On toggle: isDarkMode flips → useEffect fires → updates localStorage + data-theme attribute
 *   - CSS picks up the [data-theme="dark"] selector → variables change → UI updates
 *
 * CONSUMED BY: Landing.jsx (for the toggle button + emoji)
 * WRAPPED IN: main.jsx (above App, so all routes can access it)
 */
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const ThemeContext = createContext();

// Custom hook — instead of importing useContext + ThemeContext everywhere
export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
	// Lazy initializer: reads from localStorage on first render only (not on every re-render)
	const [isDarkMode, setIsDarkMode] = useState(
		() => localStorage.getItem("theme") === "dark"
	);

	const handleThemeChange = () => {
		setIsDarkMode((prev) => !prev);
	};

	// Derived value — avoids storing a separate "theme" string in state
	const theme = isDarkMode ? "dark" : "light";

	// Side effects: sync theme to localStorage + HTML attribute whenever it changes
	useEffect(() => {
		localStorage.setItem("theme", theme);
		// This is what makes CSS [data-theme="dark"] selectors work
		document.documentElement.setAttribute("data-theme", theme);
	}, [isDarkMode]);

	return (
		<ThemeContext.Provider value={{ theme, handleThemeChange }}>
			{children}
		</ThemeContext.Provider>
	);
};
export default ThemeProvider;
