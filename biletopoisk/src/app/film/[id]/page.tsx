"use client"

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { useGetFilmQuery } from "@/app/store/services/filmsApi";
import { FilmDetails } from "./FilmDetails";
import { FilmReviewsList } from "./FilmReviewsList";
import styles from "./page.module.css";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data, isLoading, isError } = useGetFilmQuery(id);

  if (isLoading) {
    return <div className={styles.container}>
      <LoadingSpinner></LoadingSpinner>
    </div>
  }
  if (isError) {
    return <div className={styles.container}>Ошибка загрузки...</div>
  }
  console.log(data);
  return <div className={styles.container}>
    {!!data && <FilmDetails film={data}></FilmDetails>}
    <FilmReviewsList filmId={id}></FilmReviewsList>
  </div>
}