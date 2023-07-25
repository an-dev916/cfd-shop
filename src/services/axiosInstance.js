import axios from "axios";
import { BASE_URL } from "../constants/environments";
import { LOCAL_STORAGE } from "../constants/localStorage";

// Tạo một instance của Axios
const instance = axios.create({
  baseURL: BASE_URL,
});
// Interceptor cho phép can thiệp vào quá trình nhận phản hồi (RESPONSE) từ server.
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("error :>> ", error);
    // Nếu mã lỗi là 401 hoặc 403
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        // Gọi API để cập nhật token mới
        const res = await instance.put("/customer/refresh", {
          refreshToken: localStorage.getItem(LOCAL_STORAGE.refreshToken),
        });
        const data = res?.data?.data;
        // Lưu lại token mới vào local storage
        localStorage.setItem(LOCAL_STORAGE.token, data?.token);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, data?.refreshToken);

        // Thay đổi token trong header của yêu cầu ban đầu
        originalRequest.headers.Authorization = `Bearer ${data?.token}`;

        // Gọi lại yêu cầu ban đầu với token mới
        return instance(originalRequest);
      } catch (error) {
        // Xử lý lỗi nếu không thể cập nhật token mới
        // Ví dụ: chuyển hướng người dùng đến trang login
        alert("Phiên bản hết hạn! Vui lòng đăng nhập lại.");
        localStorage.removeItem(LOCAL_STORAGE.token);
        localStorage.removeItem(LOCAL_STORAGE.refreshToken);
      }
    }

    // Nếu lỗi không phải là 401 hoặc 403, trả về lỗi ban đầu
    return Promise.reject(error);
  }
);

// Interceptor cho phép can thiệp vào quá trình gửi yêu cầu (REQUEST) từ server.
instance.interceptors.request.use(
  (config) => {
    // xử lý yêu cầu trước khi gửi đi
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_STORAGE.token
    )}`;
    return config;
  },
  (error) => {
    // xử lý lỗi nếu có
    return Promise.reject(error);
  }
);

export default instance;
