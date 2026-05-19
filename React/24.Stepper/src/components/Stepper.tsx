/**
 * Stepper.tsx - Left Column Step Indicator Component
 *
 * Purpose:
 * - Display numbered buttons (1-5) for each step
 * - Highlight the currently active step in blue
 * - Show connecting lines between steps
 * - Allow clicking any step to jump directly to it
 *
 * Accessibility:
 * - aria-label: describes what each button does
 * - aria-current="step": marks the active step for screen readers
 * - disabled attribute: prevents interacting with current step
 */

import type { StepperProp } from "../types";

/**
 * Stepper Component - Progress Indicator
 * @param totalPages - Total number of steps (5)
 * @param currentPage - Index of active page (0-4)
 * @param setCurrentPage - Callback to change the active page
 */
const Stepper = ({ totalPages, currentPage, setCurrentPage }: StepperProp) => {
	return (
		<div className="stepper-container">
			{Array.from({ length: totalPages }, (_, i) => {
				return (
					<div key={i}>
						<button
							aria-label={`Go to step ${i + 1}`}
							aria-current={i === currentPage ? "step" : undefined}
							disabled={i === currentPage}
							className={`stepper-button ${i === currentPage ? "active" : ""}`}
							onClick={() => setCurrentPage(i)}
						>
							{i + 1}
						</button>
						{i !== totalPages - 1 && <div className="vertical-line" />}
					</div>
				);
			})}
		</div>
	);
};
export default Stepper;
