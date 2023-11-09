import { USERS_URL } from "../definitions/constants";
import { queryApi } from "./queryApi";

type LoginBody = {
  email: string;
  password: string;
};

export const userQueries = queryApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginBody, LoginBody>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userQueries;
