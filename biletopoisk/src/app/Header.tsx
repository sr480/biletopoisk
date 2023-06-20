import Link from "next/link";
import styles from "./Header.module.css";
import { Cart } from "./Cart";

export function Header() {
  return <nav className={styles.nav}>
    <Link href="/">
      <h1>Билетопоиск</h1>
    </Link>
    <Link href="cart">
      <Cart></Cart>
    </Link>
  </nav>
}