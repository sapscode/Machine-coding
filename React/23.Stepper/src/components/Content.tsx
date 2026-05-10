/**
 * Content.tsx - Right Column Content Display Component
 *
 * Purpose:
 * - Display the current step's content/instructions
 * - Provide Previous/Next buttons for step-by-step navigation
 * - Disable Previous on first step, disable Next on last step
 *
 * Navigation: Step-by-step only (unlike Stepper which allows jumping)
 */

import type { ContentProp } from "../types";

const Content = ({
	content,
	totalPages,
	currentPage,
	setCurrentPage
}: ContentProp) => {
	// Handler for Previous button - moves to previous step
	const handlePrev = () => {
		setCurrentPage(currentPage - 1);
	};

	// Handler for Next button - moves to next step
	const handleNext = () => {
		setCurrentPage(currentPage + 1);
	};

	return (
		<div className="content-container">
			{/* Display current step's description/instructions */}
			<div className="content">{content.data}</div>

			{/* Navigation buttons for step-by-step progression */}
			<div className="button-container">
				{/* Previous button - disabled when on first step (index 0) */}
				<button
					className="prev"
					disabled={currentPage === 0}
					onClick={handlePrev}
				>
					Previous
				</button>

				{/* Next button - disabled when on last step (index totalPages-1) */}
				<button
					className="next"
					disabled={currentPage === totalPages - 1}
					onClick={handleNext}
				>
					Next
				</button>
			</div>
		</div>
	);
};
export default Content;
