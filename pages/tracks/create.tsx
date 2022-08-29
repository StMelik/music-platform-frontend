import { useState } from "react";
import StepWrapper from "../../components/StepWrapper/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import styles from '../../styles/create.module.scss'
import { useRouter } from "../../node_modules/next/router";
import { addTrack } from "../../utils/api";
import Step1 from "../../components/Step1/Step1";
import Step2 from "../../components/Step2/Step2";
import Step3 from "../../components/Step3/Step3";

function Create() {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(0)
    const formValue = useInput({ name: '', artist: '', text: '' })


    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    function handleNextStep() {
        if (activeStep < 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const { name, artist, text } = formValue.value
            const formData = new FormData()
            formData.append('name', name)
            formData.append('artist', artist)
            formData.append('text', text)
            formData.append('picture', picture)
            formData.append('audio', audio)

            addTrack(formData)
                .then(() => router.push('/tracks'))
                .catch(console.log)
        }
    }

    return (
        <MainLayout>
            <div>
                <h1 className={styles.title}>Загрузка нового трека</h1>
                <StepWrapper activeStep={activeStep} setActiveStep={setActiveStep}>
                    {activeStep === 0 &&
                        <Step1
                            onNext={handleNextStep}
                            value={formValue.value}
                            onChange={formValue.onChange}
                        />
                    }
                    {activeStep === 1 &&
                        <Step2
                            picture={picture}
                            setPicture={setPicture}
                            onNext={handleNextStep}
                        />
                    }
                    {activeStep === 2 &&
                        <Step3
                            audio={audio}
                            setAudio={setAudio}
                            onNext={handleNextStep}
                        />
                    }
                </StepWrapper>
            </div>
        </MainLayout>

    )
}

export default Create