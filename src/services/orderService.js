import instance from "./axiosInstance";

export const orderService = {
  getCoupoun(code = "") {
    // console.log("getCoupoun :>> ", `/orders/voucher${code ? "/" + code : ""}`);
    return instance.get(`/orders/voucher${code ? "/" + code : ""}`);
  },
  getOrder() {
    return instance.get("/orders/me");
  },
  checkout(payload = {}) {
    return instance.post("/orders", payload);
  },
  postReview(payload = {}) {
    return instance.post("/reviews", payload);
  },
  getReview(productID = "") {
    return instance.get(`/reviews/product${productID ? "/" + productID : ""}`);
  },
  postWhiteList(payload = {}) {
    return instance.post("/customer/white-list", payload);
  },
  deleteWhiteList(payload = {}) {
    return instance.delete("/customer/white-list", { data: payload });
  },
};
