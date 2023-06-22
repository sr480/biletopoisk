'use client'

import { useEffect, useState } from 'react';
import { FilmCard } from './FilmCard';
import { FilmsFilter, Filter } from './Filter';
import { HighlighterContext } from './components/TextHighlighter/TextHighlighter';
import { filmsMock } from './models/film.mock';
import { Film } from './models/film.model';
import styles from './page.module.css';

function searchWords(search: string, text: string): boolean {
  const words = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').split('\\ ');
  const searchRegExp = new RegExp(words.filter(w => w).join('|'), 'i');
  return searchRegExp.test(text);
}

export default function Home() {
  const [films, setFilms] = useState<Film[]>(filmsMock as any);
  const [filter, setFilter] = useState<FilmsFilter>({});
  useEffect(() => {
    setFilms(filmsMock.filter(film => {
      let compare = true;
      if (filter.genre) {
        compare = compare && film.genre === filter.genre;
      }
      if (filter.title) {
        compare = compare && searchWords(filter.title, film.title);
      }
      return compare;
    }) as any);
  }, [filter]);

  const searchFilms = ((filter: FilmsFilter) => {
    setFilter(filter);
  });

  return (
    <div className={styles.home}>
      <HighlighterContext.Provider value={filter.title || ''}>
        <Filter onFilterChange={(filter) => searchFilms(filter)}></Filter>
        <div className={styles.container}>
          {films.map(film => (
            <FilmCard key={film.id} film={film}></FilmCard>
          ))}
        </div>
      </HighlighterContext.Provider>
    </div>
  )
}
