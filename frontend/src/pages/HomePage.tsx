import { useGetProductsQuery } from "../slices/productsApiSlice";

import Product from "../components/Home/Product";
import Loader from "../components/UI/Loader/Loader";
import Message from "../components/UI/Message/Message";
import Content from "../layout/Content/Content";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery("");

  const ProductsMainList = () => {
    if (isLoading) return <Loader />;
    else if (error)
      return <Message type="danger">Falha ao recuperar produtos.</Message>;
    return (
      <Content>
        <h2 className="text-center text-2xl font-bold my-4">
          Últimos produtos
        </h2>
        <div className="grid grid-cols-2 gap-2 mx-2 md:mx-8 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </Content>
    );
  };

  return (
    <section>
      <ProductsMainList />
    </section>
  );
};
export default HomePage;
