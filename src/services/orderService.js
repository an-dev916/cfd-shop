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
};
