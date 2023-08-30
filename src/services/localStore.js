import initialState from "../redux/reducers/initialState";

export const loadState = () => {
    const highScores = localStorage.getItem("highScores");
    let highScoresState = highScores == null ? null : JSON.parse(highScores);
    let state = initialState;
    if (highScoresState != null) state.highScores = highScoresState;
    return state;
};

export const savehighScores = highScores => {
    try {
        const serializedState = JSON.stringify(highScores);
        localStorage.setItem("highScores", serializedState);
    } catch {
        // ignore write errors
    }
};

export const removehighScores = () => {
    try {
        localStorage.removeItem("highScores");
    } catch {
        //
    }
};