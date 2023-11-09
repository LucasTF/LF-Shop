import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useLoginMutation } from "../queries/userQueries";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";

import Content from "../layout/Content/Content";
import Card from "../components/UI/Card/Card";
import Loader from "../components/UI/Loader/Loader";
import { Button } from "../components/UI/Button/Button";
import Input from "../components/UI/Form/Input";
import Message from "../components/UI/Message/Message";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError }] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content>
      <h1 className="my-4 text-center font-bold text-4xl">Login</h1>
      <Card className="p-6 md:mx-auto md:w-2/5 2xl:w-1/5">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(submitHandler)}
          method="post"
        >
          {isError && <Message type="danger">Email ou senha inválidos</Message>}
          <div>
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <Input
              className="my-1"
              id="email"
              type="email"
              placeholder="seu@email.com"
              isInvalid={errors.email && true}
              {...register("email", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm font-bold text-red-600">
                Email inválido
              </p>
            )}
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
              isInvalid={errors.password && true}
              {...register("password", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
            />
            {errors.password && (
              <p className="mt-2 text-sm font-bold text-red-600">
                Senha inválida
              </p>
            )}
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Button
                className="w-full justify-center"
                text="Entrar"
                mode="confirm"
                type="submit"
              />
              <Link
                className="text-sm underline text-center"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Ainda não tem uma conta? Registre-se
              </Link>
            </>
          )}
        </form>
      </Card>
    </Content>
  );
};
export default LoginPage;
