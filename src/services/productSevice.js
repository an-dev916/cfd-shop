import axios from "axios";
import { BASE_URL } from "../constants/environments";
import instance from "./axiosInstance";

const products = "/products";
const productCates = "/product-categories";

export const productService = {
  getProducts(query = "") {
    return instance.get(`${products}${query}`);
  },
  getProductsBySlug(slug = "") {
    return instance.get(`${products}${slug ? "/" + slug : ""}`);
  },
  getCates(query = "") {
    return instance.get(`${productCates}${query}`);
  },
  getCatesBySlug(slug = "") {
    return instance.get(`${productCates}${slug ? "/" + slug : ""}`);
  },
};
