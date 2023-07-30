import React, { useState } from "react";

const PagiSection = ({ products }) => {
  const [currPage, setCurrPage] = useState(1);

  const productDisplay = 6;
  const totalPages = Math.ceil(products?.length / productDisplay) || 1;

  const onNext = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  const onPrev = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link page-link-prev"
            onClick={onPrev}
            aria-label="Previous"
            tabIndex={-1}
            aria-disabled="true"
          >
            <span aria-hidden="true">
              <i className="icon-long-arrow-left" />
            </span>
            Prev{" "}
          </a>
        </li>
        <li className={`page-item ${currPage === 1 ? "disabled" : ""}`}>
          <a className="page-link" onClick={() => setCurrPage(1)}>
            First{" "}
          </a>
        </li>
        {/* Total Pages */}
        {[...Array(totalPages)].map((u, i) => {
          i += 1;
          return (
            <li
              className={`page-item ${currPage === i ? "active" : ""}`}
              aria-current="page"
            >
              <a className="page-link" onClick={() => setCurrPage(i)}>
                {i}
              </a>
            </li>
          );
        })}
        {/* 
        <li className="page-item active" aria-current="page">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li> */}

        <li className="page-item-total">of {totalPages || 1}</li>

        <li
          className={`page-item ${currPage === totalPages ? "disabled" : ""}`}
          style={{ marginLeft: "17px" }}
        >
          <a className="page-link" onClick={() => setCurrPage(totalPages || 1)}>
            Last{" "}
          </a>
        </li>

        <li
          className={`page-item ${currPage === totalPages ? "disabled" : ""}`}
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

export default PagiSection;
