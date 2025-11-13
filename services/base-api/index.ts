import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, BASE_URL } from "@/config";

// Tags
export const TAGS = [];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("authorization", `Bearer ${API_KEY}`);
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: TAGS,
  endpoints: () => ({}),
});
