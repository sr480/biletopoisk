"use client";

import classNames from "classnames";
import { FunctionComponent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from './AppSelect.module.css';

export interface AppSelectOption {
  value?: string;
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
  const [dropDownDimensions, setDropDownDimensions] = useState({ left: 0, top: 0, width: 0 });
  const inputRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateDropDownPosition = () => {
      if (inputRef && inputRef.current) {
        const dims = inputRef.current.getBoundingClientRect();
        setDropDownDimensions({
          left: dims.left + inputRef.current!.clientLeft,
          width: dims.right - dims.left,
          top: dims.bottom + 4,
        });
      }
    }
    updateDropDownPosition();
    document.addEventListener('scroll', updateDropDownPosition);
    return () => {
      document.removeEventListener('scroll', updateDropDownPosition);
    };
  }, [expanded]);

  const handleOutside = useCallback(() => {
    setExpanded(false);
  }, []);

  const handleOptionSelect = useCallback((option: AppSelectOption) => {
    setSelected(option);
    setExpanded(false);
    onSelect(option.value);
  }, [onSelect]);
  return (
    <div className={classNames(styles.appSelect, { [styles.expanded]: expanded })} onClick={() => setExpanded(!expanded)} ref={inputRef}>
      {
        selected && selected.value !== undefined ?
          <span>{selected.name}</span> :
          !!placeholder && <span className={styles.placeholder}>{placeholder}</span>
      }
      <button className={classNames(styles.dropDownButton, { [styles.expanded]: expanded })} title="Развернуть"></button>
      {expanded && createPortal(<>
        <div className={styles.fallBack} onMouseDown={handleOutside}/>
        <div style={{ ...dropDownDimensions, position: 'fixed' }} ref={dropDownRef}>
          <ul className={classNames(styles.dropDown, { [styles.expanded]: expanded })}>
            {options.map((option) => (
              <li key={option.value || option.name} onClick={() => handleOptionSelect(option)}>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </>
        , document.getElementById('drop-down-portal')!)}
    </div>
  )
}