import instance from "./axiosInstance";

const subscribe = "/subscribes";

export const subscribeService = {
  subscribe(payload = {}) {
    return instance.post(subscribe, payload);
  },
  subscribeDeals(payload = {}) {
    return instance.post(`${subscribe}/deals`, payload);
  },
};
