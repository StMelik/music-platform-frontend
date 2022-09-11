import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { addListens } from '../../utils/api'
import { SERVER_URL } from '../../utils/const'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeBar from '../VolumeBar/VolumeBar'

import styles from './Player.module.scss'

const Player = () => {
    const { isPause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const pl = useTypedSelector(state => state.player)
    const { tracks } = useTypedSelector(state => state.track)
    const { pauseTrackAction, playTrackAction, setVolumeAction, setCurrentTimeAction, setDurationAction, setActiveTrackAction } = useActions()

    const audioPlayer = useRef(null)



    useEffect(() => {
        if (active) {
            setActiveTrackAction(null)
        }
    }, [])

    useEffect(() => {

        if (audioPlayer.current && active) {
            audioPlayer.current.src = SERVER_URL + active.audio
            audioPlayer.current.volume = volume / 100
            audioPlayer.current.onloadedmetadata = () => {
                setDurationAction(Math.ceil(audioPlayer.current?.duration))
            }
            audioPlayer.current.ontimeupdate = () => {
                setCurrentTimeAction(Math.ceil(audioPlayer.current?.currentTime))
            }

            handlePlayTrack()
            audioPlayer.current.addEventListener('ended', endedTrack) // Не удалять
        }
    }, [active])

    // Управление паузой
    useEffect(() => {
        if (audioPlayer.current?.src) {
            isPause ? audioPlayer.current.pause() : audioPlayer.current.play()
        }
    }, [isPause])

    function setAudio(active) {
        if (active) {
            audioPlayer.current.src = null
            audioPlayer.current.src = SERVER_URL + active.audio
            audioPlayer.current.volume = volume / 100
            audioPlayer.current.onloadedmetadata = () => {
                setDurationAction(Math.ceil(audioPlayer.current.duration))
            }
            audioPlayer.current.ontimeupdate = () => {
                const currentTimeTrack = Math.ceil(audioPlayer.current.currentTime)
                setCurrentTimeAction(currentTimeTrack)
            }
        }
    }

    function endedTrack() {
        addListens(active._id)
        playNextTrack()
        audioPlayer.current.removeEventListener('ended', endedTrack)
    }

    function playNextTrack() {
        const currentIndex = tracks.indexOf(active)
        const nextTrack = tracks[currentIndex + 1]

        !!nextTrack ? setActiveTrackAction(nextTrack) : setActiveTrackAction(null)
    }

    function handlePlayTrack() {
        isPause ? playTrackAction() : pauseTrackAction()
    }

    function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
        const volume = +e.target.value
        audioPlayer.current.volume = volume / 100
        setVolumeAction(volume)
    }

    function changeCurrentTime(e: React.ChangeEvent<HTMLInputElement>) {
        const currentTime = +e.target.value
        audioPlayer.current.currentTime = currentTime
        setCurrentTimeAction(currentTime)
    }

    if (!active) return null

    return (
        <div className={styles.player}>
            <audio ref={audioPlayer} />
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