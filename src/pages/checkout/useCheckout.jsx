import { message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { PAYMENT_METHOD } from "../../constants/paymentMethods";
import { THUNK_STATUS } from "../../constants/thunkStatus";
import { orderService } from "../../services/orderService";
import { cartActions } from "../../store/reducers/cartReducer";
import { checkout } from "../../store/reducers/orderReducer";
import { Modal } from "antd";

export const useCheckout = () => {
  const { cartInfo } = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.auth.profile);
  const { checkoutStatus } = useSelector((state) => state.order);
  const { confirm } = Modal;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coupoun, setCoupoun] = useState(0);
  const [currPayment, setCurrPayment] = useState(
    (cartInfo?.paymentMethod && cartInfo?.paymentMethod !== "string") || ""
  );
  console.log("currPayment :>> ", currPayment);
  console.log("profile :>> ", profile);
  console.log("cartInfo :>> ", cartInfo);
  const onAddCoupoun = async (coupoun) => {
    try {
      const coupounRes = await orderService.getCoupoun(coupoun);
      const coupounData = coupounRes?.data?.data;

      if (!!coupounData) {
        const cacheCartInfo = {
          ...cartInfo,
          discount: coupounData?.value,
          discountCode: coupounData?.code || "",
          total:
            cartInfo?.subTotal -
            Number(coupounData?.value) +
            Number(cartInfo?.shipping?.price || 0),
        };

        dispatch(cartActions?.updateCacheCart(cacheCartInfo));
        message.success("Coupoun Applied!");
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Invalid Coupoun!");
    }
  };

  const onRemoveCoupoun = async (callback) => {
    try {
      if (cartInfo?.discountCode) {
        dispatch(
          cartActions?.updateCacheCart({
            ...cartInfo,
            discount: 0,
            discountCode: "",
            total: cartInfo?.subTotal + Number(cartInfo?.shipping?.price || 0),
          })
        );
        callback?.();
        message.error("Removed Coupoun!");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // const onUpdatePaymentMethod = (payment) => {
  //   setCurrPayment(payment);
  // };
  const form = useForm();

  const handleSubmit = form.handleSubmit;

  const handleCheckout = async () => {
    const {
      shipping,
      variant = [],
      subTotal,
      total,
      quantity,
      product,
      totalProduct,
      discount,
      discountCode,
      paymentMethod,
    } = cartInfo || {};

    const { phone, email, fullName, street, note } = form.getValues();
    const modProducts = product?.map((e) => e.id);
    const modPayload = {
      address: {
        phone: phone,
        email: email,
        fullName: fullName,
        street: street,
      },
      shipping,
      variant,
      subTotal,
      total,
      product: modProducts,
      quantity,
      totalProduct,
      discount: cartInfo?.discount,
      discountCode,
      paymentMethod: currPayment || "",
      note,
    };
    try {
      if (modProducts?.length > 0 && checkoutStatus !== THUNK_STATUS.pending) {
        const checkoutRes = await dispatch(checkout(modPayload)).unwrap();
        if (checkoutRes) {
          message.success("Succesfully!");
          navigate(PATHS.CHECKOUT_SUCCESS + `?id=${checkoutRes?.id}`);
        } else {
          message.error("Something wrong!");
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Something wrong!");
    }
  };

  const onCheckout = async (e) => {
    e.preventDefault();
    const formValues = form.getValues();
    const { province, district, ward } = formValues || "";
    if (!!!cartInfo?.shipping?.typeShip) {
      handleSubmit()();
      message.error("Please select your shipping type");
    } else if (!!!currPayment) {
      handleSubmit()();
      message.error("Please select your payment method");
    } else if (!province || !district || !ward) {
      handleSubmit()();
    } else {
      confirm({
        title: "Confirm your order?",
        content: (
          <>
            <p>Please check your information correctly!</p>
          </>
        ),
        onOk() {
          // console.log("form values:>> ", formValues);
          handleSubmit(handleCheckout)();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const billingProps = { form, profile: profile || {} };

  const summaryProps = {
    onCheckout,
    products: cartInfo?.product,
    quantity: cartInfo?.quantity,
    subTotal: cartInfo?.subTotal,
    total: cartInfo?.total,
    shipping: cartInfo?.shipping,
    paymentMethod: currPayment,
    onUpdatePaymentMethod: setCurrPayment,
  };
  const coupounProps = {
    onAddCoupoun,
    onRemoveCoupoun,
    addedCoupoun: cartInfo?.discountCode,
  };

  useEffect(() => {
    if (profile?.id) {
      const { firstName, phone, email, province, district, ward, street } =
        profile;
      // handle form async
      form.reset({
        fullName: firstName,
        phone: phone,
        email: email,
        province: province,
        district: district,
        ward: ward,
        street: street,
        note: "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (Object.values(PAYMENT_METHOD).includes(cartInfo?.paymentMethod)) {
      setCurrPayment(cartInfo?.paymentMethod);
    }
  }, [cartInfo?.paymentMethod]);

  return {
    billingProps,
    summaryProps,
    coupounProps,
  };
};
