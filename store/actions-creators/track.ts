import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/track"
import axios from 'axios'
import { SERVER_URL } from "../../utils/const"


export const fetchTracksAction = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(SERVER_URL + 'tracks')
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: response.data
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
            const response = await axios.get(SERVER_URL + 'tracks/search?query=' + query)
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: response.data
            })

        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка при загрузки треков'
            })
        }
    }
}