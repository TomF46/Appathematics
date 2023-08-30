import PropTypes from "prop-types";
import { convertMilisecondsToReadable } from "../services/timerService";

function Summary({game, score}) {
    const readableTime = convertMilisecondsToReadable(score);
    return (
        <div className="text-center my-4">
            <h1 className="text-4xl mb-4">Congratulations</h1>
            <p className="text-2xl">You finished {game.name} in...</p>
            <p className="text-xl">
              {readableTime.hours}:{readableTime.minutes.toString().padStart(2, "0")}:
              {readableTime.seconds.toString().padStart(2, "0")}:
              {readableTime.milliseconds.toString().padStart(2, "0")}
          </p>
        </div>
    );
}

Summary.propTypes = {
    game: PropTypes.object.isRequired,
    score: PropTypes.object.isRequired,
};

export default Summary;
