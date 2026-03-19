import React from "react";

const PaginationBar = ({ totalPages, currentPage, setCurrentPage }) => {
	if (totalPages <= 1) return null;

	const prevPage = () => {
		setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
	};
	const nextPage = () => {
		setCurrentPage((prev) => (prev + 1) % totalPages);
	};

	return (
		<div className="pagination-container">
			<button className="btn prev" onClick={prevPage}>
				⬅️
			</button>

			{/* Page number buttons */}
			{Array.from({ length: totalPages }, (_, i) => {
				return (
					<button
						key={i}
						className={`btn ${i === currentPage && "selected"}`}
						onClick={() => setCurrentPage(i)}
					>
						{i + 1}
					</button>
				);
			})}

			<button className="btn next" onClick={nextPage}>
				➡️
			</button>
		</div>
	);
};

export default PaginationBar;
