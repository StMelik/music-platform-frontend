import React from 'react'

// import Link from 'next/link'
import styles from './AlbumItem.module.scss'
import { useRouter } from '../../node_modules/next/router'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL } from '../../utils/const'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { formatTime } from '../../utils/formatTime'
import { IAlbum } from '../../types/album'

interface AlbumItemProps {
    album: IAlbum | 'create',
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
    const router = useRouter()
    // const { pauseTrackAction, playTrackAction, setActiveTrackAction, openDeletePopupAction } = useActions()

    // const { isPause, active, duration, currentTime } = useTypedSelector(state => state.player)

    // const isTrack = active?._id === track._id
    // const isPlay = isTrack && !isPause

    // const itemCl = [styles.item, styles.activeItem]

    // function handleDeleteTrack(e) {
    //     e.stopPropagation()
    //     console.log(track._id);
    //     openDeletePopupAction(track._id)
    // }

    // function handlePlayTrack(e) {
    //     e.stopPropagation()

    //     if (active && isTrack) {
    //         isPause ? playTrackAction() : pauseTrackAction()
    //     } else {
    //         setActiveTrackAction(track)
    //     }
    // }

    const itemCl = [styles.album, styles.plus]

    if (album === 'create') {
        return (
            <li
                className={itemCl.join(' ')}
                onClick={() => router.push('/albums/create')}
            />
        )
    }

    return (
        <li
            className={styles.album}
            onClick={() => router.push(`/albums/${album._id}`)}
        >
            <img src={SERVER_URL + album.picture} alt={album.name} />
            <p className={styles.name}>{album.name}</p>
        </li >
    )
}

export default AlbumItem