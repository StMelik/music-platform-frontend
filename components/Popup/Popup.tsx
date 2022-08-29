import React, { ReactNode } from 'react';
import styles from './Popup.module.scss'

interface PopupProps {
    opened: boolean,
    textButton: string,
    title: string,
    onClose: Function,
    onConfirm: Function,
    children: ReactNode,
}

const Popup: React.FC<PopupProps> = ({ opened, title, textButton, onClose, onConfirm }) => {

    function handleConfirm(e) {
        e.stopPropagation()
        onConfirm()
        onClose()
    }

    function handleClose(e) {
        e.stopPropagation()
        onClose()
    }

    return (
        <>
            {opened &&
                <div
                    className={styles.popup}
                    onClick={handleClose}
                >
                    <div className={styles.popupContent}>
                        <button
                            onClick={handleClose}
                            className={styles.deleteButton}
                        ></button>
                        <h1 className={styles.title}>{title}</h1>
                        <button
                            className={styles.confirmButton}
                            onClick={handleConfirm}
                        >{textButton}</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Popup;