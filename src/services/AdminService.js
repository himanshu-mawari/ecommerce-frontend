import { baseApi } from "./baseApi.js";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: "api/admin/dashboard",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Dashboard"],
    }),
    getProductPageData: builder.query({
      query: (params) => {
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([, value]) =>
              value !== undefined && value !== "" && value !== null,
          ),
        );

        const hasParams = Object.keys(cleanParams).length > 0;
        return {
          url: "/api/products/admin/list",
          method: "GET",
          ...(hasParams && { params: cleanParams }),
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["AdminProduct"],
    }),
    getOrderPageData: builder.query({
      query: (params) => {
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([, value]) =>
              value !== undefined && value !== "" && value !== null,
          ),
        );
        const hasParams = Object.keys(cleanParams).length > 0;
        return {
          url: "/api/orders/all-orders",
          method: "GET",
          ...(hasParams && { params: cleanParams }),
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["AdminOrder"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetProductPageDataQuery,
  useGetOrderPageDataQuery,
} = adminApi;
