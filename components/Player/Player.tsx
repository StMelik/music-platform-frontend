import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { SERVER_URL } from '../../utils/const'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeBar from '../VolumeBar/VolumeBar'

// import Link from 'next/link'
import styles from './Player.module.scss'

let audio;

const Player = () => {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { pauseTrackAction, playTrackAction, setVolumeAction, setCurrentTimeAction, setDurationAction } = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    function setAudio() {
        if (active) {
            audio.src = SERVER_URL + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDurationAction(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTimeAction(Math.ceil(audio.currentTime))
            }
        }
    }

    function play() {
        if (pause) {
            playTrackAction()
            audio.play()
        } else {
            pauseTrackAction()
            audio.pause()
        }
    }

    function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
        const volume = +e.target.value
        audio.volume = volume / 100
        setVolumeAction(volume)
    }

    function changeCurrentTime(e: React.ChangeEvent<HTMLInputElement>) {
        const currentTime = +e.target.value
        audio.currentTime = currentTime
        setCurrentTimeAction(currentTime)
    }

    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <button
                className={`${styles.button} ${pause ? styles.play : styles.pause}`}
                onClick={play}
            />
            <div className={styles.info}>
                <p className={styles.infoName}>{active.name}</p>
                <p className={styles.infoArtist}>{active.artist}</p>
            </div>
            <ProgressBar
                nowTime={currentTime}
                totalTime={duration}
                onChange={changeCurrentTime}
            />
            <VolumeBar
                nowVolume={volume}
                onChange={changeVolume}
            />
        </div>
    )
}

export default Player