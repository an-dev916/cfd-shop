import React, { useState } from 'react'
import { styled } from 'styled-components'
import Button from '../../components/Button'

const CoupounWrap = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`

const CheckoutCoupoun = ({ onAddCoupoun, addedCoupoun, onRemoveCoupoun }) => {
  const [renderCoupoun, setRenderCoupoun] = useState(addedCoupoun || '')

  const onAdd = () => {
    onAddCoupoun(renderCoupoun)
  }

  const onRemove = () => {
    onRemoveCoupoun(setRenderCoupoun(''))
  }

  return (
    <CoupounWrap>
      <div className='checkout-discount' style={{ flex: 1 }}>
        <form action='#'>
          <input
            type='text'
            className='form-control'
            value={renderCoupoun}
            required
            onChange={(e) => setRenderCoupoun(e.target.value)}
            id='checkout-discount-input'
          />
          <label
            htmlFor='checkout-discount-input'
            className='text-truncate'
            style={{ opacity: renderCoupoun ? 0 : 1 }}
          >
            Have a coupon? <span>Click here to enter your code</span>
          </label>
        </form>
      </div>
      {addedCoupoun ? (
        <Button onClick={onRemove}>Remove Coupoun</Button>
      ) : (
        <Button variant='outline' onClick={onAdd}>
          Add
        </Button>
      )}
    </CoupounWrap>
  )
}

export default CheckoutCoupoun
