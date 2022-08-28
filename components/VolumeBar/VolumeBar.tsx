import React, { useRef } from 'react'

// import Link from 'next/link'
import styles from './VolumeBar.module.scss'

interface VolumeBarProps {
    nowVolume: number,
    onChange: Function,
}

const VolumeBar: React.FC<VolumeBarProps> = ({ nowVolume, onChange }) => {
    const active = false

    return (
        <div className={styles.volumeBar}>
            <div className={styles.icon}></div>
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