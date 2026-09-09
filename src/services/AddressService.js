import { baseApi } from "./baseApi";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    addAddress: builder.mutation({
      query: (address) => ({
        url: "/api/address",
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Address"], 
    }),

    getAllAddresses: builder.query({
      query: () => ({
        url: "/api/address", 
        method: "GET",
      }),
      transformResponse: (data) => data.data,
      providesTags: ["Address"],
    }),

    getSingleAddress: builder.query({
      query: ({ addressId }) => ({
        url: `/api/address/${addressId}`,
        method: "GET",
      }),
      transformResponse: (data) => data.data,
      providesTags: ["Address"], 
    }),

    updateAddress: builder.mutation({
      query: ({ addressId, ...data }) => ({
        url: `/api/address/${addressId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),

    deleteAddress: builder.mutation({
      query: ({ addressId }) => ({
        url: `/api/address/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"], 
    }),
  }),
});

export const {
  useGetAllAddressesQuery,
  useGetSingleAddressQuery,
  useUpdateAddressMutation,
  useAddAddressMutation,
  useDeleteAddressMutation, 
} = addressApi;