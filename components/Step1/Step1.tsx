import styles from './Step1.module.scss'

function Step1({ onNext, value, onChange }) {
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
                >Далее</button>
            }
        </form>
    )
}

export default Step1