import Product from "../components/Home/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery("");

  const ProductsMainList = () => {
    if (isLoading) return <h2>Loading...</h2>;
    else if (error) return <h2>Erro ao recuperar produtos</h2>;
    return (
      <>
        <h2 className="text-center font-bold my-4">Últimos produtos</h2>
        <div className="grid grid-cols-2 gap-2 mx-2 md:mx-8 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </>
    );
  };

  return (
    <section>
      <ProductsMainList />
    </section>
  );
};
export default HomePage;
