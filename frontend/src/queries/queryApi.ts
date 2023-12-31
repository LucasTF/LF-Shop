import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../definitions/constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const queryApi = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
