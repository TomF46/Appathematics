import PropTypes from "prop-types";

function Summary({game, score}) {
    return (
        <div className="text-center my-4">
            <h1 className="text-4xl mb-4">Congratulations</h1>
            <p className="text-2xl">You finished {game.name} in...</p>
            <p className="text-xl">
              {score.hours}:{score.minutes.toString().padStart(2, "0")}:
              {score.seconds.toString().padStart(2, "0")}:
              {score.milliseconds.toString().padStart(2, "0")}
          </p>
        </div>
    );
}

Summary.propTypes = {
    game: PropTypes.object.isRequired,
    score: PropTypes.object.isRequired,
};

export default Summary;
