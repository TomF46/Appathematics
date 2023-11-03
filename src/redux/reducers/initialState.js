import configurationProd from '../../config/prod/configuration.json';
import configurationDev from '../../config/dev/configuration.dev.json';
import initialHighScoresProd from '../../config/prod/initialHighScores.json';
import initialHighScoresDev from '../../config/dev/initialHighScores.dev.json';

export default {
  game: {
    configuration: import.meta.env.PROD ? { ...configurationProd } : { ...configurationDev },
    gameInProgress: false,
    timer: null,
    highScores: import.meta.env.PROD ? initialHighScoresProd : initialHighScoresDev,
  },
};
