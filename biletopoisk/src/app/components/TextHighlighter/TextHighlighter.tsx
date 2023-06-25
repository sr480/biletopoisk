'use client'

import { Fragment, FunctionComponent, createContext, useContext } from "react";
import styles from "./TextHighlighter.module.css";

interface Props {
  text: string;
}

export const HighlighterContext = createContext('');
// этот компонент я сделал, потомучто давно хотел сделать подсветку поисковой выдач на спанах
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
