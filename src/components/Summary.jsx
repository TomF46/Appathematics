import PropTypes from "prop-types";
import { convertHundredthsToReadable } from "../services/timerService";
import AddHighScore from "./AddHighScore";
import { useSelector } from "react-redux";
import Leaderboard from "./Leaderboard";
import { useState } from "react";
import { Link } from "react-router-dom";

function Summary({game, score}) {
    const highScores = useSelector((state) => state.game.highScores.find(x => x.setId == game.id).scores);
    const readableTime = convertHundredthsToReadable(score);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    return (
        <>
            <div className="text-center my-4 text-primary">
                <h1 className="text-4xl mb-4">Congratulations</h1>
                <p className="text-2xl">You finished {game.name} in...</p>
                <p className="text-2xl mt-4">
                {readableTime.hours}:{readableTime.minutes.toString().padStart(2, "0")}:
                {readableTime.seconds.toString().padStart(2, "0")}:
                {readableTime.hundredths.toString().padStart(2, "0")}
                </p>
            </div>
            <div className="text-center">
                <Link to={"/"} className="link-button px-8 py-2 my-4 bg-primary rounded-full text-3xl text-white text-center mx-auto">Play again!</Link>
            </div>
            {!hasSubmitted && (
                <AddHighScore game={game} score={score} onScoreSubmitted={() => setHasSubmitted(true)} />
            )}
            {highScores && (
                <div className="my-4 grid grid-cols-12">
                    <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-5">
                        <Leaderboard scores={highScores} />
                    </div>
                </div>
            )}
        </>
    );
}

Summary.propTypes = {
    game: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired
};

export default Summary;
