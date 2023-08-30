import PropTypes from "prop-types";
import { convertMilisecondsToReadable } from "../services/timerService";

function ScoresLeaderboardLine({score}) {
    const readableTime = convertMilisecondsToReadable(score.score);
    return (
        <tr>
            <td>{score.username}</td>
            <td>{score.score}</td>
            <td>{readableTime.hours}:{readableTime.minutes.toString().padStart(2, "0")}:
            {readableTime.seconds.toString().padStart(2, "0")}:
            {readableTime.milliseconds.toString().padStart(2, "0")}</td>
        </tr>
    );
}

ScoresLeaderboardLine.propTypes = {
    score: PropTypes.object.isRequired,
};

export default ScoresLeaderboardLine;
