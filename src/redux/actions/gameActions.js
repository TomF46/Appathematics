import { savehighScores } from "../../services/localStore";
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

export function setHighScoresSuccess(scores) {
    return { type: types.SET_HIGH_SCORES, scores };
}

export function setHighScores(scores) {
    return function(dispatch){
        savehighScores(scores);
        dispatch(setHighScoresSuccess(scores));
    }
}