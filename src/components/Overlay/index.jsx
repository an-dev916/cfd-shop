import React from "react";
import { useAuthen } from "../MainContext";

const Overlay = () => {
  const { onHideMenu } = useAuthen();
  return <div className="mobile-menu-overlay" onClick={onHideMenu} />;
};

export default Overlay;
