import Product from "../components/Home/Product";
import products from "../utils/products";

const HomePage = () => {
  return (
    <section>
      <h2 className="text-center font-bold my-4">Últimos produtos</h2>
      <div className="grid grid-cols-2 gap-2 mx-2 md:mx-8 md:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};
export default HomePage;
