import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2006",
    credentials: "include",
  }),

  tagTypes: ["User", "Cart", "Product", "HomeProduct"],

  endpoints: () => ({}),
});
