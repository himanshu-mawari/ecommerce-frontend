import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: (filters) => ({
        url: "api/products/list",
        method: "GET",
        params: filters,
      }),
      providesTags: ["Product"],
    }),

    getHomeProducts: builder.query({
      query: () => ({
        url: "api/products/home",
        method: "GET",
      }),
      providesTags: ["HomeProduct"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `api/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Product", id },
      ],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useGetHomeProductsQuery,
  useGetProductByIdQuery,
} = productApi;