import { baseApi } from "./baseApi.js";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: "api/admin/dashboard",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Dashboard"]
    }),
    getProductPageData: builder.query({
      query:({q , category , sub_category , stock_status}) => ({
        url: "/api/products/admin/list",
        method: "GET",
        params:{q, category , sub_category , stock_status}
      }),
      transformResponse:(response) => response.data,
      providesTags:["AdminProduct"]
    }),
    getOrderPageData: builder.query({
      query:({q , order_status , payment_status , date }) => ({
        url: "/api/orders/all-orders",
        method: "GET",
        params:{q , order_status , payment_status , date}
      }),
      transformResponse:(response) => response.data,
      providesTags:["AdminOrder"]
    })
  }),
});

export const { useGetDashboardQuery , useGetProductPageDataQuery , useGetOrderPageDataQuery} = adminApi;
