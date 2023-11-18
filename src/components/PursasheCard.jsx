import { Link } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import Swal from "sweetalert2";

const PursasheCard = ({ product }) => {
  const formatedTotalSale = Number(product.Total_sale).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
  const formatedPrice = Number(product.Price).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  const { deleteProduct } = useStoreContext();
  const formatedDate = new Date(product.Sale_date).toLocaleDateString();
  return (
    <div className="onecard pursashecard">
      <div className="productPurshashInfo">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <div className="prusasheInfo">
        <h4>Purchase summary</h4>
        <p className="smalltext">{formatedDate}</p>
        <hr />
        <div className="Info">
          <p>Quantity:</p>
          <p>{product.Quantity_sold}</p>
        </div>
        <div className="Info">
          <p>Price:</p>
          <p> {formatedPrice}</p>
        </div>
        <hr />
        <div className="Info">
          <p>Total:</p>
          <p>{formatedTotalSale}</p>
        </div>
        <div className="btnsmyproducts">
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
                  deleteProduct(product.Code);
                }
              });
            }}
          >
            Delete
          </button>
          <Link className="updateProductbtn" to={`/buy/edit/${product.Code}`}>
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PursasheCard;
