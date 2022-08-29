
export interface IComment {
    _id: string,
    username: string,
    text: string
}

export interface ITrack {
    _id: string,
    name: string,
    artist: string,
    text: string,
    listens: number,
    picture: string,
    audio: string,
    comments: IComment[]
}

export interface ITrackState {
    tracks: ITrack[],
    error: string,
    deletePopupOpened: boolean,
    trackId: string,
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACK_ERROR',
    OPEN_POPUP_DELETE = 'OPEN_POPUP_DELETE',
    CLOSE_POPUP_DELETE = 'CLOSE_POPUP_DELETE',
    DELETE_TRACK = 'DELETE_TRACK',
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS,
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR,
    payload: string,
}

interface OpenPopupDeleteAction {
    type: TrackActionTypes.OPEN_POPUP_DELETE,
    payload: string,
}

interface ClosePopupDeleteAction {
    type: TrackActionTypes.CLOSE_POPUP_DELETE
}

interface DeleteTrackAction {
    type: TrackActionTypes.DELETE_TRACK,
    payload: string,
}

export type TrackAction =
    FetchTracksAction |
    FetchTracksErrorAction |
    OpenPopupDeleteAction |
    ClosePopupDeleteAction |
    DeleteTrackAction