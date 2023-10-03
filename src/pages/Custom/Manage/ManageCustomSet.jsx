import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { newQuestionSet } from "../../../tools/objectShapes";
import { getCustomSet, handleIncludedNumberAdded, handleNameChange, handleQuestionNumberChange, handleSecondaryNumberAdded, handleSetCreate, handleSetUpdate, setIsValid } from "../../../services/customSetsService";
import TextInput from "../../../components/Inputs/TextInput";
import NumberInput from "../../../components/Inputs/NumberInput";
import MultiNumberInput from "../../../components/Inputs/MultiNumberInput";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ManageCustomSet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const questionSets = useSelector((state) => state.game.configuration.questionSets)
    const [questionSet, setQuestionSet] = useState({ ...newQuestionSet });

    useEffect(() => {
        if(id){
            setQuestionSet(getCustomSet(id));
        } else {
            setQuestionSet({ ...newQuestionSet});
        }
    }, [id])

    function handleSave(event){
        event.preventDefault();
        if (!setIsValid(questionSet)) return;
        if(id){
            handleSetUpdate(questionSet)
        } else {
            questionSet.id = questionSets.length + 1;
            handleSetCreate(questionSet);
        }

        toast.success(`Set ${id ? "Updated" : "Created"}`);
        navigate("/custom");
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
