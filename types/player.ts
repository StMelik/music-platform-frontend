import { ITrack } from './track';

export interface IPlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    isPause: boolean;
    isOpen: boolean
}

export enum PlayerActionsTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    OPEN_PLAYER = "OPEN_PLAYER",
    CLOSE_PLAYER = "CLOSE_PLAYER",
}

interface IPlayAction {
    type: PlayerActionsTypes.PLAY
}

interface IPauseAction {
    type: PlayerActionsTypes.PAUSE
}

interface ISetActiveAction {
    type: PlayerActionsTypes.SET_ACTIVE,
    payload: ITrack,
}

interface ISetDurationAction {
    type: PlayerActionsTypes.SET_DURATION,
    payload: number,
}

interface ISetVolumeAction {
    type: PlayerActionsTypes.SET_VOLUME,
    payload: number,
}

interface ISetCurrentTimeAction {
    type: PlayerActionsTypes.SET_CURRENT_TIME,
    payload: number,
}

interface IOpenPlayerAction {
    type: PlayerActionsTypes.OPEN_PLAYER
}

interface IClosePlayerAction {
    type: PlayerActionsTypes.CLOSE_PLAYER
}

export type PlayerAction =
    IPlayAction |
    IPauseAction |
    ISetActiveAction |
    ISetDurationAction |
    ISetVolumeAction |
    ISetCurrentTimeAction |
    IOpenPlayerAction |
    IClosePlayerAction 