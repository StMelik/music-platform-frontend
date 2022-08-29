import { IPlayerState, PlayerAction, PlayerActionsTypes } from './../../types/player';

const initialState: IPlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true,
}

export const playerReducer = (state = initialState, action: PlayerAction): IPlayerState => {
    switch (action.type) {
        case PlayerActionsTypes.PAUSE:
            return { ...state, pause: true }
        case PlayerActionsTypes.PLAY:
            return { ...state, pause: false }
        case PlayerActionsTypes.SET_ACTIVE:
            return { ...state, active: action.payload, duration: 0, currentTime: 0 }
        case PlayerActionsTypes.SET_CURRENT_TIME:
            return { ...state, currentTime: action.payload }
        case PlayerActionsTypes.SET_DURATION:
            return { ...state, duration: action.payload }
        case PlayerActionsTypes.SET_VOLUME:
            return { ...state, volume: action.payload }
        default:
            return state
    }
}