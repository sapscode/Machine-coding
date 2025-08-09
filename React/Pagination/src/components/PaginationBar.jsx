import React from "react";

const PaginationBar = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const prevPage = () => {
    const page = currentPage === 0 ? totalPages - 1 : currentPage - 1;
    setCurrentPage(page);
  };
  const nextPage = () => {
    const page = (currentPage + 1) % totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="pagination-container">
      <button className="btn prev" onClick={prevPage}>
        ⬅️
      </button>
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
