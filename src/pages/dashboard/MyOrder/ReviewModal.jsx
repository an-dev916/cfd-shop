import { message, Modal, Rate } from 'antd'
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useForm } from 'react-hook-form'
import Input from '../../../components/Input'
import { useAuthen } from '../../../components/MainContext'
import cn from 'classnames'
import './css/review.css'
import { orderService } from '../../../services/orderService'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../../store/reducers/authenReducer'

const ReviewModal = () => {
  const listOrders = useSelector((state) => state.auth.listOrders)
  const dispatch = useDispatch()
  const { isReviewOpen, hideReviewModal, checkReview } = useAuthen()
  const [reviewRate, setReviewRate] = useState(3)
  const handleForm = useForm()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = handleForm

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...checkReview,
        title: data?.title || '',
        description: data?.description || '',
        rate: reviewRate || 0
      }
      const res = await orderService.postReview(payload)
      const reviewRes = res?.data?.data
      if (reviewRes) {
        const findOrder = listOrders?.orders?.findIndex(
          (item) => item?.id === reviewRes?.order
        )

        const findProduct = listOrders?.orders[findOrder]?.product?.findIndex(
          (item) => item?.id === reviewRes?.product
        )

        if (findOrder > -1 && findProduct > -1) {
          const dupListOrders = JSON.parse(JSON.stringify(listOrders))

          dupListOrders.orders[findOrder].isReview[findProduct] = true
          dispatch(authActions.setListOrders(dupListOrders))
          message.config({ top: 62 })
          message.success('test review')
          handleForm.reset()
          hideReviewModal()
        }
      }
    } catch (error) {
      console.log('error :>> ', error)
    }
  }

  return ReactDOM.createPortal(
    <>
      <Modal
        title='Leave your feedback!'
        open={isReviewOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => {
          hideReviewModal()
          handleForm.reset()
        }}
        okText='OK'
        cancelText='Cancel'
      >
        <Rate
          allowClear={false}
          defaultValue={reviewRate}
          onChange={(value) => setReviewRate(value)}
        />
        <form className='account-form' style={{ marginTop: '20px' }}>
          <Input
            required
            placeholder='Title...'
            {...register('title', { required: 'Please fill in!' })}
            error={errors?.title?.message}
          />
          <Input
            required
            {...register('description', { required: 'Please fill in!' })}
            error={errors?.description?.message}
            renderInput={(props) => {
              return (
                <textarea
                  {...props}
                  className={cn('form-control', {
                    'input-error': !!Object.keys(errors)?.length
                  })}
                  cols={30}
                  rows={4}
                  placeholder='Description...'
                />
              )
            }}
          />
        </form>
      </Modal>
    </>,
    document.body
  )
}

export default ReviewModal
