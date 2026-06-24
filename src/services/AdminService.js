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
  }),
});

export const { useGetDashboardQuery } = adminApi;
