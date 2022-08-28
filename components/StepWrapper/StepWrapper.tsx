import React from 'react'

// import Link from 'next/link'
import styles from './StepWrapper.module.scss'

interface TrackItemProps {
    activeStep: number,
    children: any,
    setActiveStep: Function,
}

const StepWrapper: React.FC<TrackItemProps> = ({ activeStep, setActiveStep, children }) => {
    // const router = useRouter()
    const steps = ['1', '2', '3']


    function getClass(i) {
        const activeCl = `${styles.step} ${styles.stepActive}`
        const doneCl = `${styles.step} ${styles.stepDone}`

        if (i < activeStep) {
            return doneCl
        } else if (i === activeStep) {
            return activeCl
        } else if (i > activeStep) {
            return styles.step
        }
    }

    function handleNextStep() {
        setActiveStep(prev => prev + 1)
    }

    function handlePrevStep() {
        setActiveStep(prev => prev - 1)
    }

    return (
        <>
            <div className={styles.steps}>
                <button
                    className={styles.button}
                    onClick={handlePrevStep}
                    disabled={activeStep === 0}
                >Назад</button>
                {steps.map((step, i) =>
                    <li
                        key={i}
                        className={getClass(i)}
                    >{step}</li>
                )}
                <button
                    className={styles.button}
                    onClick={handleNextStep}
                    disabled={activeStep === steps.length - 1}
                >Далее</button>
            </div>
            <div className="content">
                {children}
            </div>
        </>

    )
}

export default StepWrapper