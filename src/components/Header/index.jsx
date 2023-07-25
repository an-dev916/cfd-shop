import React from "react";
import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from "./HeaderTop";
import useHeader from "./useHeader";

const Header = () => {
  const { ...rest } = useHeader();
  return (
    <header className="header">
      <HeaderTop {...rest} />
      <HeaderMiddle />
    </header>
  );
};

export default Header;
