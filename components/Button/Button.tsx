import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    text: string,
    onClick?: Function
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button