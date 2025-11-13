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

    searchMovies: builder.query({
      query: (query: string) => ({
        url: `${MOVIES.SEARCH_MOVIES}?query=${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMoviesListQuery, useSearchMoviesQuery } = moviesAPI;
