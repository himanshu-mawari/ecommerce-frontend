import { baseApi } from "./baseApi.js";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
      transformResponse: (data) => data.user,
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "api/user/profile/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserWishlist: builder.query({
      query: () => ({
        url: "api/user/wishlist/items",
        method: "GET",
      }),
      transformResponse: (data) => data.data,
      providesTags: ["UserWishlist"],
    }),
    addWishlistProduct: builder.mutation({
      query: ({productId}) => ({
        url: `api/user/wishlist/items`,
        method: "POST",
        body: {productId}
      }),
      transformResponse: (data) => data.data,
      invalidatesTags: ["UserWishlist"],
    }),
    removeWishlistProduct: builder.mutation({
      query: ({productId}) => ({
        url: `api/user/wishlist/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserWishlist"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useAddWishlistProductMutation,
  useGetUserWishlistQuery,
  useRemoveWishlistProductMutation
} = userApi;
