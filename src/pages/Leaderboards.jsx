import { useSelector } from "react-redux";
import SetSelect from "../components/SetSelect";
import { useState } from "react";
import Leaderboard from "../components/Leaderboard";

function Leaderboards() {
    const highScores = useSelector((state) => state.game.highScores);
    const [scores, setScores] = useState(null);

    function handleSetSelected(set) {
        let selectedSet = highScores.find((x) => x.setId == set.id);
        setScores(selectedSet.scores);
    }

    return (
        <>
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

export default Leaderboards;
