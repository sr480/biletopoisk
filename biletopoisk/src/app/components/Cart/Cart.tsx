"use client"

import { selectCartTotal } from "../../store/features/cart/selector";
import { RootState } from "../../store/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";

export function Cart() {
  const total = useSelector((state: RootState) => selectCartTotal(state));

  return <div className={styles.cart}>
    <div className={styles.total}>{total}</div>
    <Image src="/cart.svg" alt="Корзина" width="28" height="25"></Image>
  </div>
}
