import Content from "./layout/Content/Content";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Header />
      <Content>
        <HomePage />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
