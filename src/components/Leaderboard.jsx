import PropTypes from "prop-types";

function Leaderboard({scores}) {
    return (
        <table className="table-auto w-full p-1 text-center border border-primary">
            <thead className="bg-primary">
                <tr>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((score, i) => {
                    return (
                        <tr key={i}>
                            <td>{score.username}</td>
                            <td>{score.score}</td>
                            <td>{score.displayScore}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

Leaderboard.propTypes = {
    scores: PropTypes.array.isRequired,
};

export default Leaderboard;
