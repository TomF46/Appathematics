import * as types from "./actionTypes";

// export function setConfiguration(config) {
//     return { type: types.SET_CONFIGURATION, config };
// }

export function setGameInProgress(status) {
    return { type: types.SET_GAME_IN_PROGRESS, status };
}

export function setTimer(time) {
    return { type: types.SET_TIMER, time };
}