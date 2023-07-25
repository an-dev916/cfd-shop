import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { authActions } from "../../store/reducers/authenReducer";
import { useAuthen } from "../MainContext";

const useHeader = () => {
  const { onOpenModal, dataProfile, onLogout } = useAuthen();
  // const navigate = useNavigate();
  const profile = useSelector((state) => state.auth.profile);
  // const dispatch = useDispatch();

  // const onLogout = () => {
  //   console.log("logout");
  //   dispatch(authActions.logout());
  //   navigate(PATHS.HOME);
  // };

  return {
    onOpenModal,
    profile,
    onLogout,
    dataProfile,
  };
};

export default useHeader;
