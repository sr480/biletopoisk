import { Fragment, FunctionComponent, createContext, useContext } from "react";
import styles from "./TextHighlighter.module.css";

interface Props {
  text: string;
}

export const HighlighterContext = createContext('');

export const TextHighlighter: FunctionComponent<Props> = ({ text }) => {
  const highlightPattern = useContext(HighlighterContext).toLowerCase();
  if (highlightPattern === '') {
    return <>{text}</>
  }
  const words = highlightPattern.split(' ');
  const parts = text.split(new RegExp(`(${words.join('|')})`, 'i'));
  return <>
    {
      parts.map((part, index) => {
        if (words.indexOf(part.toLowerCase()) >= 0) {
          return <span key={index} className={styles.highlighted}>{part}</span>;
        }
        return <Fragment key={index}>{part}</Fragment>;
      })
    }
  </>
}

// что происходит при use client ?

// Как правильно связать состояние корзины и список фильмов?

// Делать ли дроп дауны на порталах?

// Когда в кинопоиске будет переключение профиля пользователя?

// https://nextjs.org/docs/app/building-your-application/optimizing/images

// дебонс на ввод