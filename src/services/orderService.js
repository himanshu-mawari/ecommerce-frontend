import { baseApi } from "./baseApi";
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    getSingleOrder: builder.query({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
        method: "GET",
      }),
      transformResponse: (data) => data?.data,
      providesTags: ["Order"],
    }),
    getUserOrder: builder.query({
      query: () => ({
        url: "/api/orders/user-orders",
        method: "GET",
      }),
      transformResponse: (data) => data?.data,
    }),
  }),
});
export const { useAddOrderMutation, useGetSingleOrderQuery , useGetUserOrderQuery} = orderApi;
