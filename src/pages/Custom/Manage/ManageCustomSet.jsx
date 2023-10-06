import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { newQuestionSet } from "../../../tools/objectShapes";
import { createHighScoreEntryForSet, getCustomSet, getDefaultSets, handleIncludedNumberAdded, handleNameChange, handleQuestionNumberChange, handleSecondaryNumberAdded, handleSetCreate, handleSetUpdate, setIsValid } from "../../../services/customSetsService";
import TextInput from "../../../components/Inputs/TextInput";
import NumberInput from "../../../components/Inputs/NumberInput";
import MultiNumberInput from "../../../components/Inputs/MultiNumberInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import gameActions from "../../../redux/actions/gameActions";
import OperatorInput from "../../../components/Inputs/OperatorInput";

function ManageCustomSet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const questionSets = useSelector((state) => state.game.configuration.questionSets)
    const [questionSet, setQuestionSet] = useState({ ...newQuestionSet });

    useEffect(() => {
        if(id){
            setQuestionSet(getCustomSet(id));
        } else {
            setQuestionSet({ ...newQuestionSet});
        }
    }, [id])

    async function handleSave(event){
        event.preventDefault();
        if (!setIsValid(questionSet)) return;
        let sets = [];
        if(id){
            sets = await handleSetUpdate(questionSet)
        } else {
            questionSet.id = Number(questionSets.length + 1);
            sets = await handleSetCreate(questionSet);
            generateLeaderboardForCreatedSet(questionSet);
        }

        // Update state so new set appears in dropdown.
        const defaultSets = getDefaultSets();
        const totalSets = defaultSets.concat(sets);
        dispatch(gameActions.setConfiguration({questionSets: totalSets}));

        toast.success(`Set ${id ? "Updated" : "Created"}`);
        navigate("/custom");
    }

    async function generateLeaderboardForCreatedSet(set){
        let scores = await createHighScoreEntryForSet(set);
        dispatch(gameActions.setHighScores(scores));
    }

    function handle(set){
        console.log(set);
        setQuestionSet(set);
    }

    return (
        <div>
            <h1 className="text-4xl my-4 text-primary text-center">{id ? "Manage" : "Create"} Set</h1>
            {questionSet && (
                <form className="mt-4">
                    <div className="controls grid grid-cols-12">
                        <div className="col-span-12 mb-2">
                            <TextInput 
                                name="name"
                                label="Name"
                                value={questionSet.name}
                                onChange={(event) => {setQuestionSet(handleNameChange(event, questionSet))}}
                                required
                            />
                        </div>
                        <div className="col-span-12 mb-2">
                            <NumberInput 
                                name="numberOfQuestions"
                                label="Number of questions"
                                value={questionSet.numberOfQuestions}
                                onChange={(event) => {setQuestionSet(handleQuestionNumberChange(event, questionSet))}}
                                required
                            />
                        </div>
                        <div className="col-span-12 mb-2">
                            <OperatorInput set={questionSet} onOperatorsChanged={(updatedSet) => {handle(updatedSet)}} />
                        </div>
                        <div className="col-span-12 mb-2">
                            <MultiNumberInput numbers={questionSet.includedNumbers} label="Included numbers" onNumberAdded={(number) => {setQuestionSet(handleIncludedNumberAdded(number, questionSet))}} />
                        </div>
                        <div className="col-span-12 mb-2">
                            <MultiNumberInput numbers={questionSet.secondaryNumbers} label="Secondary numbers" onNumberAdded={(number) => {setQuestionSet(handleSecondaryNumberAdded(number, questionSet))}} />
                        </div>
                        <div className="col-span-12 justify-self-center mt-2">
                            <button onClick={handleSave} className="px-8 py-2 bg-primary rounded-full text-2xl text-white">Submit</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ManageCustomSet;
