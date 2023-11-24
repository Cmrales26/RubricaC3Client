import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";

import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
const CreateProducts = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { user, loading } = useAuth();
  const { createProducts, error, getProduct, updateProduct } = useProducts();

  const params = useParams();
  useEffect(() => {
    async function loadproduct() {
      if (params.code) {
        setIsEditing(true);

        const product = await getProduct(params.code);

        setValue("Code", product.Code);
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("Price", product.Price);
        setValue("Stock", product.Stock);
      }
    }
    loadproduct();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    if (params.code) {
      updateProduct(params.code, values);
    } else {
      createProducts(values);
    }
  });

  let rol = user.rol;
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (rol !== "admin") {
      setRedirect(true);
    }
  }, [rol]);

  if (redirect) {
    return <Navigate to="/buy" replace />;
  }
  if (loading) return <Loading></Loading>;
  return (
    <section className="CreateAndEditProduct">
      <div className="createproductcontainer">
        <div className="">
          <form className="formcreateproduct" onSubmit={onSubmit}>
            {isEditing ? (
              <div className="">
                <a href="/products">
                  <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h2 className="titleform"> Edit product</h2>
              </div>
            ) : (
              <div className="">
                <a href="/products">
                  <i className="fa-solid fa-arrow-left"></i>
                </a>
                <h2 className="titleform"> Create Product</h2>
              </div>
            )}
            {<div className="error">{error}</div>}
            <div className="inputCrProduct">
              <input
                type="text"
                {...register("Code", {
                  required: {
                    value: true,
                    message: "Code is Required",
                  },
                  maxLength: 10,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Code can not contain spaces or letters.",
                  },
                })}
                placeholder="Code"
                disabled={isEditing}
              />
              {errors.Code && (
                <div className="error">{errors.Code.message}</div>
              )}
            </div>
            <div className="inputCrProduct">
              <input
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
                placeholder="Name"
              />
              {errors.name && (
                <div className="error">{errors.name.message}</div>
              )}
            </div>

            <div className="inputCrProduct">
              <textarea
                className="textarea"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is Required",
                  },
                  maxLength: {
                    value: 250,
                    message: "Description must be at most 250 characters",
                  },
                })}
                placeholder="Description"
              />
              {errors.description && (
                <div className="error">{errors.description.message}</div>
              )}
            </div>

            <div className="inputCrProduct">
              <input
                type="number"
                {...register("Price", {
                  required: {
                    value: true,
                    message: "Price is Required",
                  },
                })}
                placeholder="Price"
              />
              {errors.Price && (
                <div className="error">{errors.Price.message}</div>
              )}
            </div>

            <div className="inputCrProduct">
              <input
                type="number"
                {...register("Stock", {
                  required: {
                    value: true,
                    message: "Stock is Required",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "UserId can not contain spaces or letters.",
                  },
                  min: {
                    value: 1,
                    message: "Stock must be at least 1 item",
                  },
                })}
                placeholder="Stock"
              />
              {errors.Stock && (
                <div className="error">{errors.Stock.message}</div>
              )}
            </div>
            <div className="btnsubmit">
              {isEditing ? (
                <button className="btnEditProduct" type="submit">
                  Edit Product
                </button>
              ) : (
                <button className="btnCreateProduct" type="submit">
                  Create Product
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProducts;
