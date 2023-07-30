import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { libFunc } from "../assets/js/main";
import AuthenModal from "../components/AuthenModal";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MainProvider } from "../components/MainContext";
import MobileMenuContainer from "../components/MobileMenuContainer";
import Overlay from "../components/Overlay";
import { LOCAL_STORAGE } from "../constants/localStorage";
import ReviewModal from "../pages/dashboard/MyOrder/ReviewModal";
import authService from "../services/authService";
import { orderService } from "../services/orderService";
import { authActions, getProfile } from "../store/reducers/authenReducer";
import { getCart } from "../store/reducers/cartReducer";

const MainLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // const profile = useSelector((state) => state.auth.profile);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  useEffect(() => {
    // const oldScript =
    //   document.querySelector('script[src="/assets/js/main.js"]') || "";
    // if (!!oldScript) {
    //   oldScript.remove();
    // }
    // const myTimeout = setTimeout(() => {
    //   const script = document.createElement("script");
    //   script.src = "/assets/js/main.js";
    //   document.body.appendChild(script);
    // }, 300);
    // return () => clearTimeout(myTimeout);

    const myTimeout = setTimeout(() => {
      libFunc();
    }, 300);
    return () => clearTimeout(myTimeout);
  }, [pathname]);

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const res = await authService.getProfile();
        if (res?.data?.data) {
          dispatch(getProfile());
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    };

    const token = localStorage.getItem(LOCAL_STORAGE.token);

    if (!!token) {
      getProfileInfo();
      const testApi = dispatch(getCart());
      console.log("testApi :>> ", testApi);
    }
  }, []);

  return (
    <MainProvider>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Header */}
        <Header />
        {/* Main Outlet*/}
        <Outlet />
        {/* Footer */}
        <Footer />
      </div>
      {/* Back To Top */}
      <BackToTop />
      {/* Mobile Menu */}
      <Overlay />
      <MobileMenuContainer />
      {/* Modal */}
      <AuthenModal />
      {/* Review Modal */}
      <ReviewModal />
    </MainProvider>
  );
};

export default MainLayout;
