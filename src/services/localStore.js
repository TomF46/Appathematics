import initialState from '../redux/reducers/initialState';

export const loadState = () => {
  let state = initialState;

  //Load and merge custom sets with hard coded sets
  const customQuestionSets = loadCustomSets();
  if (customQuestionSets != null) {
    let sets = mergeQuestionSets(state.game.configuration.questionSets, customQuestionSets);
    state.game.configuration.questionSets = sets;
  }

  //Load High Scores
  const highScores = loadHighScores();
  if (highScores != null) {
    state.game.highScores = highScores;
  } else {
    savehighScores(state.game.highScores);
  }

  return state;
};

export const loadHighScores = () => {
  const highScores = localStorage.getItem('highScores');
  return highScores ? JSON.parse(highScores) : null;
};

export const savehighScores = (highScores) => {
  try {
    const serializedState = JSON.stringify(highScores);
    localStorage.setItem('highScores', serializedState);
  } catch {
    // ignore write errors
  }
};

export const removehighScores = () => {
  try {
    localStorage.removeItem('highScores');
  } catch {
    //
  }
};

export const loadCustomSets = () => {
  const customQuestionSets = localStorage.getItem('customQuestionSets');
  return customQuestionSets ? JSON.parse(customQuestionSets) : null;
};

export const storeCustomSets = (sets) => {
  try {
    const serializedSets = JSON.stringify(sets);
    localStorage.setItem('customQuestionSets', serializedSets);
  } catch {
    // ignore write errors
  }
};

const mergeQuestionSets = (sets, customSets) => {
  return sets.concat(customSets);
};
