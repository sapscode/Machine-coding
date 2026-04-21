/**
 * ENTRY POINT — main.jsx
 *
 * Provider hierarchy (outermost → innermost):
 *   StrictMode → ThemeProvider → App (which has RouterProvider inside)
 *
 * ThemeProvider wraps here (above App) so that:
 *   - Every component in the app can access theme context
 *   - It sits ABOVE the router, so even layout components like Landing can consume it
 *   - This is the standard place for global providers
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ThemeProvider from "./Context/ThemeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>
);
