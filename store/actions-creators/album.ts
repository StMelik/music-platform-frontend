import { ITrack } from './../../types/track';
import { Dispatch } from "react"
import { AlbumAction, AlbumActionTypes } from "../../types/album"
import { addTrackAlbum, deleteTrackAlbum, fetchAlbums, getAlbum } from "../../utils/api"


export const fetchAlbumsAction = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const albums = await fetchAlbums()
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS,
                payload: albums,
            })
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка при загрузке альбомов'
            })
        }
    }
}

export const getAlbumAction = (id: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const album = await getAlbum(id)
            dispatch({
                type: AlbumActionTypes.GET_ALBUM,
                payload: album,
            })
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.GET_ALBUM_ERROR,
                payload: 'Произошла ошибка при загрузке альбома'
            })
        }
    }
}

export const addTrackAlbumAction = (track: ITrack) => ({
    type: AlbumActionTypes.ADD_ALBUM_TRACK,
    payload: track
})

export const deleteTrackAlbumAction = (id: string) => ({
    type: AlbumActionTypes.DELETE_ALBUM_TRACK,
    payload: id
})
