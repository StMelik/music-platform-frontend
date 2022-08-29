import { ITrackState, TrackAction, TrackActionTypes } from "../../types/track"


const initialState: ITrackState = {
    tracks: [],
    error: '',
    deletePopupOpened: false,
    trackId: ''
}

export const trackReducer = (state = initialState, action: TrackAction): ITrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return { ...state, error: '', tracks: action.payload }
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
        default:
            return state
    }
}