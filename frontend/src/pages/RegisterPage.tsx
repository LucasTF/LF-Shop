import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFillPersonCheckFill } from "react-icons/bs";

import { useRegisterMutation } from "../queries/userQueries";
import { RootState } from "../store";

import Content from "../layout/Content/Content";
import Card from "../components/UI/Card/Card";
import Loader from "../components/UI/Loader/Loader";
import { Button } from "../components/UI/Button/Button";
import Input from "../components/UI/Form/Input";
import Message from "../components/UI/Message/Message";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPasssword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const [hasRegistered, setHasRegistered] = useState(false);

  const navigate = useNavigate();

  const [registerMutation, { isLoading, isError }] = useRegisterMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler: SubmitHandler<Inputs> = async ({
    name,
    email,
    password,
  }) => {
    try {
      await registerMutation({ name, email, password }).unwrap();
      setHasRegistered(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Content>
      <h1 className="my-4 text-center font-bold text-4xl">Registrar-se</h1>
      <Card className="p-6 md:mx-auto md:w-2/5 2xl:w-1/5">
        {!hasRegistered ? (
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(submitHandler)}
            method="post"
          >
            {isError && (
              <Message type="danger">Email ou senha inválidos</Message>
            )}
            <div>
              <label className="font-bold" htmlFor="name">
                Nome completo
              </label>
              <Input
                className="my-1"
                id="name"
                type="text"
                placeholder="nome completo"
                isInvalid={errors.name && true}
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm font-bold text-red-600">
                  Nome inválido
                </p>
              )}
            </div>
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
            <div>
              <label className="font-bold" htmlFor="confirm-password">
                Confirmar senha
              </label>
              <Input
                className="my-1"
                id="confirm-password"
                type="password"
                placeholder="senha"
                isInvalid={errors.confirmPasssword && true}
                {...register("confirmPasssword", {
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return password === value || "As senhas devem ser iguais";
                    },
                  },
                })}
              />
              {errors.confirmPasssword && (
                <p className="mt-2 text-sm font-bold text-red-600">
                  {errors.confirmPasssword?.message}
                </p>
              )}
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <Button
                  className="w-full justify-center"
                  text="Concluir registro"
                  mode="confirm"
                  type="submit"
                />
                <Link
                  className="text-sm underline text-center"
                  to={redirect ? `/auth?redirect=${redirect}` : "/auth"}
                >
                  Já possui uma conta? Faça login
                </Link>
              </>
            )}
          </form>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="text-green-600 text-8xl">
              <BsFillPersonCheckFill className="mx-auto" />
              <h3 className="text-2xl font-bold">Registro completo!</h3>
            </div>
            <Link
              className="text-sm underline"
              to={redirect ? `/auth?redirect=${redirect}` : "/auth"}
            >
              Fazer login
            </Link>
          </div>
        )}
      </Card>
    </Content>
  );
};
export default RegisterPage;
