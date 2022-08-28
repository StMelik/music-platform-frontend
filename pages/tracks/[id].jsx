import React, { useState } from 'react'

// import Link from 'next/link'
import styles from '../../styles/trackPage.module.scss'
import MainLayout from "../../layouts/MainLayout";
// import { ITrack } from '../../types/track'
import { useRouter } from '../../node_modules/next/router'
import Button from "../../components/Button/Button";
import { SERVER_URL } from '../../utils/const';
import axios from 'axios'
import { useInput } from '../../hooks/useInput'


// interface TrackItemProps {
//     track: ITrack,
//     active?: boolean,
// }

const TrackPage = ({ serverTrack }) => {
    const [track, setTrack] = useState(serverTrack)
    const router = useRouter()

    const username = useInput('')
    const text = useInput('')

    async function addComment() {
        try {
            const response = await axios.post(SERVER_URL + 'tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({ ...track, comments: [...track.comments, response.data] })

        } catch (e) {
            console.log(e);
        }

    }

    return (
        <MainLayout
            title={`Музыкальная площадка - ${track.name} - ${track.artist}`}
        >
            <div>
                <Button
                    text="К списку"
                    onClick={() => router.push('/tracks')}
                />
                <div className={styles.info}>
                    <img
                        className={styles.picture}
                        src={SERVER_URL + track.picture}
                        alt=""
                    />
                    <div className={styles.trackInfo}>
                        <p className={styles.artist}>Исполнитель - {track.artist}</p>
                        <p className={styles.track}>Название трека - {track.name}</p>
                        <p className={styles.listens}>Прослушиваний: {track.listens}</p>
                    </div>
                </div>
                <div className={styles.text}>
                    <p className={styles.textTitle}>Слова песни</p>
                    <p className={styles.textParaghaph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi maiores expedita tempora in blanditiis officiis dolorum cupiditate, sequi vitae culpa quas consequatur provident, error dolores aut eligendi nam ipsum. Fugit!</p>
                </div>

                <div className={styles.comments}>
                    <p className={styles.textTitle}>Комментарии</p>
                    <form className={styles.commentForm}>
                        <input
                            className={styles.commentInput}
                            type="text"
                            placeholder='Ваше имя'
                            {...username}
                        />
                        <textarea
                            className={`${styles.commentInput} ${styles.commentArea}`}
                            type="text"
                            placeholder='Ваш комментарий'
                            {...text}
                        />
                        <button
                            className={styles.commentButton}
                            type="button"
                            onClick={addComment}
                        >Отправить</button>
                    </form>

                    <ul className={styles.commentList}>
                        {track.comments.map(({ username, text }, i) =>
                            <li
                                key={i}
                                className={styles.commentItem}
                            >
                                <p className={styles.commentName}>{username}</p>
                                <p className={styles.commentText}>{text}</p>
                            </li>
                        )}
                    </ul>
                </div>


            </div>
        </MainLayout>

    )
}

export default TrackPage

export const getServerSideProps = async ({ params }) => {
    const response = await axios.get(SERVER_URL + 'tracks/' + params.id)

    return {
        props: {
            serverTrack: response.data
        }
    }
}