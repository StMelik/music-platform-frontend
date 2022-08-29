import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import styles from './Step2.module.scss'

function Step2({ picture, setPicture, onNext }) {
    const [srcImage, setSrcImage] = useState(null)
    const textButton = picture ? "Выбрать другую" : "Загрузить обложку"

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
                <img src={srcImage} alt={picture?.name} />
                <FileUpload
                    setFile={setPicture}
                    accept='image/*'
                >
                    <Button text={textButton} />
                </FileUpload>
            </div>
            {
                picture &&
                <button
                    className={styles.button}
                    type="button"
                    onClick={onNext}
                >Далее</button>
            }
        </div >
    )
}

export default Step2