import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "api/cart",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "api/cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: `api/cart/update/${cartItemId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"]
    }),
    removeCartItem: builder.mutation({
      query: ({ cartItemId}) => ({
        url: `api/cart/remove/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartQuery, useUpdateCartMutation , useRemoveCartItemMutation } =
  cartApi;
