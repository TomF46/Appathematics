import PropTypes from "prop-types";
import { connect } from "react-redux";
import SetSelect from "../components/SetSelect";
import { useEffect, useState } from "react";
import Leaderboard from "../components/Leaderboard";

function Leaderboards({ highScores }) {
    const [scores, setScores] = useState(null);

    useEffect(() => {
        console.log(scores);
    }, [scores]);

    function handleSetSelected(set) {
        let selectedSet = highScores.find((x) => x.setId == set.id);
        setScores(selectedSet.scores);
    }

    return (
        <>
            <h1 className="text-4xl mb-4 text-primary text-center my-8">
                Leaderboards
            </h1>
            <SetSelect onSetSelected={handleSetSelected} autoSelectMode={true} />
            {scores && scores.length > 0 && (
                <div className="my-4 grid grid-cols-12">
                    <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-5">
                        <Leaderboard scores={scores} />
                    </div>
                </div>
            )}
        </>
    );
}

Leaderboards.propTypes = {
    highScores: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        highScores: state.game.highScores,
    };
};

export default connect(mapStateToProps)(Leaderboards);
