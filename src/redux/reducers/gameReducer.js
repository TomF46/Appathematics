import { produce } from 'immer';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default produce((draft = initialState, action) => {
  switch (action.type) {
    case types.SET_CONFIGURATION:
      draft.configuration = action.config;
      return draft;
    case types.SET_GAME_IN_PROGRESS:
      draft.gameInProgress = action.status;
      return draft;
    case types.SET_TIMER:
      draft.timer = action.time;
      return draft;
    case types.SET_HIGH_SCORES:
      draft.highScores = action.scores;
      return draft;
    default:
      return draft;
  }
});
