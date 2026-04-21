import React from "react";

// Interview pattern: Pagination controls component
// Responsible for rendering page buttons and handling navigation
const PaginationBar = ({ totalPages, currentPage, setCurrentPage }) => {
	// Hide pagination if only 1 page exists (interview: early exit pattern)
	if (totalPages <= 1) return null;

	// Interview pattern: Circular navigation using modulo with offset for negative wrapping
	// (prev - 1 + totalPages) % totalPages handles negative numbers correctly
	// Example: page 0 → (0 - 1 + 10) % 10 = 9 (goes to last page)
	// This creates "infinite" loop: ... → 2 → 1 → 0 → (last) → ... → 2 → 1
	const prevPage = () => {
		setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
	};

	// Interview pattern: Circular navigation using modulo operator
	// (currentPage + 1) % totalPages wraps around automatically
	// Example: 0 → 1 → 2 → ... → (last) → 0 (infinite loop)
	const nextPage = () => {
		setCurrentPage((prev) => (prev + 1) % totalPages);
	};

	return (
		<div className="pagination-container">
			{/* Previous button with circular navigation */}
			<button className="btn prev" onClick={prevPage}>
				⬅️
			</button>

			{/* Interview pattern: Array.from() creates array of page indices
			    { length: totalPages } creates array of N elements
			    (_, i) maps each element to index i
			    Renders buttons 1 to totalPages (user-friendly numbering) */}
			{Array.from({ length: totalPages }, (_, i) => {
				return (
					<button
						key={i}
						// Interview concept: Conditional CSS class - add "selected" if active
						className={`btn ${i === currentPage && "selected"}`}
						onClick={() => setCurrentPage(i)}
					>
						{i + 1} {/* Display 1-based number to user */}
					</button>
				);
			})}

			{/* Next button with circular navigation */}
			<button className="btn next" onClick={nextPage}>
				➡️
			</button>
		</div>
	);
};

export default PaginationBar;
