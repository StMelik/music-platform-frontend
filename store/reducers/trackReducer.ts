import { ITrackState, TrackAction, TrackActionTypes } from "../../types/track"


const initialState: ITrackState = {
    tracks: [],
    error: '',
    deletePopupOpened: false,
    trackId: '',
    total: 0,
}

export const trackReducer = (state = initialState, action: TrackAction): ITrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return {
                ...state,
                error: '',
                tracks: action.payload.tracks,
                total: action.payload.total
            }
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error: action.payload }
        case TrackActionTypes.OPEN_POPUP_DELETE:
            return { ...state, deletePopupOpened: true, trackId: action.payload }
        case TrackActionTypes.CLOSE_POPUP_DELETE:
            return { ...state, deletePopupOpened: false, trackId: '' }
        case TrackActionTypes.DELETE_TRACK:
            return {
                ...state,
                tracks: state.tracks.filter(track => track._id != action.payload)
            }

        case TrackActionTypes.FETCH_MORE_TRACKS:
            return {
                ...state,
                tracks: [...state.tracks, ...action.payload.tracks],
            }
        default:
            return state
    }
}