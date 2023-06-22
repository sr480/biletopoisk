'use client'

import { FunctionComponent, useEffect, useState } from "react";
import styles from "./FilmCounter.module.css"
import { useCounter } from "../../hooks/useCounter";

interface Props {
  counter: number;
}

export const FilmCounter: FunctionComponent<Props> = ({ counter }) => {
  const { count, increment, decrement, reset, setCount } = useCounter(counter, 30);

  return <div className={styles.container}>
    <button className={styles.buttons} onClick={decrement} disabled={count === 0}>-</button>
    <div className={styles.counter}>{count}</div>
    <button className={styles.buttons} onClick={increment}>+</button>
  </div>
}