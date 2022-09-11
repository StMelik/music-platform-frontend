import MainLayout from "../../layouts/MainLayout";
import styles from '../../styles/tracks.module.scss'
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList/TrackList";
import Button from "../../components/Button/Button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store/index";

import { useDispatch } from 'react-redux'

import { fetchTracksAction, searchTracksAction } from "../../store/actions-creators/track";
import React, { useEffect, useRef, useState } from "react";

import Popup from '../../components/Popup/Popup'
import { useActions } from "../../hooks/useActions";

function Index() {
    const router = useRouter()
    const dispatch = useDispatch() as NextThunkDispatch

    const [query, setQuery] = useState<string>('')

    const observer = useRef(null)
    const timer = useRef(null)
    const page = useRef<number>(1)
    const target = useRef()

    const { fetchMoreTracksAction, fetchTracksAction, closeDeletePopupAction, deleteTrackAction } = useActions()
    const { tracks, error, deletePopupOpened, trackId, total } = useTypedSelector(store => store.track)


    // Блокировка скролла при открытии попапа
    useEffect(() => {
        document.body.style.overflowY = deletePopupOpened ? "hidden" : ""
        document.body.style.paddingRight = deletePopupOpened ? "16px" : "0"
    }, [deletePopupOpened])

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

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        )
    }

    return (
        <>
            <MainLayout
                title="Список треков - Музыкальная площадка"
            >
                <div className={styles.top}>
                    <h3 className={styles.title}>Список треков</h3>
                    <Button
                        text="Загрузить"
                        onClick={() => router.push('/tracks/create')}
                    />
                </div>
                <label className={styles.search}>
                    <p>Поиск:</p>
                    <input type="text"
                        value={query}
                        onInput={search}
                    />
                </label>
                <TrackList tracks={tracks} />
                <div className={styles.target} ref={target} />
            </MainLayout>
            <Popup
                opened={deletePopupOpened}
                textButton="Удалить"
                title="Вы уверены?"
                onClose={closeDeletePopupAction}
                onConfirm={() => deleteTrackAction(trackId)}
            >
            </Popup>
        </>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracksAction())

    return { props: {} }
})

