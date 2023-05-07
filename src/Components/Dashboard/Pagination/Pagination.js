// import React, { useState } from "react";
// import { Pagination } from "react-bootstrap";

// const PaginationComponent = ({data, itemsPerPage, totalItems, paginate }) => {
//   const [activePage, setActivePage] = useState(1);
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const handlePageClick = (pageNumber) => {
//     setActivePage(pageNumber);
//     paginate(pageNumber);
//   };

//   return (
//     <Pagination>
//       {pageNumbers.map((number) => (
//         <Pagination.Item
//           key={number}
//           active={number === activePage}
//           onClick={() => handlePageClick(number)}
//         >
//           {number}
//         </Pagination.Item>
//       ))}
//     </Pagination>
//   );
// };

// export default PaginationComponent;

import React, { useState } from "react";

const Pagination = ({ data, itemsPerPage, paginate }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
            <button onClick={() => handlePaginate(i + 1)} className="page-link">
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;