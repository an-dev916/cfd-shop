import React from "react";
import { Outlet } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileMenuContainer from "../components/MobileMenuContainer";
import Modal from "../components/Modal";
import Overlay from "../components/Overlay";

const MainLayout = () => {
  return (
    <>
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
      <Modal />
    </>
  );
};

export default MainLayout;
