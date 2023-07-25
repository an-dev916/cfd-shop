import instance from "./axiosInstance";

const authService = {
  register(payload = {}) {
    return instance.post("/customer/register", payload);
  },
  login(payload = {}) {
    return instance.post("/customer/login", payload);
  },
  getProfile() {
    return instance.get("/customer/profiles");
  },
  updateProfile(payload = {}) {
    return instance.put("/customer/profiles", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authService;
