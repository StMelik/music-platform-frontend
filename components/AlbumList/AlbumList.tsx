import React from 'react'
import styles from './AlbumList.module.scss'
import AlbumItem from '../AlbumItem/AlbumItem'
import { IAlbum } from '../../types/album'

interface AlbumListProps {
    albums: IAlbum[]
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {

    return (
        <ul className={styles.list}>
            {albums.map(album =>
                <AlbumItem
                    key={album._id}
                    album={album}
                />
            )}
            <AlbumItem album={"create"} />
        </ul>
    )
}

export default AlbumList
