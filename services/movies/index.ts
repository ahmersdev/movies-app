import { MOVIES } from "@/constants/endpoints";
import { baseAPI } from "../base-api";

export const moviesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMoviesList: builder.query({
      query: () => ({
        url: MOVIES.GET_MOVIES,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMoviesListQuery } = moviesAPI;
