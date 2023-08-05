import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTHEN_TYPES } from "../../constants/authenTypes";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { PATHS } from "../../constants/pathnames";
import authService from "../../services/authService";
import cartService from "../../services/cartService";
import {
  authActions,
  getProfile,
  login,
} from "../../store/reducers/authenReducer";
import { cartActions, getCart } from "../../store/reducers/cartReducer";

const MainContext = createContext({});

export const MainProvider = ({ children }) => {
  // Handle Authen Modal
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);

  // Handle Mobile Menu Active
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onHideMenu = () => {
    document.body.classList.remove("mmenu-active");
    setIsMenuOpen(false);
  };

  const onShowMenu = () => {
    document.body.classList.add("mmenu-active");
    setIsMenuOpen(true);
  };

  // Handle Review Modal
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const showReviewModal = () => {
    setIsReviewOpen(true);
  };
  const hideReviewModal = () => {
    setIsReviewOpen(false);
  };

  const [checkReview, setCheckReview] = useState({});

  // General
  const [renderForm, setRenderForm] = useState(AUTHEN_TYPES.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOpenModal = () => {
    setIsAuthenModalOpen(true);
    document.body.className = "modal-open";
    document.body.style = "padding-right: 17px";
  };

  const onCloseModal = () => {
    setIsAuthenModalOpen(false);
    document.body.className = "";
    document.body.style = "padding-right: none";
    setRenderForm(AUTHEN_TYPES.login);
  };

  const onLogout = () => {
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
    navigate(PATHS.HOME);
  };

  const onLogin = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          email: data.email,
          password: data.password,
        };
        const res = await dispatch(login(payload));
        const profileRes = unwrapResult(res);
        if (profileRes?.id) {
          message.success(`Welcome ${profileRes?.firstName}`);
          setTimeout(() => onCloseModal(), 200);
        }
      } catch (error) {
        console.log("error :>> ", error);
        message.error("Something wrong!");
      }
    }
  };

  const onRegister = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        };
        const res = await authService.register(payload);
        if (res?.data?.data?.id) {
          onLogin({ email: data?.email, password: data?.password });
        }
      } catch (error) {
        if (error?.response?.status === 403) {
          message.warning("This account existed, try another!");
        } else {
          message.error("Something wrong!");
        }
        console.log("error :>> ", error);
      }
    }
  };

  return (
    <MainContext.Provider
      value={{
        onShowMenu,
        onHideMenu,
        setIsMenuOpen,
        isMenuOpen,
        setIsAuthenModalOpen,
        isAuthenModalOpen,
        setCheckReview,
        checkReview,
        isReviewOpen,
        showReviewModal,
        hideReviewModal,
        setRenderForm,
        renderForm,
        onOpenModal,
        onCloseModal,
        onLogout,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useAuthen = () => useContext(MainContext);
