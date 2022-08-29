import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"
import { fetchTracks, searchTrack } from "../../utils/api"


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