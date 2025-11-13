import { MOVIES } from "@/constants/endpoints";
import { baseAPI } from "../base-api";
import { API_KEY } from "@/config";

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

    movieDetails: builder.query({
      query: (id: string) => ({
        url: `${MOVIES.MOVIE_DETAILS}/${id}?api_key=${API_KEY}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMoviesListQuery,
  useSearchMoviesQuery,
  useMovieDetailsQuery,
} = moviesAPI;
