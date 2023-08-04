import React from "react";
import { Collapse } from "antd";
import "./css/style.css";
import OrderDetail from "./OrderDetail";
import useViewport from "../../../hooks/useViewport";

function reverseArr(input) {
  if (input?.length) {
    let ret = [];
    for (let i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }
}

const OrderItem = ({
  // listOrders,
  showReviewModal,
  setCheckReview,
  renderListOrders,
}) => {
  const { listOrders, itemsToShow } = renderListOrders || {};
  const { orders } = listOrders || {};
  const viewport = useViewport();
  const reverseListOrders = reverseArr(orders);

  const orderInfo = reverseListOrders
    ?.slice(0, itemsToShow)
    ?.map((order, index) => {
      return {
        key: index,
        label: <OrderItemHeading order={order} viewport={viewport} />,
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

  return <Collapse items={orderInfo} defaultActiveKey={["0"]} />;
};

const OrderItemHeading = ({ order, viewport }) => {
  const orderTime = new Date(order?.updatedAt).toLocaleString();
  if (viewport.width <= 576) {
    return (
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
    );
  }

  return (
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
  );
};

export default OrderItem;
