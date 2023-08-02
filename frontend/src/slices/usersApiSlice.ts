import { USERS_URL } from "../definitions/constants";
import { apiSlice } from "./apiSlice";

type LoginBody = {
  email: string;
  password: string;
};

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginBody, LoginBody>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
