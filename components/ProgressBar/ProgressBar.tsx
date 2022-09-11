import React from 'react'
import { formatTime } from '../../utils/formatTime'
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
    nowTime: number,
    totalTime: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
}

const ProgressBar: React.FC<ProgressBarProps> = ({ nowTime, totalTime, onChange }) => {
    return (
        <div className={styles.progressBar}>
            <input
                className={styles.range}
                type="range"
                min={0}
                max={totalTime}
                value={nowTime}
                onChange={onChange}
            />
            <p className={styles.progressTime}>
                {formatTime(nowTime)} / {formatTime(totalTime)}
            </p>
        </div>
    )
}

export default ProgressBar
