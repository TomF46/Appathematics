import * as types from "./actionTypes";
import configuration from "../../configuration";

export function setConfiguration(config) {
    return { type: types.SET_CONFIGURATION, config };
}

export function setQuestionSets(sets){
    return {type: types.SET_QUESTION_SETS, sets};
}

export function setSelectedQuestionSet(set){
    return { type: types.SET_SELECTED_QUESTION_SET, set}
}

export function setIsInProgress(status){
    return { type: types.SET_IS_IN_PROGRESS, status}
}

export function setQuizCompleted(status){
    return { type: types.SET_QUIZ_COMPLETED, status}
}

export function setIsPaused(status){
    return {type: types.SET_IS_PAUSED, status}
}

export function setLastestScore(score){
    return { type: types.SET_LATEST_SCORE, score}
}

export function loadConfiguration() {
    return function (dispatch) {
        return new Promise((resolve) =>  {
            dispatch(setConfiguration(configuration));
            dispatch(setQuestionSets(configuration.questionSets));
            resolve();
        })
    };
}