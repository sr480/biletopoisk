import styles from './page.module.css'
import { Filter } from './Filter'
import { filmsMock } from './models/film.mock'
import { FilmCard } from './FilmCard';

export default function Home() {
  const films = filmsMock;
  return (
    <div className={styles.home}>
      <Filter></Filter>
      <div className={styles.container}>
        {films.map(film => (
          <FilmCard key={film.id} film={film}></FilmCard>
        ))}
      </div>
    </div>
  )
}
