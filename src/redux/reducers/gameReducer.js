import {produce} from "immer"
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default produce((draft = initialState, action) => {
    switch(action.type){
        case types.SET_CONFIGURATION:
            draft.configuration = action.value;
            return draft
        case types.SET_QUESTION_SETS:
            draft.questionSets = action.value;
            return draft;
        case types.SET_SELECTED_QUESTION_SET:
            draft.selectedQuestionSet = action.value;
            return draft;
        case types.SET_IS_IN_PROGRESS:
            draft.isInProgress = action.value;
            return draft;
        case types.SET_QUIZ_COMPLETED:
            draft.quizComplete = action.value;
            return draft;
        case types.SET_IS_PAUSED:
            draft.isPaused = action.value;
            return draft;
        case types.SET_LATEST_SCORE:
            draft.latestScore = action.value;
            return draft;
        default:
            return draft
    }
})