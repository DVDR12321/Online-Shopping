import { useContext } from "react";
import { ProductContext } from "../../context/products.context";

const Shop = () => {
  const { products } = useContext(ProductContext)
  return (
    <div>
      {products.map((product) => (
        <h1 key={product.id}>{product.name} </h1>
      ))}
    </div>
  );
};

export default Shop;
