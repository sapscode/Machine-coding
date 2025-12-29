import { useThemeContext } from "../ThemeProvider";

const ThemeLabel = () => {
	const { theme, toggleTheme } = useThemeContext();
	console.log("ThemeLabel rendered");
	return <button onClick={toggleTheme}>Current theme: {theme}</button>;
};

export default ThemeLabel;
