import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useObserver } from '../../hooks/useObserver';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch } from '../../store';
import { searchTracksAction } from '../../store/actions-creators/track';
import { ITrack } from '../../types/track';
import PopupTrackItem from '../PopupTrackItem/PopupTrackItem';
import styles from './PopupTrackList.module.scss'

interface PopupTrackListProps {
    onClose: Function,
    tracks: ITrack[],
}

const PopupTrackList: React.FC<PopupTrackListProps> = ({ onClose, tracks }) => {
    const dispatch = useDispatch() as NextThunkDispatch
    const [query, setQuery] = useState<string>('')
    const { currentALbum } = useTypedSelector(store => store.album)
    const { fetchTracksAction } = useActions()
    const timer = useRef(null)
    const target = useRef()

    useObserver(target, query)

    async function search(e: React.ChangeEvent<HTMLInputElement>) {
        const query: string = e.target.value

        if (query) {
            setQuery(query)
        }
        else {
            await fetchTracksAction()
            setQuery(query)
        }

        if (timer.current) clearTimeout(timer.current)

        timer.current = setTimeout(async () => {
            if (query) await dispatch(await searchTracksAction(query))
        }, 500)
    }

    async function handleClosePopup() {
        await onClose()
    }

    return (
        <div className={styles.tracks}>
            <button
                onClick={handleClosePopup}
            />
            <input type="text"
                placeholder='Поиск'
                value={query}
                onInput={search}
            />
            <ul className={styles.list}>
                {tracks?.map(track =>
                    <PopupTrackItem
                        key={track._id}
                        track={track}
                        isActive={currentALbum?.tracks.map(t => t._id).includes(track._id)}
                    />
                )}
                <div ref={target} />
            </ul>
        </div>

    )
}

export default PopupTrackList;
