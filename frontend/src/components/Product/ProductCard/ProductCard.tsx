import { FaShoppingCart } from "react-icons/fa";

import { Product as ProductAttributes } from "../../../definitions";

import Rating from "../../Ratings/Rating";
import Card from "../../UI/Card/Card";
import { Button } from "../../UI/Button/Button";
import ProductCardStock from "./ProductCardStock";
import ProductCardPrice from "./ProductCardPrice";

type ProductProps = {
  product: ProductAttributes;
};

const Product = ({ product }: ProductProps) => {
  return (
    <Card className="grid grid-flow-row gap-2 md:grid-rows-none md:grid-cols-2 md:gap-4 xl:grid-cols-3">
      <img src={product.image} alt={product.name} />
      <div className="md:mr-2 md:flex md:flex-col md:justify-evenly xl:col-span-2">
        <h2 className="font-bold xl:text-2xl">{product.name}</h2>
        <div className="my-2">
          <hr className="mb-2" />
          <Rating value={product.rating} text={product.numReviews} />
          <p className="text-justify">{product.description}</p>
          <hr className="mt-2" />
        </div>
        <div className="my-4">
          <ProductCardStock stock={product.countInStock} />
        </div>
        {product.countInStock > 0 && (
          <div className="grid gap-1 my-4 xl:gap-4">
            <ProductCardPrice value={product.price} label="à vista" />
            <ProductCardPrice
              value={product.price / 10}
              label="em até 10x sem juros"
            />
          </div>
        )}
        <Button
          icon={<FaShoppingCart />}
          text="Adicionar ao carrinho"
          className="bg-green-700 w-full justify-center active:bg-green-600 hover:bg-green-600 disabled:bg-gray-600 transition duration-200 xl:mt-auto"
          disabled={product.countInStock === 0}
        />
      </div>
    </Card>
  );
};
export default Product;
