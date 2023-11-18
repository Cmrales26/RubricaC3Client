import axios from "./axios";

export const getProductsRequest = () => axios.get("/products");

export const getProductRequest = (code) => axios.get(`/products/${code}`);

export const createProductRequest = (product) =>
  axios.post("/products", product);

export const updateProductRequest = (id, product) =>
  axios.patch(`/products/${id}`, product);

export const deleteProductRequest = (code) => axios.delete(`/products/${code}`);
