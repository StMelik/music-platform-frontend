import { useRouter } from 'next/router';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { ITrack } from '../../types/track';
import { addTrackAlbum, deleteTrackAlbum } from '../../utils/api';
import { SERVER_URL } from '../../utils/const';
import styles from './PopupTrackItem.module.scss'

interface PopupTrackItemProps {
    track: ITrack,
    isActive: boolean
}

const PopupTrackItem = ({ track, isActive }: PopupTrackItemProps) => {
    const itemCl = [styles.item, styles.done]
    const router = useRouter()
    const { addTrackAlbumAction, deleteTrackAlbumAction } = useActions()

    function handleClickButton() {
        const albumId = String(router.query.id)
        const trackId = track._id

        if (isActive) {
            deleteTrackAlbum(albumId, trackId)
                .then(() => deleteTrackAlbumAction(trackId))
                .catch(console.log)
        } else {
            addTrackAlbum(albumId, trackId)
                .then(() => addTrackAlbumAction(track))
                .catch(console.log)
        }
    }

    return (
        <li className={isActive ? itemCl.join(' ') : itemCl[0]}>
            <img src={SERVER_URL + track.picture} alt={track.name} />
            <div className="info">
                <p className="name">{track.name}</p>
                <p className="artist">{track.artist}</p>
            </div>
            <button
                onClick={handleClickButton}
            />
        </li>
    )
}

export default PopupTrackItem;