import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"
import { deleteTrack, fetchTracks, searchTrack } from "../../utils/api"

export const fetchTracksAction = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const tracks = await fetchTracks()
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: tracks
            })

        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузки треков'
            })
        }
    }
}

export const searchTracksAction = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const tracks = await searchTrack(query)
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: tracks
            })

        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузки треков'
            })
        }
    }
}

export const deleteTrackAction = (id: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        const trackId = await deleteTrack(id)
        dispatch({
            type: TrackActionTypes.DELETE_TRACK,
            payload: trackId
        })
    }
}

export const openDeletePopupAction = (payload: string) => {
    return { type: TrackActionTypes.OPEN_POPUP_DELETE, payload }
}

export const closeDeletePopupAction = () => {
    return { type: TrackActionTypes.CLOSE_POPUP_DELETE }
}