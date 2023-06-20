export type FilmGenre = "fantasy" | "horror" | "action" | "comedy";

export const filmGenres: { [key in FilmGenre]: string } = {
  fantasy: "Фэнтези",
  horror: 'Ужасы',
  action: 'Триллер',
  comedy: 'Комедия'
};

export interface Film {
  title: string;
  posterUrl: string;
  releaseYear: number;
  description: string;
  genre: FilmGenre;
  id: string;
  rating: number;
  director: string;
  reviewIds: string[];
}
