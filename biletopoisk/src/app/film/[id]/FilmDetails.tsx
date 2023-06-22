import { Film, filmGenres } from "@/app/models/film.model";
import Image from "next/image";
import { FunctionComponent } from "react";
import styles from './FilmDetails.module.css';

interface Props {
  film: Film;
}

const Property: FunctionComponent<{ name: string, value: string }> = ({ name, value }) => {
  return <>
    <dt>{name}</dt>
    <dd>{value}</dd>
  </>
}

export const FilmDetails: FunctionComponent<Props> = ({ film }) => {

  return <div className={styles.container}>
    <Image src={film.posterUrl} alt={film.title} width={400} height={500}></Image>
    <div>
      <h2>{film.title}</h2>
      <dl>
        <Property name='Жанр:' value={filmGenres[film.genre]} />
        <Property name='Год выпуска:' value={String(film.releaseYear)} />
        <Property name='Рейтинг:' value={String(film.rating)} />
        <Property name='Режисер:' value={film.director} />
      </dl>
      <h3>Описание</h3>
      <p>
        {film.description}
      </p>
    </div>
  </div>
}