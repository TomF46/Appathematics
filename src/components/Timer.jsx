import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Timer({ timerIsRunning, onTimerFinished}) {
    const [time, setTime] = useState(null); //In Milliseconds
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    useEffect(() => {
        if(time == null && timerIsRunning){
            setTime(0);
        }

        if(time != null && !timerIsRunning){
            onTimerFinished({
                hours : hours,
                minutes: minutes,
                seconds: seconds,
                milliseconds: milliseconds
            });
        }
        
    }, [timerIsRunning]);

    useEffect(() => {
        let intervalId;
        if(timerIsRunning){
            intervalId = setInterval(() => setTime(time + 1), 10);
        }

        return () => clearInterval(intervalId);
        
    }, [time, timerIsRunning]);

    return <div className="Timer">
        <p className="text-center text-xl">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
        </p>
    </div>;
}

Timer.propTypes = {
    timerIsRunning: PropTypes.bool.isRequired,
    onTimerFinished: PropTypes.func.isRequired
};

export default Timer;
