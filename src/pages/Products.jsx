import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const Products = () => {
  const { user } = useAuth();
  const { products, loading, DeleteProducts, getProducts, error } =
    useProducts();
  let rol = user.rol;
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (rol !== "admin") {
      setRedirect(true);
    }
  }, [rol]);

  useEffect(() => {
    getProducts();
  }, []);

  if (redirect) {
    return <Navigate to="/buy" replace />;
  }
  if (loading) return <Loading></Loading>;

  return (
    <div className="productscontainer">
      <h1>Products</h1>
      <div className="cards">
        {products.map((product) => (
          <div className="card" key={product.Code}>
            <ProductCard product={product}></ProductCard>
            <div className="footercard footerreal">
              <div className="btnsproducts">
                <button
                  className="deleteProduct"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: `You want to delete the product: ${product.name}?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, Delete",
                      cancelButtonText: "Cancel",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        DeleteProducts(product.Code);
                      }
                    });
                  }}
                >
                  Delete
                </button>
                <Link
                  className="updateProductbtn"
                  to={`/products/${product.Code}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
