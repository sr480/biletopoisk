import { filmsMock } from "@/app/models/film.mock"
import { FilmDetails } from "./FilmDetails";
import { reviewMocks } from "@/app/models/review.mock";
import { FilmReview } from "./FilmReview";
import styles from "./page.module.css";

export default function Page({ params }: { params: { id: string } }) {
  const film = filmsMock[0];
  const reviews = reviewMocks.filter(review => film.reviewIds.indexOf(review.id) >= 0);
  return <div className={styles.container}>
    <FilmDetails film={film}></FilmDetails>
    {
      reviews.map(review => <FilmReview key={review.id} review={review}></FilmReview>)
    }
  </div>
}