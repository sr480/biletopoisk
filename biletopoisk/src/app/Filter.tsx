import styles from './Filter.module.css';
import { AppSelect } from './components/AppSelect';
import { cinemaMock } from './models/cinema.mock';
import { filmGenres } from './models/film.model';



export function Filter() {
  const genreOptions = Object.entries(filmGenres).map(([value, name]) => ({
    value,
    name
  }));
  const cinemaOptions = cinemaMock.map(cinema => ({ name: cinema.name, value: cinema.id }));

  return <div className={styles.filterPanel}>
    <div className={styles.filterContainer}>
      <h2>Фильтр поиска</h2>
      <label>Название</label>
      <input placeholder='Введите название'></input>
      <label>Жанр</label>
      <AppSelect options={genreOptions} placeholder='Выберите жанр'></AppSelect>
      <label>Кинотеатр</label>
      <AppSelect options={cinemaOptions} placeholder='Выберите кинотеатр'></AppSelect>
    </div>
  </div>;
}