import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ITrack } from '../../types/track'
import { addListens } from '../../utils/api'
import { SERVER_URL } from '../../utils/const'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeBar from '../VolumeBar/VolumeBar'
import styles from './Player.module.scss'

const Player = () => {
    const router = useRouter()
    const { isPause, volume, active, duration, currentTime, isOpen } = useTypedSelector(state => state.player)
    const { currentALbum } = useTypedSelector(state => state.album)
    const { tracks } = useTypedSelector(state => state.track)
    const { pauseTrackAction, playTrackAction, setVolumeAction, setCurrentTimeAction, setDurationAction, setActiveTrackAction, openPlayerAction, closePlayerAction } = useActions()
    const audioPlayer = useRef(null)

    useEffect(() => {
        if (active) setActiveTrackAction(null)
    }, [])

    useEffect(() => {
        if (audioPlayer.current && active) {
            setAudio()
            handlePlayTrack()
            audioPlayer.current.addEventListener('ended', endedTrack)
        }
    }, [active])

    useEffect(() => {
        if (audioPlayer.current?.src) {
            isPause ? audioPlayer.current.pause() : audioPlayer.current.play()
        }
    }, [isPause])

    function setAudio() {
        audioPlayer.current.src = SERVER_URL + active.audio
        audioPlayer.current.volume = volume / 100
        audioPlayer.current.onloadedmetadata = () => {
            setDurationAction(Math.ceil(audioPlayer.current?.duration))
        }
        audioPlayer.current.ontimeupdate = () => {
            setCurrentTimeAction(Math.ceil(audioPlayer.current?.currentTime))
        }
    }

    function endedTrack() {
        addListens(active._id)
        playNextTrack()
        audioPlayer.current.removeEventListener('ended', endedTrack)
    }

    function playNextTrack() {
        const isAlbum: boolean = router.pathname.includes('albums')
        const albumTracks: ITrack[] | null = currentALbum?.tracks
        let nextTrack: ITrack | null = null

        if (isAlbum) {
            const currentIndex: number = albumTracks.indexOf(active)
            nextTrack = albumTracks[currentIndex + 1]
        } else {
            const currentIndex: number = tracks.indexOf(active)
            nextTrack = tracks[currentIndex + 1]
        }

        !!nextTrack ? setActiveTrackAction(nextTrack) : setActiveTrackAction(null)
    }

    function handlePlayTrack() {
        isPause ? playTrackAction() : pauseTrackAction()
    }

    function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
        const volume: number = +e.target.value
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
        <div className={`${styles.player} ${isOpen ? "" : styles.playerHide}`}>
            <button
                className={`${styles.viewButton} ${styles.hideButton}`}
                onClick={closePlayerAction}
            />
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
            {!isOpen &&
                <button
                    className={`${styles.viewButton} ${styles.showButton}`}
                    onClick={openPlayerAction}
                />
            }
        </div>
    )
}

export default Player
