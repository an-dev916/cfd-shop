import React, { useMemo, useState } from "react";

const PAGE_STEP = 1;

const Pagination = ({ page, total = 0, limit = 0, onPageChange }) => {
  const currPage = Number(page);
  // Total Pages
  const totalPages = useMemo(() => {
    if (!limit || !total) {
      return 1;
    }

    return Math.ceil(Number(total) / Number(limit)) || 1;
  }, [limit, total]);
  // Pages List Show
  const pageList = useMemo(() => {
    let start = currPage - PAGE_STEP;
    let end = currPage + PAGE_STEP;

    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPages) {
        end = totalPages;
      }
    }

    if (end >= totalPages) {
      end = totalPages;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }

    const list = [];
    for (let index = start; index <= end; index++) {
      list.push(index);
    }
    return list;
  }, [currPage, totalPages]);

  const onNext = () => {
    const nextPage = currPage + 1;
    if (nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  const onLast = () => {
    if (currPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const onPrev = () => {
    const prevPage = currPage - 1;
    if (prevPage >= 1) {
      onPageChange(prevPage);
    }
  };

  const onFirst = () => {
    onPageChange(1);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currPage <= 1 ? "disabled" : ""}`}>
          <a
            className="page-link page-link-prev"
            aria-label="Previous"
            tabIndex={-1}
            aria-disabled="true"
            onClick={onPrev}
          >
            <span aria-hidden="true">
              <i className="icon-long-arrow-left" />
            </span>
            Prev{" "}
          </a>
        </li>
        <li className={`page-item ${currPage <= 1 ? "disabled" : ""}`}>
          <a className="page-link" onClick={onFirst}>
            First{" "}
          </a>
        </li>

        {pageList?.length > 0 &&
          pageList?.map((item) => {
            return (
              <li
                className={`page-item ${item === currPage ? "active" : ""}`}
                key={item || index}
                style={item === currPage ? { pointerEvents: "none" } : {}}
                aria-current="page"
                onClick={() => onPageChange(item)}
              >
                <a className="page-link">{item}</a>
              </li>
            );
          })}

        {/* <li className="page-item active" aria-current="page">
          <a className="page-link">1</a>
        </li>
        <li className="page-item">
          <a className="page-link">2</a>
        </li>
        <li className="page-item">
          <a className="page-link">3</a>
        </li> */}

        <li className="page-item-total">of {totalPages}</li>

        <li
          className={`page-item ${currPage == totalPages ? "disabled" : ""}`}
          style={{ marginLeft: "17px" }}
          onClick={onLast}
        >
          <a className="page-link">Last </a>
        </li>

        <li
          className={`page-item  ${currPage == totalPages ? "disabled" : ""}`}
        >
          <a
            className="page-link page-link-next"
            onClick={onNext}
            aria-label="Next"
          >
            {" "}
            Next{" "}
            <span aria-hidden="true">
              <i className="icon-long-arrow-right" />
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
