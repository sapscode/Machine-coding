import React from "react";

const PaginationBar = React.memo(
	({ currentPage, handlePageChange, totalPages }) => {
		return (
			<div className="footer">
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i}
						className={`btn ${currentPage === i + 1 ? "active" : ""}`}
						onClick={() => handlePageChange(i + 1)}
					>
						{i + 1}
					</button>
				))}
			</div>
		);
	}
);
export default PaginationBar;
