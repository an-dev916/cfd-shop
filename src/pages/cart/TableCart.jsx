import React from 'react'
import { Link } from 'react-router-dom'
import QuantityInput from '../../components/QuantityInput'
import { PATHS } from '../../constants/pathnames'
import { formatCurrency } from '../../utils/format'

const TableCart = ({
  tableCartProducts = [],
  tableCartQuantities = [],
  onDeleteProduct,
  onUpdateQuantity,
  handleDeleteProduct
}) => {
  return (
    <table className='table table-cart table-mobile'>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tableCartProducts?.length > 0 &&
          tableCartProducts?.map((product, index) => {
            const { images, name, price, id, slug } = product || {}
            const amount = Number(tableCartQuantities[index])
            return (
              <tr key={id || index}>
                <td className='product-col'>
                  <div className='product'>
                    <figure className='product-media'>
                      <Link to={`${PATHS.PRODUCT}${slug ? '/' + slug : ''}`}>
                        <img src={images[0] || ''} alt='Product image' />
                      </Link>
                    </figure>
                    <h3 className='product-title'>
                      <Link to={`${PATHS.PRODUCT}${slug ? '/' + slug : ''}`}>
                        {name}
                      </Link>
                    </h3>
                  </div>
                </td>
                <td className='price-col'>${formatCurrency(price)}</td>
                <td className='quantity-col'>
                  <QuantityInput
                    className='cart-product-quantity'
                    value={amount}
                    onChange={(value) => onUpdateQuantity?.(value, index)}
                    handleDeleteProduct={() => handleDeleteProduct(id, index)}
                  />
                </td>
                <td className='total-col'>
                  ${formatCurrency(price * Number(amount))}
                </td>
                <td className='remove-col'>
                  <button
                    className='btn-remove'
                    onClick={() => handleDeleteProduct(id, index)}
                  >
                    <i className='icon-close' />
                  </button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default TableCart
