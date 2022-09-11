import React from 'react'
import styles from './AlbumItem.module.scss'
import { useRouter } from '../../node_modules/next/router'
import { SERVER_URL } from '../../utils/const'
import { IAlbum } from '../../types/album'

interface AlbumItemProps {
    album: IAlbum | 'create',
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
    const router = useRouter()

    if (album === 'create') {
        return (
            <li
                className={`${styles.album} ${styles.plus}`}
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
