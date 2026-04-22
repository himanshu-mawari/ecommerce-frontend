  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:2006/",
      credentials: "include",
    }),
    endpoints: () => ({}),
  });