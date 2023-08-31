import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { productService } from '../../services/productSevice'
import ProductTabs from './ProductTabs'
import ProductTop from './ProductTop'
import { useProductDetail } from './useProductDetail'
import './css/style.css'
import { useAuthen } from '../../components/MainContext'
import { LOCAL_STORAGE } from '../../constants/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { THUNK_STATUS } from '../../constants/thunkStatus'
import { message } from 'antd'
import { updateCart } from '../../store/reducers/cartReducer'
import { orderService } from '../../services/orderService'
import { authActions } from '../../store/reducers/authenReducer'
import authService from '../../services/authService'
import Breadcrumb from '../../components/Breadcrumb'
import { PATHS } from '../../constants/pathnames'

const ProductDetail = () => {
  // General
  const {
    productTopProps,
    productTabsProps,
    renderProduct,
    setRenderProduct,
    setRenderReviews,
    renderReviews,
    setAvrReviews,
    whiteList,
    profile
  } = useProductDetail()
  const { quantityPruduct } = productTopProps || {}
  const { onOpenModal } = useAuthen()
  const { slug } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem(LOCAL_STORAGE.token)
  const { cartInfo, updateStatus } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  // Add To Cart
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
              Number(newQuantityPayload[matchIndex]) + Number(quantityPruduct)
            ).toString()
          }

          // id sản phẩm chưa tồn tại trong product list,
          // lúc này chỉ cần push id vào product và '1' hoặc 1 vào quantity tùy theo datatype của API ràng buộc
          else {
            newProductPayload.push(productID)
            newQuantityPayload.push(quantityPruduct.toString())
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
            quantity: [quantityPruduct.toString()],
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

  // Handle Wish List
  const handleWishList = async (productID) => {
    if (!token) {
      onOpenModal()
    } else if (productID) {
      try {
        const payload = {
          product: productID
        }

        if (profile?.id) {
          const matchIndex = profile?.whiteList?.findIndex(
            (item) => item?.id === productID
          )

          if (matchIndex > -1) {
            const res = await orderService.deleteWhiteList(payload)
            const removeRes = res?.data?.data
            if (removeRes) {
              const profileRes = await authService.getProfile()
              if (profileRes?.data?.data) {
                dispatch(authActions.setProfile(profileRes?.data?.data))
                message.success('Removed from Wishlist!')
              }
            }
          } else {
            const res = await orderService.postWhiteList(payload)
            const addRes = res?.data?.data
            if (addRes) {
              const profileRes = await authService.getProfile()
              if (profileRes?.data?.data) {
                dispatch(authActions.setProfile(profileRes?.data?.data))
                message.success('Added to Wishlist!')
              }
            }
          }
        }
      } catch (error) {
        console.log('error :>> ', error)
        message.error('Something wrong, please try again!')
      }
    }
  }

  // Fetch Data
  const getDetailProduct = async (slug) => {
    try {
      const res = await productService.getProductsBySlug(slug)
      const detailRes = res?.data?.data
      if (detailRes !== '-') {
        setRenderProduct(detailRes)
        message.success(`Successfully!`)
      } else {
        navigate(PATHS.HOME)
      }
    } catch (error) {
      message.error('Something wrong, please try again!')
      console.log('error :>> ', error)
    }
  }

  const geReviewsProduct = async (productID) => {
    if (!!productID) {
      try {
        const res = await orderService.getReview(productID)
        console.log('resss', res)
        const reviewsRes = res?.data?.data
        if (reviewsRes) {
          setRenderReviews(reviewsRes)
        }
      } catch (error) {
        console.log('error :>> ', error)
      }
    }
  }

  useEffect(() => {
    getDetailProduct(slug)
  }, [slug])

  useEffect(() => {
    geReviewsProduct(renderProduct?.id)
    if (!!renderReviews?.length) {
      const totalReviews = renderReviews?.reduce(
        (acc, curr) => acc + Number(curr?.rate || 2.5),
        0
      )
      setAvrReviews(totalReviews / renderReviews.length)
    }
  }, [
    JSON.stringify(renderProduct),
    JSON.stringify(renderReviews),
    JSON.stringify(profile)
  ])

  return (
    <main className='main'>
      <Breadcrumb className='mb-2'>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>{' '}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCT}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{renderProduct?.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className='page-content'>
        <div className='container'>
          <ProductTop
            {...renderProduct}
            productTopProps={productTopProps}
            onAddToCart={onAddToCart}
            renderReviews={renderReviews}
            handleWishList={handleWishList}
          />
          <ProductTabs {...renderProduct} productTabsProps={productTabsProps} />
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
