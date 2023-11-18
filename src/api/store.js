import axios from "./axios";

export const getPurchasesRequest = () => axios.get("/sales");

export const getPurchaseRequest = (code) => axios.get(`/sales/${code}`);

export const setPurchaseRequest = (value) => axios.post("/sales", value);

export const updatePurchaseRequest = (code, Quantity_sold) =>
  axios.patch(`/sales/${code}`, { Quantity_sold });

export const deleteProductRequest = (code) => axios.delete(`/sales/${code}`);
