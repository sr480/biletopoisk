import { Review } from "../../models/review.model";
import { FunctionComponent } from "react";
import styles from "./FilmReview.module.css";
import Image from "next/image";
import { AppCard, AppCardAvatar } from "@/app/components/AppCard/AppCard";

interface Props {
  review: Review;
}

export const FilmReview: FunctionComponent<Props> = ({ review }) => {
  const strongStyle = {fontSize: '20px', lineHeight: '32px', fontWeight: 600};
  return <AppCard
    avatar={() => <AppCardAvatar>
      <div className={styles.avatar}>
        <Image src="/dummy-image.svg" alt="Нет аватарки" width={26} height={22}></Image>
      </div>
    </AppCardAvatar>}
    header={() => <strong style={strongStyle}>{review.name}</strong>}
    subHeader={() => <span>Оценка:&nbsp;<strong style={strongStyle}>{review.rating}</strong></span>}
  >
    <p style={{marginTop: 8}}>
      {review.text}
    </p>
  </AppCard >
}