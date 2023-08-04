import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantityInput from "../../components/QuantityInput";
import { THUNK_STATUS } from "../../constants/thunkStatus";
import cartService from "../../services/cartService";
import { updateCart } from "../../store/reducers/cartReducer";
import { formatCurrency } from "../../utils/format";

const TableCart = ({
  tableCartProducts = [],
  tableCartQuantities = [],
  onDeleteProduct,
  onUpdateQuantity,
  handleDeleteProduct,
}) => {
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  console.log("cartInfo :>> ", cartInfo);
  const { product, quantity } = cartInfo || {};
  const dispatch = useDispatch();

  // const onDeleteProduct = async (id, index) => {
  //   try {
  //     if (id) {
  //       const newProducts = product
  //         ?.filter((item) => item.id !== id)
  //         .map((item) => item.id);

  //       const newQuantity = [...quantity];
  //       newQuantity.splice(index, 1);

  //       const newPayload = {
  //         ...cartInfo,
  //         product: newProducts,
  //         quantity: newQuantity,
  //       };
  //       console.log("newPayload :>> ", newPayload);
  //       dispatch(updateCart(newPayload));
  //     }
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }
  // };

  // const onUpdateQuantity = async (value, index) => {
  //   if (cartInfo?.id && updateStatus !== THUNK_STATUS.pending) {
  //     try {
  //       const newQuantity = [...quantity];
  //       newQuantity[index] = value.toString();

  //       const newProducts = product
  //         ?.filter((item) => item)
  //         .map((item) => item.id);
  //       console.log("newProducts :>> ", newProducts);
  //       const newCart = {
  //         ...cartInfo,
  //         quantity: newQuantity,
  //         product: newProducts,
  //       };

  //       console.log("newCart :>> ", newCart);

  //       const res = await dispatch(updateCart(newCart));
  //       console.log("res :>> ", res);
  //     } catch (error) {
  //       console.log("error :>> ", error);
  //     }
  //   }
  // };

  return (
    <table className="table table-cart table-mobile">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tableCartProducts?.length > 0 &&
          tableCartProducts?.map((product, index) => {
            const { images, name, price, id } = product || {};
            const amount = Number(tableCartQuantities[index]);
            console.log("amount", amount);
            return (
              <tr key={id || index}>
                <td className="product-col">
                  <div className="product">
                    <figure className="product-media">
                      <a href="#">
                        <img src={images[0] || ""} alt="Product image" />
                      </a>
                    </figure>
                    <h3 className="product-title">
                      <a href="#">{name}</a>
                    </h3>
                  </div>
                </td>
                <td className="price-col">${formatCurrency(price)}</td>
                <td className="quantity-col">
                  <QuantityInput
                    className="cart-product-quantity"
                    value={amount}
                    onChange={(value) => onUpdateQuantity?.(value, index)}
                    handleDeleteProduct={() => handleDeleteProduct(id, index)}
                  />
                  {/* <div className="cart-product-quantity">
                    <input
                      type="number"
                      className="form-control"
                      defaultValue={1}
                      min={1}
                      max={10}
                      step={1}
                      data-decimals={0}
                      required
                    />
                  </div> */}
                </td>
                <td className="total-col">
                  ${formatCurrency(price * Number(amount))}
                </td>
                <td className="remove-col">
                  <button
                    className="btn-remove"
                    onClick={() => handleDeleteProduct(id, index)}
                  >
                    <i className="icon-close" />
                  </button>
                </td>
              </tr>
            );
          })}
        {/* <tr>
          <td className="product-col">
            <div className="product">
              <figure className="product-media">
                <a href="#">
                  <img
                    src="/assets/images/demos/demo-3/products/product-6.jpg"
                    alt="Product image"
                  />
                </a>
              </figure>
              <h3 className="product-title">
                <a href="#">Beige knitted elastic runner shoes</a>
              </h3>
            </div>
          </td>
          <td className="price-col">$84.00</td>
          <td className="quantity-col">
            <div className="cart-product-quantity">
              <input
                type="number"
                className="form-control"
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                data-decimals={0}
                required
              />
            </div>
          </td>
          <td className="total-col">$84.00</td>
          <td className="remove-col">
            <button className="btn-remove">
              <i className="icon-close" />
            </button>
          </td>
        </tr>
        <tr>
          <td className="product-col">
            <div className="product">
              <figure className="product-media">
                <a href="#">
                  <img
                    src="/assets/images/demos/demo-3/products/product-2-2.jpg"
                    alt="Product image"
                  />
                </a>
              </figure>
              <h3 className="product-title">
                <a href="#">Blue utility pinafore denim dress</a>
              </h3>
            </div>
          </td>
          <td className="price-col">$76.00</td>
          <td className="quantity-col">
            <div className="cart-product-quantity">
              <input
                type="number"
                className="form-control"
                defaultValue={1}
                min={1}
                max={10}
                step={1}
                data-decimals={0}
                required
              />
            </div>
          </td>
          <td className="total-col">$76.00</td>
          <td className="remove-col">
            <button className="btn-remove">
              <i className="icon-close" />
            </button>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default TableCart;
