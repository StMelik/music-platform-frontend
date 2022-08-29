import React from 'react'
import styles from './StepWrapper.module.scss'

interface TrackItemProps {
    activeStep: number,
    children: any,
    setActiveStep: Function,
}

const StepWrapper: React.FC<TrackItemProps> = ({ activeStep, setActiveStep, children }) => {
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

    return (
        <>
            <div className={styles.steps}>
                {steps.map((step, i) =>
                    <button
                        key={i}
                        className={getClass(i)}
                        onClick={() => setActiveStep(i)}
                        disabled={i > activeStep}
                    >{step}</button>
                )}
            </div>
            <div className="content">
                {children}
            </div>
        </>
    )
}

export default StepWrapper
