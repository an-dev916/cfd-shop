import { message } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import { orderService } from '../../services/orderService'
import './style.css'

const CartCoupoun = () => {
  // const [form, setForm] = useState("");
  const [coupoun, setCoupoun] = useState(0)
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onGetCoupoun = async (data) => {
    if (data.coupoun && !coupoun) {
      try {
        const res = await orderService.getCoupoun(data.coupoun)
        if (res?.data) {
          setCoupoun(res?.data?.data?.value)
          message.success('Get Coupoun Succesfully!')
        }
      } catch (error) {
        console.log('error :>> ', error)
        message.error('Invalid Coupoun!')
      }
    } else if (coupoun) {
      setCoupoun(0)
      setValue('coupoun', '')
      message.info('Removed Coupoun!')
    } else {
      return
    }
  }

  return (
    <div className='cart-bottom'>
      <div className='cart-discount' style={{ maxWidth: 'initial' }}>
        <form onSubmit={handleSubmit(onGetCoupoun)}>
          <div className='input-group'>
            {/* <input
              type="text"
              className="form-control input-error"
              required
              placeholder="Coupon code"
              value={form}
              onChange={(e) => setForm(e.target.value)}
            /> */}

            <Input {...register('coupoun')} error={errors?.coupoun?.message} />

            <div className='input-group-append'>
              <button
                className='btn btn-outline-primary-2'
                type='submit'
                style={{ padding: '0 20px', height: '40px' }}
              >
                {!!!coupoun ? 'Add Coupoun' : 'Remove Coupoun'}
              </button>
            </div>
          </div>
          {/* <p className="form-error">Please fill in this field</p> */}
        </form>
      </div>
      {/* <a href="#" className="btn btn-outline-dark-2">
        <span>UPDATE CART</span>
        <i className="icon-refresh" />
      </a> */}
    </div>
  )
}

export default CartCoupoun
