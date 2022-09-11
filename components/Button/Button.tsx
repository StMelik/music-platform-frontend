import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    text: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
    return (
        <button
            className={`${styles.button} ${disabled ? styles.disabled : ""}`}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {text}
        </button>
    )
}

export default Button
