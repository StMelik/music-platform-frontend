import { Dispatch, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import styles from './Step2.module.scss'

interface Step2Props {
    onNext: React.MouseEventHandler<HTMLButtonElement>,
    setPicture: Dispatch<File>,
    picture: Blob
}

const Step2: React.FC<Step2Props> = ({ picture, setPicture, onNext }) => {
    const [srcImage, setSrcImage] = useState(null)

    useEffect(() => {
        if (picture) {
            const render = new FileReader()
            render.readAsDataURL(picture)
            render.onload = () => setSrcImage(render.result)
        }
    }, [picture])

    return (
        <div className={styles.step2}>
            <div className={styles.pictureStep}>
                <img src={srcImage} alt="Фото альбома" />
                <FileUpload
                    setFile={setPicture}
                    accept='image/*'
                >
                    <Button text={picture ? "Выбрать другую" : "Загрузить обложку"} />
                </FileUpload>
            </div>
            {
                picture &&
                <button
                    className={styles.button}
                    type="button"
                    onClick={onNext}
                >
                    Далее
                </button>
            }
        </div >
    )
}

export default Step2
