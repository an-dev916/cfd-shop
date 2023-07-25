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
  const [isAuthenModalOpen, setIsAuthenModalOpen] = useState(false);
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
        message.error("Something wrong!");
        console.log("error :>> ", error);
      }
    }
  };

  return (
    <MainContext.Provider
      value={{
        setIsAuthenModalOpen,
        isAuthenModalOpen,
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
