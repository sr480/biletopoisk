"use client";

import { FunctionComponent, useEffect, useState } from "react";
import styles from './AppSelect.module.css';
import classNames from "classnames";

export interface AppSelectOption {
  value: string;
  name: string;
}

interface Props {
  options: AppSelectOption[];
  placeholder?: string;
  onSelect: (value: string | undefined) => void;
}

export const AppSelect: FunctionComponent<Props> = ({ options, placeholder, onSelect }) => {
  const [selected, setSelected] = useState<AppSelectOption | undefined>(undefined);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expanded) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  const handleOptionSelect = (option: AppSelectOption) => {
    setSelected(option);
    setExpanded(false);
    onSelect(option.value);
  };
  return (
    <div className={classNames(styles.appSelect, { [styles.expanded]: expanded })} onClick={() => setExpanded(!expanded)}>
      {
        selected ?
          <span>{selected.name}</span> :
          !!placeholder && <span className={styles.placeholder}>{placeholder}</span>
      }
      <button className={classNames(styles.dropDownButton, { [styles.expanded]: expanded })} title="Развернуть"></button>
      <ul className={classNames(styles.dropDown, { [styles.expanded]: expanded })}>
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionSelect(option)}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}