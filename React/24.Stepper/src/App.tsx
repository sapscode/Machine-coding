/**
 * App.tsx - Main Application Component
 *
 * Responsibility:
 * - Manages the current page state (0-4 for 5 pages)
 * - Loads and serves page data from data.json
 * - Coordinates Stepper (left) and Content (right) components
 * - Provides state callbacks to child components
 *
 * Layout: Two-column flexbox
 *  - Left column: Stepper (step indicators)
 *  - Right column: Content (page content + navigation buttons)
 */

import { useState } from "react";

import "./App.css";
import Stepper from "./components/Stepper";
import Content from "./components/Content";
import data from "./data.json";
import type { PageDetails } from "./types";

// Load all 5 pages from data.json
const pageDetails: PageDetails[] = [...data];

// Fallback content if somehow an invalid page index is accessed
const defaultContent: PageDetails = { id: 0, data: "No content available" };

/**
 * Main App component
 * Orchestrates the entire stepper workflow
 */
function App() {
	// Track which step (0-4) user is viewing. 0 = page 1, 4 = page 5
	const [currentPage, setCurrentPage] = useState<number>(0);

	return (
		<div className="container">
			{/* LEFT COLUMN: Step indicators with connecting lines */}
			<Stepper
				totalPages={pageDetails.length}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>

			{/* RIGHT COLUMN: Current page content and navigation buttons */}
			{/* ?? (nullish coalescing) fallback: if page doesn't exist, show defaultContent */}
			<Content
				content={pageDetails[currentPage] ?? defaultContent}
				totalPages={pageDetails.length}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}

export default App;
