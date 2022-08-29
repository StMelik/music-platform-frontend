import MainLayout from "../../layouts/MainLayout";
import styles from '../../styles/tracks.module.scss'
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList/TrackList";
import Button from "../../components/Button/Button";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store/index";

import { useDispatch } from 'react-redux'

import { fetchTracksAction, searchTracksAction } from "../../store/actions-creators/track";
import React, { useEffect, useState } from "react";

import Popup from '../../components/Popup/Popup'
import { useActions } from "../../hooks/useActions";

function Index() {
    const router = useRouter()

    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState(null)


    const { tracks, error, deletePopupOpened, trackId } = useTypedSelector(store => store.track)

    const { closeDeletePopupAction, deleteTrackAction } = useActions()

    const dispatch = useDispatch() as NextThunkDispatch

    useEffect(() => {
        document.body.style.overflowY = deletePopupOpened ? "hidden" : ""
        document.body.style.paddingRight = deletePopupOpened ? "16px" : "0"
    }, [deletePopupOpened])

    async function search(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracksAction(e.target.value))
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
                <input type="text"
                    value={query}
                    onInput={search}
                />
                <TrackList tracks={tracks} />
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

export const getServerSideProps = wrapper.getServerSideProps((context) => async () => {
    // console.log('context =>', context);
    const dispatch = context.dispatch as NextThunkDispatch
    await dispatch(await fetchTracksAction())
})

