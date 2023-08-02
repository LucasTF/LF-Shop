import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import { Product as ProductAttributes } from "../../../definitions/types";

import Rating from "../../Ratings/Rating";
import Card from "../../UI/Card/Card";
import { Button } from "../../UI/Button/Button";
import Select from "../../UI/Form/Select";
import ProductCardStock from "./ProductCardStock";
import ProductCardPrice from "./ProductCardPrice";

type ProductProps = {
  product: ProductAttributes;
  onAddToCart: (quantity: number) => void;
};

const ProductCard = ({ product, onAddToCart }: ProductProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid gap-2 md:grid-cols-4 md:gap-1">
      <Card className="grid grid-flow-row gap-4 md:grid-rows-none md:grid-cols-2 md:col-span-3">
        <img src={product.image} alt={product.name} />

        <div className="md:mr-2 md:flex md:flex-col">
          <h2 className="font-bold xl:text-2xl">{product.name}</h2>
          <div className="my-2">
            <hr className="mb-2" />
            <Rating value={product.rating} text={product.numReviews} />
            <p className="text-justify">{product.description}</p>
            <hr className="mt-2" />
            {product.countInStock > 0 && (
              <div className="grid gap-1 my-4 xl:gap-4">
                <ProductCardPrice value={product.price} label="à vista" />
                <ProductCardPrice
                  value={product.price / 10}
                  label="em até 10x sem juros"
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="h-fit flex flex-col justify-evenly xl:border-l-2 xl:border-gray-800 xl:px-4">
        <div className="my-4">
          <ProductCardStock stock={product.countInStock} />
        </div>
        <div>
          {product.countInStock > 0 && (
            <div className="my-4 flex flex-col gap-2">
              <p className="font-bold">Quantidade:</p>
              <Select
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(product.countInStock).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </div>
          )}
          <Button
            icon={<FaShoppingCart />}
            text="Adicionar ao carrinho"
            className="w-full justify-center xl:mt-auto"
            mode="confirm"
            disabled={product.countInStock === 0}
            onClick={() => onAddToCart(quantity)}
          />
        </div>
      </Card>
    </div>
  );
};
export default ProductCard;
