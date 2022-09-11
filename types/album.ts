import { ITrack } from "./track";

export interface IAlbum {
    _id: string,
    name: string,
    author: string,
    picture: string,
    tracks: ITrack[],
}

export interface IAlbumState {
    albums: IAlbum[],
    error: string,
    currentALbum: null | IAlbum,
}

export enum AlbumActionTypes {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR',
    GET_ALBUM = 'GET_ALBUM',
    GET_ALBUM_ERROR = 'GET_ALBUM_ERROR',
    ADD_ALBUM_TRACK = 'ADD_ALBUM_TRACK',
    DELETE_ALBUM_TRACK = 'DELETE_ALBUM_TRACK',
}

interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUMS,
    payload: IAlbum[],
}

interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
    payload: string,
}

interface GetAlbumAction {
    type: AlbumActionTypes.GET_ALBUM,
    payload: IAlbum,
}

interface GetAlbumErrorAction {
    type: AlbumActionTypes.GET_ALBUM_ERROR,
    payload: string,
}

interface AddTrackAction {
    type: AlbumActionTypes.ADD_ALBUM_TRACK,
    payload: ITrack,
}

interface DeleteTrackAction {
    type: AlbumActionTypes.DELETE_ALBUM_TRACK,
    payload: string,
}

export type AlbumAction =
    FetchAlbumsAction |
    FetchAlbumsErrorAction |
    GetAlbumAction |
    GetAlbumErrorAction |
    AddTrackAction |
    DeleteTrackAction
