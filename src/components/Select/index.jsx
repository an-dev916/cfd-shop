import React, { forwardRef } from 'react'

const Select = forwardRef(
  ({ options = [], label, required, error, onChangeValue, ...rest }, ref) => {
    return (
      <>
        <label htmlFor={rest?.name || ''}>
          {label} {required && <span>*</span>}
        </label>
        <select
          {...rest}
          ref={ref}
          // onChange={(ev) => console.log(ev.target.value)}
          onChange={onChangeValue}
          className={`form-control form-select ${!!error ? 'input-error' : ''}`}
        >
          {options?.length > 0 &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        {!!error && <p className='form-error'>{error}</p>}
      </>
    )
  }
)

export default Select
