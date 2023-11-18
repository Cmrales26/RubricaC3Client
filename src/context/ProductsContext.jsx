import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createProductRequest,
  getProductsRequest,
  deleteProductRequest,
  getProductRequest,
  updateProductRequest,
} from "../api/products";

import NotFound from "../components/NotFound";

export const productsContext = createContext();

export const useProducts = () => {
  const context = useContext(productsContext);
  if (!context) {
    throw new error("useProducts must be used in an AuthProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setErrors] = useState("");

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setErrors("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getProducts = async () => {
    const res = await getProductsRequest();
    if (!res) {
      setProducts(null);
      setLoading(false);
    }
    setProducts(res.data);
    setLoading(false);
  };

  const createProducts = async (value) => {
    let newProduct = {
      Code: value.Code,
      Price: parseFloat(value.Price),
      Stock: parseInt(value.Stock),
      description: value.description,
      name: value.name,
    };
    try {
      const product = await createProductRequest(newProduct);
      window.location.href = "/products";
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const DeleteProducts = async (code) => {
    try {
      const res = await deleteProductRequest(code);
      console.log(res);
      if (res.status === 200) {
        setProducts(products.filter((products) => products.Code !== code));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        text: "Probably there is a user with this product",
      });
      setErrors(error.response.data.message);
    }
  };

  const getProduct = async (code) => {
    try {
      const res = await getProductRequest(code);
      console.log(res);
      if (res.status === 204) {
        window.location.href = "/404";
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await updateProductRequest(id, product);
      window.location.href = "/products";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productsContext.Provider
      value={{
        products,
        loading,
        error,
        getProducts,
        createProducts,
        DeleteProducts,
        getProduct,
        updateProduct,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
