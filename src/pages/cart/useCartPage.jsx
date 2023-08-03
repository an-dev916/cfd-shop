import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SHIPPING_TYPES } from "../../constants/shippingTypes";
import { THUNK_STATUS } from "../../constants/thunkStatus";
import { updateCart } from "../../store/reducers/cartReducer";

export const useCartPage = () => {
  const { cartInfo, updateStatus } = useSelector((state) => state.cart);
  const { confirm } = Modal;
  const dispatch = useDispatch();
  console.log("cartInfo :>> ", cartInfo);
  const { product, quantity, subTotal, total } = cartInfo || {};

  const onDeleteProduct = async (id, index) => {
    try {
      if (id) {
        const newProducts = product
          ?.filter((item) => item.id !== id)
          .map((item) => item.id);

        const newQuantity = [...quantity];
        newQuantity.splice(index, 1);

        const newPayload = {
          ...cartInfo,
          product: newProducts,
          quantity: newQuantity,
        };
        console.log("newPayload :>> ", newPayload);
        dispatch(updateCart(newPayload));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleDeleteProduct = async (id, index) => {
    if (id) {
      confirm({
        title: "Do you want to delete this item?",
        content: (
          <>
            <p>{`${product[index]?.name || ""}`}</p>
            <p>{`${quantity[index]} x $${product[index]?.price}`}</p>
          </>
        ),
        onOk() {
          onDeleteProduct(id, index);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const onUpdateQuantity = async (value, index) => {
    if (cartInfo?.id && updateStatus !== THUNK_STATUS.pending) {
      try {
        const newQuantity = [...quantity];
        newQuantity[index] = value.toString();

        const newProducts = product
          ?.filter((item) => item)
          .map((item) => item.id);
        console.log("newProducts :>> ", newProducts);
        const newCart = {
          ...cartInfo,
          quantity: newQuantity,
          product: newProducts,
        };

        console.log("newCart :>> ", newCart);

        const res = await dispatch(updateCart(newCart));
        console.log("res :>> ", res);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  };

  const onUpdateShipping = async (value) => {
    console.log("value :>> ", value);
    try {
      const newProducts = product
        ?.filter((item) => item)
        .map((item) => item.id);

      const newPayload = {
        ...cartInfo,
        product: newProducts,
        shipping: {
          typeShip: value?.value,
          price: value?.price,
        },
      };

      const res = await dispatch(updateCart(newPayload));
      console.log("res :>> ", object);
      console.log("newPayload :>> ", newPayload);
    } catch (error) {}
  };

  const tableCartProps = {
    tableCartProducts: product,
    tableCartQuantities: quantity,
    onDeleteProduct,
    onUpdateQuantity,
    handleDeleteProduct,
  };

  const summaryProps = {
    summarySubTotal: subTotal,
    summaryTotal: total,
    onUpdateShipping,
    summaryProducts: product,
    typeShip: cartInfo?.shipping,
  };
  return {
    tableCartProps,
    summaryProps,
  };
};
