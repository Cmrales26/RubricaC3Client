const ProductCard = ({ product }) => {
  const formattedPrice = Number(product.Price).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  return (
    <div className="onecard">
      <div className="producttitle">
        <h3>{product.name}</h3>
      </div>
      <div className="productdescription">
        <p>{product.description}</p>
      </div>
      <div className="footercard">
        <p>Price: {formattedPrice}</p>
        <p>Stock: {product.Stock}</p>
      </div>
    </div>
  );
};

export default ProductCard;
