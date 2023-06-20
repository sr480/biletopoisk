import { FunctionComponent } from "react";
import styles from "./Expander.module.css";

interface Props {
  title: string;
  content: string;
}
export const Expander: FunctionComponent<Props> = ({ title, content }) => {
  return <div className={styles.expander}>
    <h3>{title}</h3>
    <p>
      {content}
    </p>
  </div>
}