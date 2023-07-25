import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext();

const RadioGroup = ({
  defaultValue,
  disabled,
  className,
  onChange,
  children,
  type = "string",
}) => {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onCheckChange = (e, objectValue) => {
    const value = e.target.value;
    setValue(value);
    if (type === "object") {
      onChange?.(objectValue);
    } else {
      onChange?.(value);
    }
  };

  return (
    <RadioContext.Provider
      value={{ value, disabled, onCheckChange }}
      className={`radio-group ${className}`}
    >
      {children}
    </RadioContext.Provider>
  );
};

const RadioItem = ({ children, disabled = false, value, objectValue }) => {
  const { value: selectedValue, onCheckChange } = useContext(RadioContext);
  console.log("selectedValue :>> ", selectedValue);
  console.log("value :>> ", value);
  return (
    <div className="custom-control custom-radio">
      <input
        className="custom-control-input"
        type="radio"
        id={value}
        name={value}
        value={value}
        checked={selectedValue?.typeShip === value}
        disabled={disabled}
        onChange={(e) => onCheckChange(e, objectValue)}
      />
      <label className="custom-control-label" htmlFor={value}>
        {children}
      </label>
    </div>
  );
};

export default { Group: RadioGroup, Item: RadioItem };
