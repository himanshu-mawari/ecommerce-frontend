import { baseApi } from "./baseApi.js";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
      transformResponse: (response) => response.user,
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
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
