import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { Product } from "../definitions";

import { ButtonLink } from "../components/UI/Button/Button";
import ProductCard from "../components/Product/ProductCard/ProductCard";

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };

    fetchProduct();
  }, []);

  return (
    <section className="max-sm:mx-4 2xl:mx-auto 2xl:w-3/4">
      <ButtonLink
        className="p-2 my-4 hover:text-cyan-500 transition duration-200"
        icon={<FaArrowLeft />}
        text="Voltar"
        to="/"
      />
      <section className="my-4">
        {product && <ProductCard product={product} />}
      </section>
    </section>
  );
};
export default ProductPage;
