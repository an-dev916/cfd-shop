import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productSevice";
import { useAuthen } from "../MainContext";

const useMobileMenu = () => {
  const { search } = useLocation();
  const { onHideMenu } = useAuthen();
  const handleHideMenu = () => {
    onHideMenu();
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // Main Menu Props
  const mainMenuProps = {
    handleHideMenu,
  };
  // Categories Menu Props
  const {
    data: catesData,
    loading: catesDataLoading,
    error: catesDataError,
  } = useQuery(productService.getCates);
  const cates = catesData?.products || [];
  const menuCatesProps = {
    handleHideMenu,
    onHideMenu,
    search,
    cates,
    catesList: cates.map((item) => item.name),
  };
  return { menuCatesProps, mainMenuProps };
};

export default useMobileMenu;
