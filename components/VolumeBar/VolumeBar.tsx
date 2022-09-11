import React from 'react'
import styles from './VolumeBar.module.scss'

interface VolumeBarProps {
    nowVolume: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
}

const VolumeBar: React.FC<VolumeBarProps> = ({ nowVolume, onChange }) => {
    return (
        <div className={styles.volumeBar}>
            <div className={styles.icon} />
            <input
                className={styles.range}
                type="range"
                min={0}
                max={100}
                value={nowVolume}
                onChange={onChange}
            />
            <p className={styles.progressTime}>
                {nowVolume} / 100
            </p>
        </div>
    )
}

export default VolumeBar
