import PropTypes from "prop-types";
import { useState } from "react";
import TextInput from "./TextInput";
import { useDispatch, useSelector } from "react-redux";
import gameActions from "../redux/actions/gameActions";

function AddHighScore({game, score, onScoreSubmitted}) {
    const highScores = useSelector((state) => state.game.highScores);
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null)

    function onNameChange(event){
        const { value } = event.target;
        setUsername(value);
    }

    function handleSubmit(){
        if(!username || username.length == 0){
            setError("Name is required.");
            return;
        }

        if(username.length > 40){
            setError("Name is too long.");
            return;
        } 

        let leaderboardScore = { "username": username, "score": score, "displayScore": "07:10" }; // sort out display score
        const highScoresCopy =  JSON.parse(JSON.stringify(highScores))
        const leaderboard = highScoresCopy.find(x => x.setId == game.id);
        leaderboard.scores.push(leaderboardScore);
        dispatch(gameActions.setHighScores(highScoresCopy));
        onScoreSubmitted();
    }

    return(
        <div className="grid grid-cols-12 my-4">
            <div className="col-span-8 col-start-3 lg:col-span-6 lg:col-start-4">
                <TextInput
                    name="name"
                    label="Name"
                    value={username}
                    onChange={onNameChange}
                    error={error}
                    required={true}
                />
            </div>
            <div className="col-span-12 justify-self-center">
                <button onClick={handleSubmit} className="px-8 py-2 mt-4 bg-primary rounded-full text-4xl text-white">Submit</button>
            </div>
        </div>
    )
}

AddHighScore.propTypes = {
    game: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired,
    onScoreSubmitted: PropTypes.func.isRequired
};

export default AddHighScore;
