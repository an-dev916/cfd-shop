import authService from '../../services/authService'

export const getPrifileInfo = () => {
  return async (dispatch) => {
    try {
      const res = await authService.getProfile()
    } catch (error) {
      console.log('error :>> ', error)
    }
  }
}
