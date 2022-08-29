import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import styles from './Step3.module.scss'

function Step3({ audio, setAudio, onNext }) {
    const textButton = audio ? "Загрузить другую" : "Загрузить аудио"

    return (
        <div className={styles.step3}>
            <FileUpload
                setFile={setAudio}
                accept='audio/*'
            >
                <Button text={textButton} />
            </FileUpload>
            {audio &&
                <button
                    className={styles.button}
                    type="button"
                    onClick={onNext}
                >
                    Сохранить трек
                </button>
            }
        </div>
    )
}

export default Step3