import { useEffect, useState } from "react";
import { useStoreContext } from "../context/StoreContext";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const Purchaseform = () => {
  const params = useParams();
  const { getProducttobuy, setPurchase, error } = useStoreContext();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getProductInfo() {
      if (params.code) {
        const res = await getProducttobuy(params.code);
        setProduct(res);
        setTotal(
          Number(res.Price * quantity).toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })
        );
        setLoading(false);
      }
    }
    getProductInfo();
  }, [quantity]);

  if (loading) return <Loading></Loading>;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.Stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let values = {
      Quantity_sold: quantity,
      Product_code: product.Code,
    };
    setPurchase(values);
  };

  return (
    <section className="buy">
      <div className="buycontainer">
        <div className="infoproductbuy">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </div>
        <div className="infoproducSend">
          <h3>Buy Summary</h3>

          <p>
            Price:
            {Number(product.Price).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </p>
          <hr />
          <p>Stock: {product.Stock}</p>
          <p>Send to: {user.location}</p>
          <hr />
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="quantity">Quantity</div>
              <button
                type="button"
                className="editquantity"
                onClick={handleDecrease}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                className="inputquantity"
                value={quantity}
                type="number"
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />
              <button
                type="button"
                className="editquantity"
                onClick={handleIncrease}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
              <hr />
              <div className="">
                <p>Total:{total}</p>
              </div>
              <div className="btnsbuy">
                <button type="submit" className="btnbuy">
                  Buy
                </button>
                <Link className="cancelbuy" to={"/buy"}>
                  Cancel
                </Link>
              </div>
              {<div className="error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Purchaseform;
