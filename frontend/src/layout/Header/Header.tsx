import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="z-50 fixed w-full flex justify-between py-4 px-8 bg-gray-900 text-white">
      <h1 className="text-2xl">
        <a href="#">LF Shop</a>
      </h1>
      <Navbar />
    </header>
  );
};

export default Header;
