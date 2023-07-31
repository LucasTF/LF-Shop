import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { ButtonLink } from "../components/UI/Button/Button";
import ProductCard from "../components/Product/ProductCard/ProductCard";
import Loader from "../components/UI/Loader/Loader";
import Message from "../components/UI/Message/Message";

const ProductPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);

  const ProductMainContent = () => {
    if (isLoading) return <Loader />;
    else if (error)
      return (
        <Message type="danger" text="Falha ao recuperar dados do produto" />
      );
    return <>{product && <ProductCard product={product} />}</>;
  };

  return (
    <section className="max-sm:mx-4 2xl:mx-auto 2xl:w-3/4">
      <ButtonLink
        className="p-2 my-4"
        icon={<FaArrowLeft />}
        text="Voltar"
        to="/"
      />
      <section className="my-4">
        <ProductMainContent />
      </section>
    </section>
  );
};
export default ProductPage;
