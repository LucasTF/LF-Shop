const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto p-4 bg-gray-900 text-white text-center">
      <p>LF Shop &copy; {currentYear}</p>
    </footer>
  );
};
export default Footer;
