import { useState } from "react";
import { Link } from "react-router-dom";

import Content from "../layout/Content/Content";
import Card from "../components/UI/Card/Card";
import { Button } from "../components/UI/Button/Button";
import Input from "../components/UI/Form/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Content>
      <h1 className="my-4 text-center font-bold text-4xl">Login</h1>
      <Card className="p-6 md:w-1/5 md:mx-auto">
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => submitHandler(e)}
          method="post"
        >
          <div>
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <Input
              className="my-1"
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="invisible text-sm">Campo inválido</p>
          </div>
          <div>
            <label className="font-bold" htmlFor="password">
              Senha
            </label>
            <Input
              className="my-1"
              id="password"
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="invisible text-sm">Campo inválido</p>
          </div>
          <Button
            className="w-full justify-center"
            text="Entrar"
            mode="confirm"
            type="submit"
          />
          <Link className="text-sm underline text-center" to="/register">
            Ainda não tem uma conta? Registre-se
          </Link>
        </form>
      </Card>
    </Content>
  );
};
export default LoginPage;
