import { FunctionComponent, ReactNode } from "react";
import styles from "./AppCard.module.css";

interface Props {
  children: ReactNode;
  avatar?: () => ReactNode;
  header?: () => ReactNode;
  subHeader?: () => ReactNode;
}

export const AppCard: FunctionComponent<Props> = ({ children, avatar, header, subHeader }) => {
  return <section className={styles.container}>
    {!!avatar && <div>
      {avatar()}
    </div>}
    <div className={styles.content}>
      {(!!header || !!subHeader) &&
        <div className={styles.header}>
          {!!header && header()}
          {!!subHeader && subHeader()}
        </div>}
      {children}
    </div>
  </section>
}

export const AppCardAvatar: FunctionComponent<Props & { width?: number, height?: number }> =
  ({ children, width, height }) => {
    return <div className={styles.avatar} style={{ width, height }}>
      {children}
    </div>
  }
