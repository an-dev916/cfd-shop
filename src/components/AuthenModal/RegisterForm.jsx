import React, { forwardRef, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { AUTHEN_TYPES } from '../../constants/authenTypes'
import { PATHS } from '../../constants/pathnames'
import Input from '../Input'

const InputNameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

const RegisterForm = forwardRef(({ onRegister }, ref) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    if (data) {
      onRegister?.(data)
    }
  }
  return (
    <div
      className='tab-pane fade show active'
      id='register'
      role='tabpanel'
      aria-labelledby='register-tab'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputNameWrap>
          {/* First Name */}
          <Input
            label='First Name'
            required
            style={{ flex: 1 }}
            placeholder=''
            {...register('firstName', { required: 'First Name is required' })}
            ref={ref}
            error={errors?.firstName?.message}
          ></Input>

          {/* Last Name */}
          <Input
            label='Last Name'
            required
            style={{ flex: 1 }}
            placeholder=''
            {...register('lastName', { required: 'Last Name is required' })}
            error={errors?.lastName?.message}
          ></Input>
        </InputNameWrap>

        {/* Email */}
        <Input
          label='Email'
          required
          placeholder=''
          {...register('email', {
            required: 'Email is required!',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please type correct email!'
            }
          })}
          error={errors?.email?.message}
        ></Input>

        {/* Password */}
        <Input
          label='Password'
          required
          type='password'
          placeholder=''
          {...register('password', {
            required: 'Password is required!',
            minLength: {
              value: 8,
              message: 'Password minimun 8 characters'
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Must include Aa-Zz, 0-9, @$!%*?&'
            }
          })}
          error={errors?.password?.message}
        ></Input>

        <div className='form-footer'>
          <button type='submit' className='btn btn-outline-primary-2'>
            <span>SIGN UP</span>
            <i className='icon-long-arrow-right' />
          </button>
          <div className='custom-control custom-checkbox'>
            {/* <input
              type='checkbox'
              className='custom-control-input'
              id='register-policy'
            />
            <label className='custom-control-label' htmlFor='register-policy'>
              I agree to the <a href='privacy-policy.html'>privacy policy</a> *
            </label> */}
            <input
              type='checkbox'
              className='custom-control-input'
              id='register-policy'
              {...register('privacyPolicy', {
                required: 'Please check to agree our policy'
              })}
            />
            <label
              className='custom-control-label'
              htmlFor='register-policy'
              style={{
                color: errors?.privacyPolicy?.message ? 'red' : '#666'
              }}
            >
              I agree to the{' '}
              <Link to={PATHS.PRIVACY_POLICY} target='_blank'>
                privacy policy
              </Link>{' '}
              *
            </label>
          </div>
          {/* End .custom-checkbox */}
        </div>
        {/* End .form-footer */}
      </form>
      {/* <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          <div className="col-sm-6">
            <a href="#" className="btn btn-login  btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
        </div>
      </div> */}
    </div>
  )
})

export default RegisterForm
