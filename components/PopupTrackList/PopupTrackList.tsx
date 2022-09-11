import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
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

const PopupTrackList = ({ onClose, tracks }: PopupTrackListProps) => {
    const [query, setQuery] = useState<string>('')
    const { currentALbum } = useTypedSelector(store => store.album)
    const { total } = useTypedSelector(store => store.track)


    const observer = useRef(null)
    const timer = useRef(null)
    const page = useRef<number>(1)
    const target = useRef()

    const { fetchMoreTracksAction, fetchTracksAction } = useActions()

    const dispatch = useDispatch() as NextThunkDispatch

    // Подгрузка треков при скролле к концу страницы
    useEffect(() => {
        if (observer.current && query) {
            observer.current.disconnect()
            observer.current = null
            page.current = 1
        } else if (!observer.current && !query) {
            observer.current = new IntersectionObserver(addTracks, { threshold: 1.0 });
            observer.current.observe(target.current)
        }
    }, [query])

    function addTracks(entries) {
        const count = 10 // Кол-во треков
        const isIntersecting = entries[0].isIntersecting

        if (isIntersecting && (page.current * count < total)) {
            fetchMoreTracksAction(count, page.current * count)
            page.current += 1
        }
    }

    async function search(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value

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
