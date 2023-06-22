import { FunctionComponent } from 'react';
import { Film, FilmGenre, filmGenres } from './models/film.model';
import styles from './FilmCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FilmCounter } from './components/FilmCounter';
import { TextHighlighter } from './components/TextHighlighter';

interface Props {
  film: Film
}

const translateGenre = (genre: FilmGenre) => filmGenres[genre];

export const FilmCard: FunctionComponent<Props> = ({ film }) => {
  return <section className={styles.filmCard}>
    <div className={styles.imageContainer}>
      <Image src={film.posterUrl} alt={film.title} width={100} height={120} loading="lazy"></Image>
    </div>
    <div className={styles.cardContent}>
      <div className={styles.header}>
        <Link href={`/film/${film.id}`}>
          <h3>
            <TextHighlighter text={film.title}/>
          </h3>
        </Link>
        <FilmCounter counter={1}></FilmCounter>
      </div>
      <i>{translateGenre(film.genre)}</i>
    </div>
  </section>
}