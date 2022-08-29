import React from 'react'

// import Link from 'next/link'
import styles from './trackitem.module.scss'
import { ITrack } from '../../types/track'
import { useRouter } from '../../node_modules/next/router'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL } from '../../utils/const'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { formatTime } from '../../utils/formatTime'

interface TrackItemProps {
    track: ITrack,
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter()
    const { pauseTrackAction, playTrackAction, setActiveTrackAction, openDeletePopupAction } = useActions()

    const { isPause, active, duration, currentTime } = useTypedSelector(state => state.player)

    const isTrack = active?._id === track._id
    const isPlay = isTrack && !isPause

    const itemCl = [styles.item, styles.activeItem]

    function handleDeleteTrack(e) {
        e.stopPropagation()
        console.log(track._id);
        openDeletePopupAction(track._id)
    }

    function handlePlayTrack(e) {
        e.stopPropagation()

        if (active && isTrack) {
            isPause ? playTrackAction() : pauseTrackAction()
        } else {
            setActiveTrackAction(track)
        }
    }

    return (
        <li
            className={isPlay ? itemCl.join(' ') : itemCl[0]}
            onClick={() => router.push('/tracks/' + track._id)}
        >
            <button
                className={`${styles.button} ${isPlay ? styles.pause : styles.play}`}
                onClick={handlePlayTrack}
            />
            <img
                className={styles.picture}
                src={SERVER_URL + track.picture}
            >
            </img>
            <div className={styles.info}>
                <p className={styles.infoName}>{track.name}</p>
                <p className={styles.infoArtist}>{track.artist}</p>
            </div>
            <div className={styles.control}>
                <button
                    className={styles.buttonDelete}
                    onClick={handleDeleteTrack}
                ></button>
                {isPlay &&
                    <div className={styles.time}>
                        {`${formatTime(currentTime)}/${formatTime(duration)}`}
                    </div>
                }
            </div>
        </li >
    )
}

export default TrackItem