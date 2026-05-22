import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let getTokenFn = null;

export const setTokenFn = (fn) => {
  getTokenFn = fn;
};

const getToken = () => {
  if (getTokenFn) {
    return getTokenFn();
  }
  return null;
};

const serverUrl =
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api` ||
  "http://20.204.216.223:5000/api";
export const api = createApi({
  reduerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Projects"],
  endpoints: () => ({}),
});
