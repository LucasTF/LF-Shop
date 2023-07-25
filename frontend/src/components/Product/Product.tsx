import { Link } from "react-router-dom";

import Rating from "./Rating";

import { Product as ProductAttributes } from "../../utils/products";
import { BRLFormatter } from "../../utils/currencyFormatter";

type ProductProps = {
  product: ProductAttributes;
};

const Product = ({ product }: ProductProps) => {
  return (
    <div className="p-2 border-gray-800 border-2 bg-gray-900 shadow-md shadow-gray-900 rounded hover:bg-gray-950 hover:shadow-gray-900 hover:scale-105 transition duration-200 ease-in">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="m-3 flex flex-col">
        <Link to={`/product/${product._id}`}>
          <p className="font-semibold">{product.name}</p>
        </Link>
        <div className="my-2">
          <Rating value={product.rating} text={product.numReviews} />
        </div>
        <h3 className="text-lg md:text-2xl">{BRLFormatter(product.price)}</h3>
      </div>
    </div>
  );
};
export default Product;
