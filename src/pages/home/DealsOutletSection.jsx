import { message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const DealsOutletSection = () => {
  message.config({
    top: 62,
  });
  const handleClick = () => {
    message.warning(
      "The api has not returned data for this section, please try again later!"
    );
  };
  return (
    <div className="bg-light deal-container pt-7 pb-7 mb-5">
      <div className="container">
        <div className="heading text-center mb-4">
          <h2 className="title">Deals &amp; Outlet</h2>
          <p className="title-desc">Today’s deal and more</p>
        </div>
        <div className="row">
          <div className="col-lg-6 deal-col">
            <div
              className="deal"
              style={{
                backgroundImage:
                  'url("assets/images/demos/demo-3/deal/bg-1.jpg")',
              }}
            >
              <div className="deal-top">
                <h2>Deal of the Day.</h2>
                <h4>Limited quantities. </h4>
              </div>
              <div className="deal-content">
                <h3 className="product-title">
                  <a href="product-detail.html">
                    Home Smart Speaker with Google Assistant
                  </a>
                </h3>
                <div className="product-price">
                  <span className="new-price">$129.00</span>
                  <span className="old-price">Was $150.99</span>
                </div>
                <a href="product-detail.html" className="btn btn-link">
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
              <div className="deal-bottom">
                <div className="deal-countdown" data-until="+10h" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="products">
              <div className="row">
                <div className="col-6">
                  <div className="product product-2">
                    <figure className="product-media">
                      <span className="product-label label-circle label-sale">
                        Sale
                      </span>
                      <a onClick={handleClick}>
                        <img
                          src="/assets/images/demos/demo-3/products/product-5.jpg"
                          alt="Product image"
                          className="product-image"
                        />
                      </a>
                      <div className="product-action-vertical">
                        <a
                          onClick={handleClick}
                          className="btn-product-icon btn-wishlist btn-expandable"
                        >
                          <span>add to wishlist</span>
                        </a>
                      </div>
                      <div className="product-action product-action-dark">
                        <a
                          onClick={handleClick}
                          className="btn-product btn-cart"
                          title="Add to cart"
                        >
                          <span>add to cart</span>
                        </a>
                      </div>
                    </figure>
                    <div className="product-body">
                      <h3 className="product-title">
                        <a onClick={handleClick}>
                          Canon - EOS 5D Mark IV DSLR Camera
                        </a>
                      </h3>
                      <div className="product-price">
                        <span className="new-price">$3,599.99</span>
                        <span className="old-price">Was $3,999.99</span>
                      </div>
                      <div className="ratings-container">
                        <div className="ratings">
                          <div
                            className="ratings-val"
                            style={{ width: "80%" }}
                          />
                        </div>
                        <span className="ratings-text">( 5 Reviews )</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="product product-2">
                    <figure className="product-media">
                      <span className="product-label label-circle label-sale">
                        Sale
                      </span>
                      <a onClick={handleClick}>
                        <img
                          src="/assets/images/demos/demo-3/products/product-6.jpg"
                          alt="Product image"
                          className="product-image"
                        />
                      </a>
                      <div className="product-action-vertical">
                        <a
                          onClick={handleClick}
                          className="btn-product-icon btn-wishlist btn-expandable"
                        >
                          <span>add to wishlist</span>
                        </a>
                      </div>
                      <div className="product-action product-action-dark">
                        <a
                          onClick={handleClick}
                          className="btn-product btn-cart"
                          title="Add to cart"
                        >
                          <span>add to cart</span>
                        </a>
                      </div>
                    </figure>
                    <div className="product-body">
                      <h3 className="product-title">
                        <a onClick={handleClick}>
                          Apple - Smart Keyboard Folio for 11-inch iPad Pro
                        </a>
                      </h3>
                      <div className="product-price">
                        <span className="new-price">$179.00</span>
                        <span className="old-price">Was $200.99</span>
                      </div>
                      <div className="ratings-container">
                        <div className="ratings">
                          <div
                            className="ratings-val"
                            style={{ width: "60%" }}
                          />
                        </div>
                        <span className="ratings-text">( 4 Reviews )</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more-container text-center mt-3 mb-0">
          <Link
            to={PATHS.PRODUCT}
            className="btn btn-outline-dark-2 btn-round btn-more"
          >
            <span>Shop more</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealsOutletSection;
