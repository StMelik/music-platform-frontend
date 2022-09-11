import React, { useState } from 'react'
import styles from '../../styles/trackPage.module.scss'
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from '../../node_modules/next/router'
import Button from "../../components/Button/Button";
import { SERVER_URL } from '../../utils/const';
import { useInput } from '../../hooks/useInput'
import { getTrack, addComment } from '../../utils/api'
import { IComment, ITrack } from '../../types/track';

interface TrackPageProps {
    serverTrack: ITrack
}

interface IDefaultValue {
    username: string,
    text: string
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const defaulValue: IDefaultValue = { username: '', text: '' }
    const { value, onChange, setValue } = useInput(defaulValue)

    async function handleAddComment() {
        const commentData: IComment = {
            ...value,
            trackId: track._id
        }

        try {
            const comment: IComment = await addComment(commentData)
            setTrack({ ...track, comments: [...track.comments, comment] })
            setValue(defaulValue)
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
                    onClick={() => router.back()}
                />
                <div className={styles.info}>
                    <img
                        className={styles.picture}
                        src={SERVER_URL + track.picture}
                        alt="Фото трека"
                    />
                    <div className={styles.trackInfo}>
                        <p className={styles.artist}>Исполнитель - {track.artist}</p>
                        <p className={styles.track}>Название трека - {track.name}</p>
                        <p className={styles.listens}>Прослушиваний: {track.listens}</p>
                    </div>
                </div>
                <div className={styles.text}>
                    <p className={styles.textTitle}>Слова песни</p>
                    <p className={styles.textParaghaph}>{track.text}</p>
                </div>
                <div className={styles.comments}>
                    <p className={styles.textTitle}>Комментарии</p>
                    <form className={styles.commentForm}>
                        <input
                            className={styles.commentInput}
                            type="text"
                            placeholder='Ваше имя'
                            name='username'
                            value={value.username}
                            onChange={onChange}
                        />
                        <textarea
                            className={`${styles.commentInput} ${styles.commentArea}`}
                            placeholder='Ваш комментарий'
                            name='text'
                            value={value.text}
                            onChange={onChange}
                        />
                        <button
                            className={styles.commentButton}
                            type="button"
                            onClick={handleAddComment}
                        >
                            Отправить
                        </button>
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

export const getServerSideProps = async ({ params }) => {
    const track = await getTrack(params.id)

    return {
        props: { serverTrack: track }
    }
}

export default TrackPage
