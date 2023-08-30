import configuration from "../../config/configuration.json";
import initialHighScores from "../../config/initialHighScores.json";

export default {
    configuration: configuration,
    gameInProgress: false,
    timer: null,
    highScores: initialHighScores
}