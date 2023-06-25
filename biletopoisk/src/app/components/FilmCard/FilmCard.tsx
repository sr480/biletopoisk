import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Film, FilmGenre, filmGenres } from '../../models/film.model';
import { AppCard, AppCardAvatar } from '../AppCard/AppCard';
import { FilmCounter } from '../FilmCounter/FilmCounter';
import { TextHighlighter } from '../TextHighlighter/TextHighlighter';
import styles from './FilmCard.module.css';

interface Props {
  film: Film
  allowReset?: boolean
}

const FilmGenre = ({ genre }: { genre: FilmGenre }) => <i>{filmGenres[genre] || 'Авторское кино'}</i>;

export const FilmCard: FunctionComponent<Props> = ({ film, allowReset }) => {
  return <AppCard
    avatar={() =>
      <AppCardAvatar width={100} height={120}>
        <Image src={film.posterUrl} alt={film.title} width={100} height={120} loading="lazy"></Image>
      </AppCardAvatar>
    }
    header={() => (
      <Link href={`/film/${film.id}`}>
        <h3 className={styles.filmHeader}>
          <TextHighlighter text={film.title} />
        </h3>
      </Link>)
    }

    subHeader={() => (
      <FilmCounter filmId={film.id} allowReset={!!allowReset}></FilmCounter>
    )}
  >
    <FilmGenre genre={film.genre}/>
  </AppCard>
}