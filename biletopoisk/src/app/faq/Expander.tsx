"use client"

import { FunctionComponent, useState } from "react";
import styles from "./Expander.module.css";
import { AppCard } from "../components/AppCard/AppCard";
import Image from "next/image";

interface Props {
  title: string;
  content: string;
}
export const Expander: FunctionComponent<Props> = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  return <AppCard
    header={() => <h3 className={styles.header}>{title}</h3>}
    subHeader={() => <button className="btn-icon" onClick={() => setExpanded(!expanded)} >
      <Image className={expanded ? styles.expanded : styles.collapsed}
        src="expander.svg" width={32} height={32} alt="Развернуть"
      />
    </button>}
  >
    <p className={expanded ? styles.expanded : styles.collapsed}>
      {content}
    </p>
  </AppCard>
}