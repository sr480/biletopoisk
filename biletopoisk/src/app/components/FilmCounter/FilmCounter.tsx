'use client'

import { cartActions } from "@/app/store/features/cart";
import { selectCartTotal, selectFilmAmount } from "@/app/store/features/cart/selector";
import { RootState } from "@/app/store/store";
import classNames from "classnames";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppModal } from "../AppModal/AppModal";
import styles from "./FilmCounter.module.css";

interface Props {
  filmId: string;
  allowReset?: boolean;
}

export const FilmCounter: FunctionComponent<Props> = ({ filmId, allowReset }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const amount = useSelector((state: RootState) => selectFilmAmount(state, filmId));
  const total = useSelector((state: RootState) => selectCartTotal(state));
  const dispatch = useDispatch();

  const handleClose = (status: 'ok' | 'cancel') => {
    setIsModalVisible(false);
    if (status === 'ok') {
      dispatch(cartActions.reset(filmId))
    }
  };

  return <div className={styles.container}>
    <button className={styles.buttons} onClick={() => dispatch(cartActions.decrement(filmId))} disabled={amount === 0} title="Убавить">-</button>
    <div className={styles.counter}>{amount}</div>
    <button className={styles.buttons} onClick={() => dispatch(cartActions.increment(filmId))} disabled={total >= 30} title="Добавить">+</button>
    {!!allowReset && <>
      <button className={classNames(['btn-icon', styles.removeBtn])} onClick={() => setIsModalVisible(true)} disabled={amount === 0} title="Удалить">
        <Image src="cross.svg" width={16} height={16} alt="Закрыть"></Image>
      </button>
      {isModalVisible && <AppModal header="Удаление билета" text="Вы уверены, что хотите удалить билет?" onClose={handleClose} />}
    </>
    }
  </div>
}
