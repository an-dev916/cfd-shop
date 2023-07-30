import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthen } from "../../components/MainContext";
import { authActions, update } from "../../store/reducers/authenReducer";

const useDashboard = () => {
  const profile = useSelector((state) => state.auth.profile);
  const orderInfo = useSelector((state) => state.order.orderInfo);
  const [profileInfo, setProfileInfo] = useState({});
  const { onLogout } = useAuthen();
  const dispatch = useDispatch();

  console.log("orderInfo :>> ", orderInfo);
  const onUpdate = async (data) => {
    console.log("data :>> ", data);
    if (data?.email) {
      try {
        const payload = {
          firstName: data?.firstName.trim(),
          lastName: "",
          phone: data?.phone,
          facebookURL: "",
          website: "",
          introduce: "",
          birthday: data?.birthday || "",
          province: data?.province || "",
          district: data?.district || "",
          ward: data?.ward || "",
          street: data?.street || "",
        };
        const res = await dispatch(update(payload));
        const profileRes = unwrapResult(res);

        if (profileRes?.id) {
          message.success("Update Succesfully!");
          dispatch(authActions.setProfile(profileRes));
          setProfileInfo(profileRes);
        }
      } catch (error) {
        message.error("Update Fail!");
      }
    }
  };

  return {
    profileInfo,
    onUpdate,
    profile,
    onLogout,
  };
};

export default useDashboard;
