import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constants/pathnames";
import CheckoutBillings from "./CheckoutBillings";
import CheckoutCoupoun from "./CheckoutCoupoun";
import CheckoutSummary from "./CheckoutSummary";
import { useCheckout } from "./useCheckout";

const Checkout = () => {
  const { billingProps, summaryProps, coupounProps } = useCheckout();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CheckoutCoupoun {...coupounProps} />
            <form action="#" className="checkout-form">
              <div className="row">
                <CheckoutBillings {...billingProps} />
                <CheckoutSummary {...summaryProps} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
