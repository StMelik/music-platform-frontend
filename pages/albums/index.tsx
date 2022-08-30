import AlbumList from "../../components/AlbumList/AlbumList"
import MainLayout from "../../layouts/MainLayout"
import { IAlbum } from "../../types/album"
import styles from '../../styles/Albums.module.scss'
import Button from "../../components/Button/Button"

const albums: IAlbum[] = [
    {
        _id: '12asd2a',
        name: 'Любимые',
        author: 'Анастасия',
        picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
        tracks: [
            {
                _id: 'sasd546asd',
                name: 'Saga Name',
                artist: 'Fort',
                text: '',
                listens: 10,
                picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
                audio: '',
                comments: []
            },
            {
                _id: 'sasd546asd',
                name: 'Saga Name',
                artist: 'Fort',
                text: '',
                listens: 10,
                picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
                audio: '',
                comments: []
            },
            {
                _id: 'sasd546asd',
                name: 'Saga Name',
                artist: 'Fort',
                text: '',
                listens: 10,
                picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
                audio: '',
                comments: []
            }
        ]
    },
    {
        _id: '12aasd12sd2a',
        name: 'Новые',
        author: 'Анастасия',
        picture: 'https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg',
        tracks: [
            {
                _id: 'sasd546asd',
                name: 'Saga Name',
                artist: 'Fort',
                text: '',
                listens: 10,
                picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
                audio: '',
                comments: []
            },
            {
                _id: 'sasd546asd',
                name: 'Saga Name',
                artist: 'Fort',
                text: '',
                listens: 10,
                picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
                audio: '',
                comments: []
            },
            {
                _id: 'sasd546asd',
                name: 'Saga Name',
                artist: 'Fort',
                text: '',
                listens: 10,
                picture: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
                audio: '',
                comments: []
            }
        ]
    },
]

const Albums = () => {
    return (
        <MainLayout>
            <h1 className={styles.title}>Список альбомов</h1>
            <AlbumList
                albums={albums}
            />
        </MainLayout>
    )
}

export default Albums