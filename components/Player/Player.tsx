import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { SERVER_URL } from '../../utils/const'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeBar from '../VolumeBar/VolumeBar'

import styles from './Player.module.scss'

let audio = null;

const Player = () => {
    const { isPause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { pauseTrackAction, playTrackAction, setVolumeAction, setCurrentTimeAction, setDurationAction } = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            handlePlayTrack()
        }
    }, [active])

    useEffect(() => {
        if (audio.src) {
            isPause ? audio.pause() : audio.play()
        }
    }, [isPause])

    function setAudio() {
        if (active) {
            audio.src = null
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

    function handlePlayTrack() {
        isPause ? playTrackAction() : pauseTrackAction()
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

    if (!active) return null

    return (
        <div className={styles.player}>
            <button
                className={`${styles.button} ${isPause ? styles.play : styles.pause}`}
                onClick={handlePlayTrack}
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