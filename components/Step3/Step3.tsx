import { Dispatch } from "react";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import styles from './Step3.module.scss'

interface Step3Props {
    onNext: React.MouseEventHandler<HTMLButtonElement>,
    setAudio: Dispatch<File>,
    audio: Blob,
    buttonText: string,
}

const Step3: React.FC<Step3Props> = ({ audio, setAudio, onNext, buttonText }) => {
    return (
        <div className={styles.step3}>
            <FileUpload
                setFile={setAudio}
                accept='audio/*'
            >
                <Button text={audio ? "Загрузить другую" : "Загрузить аудио"} />
            </FileUpload>
            {audio &&
                <button
                    className={styles.button}
                    type="button"
                    onClick={onNext}
                >
                    {buttonText}
                </button>
            }
        </div>
    )
}

export default Step3
