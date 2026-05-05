import { baseApi } from "./baseApi";
const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),
    getSingleOrder: builder.query({
      query: (orderId) => ({
        url: `/api/order/${orderId}`,
        method : "GET",
      }),
      transformResponse : (data) => data?.data
      ,
      providesTags: ["Order"]
    }),
  }),
});
export const { useAddOrderMutation , useGetSingleOrderQuery} = orderApi;
