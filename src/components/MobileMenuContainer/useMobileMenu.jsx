import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productSevice";
import { useAuthen } from "../MainContext";

const useMobileMenu = () => {
  const { search } = useLocation();
  const { onHideMenu } = useAuthen();
  // Categories Menu Props
  const {
    data: catesData,
    loading: catesDataLoading,
    error: catesDataError,
  } = useQuery(productService.getCates);
  const cates = catesData?.products || [];
  const menuCatesProps = {
    onHideMenu,
    search,
    cates,
    catesList: cates.map((item) => item.name),
  };
  return { menuCatesProps };
};

export default useMobileMenu;
