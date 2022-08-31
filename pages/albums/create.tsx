import React, { useEffect, useState } from 'react'

// import Link from 'next/link'
import styles from '../../styles/CreateAlbum.module.scss'
import { useRouter } from '../../node_modules/next/router'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL } from '../../utils/const'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { formatTime } from '../../utils/formatTime'
import { IAlbum } from '../../types/album'
import MainLayout from '../../layouts/MainLayout'
import FileUpload from '../../components/FileUpload/FileUpload'
import Button from '../../components/Button/Button'
import { useInput } from '../../hooks/useInput'
import { addAlbum } from '../../utils/api'




const CreateAlbum = () => {
    const router = useRouter()
    const [picture, setPicture] = useState(null)
    const [srcPreview, setSrcPreview] = useState(null)

    const { value, onChange } = useInput({ name: '', author: '' })

    const isDisabledButton = !value.name || !value.author || !picture;
    const textButton = picture ? "Выбрать другую" : "Загрузить обложку"

    useEffect(() => {
        if (picture) {
            const render = new FileReader()
            render.readAsDataURL(picture)
            render.onload = () => setSrcPreview(render.result)
        }
    }, [picture])

    function createAlbum() {
        console.log('Альбом создан');
        const formData = new FormData()
        formData.append('name', value.name)
        formData.append('author', value.author)
        formData.append('picture', picture)

        addAlbum(formData)
            .then(() => router.push('/albums'))
            .catch(console.log)
    }

    return (
        <MainLayout>
            <h2 className={styles.title}>Создать альбом</h2>
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <input
                        type="text"
                        name='name'
                        placeholder='Название альбома'
                        value={value.name}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name='author'
                        placeholder='Ваше имя'
                        value={value.author}
                        onChange={onChange}
                    />

                    <FileUpload
                        accept='image/*'
                        setFile={setPicture}
                    >
                        <Button
                            text={textButton}
                        />
                    </FileUpload>

                    <Button
                        text='Добавить альбом'
                        disabled={isDisabledButton}
                        onClick={createAlbum}
                    />
                </form>

                <div className={styles.preview}>
                    <img src={srcPreview} alt="" />
                    <p>{value.name || "Введите название"}</p>
                </div >
            </div>

        </MainLayout>

    )
}

export default CreateAlbum