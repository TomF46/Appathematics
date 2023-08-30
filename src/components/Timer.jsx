import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setTimer, setGameInProgress} from "../redux/actions/gameActions";
import { convertMilisecondsToReadable } from "../services/timerService";
import { useLocation } from "react-router-dom";

function Timer({ time, gameInProgress, setTimer, setGameInProgress}) {
    const readableTime = convertMilisecondsToReadable(time);
    const {pathname} = useLocation();

    useEffect(()=>{
        // Stops clock if page changes away from game
        if(!pathname.includes("/play")){
            setGameInProgress(false);
        }
    },[pathname])

    useEffect(() => {
        if(gameInProgress){
            setTimer(0);
        }
    }, [gameInProgress]);

    useEffect(() => {
        let intervalId;
        if(gameInProgress){
            intervalId = setInterval(() => setTimer(time + 1), 10);
        }

        return () => clearInterval(intervalId);
        
    }, [time, gameInProgress]);

    return <div className="Timer">
        <p className="text-center text-white text-2xl">
            {readableTime.hours}:{readableTime.minutes.toString().padStart(2, "0")}:
            {readableTime.seconds.toString().padStart(2, "0")}:
            {readableTime.milliseconds.toString().padStart(2, "0")}
        </p>
    </div>;
}

Timer.propTypes = {
    gameInProgress: PropTypes.bool.isRequired,
    time: PropTypes.number,
    setTimer: PropTypes.func.isRequired,
    setGameInProgress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        gameInProgress: state.game.gameInProgress,
        time: state.game.timer
    };
};

const mapDispatchToProps = {
    setTimer,
    setGameInProgress
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
