/**
 * LANDING — Landing.jsx (Layout Component)
 *
 * This is the SHARED LAYOUT for all routes (see App.jsx route config).
 * It renders:
 *   - Nav bar with links + theme toggle button
 *   - <Outlet /> where child route components (Home/About/Dashboard) render
 *
 * THEME INTEGRATION:
 *   - Consumes useThemeContext() to get current theme + toggle function
 *   - Button shows 🌙 in dark mode, ☀️ in light mode
 *   - onClick calls handleThemeChange → flips isDarkMode in context →
 *     useEffect sets data-theme on <html> → CSS variables swap → UI updates
 */
import { NavLink, Outlet } from "react-router-dom";
import { useThemeContext } from "../Context/ThemeContextProvider";

const Landing = () => {
	const { theme, handleThemeChange } = useThemeContext();
	return (
		<div>
			<nav>
				{/* flex container for links — keeps them in a row */}
				<div className="nav-links">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/dashboard">Dashboard</NavLink>
				</div>
				{/* justify-content: space-between pushes this to the right */}
				<div className="theme-switcher-container">
					<button className="theme-swithcer" onClick={handleThemeChange}>
						{theme === "dark" ? "🌙" : "☀️"}
					</button>
				</div>
			</nav>
			<main>
				{/* React Router renders the matched child route here */}
				<Outlet />
			</main>
		</div>
	);
};
export default Landing;
