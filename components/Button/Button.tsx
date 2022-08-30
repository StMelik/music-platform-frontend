import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    text: string,
    onClick?: Function
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
    const buttonCl = [styles.button, styles.disabled]

    function handleClickButton() {
        onClick && onClick()
    }

    return (
        <button
            className={disabled ? buttonCl.join(' ') : buttonCl[0]}
            onClick={handleClickButton}
            disabled={disabled}
            type="button"
        >
            {text}
        </button>
    )
}

export default Button