import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const Button = ({
  className,
  link = "",
  variant = "primary",
  disable,
  children,
  ...rest
}) => {
  // check variant
  const variantClassName = useMemo(() => {
    if (disable) {
      return "btn btn-light";
    }

    switch (variant) {
      case "primary":
        return "btn btn-primary";
      case "outline":
        return "btn btn-outline-primary-2";

      default:
        return "";
    }
  }, [variant, disable]);

  //   default return BUTTON
  if (!link) {
    return (
      <button className={`${variantClassName} ${className || ""}`} {...rest}>
        {children}
      </button>
    );
  }

  //   return when link is true
  return (
    <Link
      to={link}
      className={`${variantClassName} ${className || ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
