import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

import { ButtonLink } from "../components/UI/Button/Button";
import Content from "../layout/Content/Content";
import ProductCard from "../components/Product/ProductCard/ProductCard";
import Loader from "../components/UI/Loader/Loader";
import Message from "../components/UI/Message/Message";
import { addToCart } from "../slices/cartSlice";

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);

  const addToCartHandler = (quantity: number) => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const ProductMainContent = () => {
    if (isLoading) return <Loader />;
    else if (error)
      return (
        <Message type="danger">Falha ao recuperar dados do produto</Message>
      );
    return (
      <>
        {product && (
          <ProductCard onAddToCart={addToCartHandler} product={product} />
        )}
      </>
    );
  };

  return (
    <Content>
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
    </Content>
  );
};
export default ProductPage;
