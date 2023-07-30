import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuthen } from "../../../components/MainContext";
import { LOCAL_STORAGE } from "../../../constants/localStorage";
import { orderService } from "../../../services/orderService";
import { authActions } from "../../../store/reducers/authenReducer";

const useMyOrder = () => {
  const [reviewRate, setReviewRate] = useState(3);
  const { showReviewModal, setCheckReview } = useAuthen();

  const listOrders = useSelector((state) => state.auth.listOrders);
  const onReviewSubmit = (reviewPayload) => {
    console.log("reviewPayload :>> ", reviewPayload);
  };
  const orderProps = {
    listOrders,
    onReviewSubmit,
    setReviewRate,
    reviewRate,
    showReviewModal,
    setCheckReview,
  };
  const reviewProps = {
    onReviewSubmit,
    setReviewRate,
    reviewRate,
  };

  return {
    reviewProps,
    orderProps,
  };
};

export default useMyOrder;
