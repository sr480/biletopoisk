'use client'

import { useGetCinimasQuery } from '@/app/store/services/filmsApi';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { filmGenres } from '../../models/film.model';
import { AppSelect, AppSelectOption } from '../AppSelect/AppSelect';
import { DebouncedInput } from '../DebouncedInput/DebouncedInput';
import styles from './Filter.module.css';

export interface FilmsFilter {
  cinemaId?: string;
  genre?: string;
  title?: string;
}

interface Props {
  onFilterChange: (filter: FilmsFilter) => void;
}

export const Filter: FunctionComponent<Props> = ({ onFilterChange }) => {
  const genreOptions = Object.entries(filmGenres).map<AppSelectOption>(([value, name]) => ({
    value,
    name
  }));
  genreOptions.unshift({ name: 'Не выбран' });

  const cinemaResults = useGetCinimasQuery(undefined);

  let cinemaOptions = new Array<AppSelectOption>();
  if (cinemaResults.data) {
    cinemaOptions.push(...cinemaResults.data.map(cinema => ({ value: cinema.id, name: cinema.name })));
  }

  const [filter, setFilter] = useState<FilmsFilter>({});
  const updateTitle = useCallback((title: string) => {
    const updatedFilter = { ...filter, title };
    setFilter(updatedFilter);
  }, []);

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
      <DebouncedInput placeholder='Введите название' onChange={updateTitle}></DebouncedInput>
      <label>Жанр</label>
      <AppSelect options={genreOptions} placeholder='Выберите жанр' onSelect={(genre) => updateFilter({ genre })} />
      <label>Кинотеатр</label>
      <AppSelect options={cinemaOptions} placeholder='Выберите кинотеатр' onSelect={(cinemaId) => updateFilter({ cinemaId })} />
    </div>
  </div>;
}