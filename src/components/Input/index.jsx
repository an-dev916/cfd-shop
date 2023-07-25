import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";

const Input = forwardRef(
  (
    {
      label,
      style = {},
      required,
      error,
      renderInput = undefined,
      ...inputProps
    },
    ref
  ) => {
    // const {handleSubmit} = useForm()

    return (
      <div className="form-group" style={style || {}}>
        <label htmlFor={inputProps?.name || ""}>
          {label} {required && <span>*</span>}
        </label>
        {renderInput?.({ ...inputProps, ref: ref }) || (
          <input
            ref={ref}
            className={`form-control ${!!error ? "input-error" : ""}`}
            {...inputProps}
          />
        )}
        {!!error && <p className="form-error">{error}</p>}
      </div>
    );
  }
);

export default Input;
