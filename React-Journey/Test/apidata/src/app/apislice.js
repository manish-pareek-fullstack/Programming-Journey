import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apislice = createApi({
  reducerPath: "ApiSlice",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "users",
    }),
  }),
});
export const { useGetUserQuery } = apislice;
export default apislice.reducer;
