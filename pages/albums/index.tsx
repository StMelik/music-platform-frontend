import AlbumList from "../../components/AlbumList/AlbumList"
import MainLayout from "../../layouts/MainLayout"
import { IAlbum } from "../../types/album"
import styles from '../../styles/Albums.module.scss'
import Button from "../../components/Button/Button"
import { NextThunkDispatch, wrapper } from "../../store"
import { fetchAlbumsAction } from "../../store/actions-creators/album"
import { useTypedSelector } from "../../hooks/useTypedSelector"

const Albums = () => {
    const { albums, error } = useTypedSelector(store => store.album)

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        )
    }

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

export const getServerSideProps = wrapper.getServerSideProps((context) => async (as) => {
    // console.log('AS ======>>>>>>>>', as.params);

    const dispatch = context.dispatch as NextThunkDispatch
    await dispatch(fetchAlbumsAction())
})

