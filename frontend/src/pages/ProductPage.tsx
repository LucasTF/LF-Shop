import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import products from "../utils/products";

import { ButtonLink } from "../components/UI/Button/Button";
import Product from "../components/Product/ProductCard/ProductCard";

const ProductPage = () => {
  const { id: productId } = useParams();

  const product = products.find((p) => p._id === productId);

  return (
    <section className="max-sm:mx-4 2xl:mx-auto 2xl:w-3/4">
      <ButtonLink
        className="p-2 my-4 hover:text-cyan-500 transition duration-200"
        icon={<FaArrowLeft />}
        text="Voltar"
        to="/"
      />
      <section className="my-4">
        <Product product={product!} />
      </section>
    </section>
  );
};
export default ProductPage;
