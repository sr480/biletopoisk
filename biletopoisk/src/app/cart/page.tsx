import { CartFilms } from "./CartFilms";
import { CartTotal } from "./CartTotal";
import styles from './page.module.css';

export const metadata = {
  title: 'Билетопоиск - Корзина',
  description: 'Сервис продажи билетов в лучшие кинотеатры',
}

export default function Page() {
  return <div className={styles.container}>
    <CartFilms></CartFilms>
    <CartTotal></CartTotal>
  </div>
}