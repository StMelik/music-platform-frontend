import { AlbumAction, AlbumActionTypes, IAlbumState } from "../../types/album"

const initialState: IAlbumState = {
    albums: [],
    error: '',
    currentALbum: null,
}

export const albumReducer = (state = initialState, action: AlbumAction): IAlbumState => {
    switch (action.type) {
        case AlbumActionTypes.FETCH_ALBUMS:
            return { ...state, error: '', albums: action.payload }
        case AlbumActionTypes.FETCH_ALBUMS_ERROR:
            return { ...state, error: action.payload }
        case AlbumActionTypes.GET_ALBUM:
            return { ...state, error: '', currentALbum: action.payload }
        case AlbumActionTypes.GET_ALBUM_ERROR:
            return { ...state, error: action.payload }
        case AlbumActionTypes.ADD_ALBUM_TRACK:
            return {
                ...state,
                currentALbum: {
                    ...state.currentALbum,
                    tracks: [...state.currentALbum.tracks, action.payload]
                }
            }
        case AlbumActionTypes.DELETE_ALBUM_TRACK:
            return {
                ...state,
                currentALbum: {
                    ...state.currentALbum,
                    tracks: state.currentALbum.tracks.filter(t => t._id != action.payload),
                }
            }
        default:
            return state
    }
}