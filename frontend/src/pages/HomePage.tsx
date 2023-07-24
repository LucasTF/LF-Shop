import Product from "../components/Product/Product";
import products from "../utils/products";

const HomePage = () => {
  return (
    <section className="my-4">
      <h2 className="text-center font-bold my-4">Últimos produtos</h2>
      <div className="grid grid-cols-2 gap-5 mx-2 md:mx-16 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </section>
  );
};
export default HomePage;
