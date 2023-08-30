import {produce} from "immer"
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default produce((draft = initialState, action) => {
    switch(action.type){
        case types.SET_CONFIGURATION:
            draft.configuration = action.config;
            return draft
        case types.SET_GAME_IN_PROGRESS:
            draft.gameInProgress = action.status
            return draft
        case types.SET_TIMER:
                draft.timer = action.time
                return draft
        // case types.SET_QUESTION_SETS:
        //     draft.questionSets = action.sets;
        //     return draft;
        // case types.SET_SELECTED_QUESTION_SET:
        //     draft.selectedQuestionSet = action.set;
        //     return draft;
        // case types.SET_IS_IN_PROGRESS:
        //     draft.isInProgress = action.status;
        //     return draft;
        // case types.SET_QUIZ_COMPLETED:
        //     draft.quizComplete = action.status;
        //     return draft;
        // case types.SET_IS_PAUSED:
        //     draft.isPaused = action.status;
        //     return draft;
        // case types.SET_LATEST_SCORE:
        //     draft.latestScore = action.score;
        //     return draft;
        default:
            return draft
    }
})