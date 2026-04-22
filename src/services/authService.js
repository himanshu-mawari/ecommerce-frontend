import { baseApi } from "./baseApi.js";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: "api/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "POST",
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;