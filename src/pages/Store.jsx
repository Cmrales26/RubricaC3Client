import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
const Store = () => {
  const { getProducts, products, loading } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <div className="productscontainer">
      <h1 className="Tittlebuy">Buy Products</h1>
      <div className="cards">
        {products.map((product) => (
          <div className="card" key={product.Code}>
            <ProductCard product={product}></ProductCard>
            <div className="footercard footerreal">
              <div className="btnsproducts">
                {product.Stock > 0 ? (
                  <Link to={`/buy/${product.Code}`} className="buyProduct">
                    Buy This product
                  </Link>
                ) : (
                  <p>the product is not available</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
