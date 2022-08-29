import axios from "axios"
import { IComment, ITrack } from "../types/track"
import { SERVER_URL } from "./const"

const configApi = {
    baseURL: SERVER_URL,
}

export const fetchTracks = async (count?: number, offset?: number) => {
    const response = await axios.get('tracks', {
        ...configApi,
        params: { count, offset }
    })
    return response.data
}

export const addTrack = (track) => {
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

export const addListens = (id: string) => {
    try {
        axios.post(`tracks/listen/${id}`, null, configApi)
    } catch (e) {
        console.log("Произошла ошибка при добавлении прослушивания трека");
    }
}
