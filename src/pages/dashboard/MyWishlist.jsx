import { message, Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { THUNK_STATUS } from '../../constants/thunkStatus'
import authService from '../../services/authService'
import { orderService } from '../../services/orderService'
import { authActions } from '../../store/reducers/authenReducer'
import { formatCurrency } from '../../utils/format'
import useDashboard from './useDashboard'
import { useAuthen } from '../../components/MainContext'
import { updateCart } from '../../store/reducers/cartReducer'
import { LOCAL_STORAGE } from '../../constants/localStorage'

const MyWishlist = () => {
  const { profile } = useDashboard()
  const { onOpenModal } = useAuthen()
  const { updateStatus, cartInfo } = useSelector((state) => state.cart)
  const { whiteList } = profile || {}
  const dispatch = useDispatch()
  const token = localStorage.getItem(LOCAL_STORAGE.token)
  const { confirm } = Modal

  const handleRemove = async (productID) => {
    try {
      const res = await orderService.deleteWhiteList({ product: productID })
      const removeRes = res?.data?.data
      if (removeRes) {
        const profileRes = await authService.getProfile()
        if (profileRes?.data?.data) {
          dispatch(authActions.setProfile(profileRes?.data?.data))
          message.success('Removed from Wishlist!')
        }
      }
    } catch (error) {
      console.log('error :>> ', error)
      message.error('Something wrong!')
    }
  }
  const removeWishlist = async (productID, productName) => {
    confirm({
      title: (
        <span>
          Do you want to remove <strong>{productName}</strong> from wishlist?`
        </span>
      ),
      onOk() {
        handleRemove(productID)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  const onAddToCart = async (productID) => {
    if (!token) {
      onOpenModal()
    } else if (productID && updateStatus !== THUNK_STATUS.pending) {
      try {
        let addPayload = {}
        // Có 2 trường hợp khi update cart
        // 1. Account đó đã từng add sản phẩm (lúc này sẽ có id của cart)
        if (cartInfo.id) {
          const matchIndex = cartInfo.product?.findIndex(
            (product) => product.id === productID
          )

          const newProductPayload = cartInfo.product?.map((product) => {
            return product.id
          })

          const newQuantityPayload = [...cartInfo.quantity]

          // id của sản phẩm đã tổn tại, chỉ cần tăng quantity ở vị trí matchIndex tương ứng
          if (matchIndex > -1) {
            newQuantityPayload[matchIndex] = (
              Number(newQuantityPayload[matchIndex]) + 1
            ).toString()
          }

          // id sản phẩm chưa tồn tại trong product list,
          // lúc này chỉ cần push id vào product và '1' hoặc 1 vào quantity tùy theo datatype của API ràng buộc
          else {
            newProductPayload.push(productID)
            newQuantityPayload.push('1')
          }

          // Cập nhật lại payload
          addPayload = {
            ...cartInfo,
            product: newProductPayload,
            quantity: newQuantityPayload
          }
        }

        // 2. Account mới chưa có gì trong cartInfo
        else {
          // payload lúc này sẽ dựa vào các key được required trong api
          addPayload = {
            product: [productID],
            quantity: ['1'],
            subTotal: 0,
            total: 0,
            totalProduct: ['string'],
            discount: 0,
            paymentMethod: 'string'
          }
        }
        const res = await dispatch(updateCart(addPayload)).unwrap()
        if (res.id) {
          // message.config({
          //   top: 62,
          // });
          message.success('Add To Cart Succesfully!')
        }
      } catch (error) {
        console.log('error', error)
        message.error('Something wrong')
      }
    }
  }
  return (
    <div
      className='tab-pane fade show active'
      id='tab-wishlist'
      role='tabpanel'
      aria-labelledby='tab-wishlist-link'
    >
      <table className='table table-wishlist table-mobile'>
        <thead>
          <tr>
            <th>Product</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {whiteList?.length > 0 ? (
            whiteList?.map((item, index) => {
              const { images, name, price, stock, id } = item || {}
              return (
                <tr key={id || index}>
                  <td className='product-col'>
                    <div className='product'>
                      <figure className='product-media'>
                        <a href='#'>
                          <img src={images[0] || ''} alt='Product image' />
                        </a>
                      </figure>
                      <h3 className='product-title'>
                        <a href='#'>{name}</a>
                      </h3>
                    </div>
                  </td>
                  <td className='price-col text-center'>
                    ${formatCurrency(price)}
                  </td>
                  <td className='stock-col text-center'>
                    <span className='in-stock'>{`${
                      !!stock ? 'In stock' : 'Out of stock'
                    }`}</span>
                  </td>
                  <td className='action-col'>
                    <button
                      className='btn btn-block btn-outline-primary-2'
                      onClick={() => onAddToCart(id)}
                    >
                      <i className='icon-cart-plus' />
                      Add to Cart{' '}
                    </button>
                  </td>
                  <td className='remove-col'>
                    <button
                      className='btn-remove'
                      onClick={() => removeWishlist(id, name)}
                    >
                      <i className='icon-close' />
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <p>Empty Wishlist!</p>
          )}
          {/* <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="/assets/images/demos/demo-3/products/product-4.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Beige knitted</a>
                </h3>
              </div>
            </td>
            <td className="price-col text-center">$84.00</td>
            <td className="stock-col text-center">
              <span className="in-stock">In stock</span>
            </td>
            <td className="action-col">
              <button className="btn btn-block btn-outline-primary-2">
                <i className="icon-cart-plus" />
                Add to Cart{" "}
              </button>
            </td>
            <td className="remove-col">
              <button className="btn-remove">
                <i className="icon-close" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="/assets/images/demos/demo-3/products/product-5.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Blue utility</a>
                </h3>
              </div>
            </td>
            <td className="price-col text-center">$76.00</td>
            <td className="stock-col text-center">
              <span className="in-stock">In stock</span>
            </td>
            <td className="action-col">
              <button className="btn btn-block btn-outline-primary-2">
                <i className="icon-cart-plus" />
                Add to Cart{" "}
              </button>
            </td>
            <td className="remove-col">
              <button className="btn-remove">
                <i className="icon-close" />
              </button>
            </td>
          </tr>
          <tr>
            <td className="product-col">
              <div className="product">
                <figure className="product-media">
                  <a href="#">
                    <img
                      src="/assets/images/demos/demo-3/products/product-6.jpg"
                      alt="Product image"
                    />
                  </a>
                </figure>
                <h3 className="product-title">
                  <a href="#">Orange saddle lock</a>
                </h3>
              </div>
            </td>
            <td className="price-col text-center">$52.00</td>
            <td className="stock-col text-center">
              <span className="out-of-stock">Out of stock</span>
            </td>
            <td className="action-col">
              <button className="btn btn-block btn-outline-primary-2 disabled">
                Out of Stock
              </button>
            </td>
            <td className="remove-col">
              <button className="btn-remove">
                <i className="icon-close" />
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default MyWishlist
