import { useState } from "react";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import StepWrapper from "../../components/StepWrapper/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import styles from '../../styles/create.module.scss'
import axios from 'axios'
import { SERVER_URL } from "../../utils/const";
import { useRouter } from "../../node_modules/next/router";

function Create() {
    const [activeStep, setActiveStep] = useState(1)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const router = useRouter()

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    function handleNextStep() {
        if (activeStep < 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture)
            formData.append('audio', audio)

            axios.post(SERVER_URL + 'tracks', formData)
                .then(() => router.push('/tracks'))
                .catch(console.log)
        }
    }

    function handlePrevStep() {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout>
            <div>
                <h1 className={styles.title}>Загрузка нового трека</h1>
                <StepWrapper activeStep={activeStep} setActiveStep={setActiveStep}>
                    {activeStep === 0 &&
                        <form
                            className={styles.formTrack}
                            onSubmit={e => e.preventDefault()}
                        >
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Введите название трека"
                                {...name}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Введите имя автора"
                                {...artist}
                            />
                            <textarea
                                className={`${styles.input} ${styles.textarea}`}
                                name="text"
                                placeholder="Введите текст песни"
                                {...text}
                            />
                            {name.value && artist.value &&
                                <button
                                    className={styles.button}
                                    type="button"
                                    onClick={handleNextStep}
                                >
                                    Далее
                                </button>
                            }

                        </form>
                    }
                    {activeStep === 1 &&
                        <>
                            <FileUpload
                                setFile={setPicture}
                                accept='image/*'
                            >
                                <Button text='Загрузите обложку' />
                                <button>Загрузите обложку</button>
                            </FileUpload>
                            {picture &&
                                <button
                                    className={styles.button}
                                    type="button"
                                    onClick={handleNextStep}
                                >
                                    Далее
                                </button>
                            }
                        </>

                    }
                    {activeStep === 2 &&

                        <>
                            <FileUpload
                                setFile={setAudio}
                                accept='audio/*'
                            >
                                <Button text='Загрузите аудио' />
                            </FileUpload>
                            {audio &&
                                <button
                                    className={styles.button}
                                    type="button"
                                    onClick={handleNextStep}
                                >
                                    Сохранить трек
                                </button>
                            }

                        </>
                    }
                </StepWrapper>
            </div>
        </MainLayout>

    )
}

export default Create