import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { SHIPPING_TYPES } from "../../constants/shippingTypes";
import { formatCurrency } from "../../utils/format";
import Radio from "../../components/Radio";
import { message } from "antd";

const SummaryCart = ({
  summarySubTotal,
  summaryTotal,
  onUpdateShipping,
  summaryProducts,
  typeShip,
}) => {
  console.log("typeShip :>> ", typeShip);
  const onProceed = () => {
    if (!(summaryProducts?.length > 0)) {
      message.error("Your Cart is empty!");
    } else {
      message.error("Please select shipping type!");
    }
  };
  return (
    <div className="summary summary-cart">
      <h3 className="summary-title">Cart Total</h3>
      <table className="table table-summary">
        <tbody>
          <tr className="summary-subtotal">
            <td>Subtotal:</td>
            <td>${formatCurrency(summarySubTotal)}</td>
          </tr>
          <tr className="summary-shipping">
            <td>Shipping:</td>
            <td>&nbsp;</td>
          </tr>

          <Radio.Group
            onChange={onUpdateShipping}
            defaultValue={typeShip}
            type="object"
          >
            {SHIPPING_TYPES.map((option) => {
              const { label, value, price } = option || {};
              return (
                <tr key={option.value} className="summary-shipping-row">
                  <td>
                    <Radio.Item objectValue={option} value={value}>
                      {label}
                    </Radio.Item>
                  </td>
                  <td>${formatCurrency(price)}</td>
                </tr>
              );
            })}
          </Radio.Group>

          {/* <tr className="summary-shipping-row">
            <td>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="free-shipping"
                  name="shipping"
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="free-shipping">
                  Free Shipping
                </label>
              </div>
            </td>
            <td>$0.00</td>
          </tr>
          <tr className="summary-shipping-row">
            <td>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="standart-shipping"
                  name="shipping"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="standart-shipping"
                >
                  Standart:
                </label>
              </div>
            </td>
            <td>$10.00</td>
          </tr>
          <tr className="summary-shipping-row">
            <td>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  id="express-shipping"
                  name="shipping"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="express-shipping"
                >
                  Express:
                </label>
              </div>
            </td>
            <td>$20.00</td>
          </tr> */}

          <tr className="summary-shipping-estimate">
            <td>
              Estimate for Your Country <br />
              <a href="dashboard.html">Change address</a>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr className="summary-total">
            <td>Total:</td>
            <td>
              $
              {formatCurrency(Number(summarySubTotal) + (typeShip?.price || 0))}
            </td>
          </tr>
        </tbody>
      </table>
      {!!typeShip?.typeShip && summaryProducts?.length > 0 ? (
        <Link
          to={PATHS.CHECKOUT}
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          PROCEED TO CHECKOUT
        </Link>
      ) : (
        <a
          onClick={onProceed}
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          PROCEED TO CHECKOUT
        </a>
      )}
    </div>
  );
};

export default SummaryCart;
