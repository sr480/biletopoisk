"use client"

import { useLayoutEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { FilmCard } from "../components/FilmCard/FilmCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Film } from "../models/film.model";
import { selectCartFilms } from "../store/features/cart/selector";
import { useGetFilmsQuery } from "../store/services/filmsApi";
import { RootState } from "../store/store";

export const CartFilms = () => {
  const filmIds = useSelector((state: RootState) => selectCartFilms(state));
  const [films, setFilms] = useState<Film[]>([]);
  const { data, isLoading, isError } = useGetFilmsQuery(undefined);

  useLayoutEffect(() => {
    if (data) {
      setFilms(data);
    }
  }, [data])

  if (filmIds.length === 0) {
    return <div>Корзина пуста...</div>
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  if (isError) {
    return <div>Ошибка загрузки...</div>
  }

  return <div style={{ width: '100%' }}>
    {
      filmIds.map(filmId => {
        const film = films.find(film => film.id === filmId);
        if (!film) {
          return <Fragment key={filmId}></Fragment>;
        }
        return <FilmCard key={filmId} film={film} allowReset={true} />
      })
    }
  </div>
}