import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCreditCard, FaTrash } from "react-icons/fa";

import { RootState } from "../store";
import { removeFromCart, clearCart } from "../slices/cartSlice";
import { BRLFormatter } from "../utils/currencyFormatter";

import Content from "../layout/Content/Content";
import Message from "../components/UI/Message/Message";
import Card from "../components/UI/Card/Card";
import { Button } from "../components/UI/Button/Button";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const cartItems = cart.cartItems;

  const cartTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };

  const clearCartHandler = async () => {
    dispatch(clearCart());
  };

  const checkoutHandler = () => {
    navigate("/auth/login?redirect=/shipping");
  };

  return (
    <Content className="lg:max-w-7xl">
      <h1 className="my-4 text-4xl font-bold">Meu carrinho</h1>
      {cartItems.length === 0 ? (
        <Message className="max-sm:text-sm">
          Seu carrinho está vazio.{" "}
          <Link to="/" className="underline underline-offset-4">
            Retornar para o início
          </Link>
        </Message>
      ) : (
        <section className="lg:grid lg:grid-cols-4 lg:gap-2">
          <div className="lg:col-span-3">
            <Card className="grid gap-3">
              {cartItems.map((item) => (
                <div
                  className="py-2 grid grid-flow-col grid-cols-8 gap-2 items-center border-b-2 border-b-gray-800 text-sm last:border-b-0 lg:grid-cols-5 lg:auto-cols-min"
                  key={item._id}
                >
                  <img
                    className="rounded-sm lg:h-auto lg:w-32"
                    src={item.image}
                    alt="Produto"
                  />
                  <Link
                    className="col-span-3 lg:col-auto"
                    to={`/product/${item._id}`}
                  >
                    {item.name}
                  </Link>
                  <p className="text-center font-bold">{item.quantity}</p>
                  <p className="col-span-2 font-bold lg:col-auto">
                    {BRLFormatter(item.price)}
                  </p>
                  <button
                    className="w-fit p-2 flex bg-gray-800 rounded hover:bg-red-700 transition duration-200"
                    type="button"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </Card>

            <div className="my-4 flex justify-end">
              <Button
                mode="danger"
                icon={<FaTrash />}
                text="Esvaziar carrinho"
                onClick={() => clearCartHandler()}
              />
            </div>
          </div>

          <Card className="my-2 grid gap-2 lg:my-0 lg:h-fit">
            <h2 className="pb-2 text-2xl font-bold border-b-2 border-b-gray-800">{`Subtotal (${cartItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}) item(s)`}</h2>
            <div className="flex flex-col items-end">
              <h2 className="text-lg font-bold">
                {BRLFormatter(cartTotalPrice)}
              </h2>
              <p>ou</p>
              <h2>
                <span className="font-bold text-lg">10x</span> de{" "}
                <span className="font-bold text-lg">
                  {BRLFormatter(cartTotalPrice / 10)}
                </span>{" "}
                sem juros
              </h2>
            </div>
            <Button
              className="w-full justify-center"
              type="button"
              mode="confirm"
              icon={<FaCreditCard />}
              text="Ir para pagamento"
              onClick={checkoutHandler}
            />
          </Card>
        </section>
      )}
    </Content>
  );
};
export default CartPage;
