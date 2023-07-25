import authService from "../../services/authService";

export const getPrifileInfo = () => {
  return async (dispatch) => {
    try {
      const res = await authService.getProfile();
      // if (res?.status === 200) {
      // }
      console.log("res profile:>> ", res);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
};
