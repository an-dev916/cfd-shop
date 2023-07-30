import React from "react";
import { Collapse } from "antd";
import "./css/style.css";
import OrderDetail from "./OrderDetail";
import useViewport from "../../../hooks/useViewport";

const OrderItem = ({ listOrders, showReviewModal, setCheckReview }) => {
  const { orders } = listOrders || {};
  console.log("orders :>> ", orders);
  console.log("render");
  const onChange = (key) => {
    console.log(key);
  };
  const viewport = useViewport();
  console.log("viewport :>> ", viewport);

  const orderInfo = orders?.map((order, index) => {
    const orderTime = new Date(order?.updatedAt).toLocaleString();
    return {
      key: index,
      label:
        viewport.width > 576 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              ORDER ID: <strong>{order?.id}</strong>
            </span>
            <span>{`(${orderTime})`}</span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              ORDER ID: <strong>{order?.id}</strong>
              <br />
              <span>{`(${orderTime})`}</span>
            </span>
          </div>
        ),
      children: (
        <OrderDetail
          viewport={viewport}
          {...order}
          showReviewModal={showReviewModal}
          setCheckReview={setCheckReview}
        />
      ),
    };
  });

  return (
    <Collapse
      items={orderInfo}
      defaultActiveKey={[(orders?.length - 1).toString()]}
      onChange={onChange}
    />
  );
};

export default OrderItem;
