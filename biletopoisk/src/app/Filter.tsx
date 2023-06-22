'use client'

import { FunctionComponent, useEffect, useState } from 'react';
import styles from './Filter.module.css';
import { AppSelect } from './components/AppSelect';
import { cinemaMock } from './models/cinema.mock';
import { filmGenres } from './models/film.model';

export interface FilmsFilter {
  cinemaId?: string;
  genre?: string;
  title?: string;
}

interface Props {
  onFilterChange: (filter: FilmsFilter) => void;
}

export const Filter: FunctionComponent<Props> = ({ onFilterChange }) => {
  const genreOptions = Object.entries(filmGenres).map(([value, name]) => ({
    value,
    name
  }));
  const cinemaOptions = cinemaMock.map(cinema => ({ name: cinema.name, value: cinema.id }));
  const [filter, setFilter] = useState<FilmsFilter>({});
  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);
  const updateFilter = (newFilter: FilmsFilter) => {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
  }

  return <div className={styles.filterPanel}>
    <div className={styles.filterContainer}>
      <h2>Фильтр поиска</h2>
      <label>Название</label>
      <input placeholder='Введите название' onChange={(e => updateFilter({ title: e.target.value }))}></input>
      <label>Жанр</label>
      <AppSelect options={genreOptions} placeholder='Выберите жанр' onSelect={(genre) => updateFilter({ genre })} />
      <label>Кинотеатр</label>
      <AppSelect options={cinemaOptions} placeholder='Выберите кинотеатр' onSelect={(cinemaId) => updateFilter({ cinemaId })} />
    </div>
  </div>;
}