import React, { useState } from 'react'
import { styled } from 'styled-components'

const InputNumberStyle = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  -moz-appearance: textfield; /* Firefox */
`

const QuantityInput = ({
  className,
  defaultValue,
  min = 1,
  max = 10,
  step = 1,
  value,
  onChange,
  handleDeleteProduct,
  ...inputProps
}) => {
  const [renderValue, setRenderValue] = useState(value || '1')

  // useEffect(() => {
  //   const myTimeout = setTimeout(() => {
  //     if (value !== renderValue) {
  //       setRenderValue(value);
  //     }
  //   }, 300);

  //   return () => clearTimeout(myTimeout);
  // }, [value, renderValue]);

  const onInputChange = (e) => {
    setRenderValue(e.target.value)
  }

  const onInputBlur = (e) => {
    const value = modifyValue(e.target.value)
    setRenderValue(value)
    onChange?.(value)
  }

  const onIncrease = () => {
    const value = modifyValue(Number(renderValue) + Number(step))
    setRenderValue(value)
    onChange?.(value)
  }

  const onDecrease = () => {
    const value = modifyValue(Number(renderValue) - Number(step))
    if (Number(renderValue) - step < 1) {
      handleDeleteProduct?.()
    } else {
      setRenderValue(value)
      onChange?.(value)
    }
  }

  const modifyValue = (value) => {
    if (value > max) {
      return max
    } else if (value < min) {
      return min
    } else {
      return value
    }
  }

  return (
    <div className={className}>
      <div className='input-group input-spinner'>
        <div className='input-group-prepend'>
          <button
            className='btn btn-decrement btn-spinner'
            onClick={onDecrease}
          >
            <i className='icon-minus'></i>
          </button>
        </div>
        <InputNumberStyle
          type='number'
          className='form-control'
          style={{ textAlign: 'center' }}
          value={renderValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          max={max}
          {...inputProps}
        />
        <div className='input-group-append'>
          <button
            style={{ minWidth: 26 }}
            className='btn btn-increment btn-spinner'
            type='button'
            onClick={onIncrease}
          >
            <i className='icon-plus'></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuantityInput
