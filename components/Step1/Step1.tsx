import React from 'react'
import styles from './Step1.module.scss'

interface Step1Props {
    onNext: React.MouseEventHandler<HTMLButtonElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    value: {
        name: string,
        artist: string,
        text: string,
    },
}

const Step1: React.FC<Step1Props> = ({ onNext, value, onChange }) => {
    return (
        <form
            className={styles.form}
            onSubmit={e => e.preventDefault()}
        >
            <input
                type="text"
                placeholder="Введите название трека"
                name="name"
                value={value.name}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Введите имя автора"
                name="artist"
                value={value.artist}
                onChange={onChange}
            />
            <textarea
                name="text"
                placeholder="Введите текст песни"
                value={value.text}
                onChange={onChange}
            />
            {value.name && value.artist &&
                <button
                    type="button"
                    onClick={onNext}
                >
                    Далее
                </button>
            }
        </form>
    )
}

export default Step1
