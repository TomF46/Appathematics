import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gameActions from '../../redux/actions/gameActions';
import { convertHundredthsToReadable } from '../../services/timerService';
import { useLocation } from 'react-router-dom';

function Timer() {
  const time = useSelector((state) => state.game.timer);
  const gameInProgress = useSelector((state) => state.game.gameInProgress);
  const dispatch = useDispatch();
  const readableTime = convertHundredthsToReadable(time);
  const { pathname } = useLocation();

  useEffect(() => {
    // Stops clock if page changes away from game
    if (!pathname.includes('/play')) {
      dispatch(gameActions.setGameInProgress(false));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (gameInProgress) {
      dispatch(gameActions.setTimer(0));
    }
  }, [gameInProgress, dispatch]);

  useEffect(() => {
    let intervalId;
    if (gameInProgress) {
      intervalId = setInterval(() => dispatch(gameActions.setTimer(time + 1)), 10);
    }

    return () => clearInterval(intervalId);
  }, [time, gameInProgress, dispatch]);

  return (
    <div className='timer'>
      <p className='text-center text-white text-3xl'>
        {readableTime.hours > 0 && <>{readableTime.hours}:</>}
        {readableTime.minutes.toString().padStart(2, '0')}:
        {readableTime.seconds.toString().padStart(2, '0')}.
        {readableTime.hundredths.toString().padStart(2, '0')}
      </p>
    </div>
  );
}

export default Timer;
