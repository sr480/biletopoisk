'use client'

import { FunctionComponent, useEffect, useState } from "react";
import styles from "./FilmCounter.module.css"

interface Props {
  counter: number;
}

export const FilmCounter: FunctionComponent<Props> = ({ counter }) => {
  const [count, setCount] = useState(counter);

  return <div className={styles.container}>
    <button className={styles.buttons} onClick={() => setCount(count - 1)} disabled={count === 0}>-</button>
    <div className={styles.counter}>{count}</div>
    <button className={styles.buttons} onClick={() => setCount(count + 1)}>+</button>
  </div>
}