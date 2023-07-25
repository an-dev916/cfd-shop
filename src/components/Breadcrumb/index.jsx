import React from "react";

// Component cha
const Breadcrumb = ({ className, children }) => {
  return (
    <nav aria-label="breadcrumb" className={`breadcrumb-nav ${className}`}>
      <div className="container">
        <ol className="breadcrumb">{children}</ol>
      </div>
    </nav>
  );
};

// Component con
const BreadcrumbItem = ({ children, isActive = false }) => {
  return (
    <li className={`breadcrumb-item ${isActive ? "active" : ""}`}>
      {children}
    </li>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
