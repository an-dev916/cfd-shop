import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE } from "../../../constants/localStorage";
import { PATHS } from "../../../constants/pathnames";
import { orderService } from "../../../services/orderService";
import { authActions } from "../../../store/reducers/authenReducer";
import EmptyOrder from "./EmptyOrder";
import OrderItem from "./OrderItem";
import ReviewModal from "./ReviewModal";
import useMyOrder from "./useMyOrder";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orderProps } = useMyOrder();
  const { listOrders } = orderProps || {};
  console.log("listOrders :>> ", listOrders);
  useEffect(() => {
    const getListOrdersInfo = async () => {
      try {
        const res = await orderService.getOrder();
        const listRes = res?.data?.data;
        if (listRes) {
          dispatch(authActions.setListOrders(listRes));
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    const token = localStorage.getItem(LOCAL_STORAGE.token);
    if (!!token) {
      getListOrdersInfo();
    }
  }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      {listOrders?.orders?.length > 0 ? (
        <OrderItem {...orderProps} />
      ) : (
        <EmptyOrder />
      )}
    </div>
  );
};

export default MyOrders;
