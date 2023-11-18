import { createContext, useContext, useEffect, useState } from "react";
import {
  getPurchasesRequest,
  deleteProductRequest,
  setPurchaseRequest,
  getPurchaseRequest,
  updatePurchaseRequest,
} from "../api/store.js";

import { getProductRequest } from "../api/products.js";

export const storeContext = createContext();

export const useStoreContext = () => {
  const context = useContext(storeContext);
  if (!context) {
    throw new error("UseAuth must be used in an AuthProvider");
  }
  return context;
};

export const StorePrivider = ({ children }) => {
  const [purchases, setPurchases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getMypurchases = async () => {
    try {
      const res = await getPurchasesRequest();
      setPurchases(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducttobuy = async (code) => {
    try {
      const res = await getProductRequest(code);
      if (res.status === 204) {
        window.location.href = "/404";
      }
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchase = async (code) => {
    try {
      const res = await getPurchaseRequest(code);
      if (res.status === 204) {
        window.location.href = "/404";
      } else {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (code) => {
    try {
      const res = await deleteProductRequest(code);
      console.log(res);
      if (res.status === 200) {
        setPurchases(purchases.filter((purchases) => purchases.Code !== code));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const setPurchase = async (value) => {
    try {
      const res = await setPurchaseRequest(value);
      window.location.href = "/mybuys";
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const updatePurchase = async (code, Quantity_sold) => {
    try {
      const res = await updatePurchaseRequest(code, Quantity_sold);
      window.location.href = "/mybuys";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <storeContext.Provider
      value={{
        getMypurchases,
        deleteProduct,
        getProducttobuy,
        getPurchase,
        setPurchase,
        updatePurchase,
        purchases,
        loading,
        error,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};
