import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../helpers/constant";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  tagTypes: [
    "User",
    "Cart",
    "Product",
    "Order",
    "HomeProduct",
    "UserWishlist",
    "Address",
    "Dashboard",
    "AdminProduct",
    "AdminOrder",
    "AdminOrderDetail",
  ],

  endpoints: () => ({}),
});
