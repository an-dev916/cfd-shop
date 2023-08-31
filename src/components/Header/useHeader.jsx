import { message, Modal } from 'antd'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../constants/pathnames'
import { THUNK_STATUS } from '../../constants/thunkStatus'
import { authActions } from '../../store/reducers/authenReducer'
import { updateCart } from '../../store/reducers/cartReducer'
import { useAuthen } from '../MainContext'

const useHeader = () => {
  // General
  const {
    onOpenModal,
    dataProfile,
    onLogout,
    isMenuOpen,
    setIsMenuOpen,
    onShowMenu
  } = useAuthen()
  const { confirm } = Modal
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.auth.profile)

  // Handle Header Top Props
  const headerTopProps = {
    onOpenModal,
    onLogout,
    profile
  }

  // Handle Header Middle Props
  const { cartInfo, updateStatus } = useSelector((state) => state.cart)
  const { product, quantity, subTotal } = cartInfo || {}

  const onUpdateCart = async (id, index) => {
    try {
      const newProducts = product
        ?.filter((item) => item.id !== id)
        .map((item) => item.id)

      const newQuantity = [...quantity]
      newQuantity.splice(index, 1)

      const newPayload = {
        ...cartInfo,
        product: newProducts,
        quantity: newQuantity
      }
      if (updateStatus !== THUNK_STATUS.pending) {
        const res = await dispatch(updateCart(newPayload)).unwrap()
        // message.config({
        //   top: 62,
        // });
        message.success('Removed product succesfully!')
      }
    } catch (error) {
      console.log('error :>> ', error)
    }
  }

  const onDeleteProduct = (id, index) => {
    if (id) {
      confirm({
        title: 'Do you want to delete this item?',
        content: (
          <>
            <p>{`${product[index]?.name || ''}`}</p>
            <p>{`${quantity[index]} x $${product[index]?.price}`}</p>
          </>
        ),
        onOk() {
          onUpdateCart(id, index)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }
  }

  const headerMiddleProps = {
    cartInfo,
    quantity,
    product,
    subTotal,
    onDeleteProduct,
    isMenuOpen,
    onShowMenu
  }

  return {
    headerTopProps,
    headerMiddleProps
  }
}

export default useHeader
