import { Review } from "../../models/review.model";
import { FunctionComponent } from "react";
import styles from "./FilmReview.module.css";
import Image from "next/image";

interface Props {
  review: Review;
}

export const FilmReview: FunctionComponent<Props> = ({ review }) => {
  return <section className={styles.container}>
    <div className={styles.avatar}>
      <Image src="/dummy-image.svg" alt="Нет аватарки" width={26} height={22}></Image>
    </div>
    <div className={styles.content}>
      <div className={styles.header}>
        <strong>{review.name}</strong>
        <span>
          Оценка:&nbsp;
          <strong>
            {review.rating}
          </strong>
        </span>
      </div>
      <p>
        {review.text}
      </p>
    </div>
  </section>
}