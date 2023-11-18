import { useEffect, useState } from "react";
import { useStoreContext } from "../context/StoreContext";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
const EditPurchaseform = () => {
  const { getPurchase, updatePurchase } = useStoreContext();
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [initialQuantityObtained, setInitialQuantityObtained] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function getbuyinfo() {
      const res = await getPurchase(params.code);
      setPurchase(res);
      setQuantity(res[0].Quantity_sold);
      setInitialQuantityObtained(true);
      setLoading(false);
      setTotalPrice(res[0].Price * quantity);
    }
    if (!initialQuantityObtained) {
      getbuyinfo();
    }
  }, [initialQuantityObtained, params.code]);

  useEffect(() => {
    if (initialQuantityObtained) {
      setTotalPrice(purchase[0].Price * quantity);
    }
  }, [purchase, quantity, initialQuantityObtained]);

  if (loading) return <Loading></Loading>;

  const formatedDate = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePurchase(purchase[0].Code, quantity);
  };

  return (
    <div className="editpurchasecontainer">
      <p>You are only able to edit the Quantity</p>
      <div className="card cardedirpurchase">
        {purchase.map((purchase) => (
          <div className="onecard pursashecard" key={purchase.Code}>
            <a href="/mybuys">
              {" "}
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <div className="productPurshashInfo">
              <h2>{purchase.name}</h2>
              <p>{purchase.description}</p>
            </div>
            <div className="prusasheInfo">
              <h4>Purchase summary</h4>
              <p className="smalltext">{formatedDate}</p>
              <hr />
              <div className="Info">
                <p>Stock</p>
                <p>{purchase.Stock + purchase.Quantity_sold}</p>
              </div>
              <div className="Info">
                <form action="" className="InfoForm" onSubmit={handleSubmit}>
                  <div className="Info">
                    <p>Quantity:</p>
                    <input
                      name="Quantity_sold_edit"
                      className="inputquantityedit"
                      value={quantity}
                      type="number"
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value, 10))
                      }
                    />
                  </div>

                  <div className="Info">
                    <p>Price:</p>
                    <p>
                      {Number(purchase.Price).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </p>
                  </div>

                  <hr />
                  <div className="Info">
                    <p>Total:</p>
                    <p>
                      {Number(totalPrice).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </p>
                  </div>
                  {quantity <= 0 ||
                  quantity > purchase.Stock + purchase.Quantity_sold ? (
                    <p className="error">There are not enought Stock</p>
                  ) : (
                    <button type="submit" className="editPurchase">
                      Edit Purchase
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPurchaseform;
