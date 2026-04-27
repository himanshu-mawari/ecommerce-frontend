import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "api/cart/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
