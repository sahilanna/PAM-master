import React, { useState } from "react";

const Pagination = ({
  data,
  itemsPerPage,
  paginate,
}) => {
  const [currentPage, setCurrentPage] =
    useState(1);

  const indexOfLastItem =
    currentPage * itemsPerPage;
  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;
  data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    data.length / itemsPerPage
  );

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        {Array.from(
          { length: totalPages },
          (_, i) => (
            <li
              key={i}
              className={`page-item ${
                i + 1 === currentPage
                  ? "active"
                  : ""
              }`}
            >
              <button
                data-testid="page"
                onClick={() =>
                  handlePaginate(i + 1)
                }
                className="page-link"
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
export default Pagination;
