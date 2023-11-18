import { useEffect } from "react";
import { useStoreContext } from "../context/StoreContext";
import PursasheCard from "../components/PursasheCard";
import Loading from "../components/Loading";
const MyProducts = () => {
  const { getMypurchases, purchases, loading } = useStoreContext();

  useEffect(() => {
    getMypurchases();
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <div className="productscontainer">
      {purchases.length <= 0 ? (
        <div className="NoPurchases">
          <h3>There are no Purchases</h3>{" "}
          <p>
            Go to <a href="/buy">Buy</a>
          </p>
        </div>
      ) : (
        <div className="cardspurchase">
          <h1>My Products</h1>
          {purchases.map((product) => (
            <div className="card cardpurchase" key={product.Code}>
              <PursasheCard product={product}></PursasheCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
