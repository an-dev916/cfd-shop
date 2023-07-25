import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constants/pathnames";
import CartCoupoun from "./CartCoupoun";
import SummaryCart from "./SummaryCart";
import TableCart from "./TableCart";
import { useCartPage } from "./useCartPage";

const Cart = () => {
  const { tableCartProps, summaryProps } = useCartPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>

      <Breadcrumb className="mb-2">
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>{" "}
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT}>Product</Link>{" "}
        </Breadcrumb.Item>

        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      {/* <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="product.html">Product</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </div>
      </nav> */}

      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                {/* <CartCoupoun /> */}
                <TableCart {...tableCartProps} />
              </div>
              <aside className="col-lg-3">
                <SummaryCart {...summaryProps} />
                <Link
                  to={PATHS.PRODUCT}
                  className="btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUE SHOPPING</span>
                  <i className="icon-refresh" />
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
