import axios from "axios";
import { BASE_URL } from "../helpers/constant";

export const addProduct = () => {
  return axios.post(
    BASE_URL + "api/products/add",
    {},
    { withCredentials: true },
  );
};

export const removeProduct = (productId) => {
  return axios.delete(BASE_URL + `api/products/remove/${productId}`, {
    withCredentials: true,
  });
};

export const singleProduct = (productId) => {
  return axios.get(BASE_URL + `api/products/${productId}`, {
    withCredentials: true,
  });
};
export const listProduct = (filters) => {
  return axios.get(`${BASE_URL}api/products/list`, {
    params: filters,
    withCredentials: true,
  });
};