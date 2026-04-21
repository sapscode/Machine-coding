/**
 * APP — App.jsx
 *
 * Sets up React Router with a nested layout pattern:
 *   Landing (layout with nav + <Outlet />) wraps all child routes
 *
 * ROUTE STRUCTURE:
 *   /            → Landing layout → Home (index route)
 *   /about       → Landing layout → About
 *   /dashboard   → Landing layout → Dashboard
 *
 * NOTE: RouterProvider does NOT accept children, which is why
 * ThemeProvider is wrapped in main.jsx instead of here.
 */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Landing />, // Shared layout — nav lives here
			children: [
				{
					index: true, // Default child route for "/"
					element: <Home />
				},
				{
					path: "/about",
					element: <About />
				},
				{
					path: "/dashboard",
					element: <Dashboard />
				}
			]
		}
	]);

	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
