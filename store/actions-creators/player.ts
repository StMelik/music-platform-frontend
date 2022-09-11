import { PlayerAction, PlayerActionsTypes } from "../../types/player";
import { ITrack } from "../../types/track";


export const playTrackAction = (): PlayerAction => {
    return { type: PlayerActionsTypes.PLAY }
}

export const pauseTrackAction = (): PlayerAction => {
    return { type: PlayerActionsTypes.PAUSE }
}

export const setDurationAction = (payload: number): PlayerAction => {
    return { type: PlayerActionsTypes.SET_DURATION, payload }
}

export const setVolumeAction = (payload: number): PlayerAction => {
    return { type: PlayerActionsTypes.SET_VOLUME, payload }
}

export const setCurrentTimeAction = (payload: number): PlayerAction => {
    return { type: PlayerActionsTypes.SET_CURRENT_TIME, payload }
}

export const setActiveTrackAction = (payload: ITrack): PlayerAction => {
    return { type: PlayerActionsTypes.SET_ACTIVE, payload }
}

export const openPlayerAction = (): PlayerAction => {
    return { type: PlayerActionsTypes.OPEN_PLAYER }
}

export const closePlayerAction = (): PlayerAction => {
    return { type: PlayerActionsTypes.CLOSE_PLAYER }
}
