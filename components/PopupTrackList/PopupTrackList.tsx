import React, { ReactNode } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITrack } from '../../types/track';
import PopupTrackItem from '../PopupTrackItem/PopupTrackItem';
import styles from './PopupTrackList.module.scss'

interface PopupTrackListProps {
    onClose: Function,
    tracks: ITrack[],
}

const PopupTrackList = ({ onClose, tracks }: PopupTrackListProps) => {

    const { currentALbum } = useTypedSelector(store => store.album)

    function handleClosePopup() {
        onClose()
    }

    return (
        <ul className={styles.tracks}>
            <button
                onClick={handleClosePopup}
            />
            <input type="text"
                placeholder='Поиск'
            />

            {tracks?.map(track =>
                <PopupTrackItem
                    key={track._id}
                    track={track}
                    isActive={currentALbum.tracks.map(t => t._id).includes(track._id)}
                />
            )}
        </ul>
    )
}

export default PopupTrackList;
