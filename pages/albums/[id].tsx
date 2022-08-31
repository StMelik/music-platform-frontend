import React, { useState } from 'react'

// import Link from 'next/link'
import styles from '../../styles/AlbumPage.module.scss'
import { useRouter } from '../../node_modules/next/router'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL } from '../../utils/const'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { formatTime } from '../../utils/formatTime'
import { IAlbum } from '../../types/album'
import MainLayout from '../../layouts/MainLayout'
import TrackList from '../../components/TrackList/TrackList'
import Button from '../../components/Button/Button'
import { deleteAlbum, getAlbum } from '../../utils/api'
import PopupTrackList from '../../components/PopupTrackList/PopupTrackList'
import { GetServerSideProps } from 'next'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchTracksAction } from '../../store/actions-creators/track'
import { getAlbumAction } from '../../store/actions-creators/album'

const AlbumPage = () => {
    const router = useRouter()

    const [isOpenList, setOpenList] = useState(false)

    const { currentALbum } = useTypedSelector(store => store.album)
    const { tracks } = useTypedSelector(store => store.track)

    function handleDeleteAlbum() {
        const id = String(router.query.id)
        deleteAlbum(id)
            .then(() => router.push('/albums'))
            .catch(console.log)
    }

    function openTrackList() {
        setOpenList(true)
    }

    function closeTrackList() {
        setOpenList(false)
    }

    return (
        <MainLayout>
            <Button
                text='К списку'
                onClick={() => router.push('/albums')}
            />
            <div className={styles.top}>
                <img src={SERVER_URL + currentALbum?.picture} alt={currentALbum?.name} />
                <div className={styles.info}>
                    <p className="name">Альбом - {currentALbum?.name}</p>
                    <p className="author">Автор - {currentALbum?.author}</p>
                    <p className="tracks">Треков: {currentALbum?.tracks.length}</p>
                    <Button
                        text="Удалить альбом"
                        onClick={handleDeleteAlbum}
                    />
                </div>
            </div>
            <div className={styles.listTop}>
                <h3>Список треков</h3>
                <Button
                    text='Добавить трек'
                    onClick={openTrackList}
                />
                {isOpenList &&
                    <PopupTrackList
                        tracks={tracks}
                        onClose={closeTrackList}
                    />
                }
            </div>

            <TrackList
                tracks={currentALbum?.tracks}
            />

        </MainLayout>

    )
}

export default AlbumPage

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const album = await getAlbum(String(params.id))

//     return {
//         props: {
//             serverAlbum: album
//         }
//     }
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    const dispatch = store.dispatch as NextThunkDispatch
    const hasTracks = store.getState().track.tracks.length > 0

    // const album = await getAlbum(String(params.id))

    await dispatch(getAlbumAction(String(params.id)))

    if (!hasTracks) {
        await dispatch(fetchTracksAction())
    }

    return {
        props: {
            // serverAlbum: album
        }
    }
})
