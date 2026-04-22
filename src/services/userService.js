import { baseApi } from "./baseApi.js";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getUserProfile: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
        credentials: "include",
      }),
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "api/user/profile/update",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;