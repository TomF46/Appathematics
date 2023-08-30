import PropTypes from "prop-types";
import { useState } from "react";
import TextInput from "./TextInput";
import { setHighScores } from "../redux/actions/gameActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddHighScore({game, score, highScores, setHighScores}) {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    
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
        setHighScores(highScoresCopy);
        navigate("/");
    }

    return(
        <div className="grid grid-cols-12">
            <div className="col-span-12">
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
    highScores: PropTypes.object.isRequired,
    setHighScores: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        highScores: state.game.highScores,
    };
};

const mapDispatchToProps = {
    setHighScores,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddHighScore);
