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
    })
  }),
});

export const { useGetDashboardQuery , useGetProductPageDataQuery } = adminApi;
