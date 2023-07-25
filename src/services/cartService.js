import instance from "./axiosInstance";

const cartService = {
  getCart() {
    return instance.get("/carts/me");
  },

  updateCart(payload = {}) {
    return instance.put("/carts", payload);
  },
};

export default cartService;
