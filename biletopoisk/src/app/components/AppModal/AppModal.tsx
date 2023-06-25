import { FunctionComponent, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import styles from './AppModal.module.css'
import Image from "next/image";
import classNames from "classnames";

interface Props {
  header: string;
  text: string;
  onClose: (status: 'ok' | 'cancel') => void;
}

export const AppModal: FunctionComponent<Props> = ({ header, text, onClose }) => {
  const handleCancel = useCallback(() => {
    onClose('cancel');
  }, [onClose]);
  const handleOk = useCallback(() => {
    onClose('ok');
  }, [onClose]);

  return <>
    {createPortal(<>
      <div className={classNames([styles.fallBack, styles.container])} onClick={handleCancel}>
      </div>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <span>{header}</span>
            <button onClick={handleCancel} className="btn-icon">
              <Image src="cross.svg" width={16} height={16} alt="Закрыть"></Image>
            </button>
          </div>
          <p>
            {text}
          </p>
          <div>
            <button className="btn-primary" onClick={handleOk}>
              Да
            </button>
            <button className="btn-outline" onClick={handleCancel}>
              Нет
            </button>
          </div>
        </div>
      </div>
    </>, document.getElementById('modal-portal')!)
    }
  </>
}