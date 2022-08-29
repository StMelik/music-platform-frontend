import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { addListens } from '../../utils/api'
import { SERVER_URL } from '../../utils/const'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeBar from '../VolumeBar/VolumeBar'

import styles from './Player.module.scss'

let audio = null;

const Player = () => {
    const { isPause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { tracks } = useTypedSelector(state => state.track)
    const { pauseTrackAction, playTrackAction, setVolumeAction, setCurrentTimeAction, setDurationAction, setActiveTrackAction } = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()

        } else {
            setAudio()
            handlePlayTrack()
            audio.addEventListener('ended', endedTrack)
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
                const currentTimeTrack = Math.ceil(audio.currentTime)
                setCurrentTimeAction(currentTimeTrack)
            }
        }
    }

    function endedTrack() {
        addListens(active._id)
        playNextTrack()
        audio.removeEventListener('ended', endedTrack)
    }

    function playNextTrack() {
        const currentIndex = tracks.indexOf(active)
        const nextTrack = tracks[currentIndex + 1]

        !!nextTrack ? setActiveTrackAction(nextTrack) : pauseTrackAction()
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