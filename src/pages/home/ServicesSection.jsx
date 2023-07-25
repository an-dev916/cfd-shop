import React, { useEffect, useMemo, useState } from "react";

const ServicesSection = ({ ourServices }) => {
  const arr = Object.keys(ourServices || {});

  return (
    <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
      <div className="container">
        <div className="row">
          {arr.map((e, i) => (
            <Test
              title={ourServices[e]?.title}
              type={e}
              key={e || i}
              description={ourServices[e]?.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Test = ({ children, title, type, description }) => {
  // const [icon, setIcon] = useState(<></>);

  const mainIcon = useMemo(() => {
    switch (type) {
      case "return":
        return (
          <span className="icon-box-icon text-dark">
            <i className="icon-rotate-left" />
          </span>
        );
        break;

      case "shipping":
        return (
          <span className="icon-box-icon text-dark">
            <i className="icon-rocket" />
          </span>
        );
        break;

      case "sale":
        return (
          <span className="icon-box-icon text-dark">
            <i className="icon-info-circle" />
          </span>
        );
        break;
      case "support":
        return (
          <span className="icon-box-icon text-dark">
            <i className="icon-life-ring" />
          </span>
        );
        break;

      default:
        break;
    }
  }, []);

  // useEffect(() => {
  //   setIcon(mainIcon);
  // }, []);

  return (
    <div className="col-sm-6 col-lg-3">
      <div className="icon-box icon-box-side">
        {mainIcon}
        <div className="icon-box-content">
          <h3 className="icon-box-title">{title || ""}</h3>
          <p>{description || ""}</p>
        </div>
      </div>
    </div>
  );
};
export default ServicesSection;
