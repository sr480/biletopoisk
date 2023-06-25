import { useGetReviewsByFilmQuery } from "@/app/store/services/filmsApi";
import { FunctionComponent } from "react";
import { FilmReview } from "./FilmReview";

interface Props {
  filmId: string;
}

export const FilmReviewsList: FunctionComponent<Props> = ({ filmId }) => {
  const { data, isLoading } = useGetReviewsByFilmQuery(filmId);

  if (isLoading) {
    return <></>;
  }

  return <>
    {
      data!.map(review => <FilmReview key={review.id} review={review}></FilmReview>)
    }
  </>;
}