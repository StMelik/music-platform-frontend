import React, { Dispatch } from 'react'
import styles from './StepWrapper.module.scss'

interface TrackItemProps {
    activeStep: number,
    children: React.ReactNode,
    setActiveStep: Dispatch<number>,
}

const StepWrapper: React.FC<TrackItemProps> = ({ activeStep, setActiveStep, children }) => {
    const steps = ['1', '2', '3']

    function getClass(i: number) {
        if (i < activeStep) {
            return `${styles.step} ${styles.stepDone}`
        } else if (i === activeStep) {
            return `${styles.step} ${styles.stepActive}`
        } else if (i > activeStep) {
            return styles.step
        }
    }

    return (
        <>
            <div className={styles.steps}>
                {steps.map((step, i) =>
                    <button
                        key={i}
                        className={getClass(i)}
                        onClick={() => setActiveStep(i)}
                        disabled={i > activeStep}
                    >
                        {step}
                    </button>
                )}
            </div>
            <div className="content">
                {children}
            </div>
        </>
    )
}

export default StepWrapper
