import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaDoorOpen } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Button, ButtonLink } from "../../components/UI/Button/Button";
import { RootState } from "../../store";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { pathname } = useLocation();

  useEffect(() => {
    setShowNav(false);
  }, [pathname]);

  const logoutHandler = () => {
    console.log("Logout");
  };

  let drawerAnimation = showNav
    ? "translate-y-0 opacity-1"
    : "-translate-y-[120%] opacity-0";

  return (
    <>
      <button
        className="cursor-pointer text-xl p-1 rounded border-2 border-gray-800 lg:hidden"
        onClick={() => setShowNav((currState) => !currState)}
      >
        {showNav ? <CgClose /> : <FiMenu />}
      </button>
      <nav
        className={
          "transition ease-linear duration-300 fixed top-16 left-0 flex flex-col-reverse items-left bg-gray-900 lg:static lg:flex-row lg:justify-between lg:items-center lg:h-8 lg:space-x-4 lg:opacity-100 lg:translate-y-0 max-lg:w-full" +
          " " +
          drawerAnimation
        }
      >
        <ul className="[&>li>a]:block [&>li]:p-2 [&>li]:m-3 [&>li]:bg-gray-800 [&>li]:rounded [&>li:hover]:text-cyan-500 [&>li]:transition [&>li]:duration-200 lg:flex lg:space-x-4 lg:[&>li]:p-0 lg:[&>li]:m-0 lg:[&>li]:bg-inherit">
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/">Item</Link>
          </li>
          <li>
            <Link to="/">Item</Link>
          </li>
          <li>
            <Link to="/">Item</Link>
          </li>
        </ul>
        <div className="h-full border-2 border-gray-800 max-lg:hidden"></div>
        <div className="border-b-2 border-t-gray-300 py-2 flex justify-center items-center space-x-2 lg:border-0 max-lg:w-full">
          <ButtonLink text="Carrinho" icon={<FaShoppingCart />} to="/cart">
            {cartItems.length > 0 && (
              <p className="ml-2 px-2 font-bold bg-green-700 rounded-full">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </p>
            )}
          </ButtonLink>
          <ButtonLink
            text={userInfo ? userInfo.name : "Login"}
            icon={<FaUser />}
            mode={userInfo ? "default" : "confirm"}
            to="/auth"
          />
          {userInfo && (
            <Button
              className="hover:text-red-600"
              type="button"
              icon={<FaDoorOpen />}
              text="Sair"
              onClick={logoutHandler}
            />
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
