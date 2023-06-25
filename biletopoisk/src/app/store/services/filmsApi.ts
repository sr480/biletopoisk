import { Cinema } from "@/app/models/cinema.model";
import { Film } from "@/app/models/film.model";
import { Review } from "@/app/models/review.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react/";

const apiUrl = process.env.API_URL;

export const filmsApi = createApi({
  reducerPath: "films",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getFilms: builder.query<Film[], undefined>({ query: () => "movies" }),
    getFilmsByCinema: builder.query<Film[], string | undefined>({
      query: (cinemaId) => {
        if (cinemaId) {
          return `movies?cinemaId=${cinemaId}`;
        }
        return `movies`;
      },
    }),
    getFilm: builder.query<Film, string>({
      query: (filmId) => `movie?movieId=${filmId}`,
    }),
    getCinimas: builder.query<Cinema[], undefined>({
      query: () => `cinemas`,
    }),
    getReviewsByFilm: builder.query<Review[], string>({
      query: (filmId) => `reviews?movieId=${filmId}`,
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetFilmQuery,
  useGetFilmsByCinemaQuery,
  useGetCinimasQuery,
  useGetReviewsByFilmQuery,
} = filmsApi;
