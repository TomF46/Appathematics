import PropTypes from "prop-types";
import { convertHundredthsToReadable } from "../../services/timerService";

function ScoresLeaderboardLine({score}) {
    const readableTime = convertHundredthsToReadable(score.score);
    return (
        <tr>
            <td>{score.username}</td>
            <td>{score.score}</td>
            <td>
                {readableTime.hours > 0 && (
                    <>
                        {readableTime.hours}:
                    </>
                )}
                {readableTime.minutes.toString().padStart(2, "0")}:
                {readableTime.seconds.toString().padStart(2, "0")}.
                {readableTime.hundredths.toString().padStart(2, "0")}
            </td>
        </tr>
    );
}

ScoresLeaderboardLine.propTypes = {
    score: PropTypes.object.isRequired,
};

export default ScoresLeaderboardLine;
