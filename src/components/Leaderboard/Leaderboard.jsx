import PropTypes from 'prop-types';
import ScoresLeaderboardLine from './ScoresLeaderboardLine';

function Leaderboard({ scores }) {
  const sortedLeaderboard = scores.slice().sort((a, b) => a.score - b.score);
  return (
    <table className='table-auto w-full p-1 text-center border border-primary' role='leaderboard'>
      <thead className='bg-primary'>
        <tr>
          <th>Username</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {sortedLeaderboard.map((score, i) => {
          return <ScoresLeaderboardLine score={score} key={i} />;
        })}
      </tbody>
    </table>
  );
}

Leaderboard.propTypes = {
  scores: PropTypes.array.isRequired,
};

export default Leaderboard;
