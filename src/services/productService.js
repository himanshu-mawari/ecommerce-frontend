import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filters) => ({
        url: "api/products/list",
        method: "GET",
        credentials: "include",
        params: filters,
      }),
      providesTags: ["Product"],
    }),
    getHomeProducts: builder.query({
      query: () => ({
        url: "api/products/home",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["HomeProduct"],
    }),
  }),
});

export const { useGetProductsQuery, useGetHomeProductsQuery } = productApi;
