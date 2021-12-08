import React, { useState, useCallback, useMemo, memo, useEffect } from "react";

// import { ReactComponent as Arrow } from "../../images/icon-pack/arrow-right.svg";

import "./Pagination.scss";

interface IPaginationProps {
  page?: number;
  pages: number;
  adjacentsElements?: number;
  elementsInRow?: number;
  onPageChange(truePage: number): void;
}

const Pagination: React.FC<IPaginationProps> = ({
  page,
  pages,
  adjacentsElements = 1,
  elementsInRow = 2,
  onPageChange = Function.prototype,
}) => {
  const [_page, setPage] = useState<number>(1);

  const currentPage = useMemo(() => {
    let truePage: number = Math.max(1, page !== undefined ? page : _page);

    truePage = Math.min(truePage, pages);

    return truePage;
  }, [page, _page, pages]);

  const isFirstPage: boolean = useMemo(
    () => (currentPage === 1 ? true : false),
    [currentPage]
  );

  const isLastPage: boolean = useMemo(
    () => (currentPage === pages ? true : false),
    [currentPage, pages]
  );

  const changePage = useCallback(
    (newPage) => {
      let truePage: number = Math.max(1, newPage);
      truePage = Math.min(truePage, pages);

      if (page === undefined) {
        setPage(truePage);
      }
      onPageChange(truePage);
    },
    [page, pages, onPageChange]
  );

  const prevPage = () => {
    changePage(currentPage - 1);
  };

  const nextPage = () => {
    changePage(currentPage + 1);
  };

  const head = useMemo(() => {
    const headPages: Array<number> = [];

    for (
      let i = 1;
      i < Math.min(1 + elementsInRow, currentPage - adjacentsElements);
      i++
    ) {
      headPages.push(i);
    }

    return headPages.map((page) => (
      <span role="button" onClick={() => changePage(page)} key={`head-${page}`}>
        {page}
      </span>
    ));
  }, [currentPage, changePage, adjacentsElements, elementsInRow]);

  const body = useMemo(() => {
    const bodyPages: Array<number> = [];

    for (
      let i = Math.max(1, currentPage - adjacentsElements);
      i <= Math.min(pages, currentPage + adjacentsElements);
      i++
    ) {
      bodyPages.push(i);
    }

    return bodyPages.map((page) => (
      <span
        role="button"
        onClick={() => changePage(page)}
        key={`body-${page}`}
        className={currentPage === page ? "current" : ""}
      >
        {page}
      </span>
    ));
  }, [currentPage, changePage, pages, adjacentsElements]);

  const tail = useMemo(() => {
    const tailPages: Array<number> = [];
    for (
      let i = pages;
      i > Math.max(pages - elementsInRow, currentPage + adjacentsElements);
      i--
    ) {
      tailPages.push(i);
    }
    return tailPages.reverse().map((page) => (
      <span onClick={() => changePage(page)} key={`tail-${page}`}>
        {page}
      </span>
    ));
  }, [currentPage, changePage, pages, adjacentsElements, elementsInRow]);

  const leftDots = useMemo(() => {
    if (currentPage - adjacentsElements > 1 + elementsInRow) {
      return <span className="dots">…</span>;
    } else {
      return <></>;
    }
  }, [currentPage, adjacentsElements, elementsInRow]);

  const rightDots = useMemo(() => {
    if (currentPage + adjacentsElements < pages - elementsInRow) {
      return <span className="dots">…</span>;
    } else {
      return <></>;
    }
  }, [currentPage, pages, adjacentsElements, elementsInRow]);

  useEffect(() => {
    if (page !== undefined) {
      if (page < 1) {
        onPageChange(1);
      }
      if (page > pages) {
        onPageChange(pages);
      }
    }
    onPageChange && onPageChange(currentPage);
  }, [page, pages, onPageChange, currentPage]);

  return (
    <div className="pagination">
      <span
        className={`prev-button ${isFirstPage ? "inactive" : ""}`}
        onClick={prevPage}
      >
        {/* <Arrow /> */}
      </span>

      <span className="pages-wrapper">
        {head}
        {leftDots}
        {body}
        {rightDots}
        {tail}
      </span>

      <span
        className={`next-button ${isLastPage ? "inactive" : ""}`}
        onClick={nextPage}
      >
        {/* <Arrow /> */}
      </span>
    </div>
  );
};

export default memo(Pagination);
