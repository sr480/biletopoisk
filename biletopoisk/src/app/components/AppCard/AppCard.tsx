import { FunctionComponent, ReactNode } from "react";
import styles from "./AppCard.module.css";

interface Props {
  children: ReactNode
}


export const AppCard: FunctionComponent<Props> = ({ children }) => {
  return <div className={styles.container}>
    {children}
  </div>
}