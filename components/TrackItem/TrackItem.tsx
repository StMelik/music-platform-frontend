import React from 'react'
import styles from './trackitem.module.scss'
import { ITrack } from '../../types/track'
import { useRouter } from '../../node_modules/next/router'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL } from '../../utils/const'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { formatTime } from '../../utils/formatTime'
import { usePage } from '../../hooks/usePage'

interface TrackItemProps {
    track: ITrack,
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter()
    const { pauseTrackAction, playTrackAction, setActiveTrackAction, openDeletePopupAction } = useActions()
    const { isPause, active, duration, currentTime } = useTypedSelector(state => state.player)

    const isTrack: boolean = active?._id === track._id
    const isPlay: boolean = isTrack && !isPause
    const isAlbum: boolean = usePage('albums')

    function handleDeleteTrack(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        openDeletePopupAction(track._id)
    }

    function handlePlayTrack(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()

        if (active && isTrack) {
            isPause ? playTrackAction() : pauseTrackAction()
        } else {
            setActiveTrackAction(track)
        }
    }

    return (
        <li
            className={`${styles.item} ${isPlay ? styles.activeItem : ""}`}
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
                {!isAlbum &&
                    <button
                        className={styles.buttonDelete}
                        onClick={handleDeleteTrack}
                    />
                }

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
