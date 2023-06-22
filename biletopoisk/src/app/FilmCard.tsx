import { FunctionComponent } from 'react';
import { Film, FilmGenre, filmGenres } from './models/film.model';
import styles from './FilmCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FilmCounter } from './components/FilmCounter/FilmCounter';
import { TextHighlighter } from './components/TextHighlighter/TextHighlighter';
import { AppCard, AppCardAvatar } from './components/AppCard/AppCard';

interface Props {
  film: Film
}

const translateGenre = (genre: FilmGenre) => filmGenres[genre];

export const FilmCard: FunctionComponent<Props> = ({ film }) => {
  return <AppCard
    avatar={() =>
      <AppCardAvatar width={100} height={120}>
        <Image src={film.posterUrl} alt={film.title} width={100} height={120} loading="lazy"></Image>
      </AppCardAvatar>
    }
    header={() => (
      <Link href={`/film/${film.id}`}>
        <h3>
          <TextHighlighter text={film.title} />
        </h3>
      </Link>)
    }

    subHeader={() => (
      <FilmCounter counter={0}></FilmCounter>
    )}
  >
    <div className={styles.cardContent}>
      <div className={styles.header}>

      </div>
      <i>{translateGenre(film.genre)}</i>
    </div>
  </AppCard>
}