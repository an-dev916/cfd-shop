import instance from "./axiosInstance";
const pages = "/pages";
export const pagesService = {
  getAllPages(query = "") {
    return instance.get(`${pages}${query}`);
  },
  getPageByName(name = "") {
    return instance.get(`${pages}${name ? "/" + name : ""}`);
  },
};
