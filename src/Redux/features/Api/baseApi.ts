import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

// https://car-rental-reservation-psi.vercel.app
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: 'include',

  prepareHeaders: (headers, { getState}) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["cars", "booking", "user"],
  baseQuery: baseQuery,
  endpoints: () => ({}),

});


