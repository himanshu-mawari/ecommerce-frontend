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
    getOrderDetailPageData: builder.query({
      query: (orderId) => ({
        url: `/api/orders/order-detail/${orderId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["AdminOrderDetail"],
    }),
    changeOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `api/orders/${orderId}/status`,
        method: "PATCH",
        body: { status: status },
      }),
      invalidatesTags: ["AdminOrderDetail"],
    }),
    cancelOrder: builder.mutation({
      query: ({ orderId }) => {
        return {
          url: `api/orders/${orderId}/admin-cancel`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["AdminOrderDetail", "AdminOrder"],
    }),

    addProduct: builder.mutation({
      query: (data) => {
        console.log("inside add product query", data);
        return {
          url: `api/products/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AdminProduct"],
    }),
    updateProduct: builder.mutation({
      query: ({data , productId}) => ({
        url: `api/products/edit/${productId}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["AdminProduct"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetProductPageDataQuery,
  useGetOrderPageDataQuery,
  useGetOrderDetailPageDataQuery,
  useChangeOrderStatusMutation,
  useCancelOrderMutation,
  useAddProductMutation,
  useUpdateProductMutation,
} = adminApi;
