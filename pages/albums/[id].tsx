import React from 'react'

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

const album: IAlbum = {
    _id: '12aasd12sd2a',
    name: 'Новые',
    author: 'Анастасия',
    picture: 'https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg',
    tracks: [
        {
            _id: 'saqdasd546asd',
            name: 'Saga Name',
            artist: 'Fort',
            text: '',
            listens: 10,
            picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
            audio: '',
            comments: []
        },
        {
            _id: 'sasdasd546asd',
            name: 'Saga Name',
            artist: 'Fort',
            text: '',
            listens: 10,
            picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
            audio: '',
            comments: []
        },
        {
            _id: 'sasd54as6asd',
            name: 'Saga Name',
            artist: 'Fort',
            text: '',
            listens: 10,
            picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
            audio: '',
            comments: []
        }
    ]
}

const AlbumPage = () => {
    const router = useRouter()

    return (
        <MainLayout>
            <Button
                text='К списку'
                onClick={() => router.push('/albums')}
            />
            <div className={styles.top}>
                <img src={album.picture} alt={album.name} />
                <div className={styles.info}>
                    <p className="name">Альбом - {album.name}</p>
                    <p className="author">Автор - {album.author}</p>
                    <p className="tracks">Треков: {album.tracks.length}</p>
                </div>
            </div>
            <h3 className={styles.subtitle}>Список треков</h3>
            <TrackList
                tracks={album.tracks}
            />
        </MainLayout>

    )
}

export default AlbumPage