import React from 'react'

// import Link from 'next/link'
import styles from './trackitem.module.scss'
import { ITrack } from '../../types/track'
import { useRouter } from '../../node_modules/next/router'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL } from '../../utils/const'

interface TrackItemProps {
    track: ITrack,
    active?: boolean,
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { pauseTrackAction, playTrackAction, setActiveTrackAction, openDeletePopupAction } = useActions()

    function handleDeleteTrack(e) {
        e.stopPropagation()
        console.log(track._id);
        openDeletePopupAction(track._id)
    }

    function play(e) {
        e.stopPropagation()
        setActiveTrackAction(track)
        playTrackAction()
    }

    return (
        <li className={styles.item} onClick={() => router.push('/tracks/' + track._id)}>
            <button
                className={`${styles.button} ${active ? styles.pause : styles.play}`}
                onClick={play}
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
                {active &&
                    <div className={styles.time}>02:42/03:34</div>
                }
            </div>
        </li >
    )
}

export default TrackItem