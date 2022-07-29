import { useMemo, useState } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function usePagination() {
  /*
    Rewrite the logic here to map out the pagination to be displayed

    !!!!!! ATTENTION !!!!!!
    Please replace this comment here with a description of this hook.
    
  */

  //return { next, prev, jump, currentData, currentPage, maxPage };

  return [1, 2, 3, DOTS, 5];
}

export function usePaginationNew(data, itemsPerPage) {
  /*
    Rewrite the logic here to map out the pagination to be displayed

    !!!!!! ATTENTION !!!!!!
    Please replace this comment here with a description of this hook.
    
  */
  const siblingCount = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= maxPage) {
      return range(1, maxPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, maxPage);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < maxPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = maxPage;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, maxPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(maxPage - rightItemCount + 1, maxPage);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [maxPage, currentPage]);

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    maxPage,
    paginationRange,
  };
}

export default usePagination;
