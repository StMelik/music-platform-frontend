import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITrack } from '../../types/track';
import PopupTrackItem from '../PopupTrackItem/PopupTrackItem';
import styles from './PopupTrackList.module.scss'

interface PopupTrackListProps {
    onClose: Function,
    tracks: ITrack[],
}

let observer = null

const PopupTrackList = ({ onClose, tracks }: PopupTrackListProps) => {
    const [query, setQuery] = useState<string>('')
    const { currentALbum } = useTypedSelector(store => store.album)
    const { total } = useTypedSelector(store => store.track)

    const target = useRef()
    const { fetchMoreTracksAction, fetchTracksAction } = useActions()

    // Подгрузка треков при скролле к концу страницы
    useEffect(() => {
        let page: number = 1
        let length: number = tracks.length
        const countFetchTracks: number = 10

        const callback = entries => {
            if (entries[0].isIntersecting) {
                if (total > length) {

                    fetchMoreTracksAction(countFetchTracks, page * countFetchTracks)
                    page++
                    length += countFetchTracks

                }
            }
        }

        if (!observer) {
            observer = new IntersectionObserver(callback, { threshold: 1.0 });
        } else {
            observer.disconnect()
        }

        if (!query) {
            observer.observe(target.current)
        }
    }, [])

    function handleClosePopup() {
        onClose()
    }

    return (
        <div className={styles.tracks}>
            <button
                onClick={handleClosePopup}
            />
            <input type="text"
                placeholder='Поиск'
            />
            <ul className={styles.list}>
                {tracks?.map(track =>
                    <PopupTrackItem
                        key={track._id}
                        track={track}
                        isActive={currentALbum.tracks.map(t => t._id).includes(track._id)}
                    />
                )}
                <div ref={target} />
            </ul>
        </div>

    )
}

export default PopupTrackList;
