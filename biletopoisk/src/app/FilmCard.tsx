import { FunctionComponent } from 'react';
import { Film, FilmGenre, filmGenres } from './models/film.model';
import styles from './FilmCard.module.css';
import Image from 'next/image';

interface Props {
  film: Film
}

const translateGenre = (genre: FilmGenre) => filmGenres[genre];

export const FilmCard: FunctionComponent<Props> = ({ film }) => {
  return <section className={styles.filmCard}>
    <Image src={film.posterUrl} alt={film.title} width={100} height={120}></Image>
    <div className={styles.cardContent}>
      <h3>{film.title}</h3>
      <span>{translateGenre(film.genre)}</span>
    </div>
  </section>
}