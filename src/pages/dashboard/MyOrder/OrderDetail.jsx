import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/pathnames";
import { formatCurrency } from "../../../utils/format";

const OrderDetail = ({
  address: { email, fullName, phone, street },
  shipping: { typeShip },
  note,
  id: orderID,
  product,
  quantity,
  subTotal,
  total,
  discount,
  isReview,
  showReviewModal,
  setCheckReview,
  viewport,
}) => {
  console.log("viewport :>> ", viewport);
  return (
    <div className="orderItem">
      <div className="info">
        <div className="wrapInfo">
          <label>
            Name: <strong>{fullName}</strong>
          </label>
          <label>
            Phone: <strong>{phone}</strong>
          </label>
          <label>
            Email: <strong>{email}</strong>
          </label>
          <label>
            Address: <strong>{street}</strong>
          </label>
          <label>
            Note: <strong>{note}</strong>
          </label>
          <label>
            Type Shipping: <strong>{typeShip}</strong>
          </label>
        </div>
      </div>
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {product?.length > 0 &&
            product.map((item, index) => {
              const { id: productID, images, price, slug, name } = item || {};
              const lastHttpImg = images[0]?.lastIndexOf("https");
              const img0 = images[0]?.slice(lastHttpImg);
              return (
                <tr key={productID || index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link
                          to={`${PATHS.PRODUCT}${slug ? "/" + slug : ""}`}
                          style={{
                            maxHeight: "60px",
                            overflow: "hidden",
                          }}
                        >
                          <img src={img0} alt={slug} />
                        </Link>
                      </figure>
                      <h3 className="product-title">
                        <Link to={`${PATHS.PRODUCT}${slug ? "/" + slug : ""}`}>
                          {name}
                        </Link>
                        {!isReview[index] && (
                          <div
                            className="nav-dashboard reviewOrder"
                            onClick={() => {
                              setCheckReview({
                                order: orderID,
                                product: productID,
                              });
                              showReviewModal();
                            }}
                          >
                            <p className="nav-link active">Review</p>
                          </div>
                        )}
                      </h3>
                    </div>
                  </td>
                  {!(viewport.width <= 991) ? (
                    <>
                      <td className="price-col text-center">
                        ${formatCurrency(price)}
                      </td>
                      <td className="quantity-col text-center">
                        {quantity[index]}
                      </td>
                      <td className="total-col text-center">
                        $
                        {Number(
                          formatCurrency(price) * (Number(quantity[index]) || 0)
                        )}
                      </td>
                    </>
                  ) : (
                    <td className="product-info__res">
                      <span>Price: ${formatCurrency(price)}</span>
                      <span>Quantity: {quantity[index]}</span>
                      <span className="total-col text-center">
                        Total: $
                        {Number(
                          formatCurrency(price) * (Number(quantity[index]) || 0)
                        )}
                      </span>
                    </td>
                  )}
                  {/* <td className="price-col text-center">
                    ${formatCurrency(price)}
                  </td>
                  <td className="quantity-col text-center">
                    {quantity[index]}
                  </td>
                  <td className="total-col text-center">
                    $
                    {Number(
                      formatCurrency(price) * (Number(quantity[index]) || 0)
                    )}
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="orderPrice">
        <div className="wrapInfo price">
          <label>
            SubTotal: <strong>${formatCurrency(subTotal)}</strong>
          </label>
          <label>
            Discount: <strong>{discount}</strong>
          </label>
          <label style={{ textAlign: "center" }}>
            <span>
              Total: <strong>${formatCurrency(total)}</strong>
            </span>

            <br />
            <span style={{ fontStyle: "italic" }}>
              (subtotal + ship - discount)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
