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

let observer

function Index() {
    const router = useRouter()

    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState(null)

    const target = useRef()

    const { fetchMoreTracksAction, fetchTracksAction } = useActions()

    const { tracks, error, deletePopupOpened, trackId, total } = useTypedSelector(store => store.track)

    const { closeDeletePopupAction, deleteTrackAction } = useActions()

    const dispatch = useDispatch() as NextThunkDispatch

    // Блокировка скролла при открытии попапа
    useEffect(() => {
        document.body.style.overflowY = deletePopupOpened ? "hidden" : ""
        document.body.style.paddingRight = deletePopupOpened ? "16px" : "0"
    }, [deletePopupOpened])

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
    }, [query])

    async function search(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                if (query) {
                    await dispatch(await searchTracksAction(e.target.value))
                }
            }, 500)
        )
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

