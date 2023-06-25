'use client'

import { useEffect, useState } from 'react';
import { FilmCard } from './components/FilmCard/FilmCard';
import { FilmsFilter, Filter } from './components/Filter/Filter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { HighlighterContext } from './components/TextHighlighter/TextHighlighter';
import { Film } from './models/film.model';
import styles from './page.module.css';
import { useGetFilmsByCinemaQuery } from './store/services/filmsApi';

function searchWords(search: string, text: string): boolean {
  const words = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').split('\\ ');
  const searchRegExp = new RegExp(words.filter(w => w).join('|'), 'i');
  return searchRegExp.test(text);
}

export default function Home() {
  const [films, setFilms] = useState<Film[]>([]);
  const [filter, setFilter] = useState<FilmsFilter>({});
  const { data, isLoading, isError } = useGetFilmsByCinemaQuery(filter.cinemaId);

  useEffect(() => {
    setFilms((data || []).filter(film => {
      let compare = true;
      if (filter.genre) {
        compare = compare && film.genre === filter.genre;
      }
      if (filter.title) {
        compare = compare && searchWords(filter.title, film.title);
      }
      return compare;
    }) as any);
  }, [filter, data]);

  return (
    <div className={styles.home}>
      <HighlighterContext.Provider value={filter.title || ''}>
        <Filter onFilterChange={(filter) => setFilter(filter)}></Filter>
        <div className={styles.container}>
          {isLoading && <LoadingSpinner></LoadingSpinner>}
          {isError && <div>Ошибка загрузки...</div>}
          {!isLoading && !isError &&

            films.map(film => (
              <FilmCard key={film.id} film={film}></FilmCard>
            ))

          }
        </div>
      </HighlighterContext.Provider>
    </div>
  )
}
