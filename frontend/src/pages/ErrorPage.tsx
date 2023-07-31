import { FaArrowLeft } from "react-icons/fa";
import { ButtonLink } from "../components/UI/Button/Button";
import Content from "../layout/Content/Content";

const ErrorPage = () => {
  return (
    <Content className="flex flex-col items-center justify-center">
      <h2 className="text-9xl">404</h2>
      <h3 className="text-3xl my-3 md:text-5xl">Página não encontrada</h3>
      <ButtonLink
        icon={<FaArrowLeft />}
        text="Voltar a página inicial"
        to="/"
        className="text-2xl"
      />
    </Content>
  );
};

export default ErrorPage;
