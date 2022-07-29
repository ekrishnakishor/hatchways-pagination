import "../css/pagination.scss";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { DOTS } from "../hooks/usePagination";

import { nanoid } from "nanoid";
import PropTypes from "prop-types";

function Pagination({
  currentPage,
  pageSize,
  pageSizeOptions,
  prev,
  next,
  jump,
  paginationRange,
  onPageChange,
}) {
  return (
    <ul
      className="wrapper"
      // Do not remove the aria-label below, it is used for Hatchways automation.
      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          // Do not remove the aria-label below, it is used for Hatchways automation.
          aria-label="Goto previous page"
          onClick={prev}
          disabled={false} // change this line to disable a button.
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber) => {
        const key = nanoid();
        const selectedPage = currentPage === pageNumber && "#00000026";

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            className="paginationItem"
            aria-current="false" // change this line to highlight a current page.
          >
            <button
              type="button"
              // Do not remove the aria-label below, it is used for Hatchways automation.
              aria-label={`Goto page ${pageNumber}`}
              onClick={() => jump(pageNumber)}
              style={{ backgroundColor: selectedPage }}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          // Do not remove the aria-label below, it is used for Hatchways automation.
          aria-label="Goto next page"
          onClick={next}
          disabled={false} // change this line to disable a button.
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="Select page size"
        value={pageSize}
        onChange={(e) => {
          onPageChange(e.target.value);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} selected={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
  pageSizeOptions: [15, 25, 50, 100],
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
};

export default Pagination;
