import axios from "axios"
import { IAlbum } from './../types/album';
import { ITrack } from './../types/track';
import { IComment } from "../types/track"
import { SERVER_URL } from "./const"

const configApi = {
    baseURL: SERVER_URL,
}

// Треки
export const fetchTracks = async (count?: number, offset?: number) => {
    const response = await axios.get('tracks', {
        ...configApi,
        params: { count, offset }
    })
    return response.data
}

export const addTrack = (track: FormData) => {
    return axios.post('tracks', track, configApi)
}

export const searchTrack = async (query: string) => {
    const response = await axios.get('tracks/search', {
        ...configApi,
        params: { query }
    })
    return response.data
}

export const getTrack = async (id: string) => {
    try {
        const response = await axios.get(`tracks/${id}`, configApi)
        return response.data
    } catch (e) {
        console.log("Произошла ошибка при загрузке трека");
    }
}

export const deleteTrack = async (id: string) => {
    try {
        const response = await axios.delete(`tracks/${id}`, configApi)
        return response.data
    } catch (e) {
        console.log("Произошла ошибка при удалении трека");
    }
}

export const addComment = async (comment: IComment) => {
    const response = await axios.post('tracks/comment', comment, configApi)
    return response.data
}

// Альбомы
export const fetchAlbums = async (count?: number, offset?: number) => {
    const responce = await axios.get('albums', {
        ...configApi,
        params: { count, offset }
    })
    return responce.data
}

export const getAlbum = async (id: string) => {
    try {
        const responce = await axios.get(`albums/${id}`, configApi)
        return responce.data
    } catch (e) {
        console.log("Произошла ошибка при загрузке альбома");
    }
}

export const addAlbum = async (album: FormData) => {
    try {
        return axios.post('albums', album, configApi)
    } catch (e) {
        console.log("Произошла ошибка при создании альбома");
    }
}

export const deleteAlbum = async (id: string) => {
    return axios.delete(`albums/${id}`, configApi)
}

export const addTrackAlbum = async (albumId: string, trackId: string) => {
    return await axios.post(`albums/${albumId}`, { trackId }, configApi)
}

export const deleteTrackAlbum = async (albumId: string, trackId: string) => {
    return await axios.put(`albums/${albumId}`, { trackId }, configApi)
}

export const addListens = async (trackId: string) => {
    return await axios.post(`tracks/listen/${trackId}`, null, configApi)
}
