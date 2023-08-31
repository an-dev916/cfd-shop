import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { LOCAL_STORAGE } from '../../constants/localStorage'
import authService from '../../services/authService'
import { getCart } from './cartReducer'

const initialState = {
  profile: null,
  listOrders: null
}

export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STORAGE.token)
      localStorage.removeItem(LOCAL_STORAGE.refreshToken)
      state.profile = null
      message.info('See you again!')
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setListOrders: (state, action) => {
      state.listOrders = action.payload
    }
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkApi) => {
    try {
      const loginRes = await authService.login(payload)
      const { token, refreshToken } = loginRes?.data?.data || {}
      localStorage.setItem(LOCAL_STORAGE.token, token)
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken)

      const profileRes = await authService.getProfile()
      thunkApi.dispatch(authActions.setProfile(profileRes?.data?.data))
      thunkApi.dispatch(getCart())

      return profileRes?.data?.data
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }
)

// export const register = createAsyncThunk(
//   "auth/register",
//   async (payload, thunkApi) => {
//     try {
//       const regisRes = await authService.register(payload);
//       return regisRes?.data?.data;
//     } catch (error) {
//       console.log("error :>> ", error);
//       throw error;
//     }
//   }
// );

export const update = createAsyncThunk(
  'auth/update',
  async (payload, thunkApi) => {
    try {
      const res = await authService.updateProfile(payload)
      if (res?.data?.data?.id) {
        return res?.data?.data
      }
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }
)

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (payload, thunkApi) => {
    try {
      const res = await authService.getProfile()
      thunkApi.dispatch(authActions.setProfile(res?.data?.data))
      return res?.data?.data
    } catch (error) {
      console.log('error :>> ', error)
      throw error
    }
  }
)
