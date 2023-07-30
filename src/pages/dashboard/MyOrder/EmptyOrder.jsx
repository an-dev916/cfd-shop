import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/pathnames";

const EmptyOrder = () => {
  return (
    <>
      <p>No order has been made yet.</p>
      <Link
        to={PATHS.PRODUCT}
        className="btn btn-outline-primary-2"
        onClick={() => console.log("test")}
      >
        <span>GO SHOP</span>
        <i className="icon-long-arrow-right" />
      </Link>
    </>
  );
};

export default EmptyOrder;
