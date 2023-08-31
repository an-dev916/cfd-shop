import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { PATHS } from '../../constants/pathnames'
import { PAYMENT_METHOD } from '../../constants/paymentMethods'
import { formatCurrency } from '../../utils/format'
import cn from 'classnames'

const ShippingFigure = styled.td`
  a {
    color: red !important;
    text-transform: capitalize;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &:hover {
      color: #fcb941 !important;
    }
  }
`

const CheckoutSummary = ({
  onCheckout,
  products,
  quantity,
  subTotal,
  total,
  shipping,
  paymentMethod,
  onUpdatePaymentMethod
}) => {
  const isCard = paymentMethod === PAYMENT_METHOD.card
  const isCash = paymentMethod === PAYMENT_METHOD.cash

  return (
    <aside className='col-lg-3'>
      <div className='summary'>
        <h3 className='summary-title'>Your Order</h3>
        <table className='table table-summary'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 &&
              products?.map((product, index) => {
                const { id, price, slug, name } = product || {}
                return (
                  <tr key={id || index}>
                    <td>
                      <Link to={`${PATHS.PRODUCT}${slug ? '/' + slug : ''}`}>
                        {name}
                      </Link>
                      <br />
                      <span style={{ color: '#fcb941' }}>
                        ${formatCurrency(price)} x {quantity[index]}
                      </span>
                    </td>
                    <td>
                      ${formatCurrency(price * Number(quantity[index] || 1))}
                    </td>
                  </tr>
                )
              })}
            {/* <tr>
              <td>
                <span>2 x </span>
                <a href="#">Beige knitted elastic runner shoes</a>
              </td>
              <td>$84.00</td>
            </tr>
            <tr>
              <td>
                <a href="#">Blue utility pinafore denimdress</a>
              </td>
              <td>$76,00</td>
            </tr> */}
            <tr className='summary-subtotal'>
              <td>Subtotal:</td>
              <td>${subTotal}</td>
            </tr>
            <tr>
              <td>Shipping:</td>
              {shipping?.typeShip ? (
                <td>{shipping?.typeShip}</td>
              ) : (
                <ShippingFigure>
                  <Link to={PATHS.CART}>Please select...</Link>
                </ShippingFigure>
              )}
            </tr>

            <tr className='summary-total'>
              <td>Total:</td>
              <td>${total}</td>
            </tr>
          </tbody>
        </table>
        <div className='accordion-summary' id='accordion-payment'>
          {/* Bank Transfer */}
          <div className='card'>
            <div
              className='card-header'
              id='heading-1'
              onClick={() => onUpdatePaymentMethod(PAYMENT_METHOD.card)}
            >
              <h2 className='card-title'>
                <a
                  role='button'
                  className={isCard ? '' : 'collapsed'}
                  // data-toggle="collapse"
                  // href="#collapse-1"
                  // aria-expanded="true"
                  // aria-controls="collapse-1"
                >
                  {' '}
                  Direct bank transfer{' '}
                </a>
              </h2>
            </div>
            <div
              id='collapse-1'
              // className="collapse show"
              className={cn('collapse', { show: isCard })}
              aria-labelledby='heading-1'
              data-parent='#accordion-payment'
            >
              <div className='card-body'>
                {' '}
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.{' '}
              </div>
            </div>
          </div>

          {/* Cash */}
          <div className='card'>
            <div className='card-header' id='heading-3'>
              <h2
                className='card-title'
                onClick={() => onUpdatePaymentMethod(PAYMENT_METHOD.cash)}
              >
                <a
                  className={isCash ? '' : 'collapsed'}
                  role='button'
                  // data-toggle="collapse"
                  // href="#collapse-3"
                  // aria-expanded="false"
                  // aria-controls="collapse-3"
                >
                  {' '}
                  Cash on delivery{' '}
                </a>
              </h2>
            </div>
            <div
              id='collapse-3'
              className={cn('collapse', { show: isCash })}
              aria-labelledby='heading-3'
              data-parent='#accordion-payment'
            >
              <div className='card-body'>
                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros.{' '}
              </div>
            </div>
          </div>
        </div>
        <button
          type='submit'
          onClick={onCheckout}
          className='btn btn-outline-primary-2 btn-order btn-block'
        >
          <span className='btn-text'>Place Order</span>
          <span className='btn-hover-text'>Proceed to Checkout</span>
        </button>
      </div>
    </aside>
  )
}

export default CheckoutSummary
