import { baseApi } from "./baseApi";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAddresses: builder.query({
      query: () => ({
        url: "api/address",
        method: "GET"
      }),
      transformResponse: (data) => data.data,
      providesTags: ["Address"]
    }),
  }),
});


export const { useGetAllAddressesQuery
} = addressApi;
