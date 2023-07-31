import { Outlet } from "react-router-dom";

import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
