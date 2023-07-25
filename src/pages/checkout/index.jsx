import React from "react";
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
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="product.html">Product</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Checkout
            </li>
          </ol>
        </div>
      </nav>
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
