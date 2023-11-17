import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { newQuestionSet } from '../../../tools/objectShapes';
import {
  createHighScoreEntryForSet,
  getCustomSet,
  getDefaultSets,
  handlePrimaryNumberAdded,
  handlePrimaryNumberRemoved,
  handleNameChange,
  handleQuestionNumberChange,
  handleSecondaryNumberAdded,
  handleSecondaryNumberRemoved,
  handleSetCreate,
  handleSetUpdate,
  setIsValid,
  isLegacySet,
  updateOperandsFromLegacy,
} from '../../../services/customSetsService';
import TextInput from '../../../components/Inputs/TextInput';
import NumberInput from '../../../components/Inputs/NumberInput';
import MultiNumberInput from '../../../components/Inputs/MultiNumberInput';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import gameActions from '../../../redux/actions/gameActions';
import OperatorInput from '../../../components/Inputs/OperatorInput';

function ManageCustomSet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionSets = useSelector((state) => state.game.configuration.questionSets);
  const [questionSet, setQuestionSet] = useState(structuredClone(newQuestionSet));

  useEffect(() => {
    if (id) {
      setQuestionSet(getCustomSet(id));
    } else {
      setQuestionSet(structuredClone(newQuestionSet));
    }
  }, [id]);

  async function handleSave(event) {
    event.preventDefault();
    if (isLegacySet(questionSet.operands)) setQuestionSet(updateOperandsFromLegacy(questionSet));
    if (!setIsValid(questionSet)) return;
    let sets = [];
    if (id) {
      sets = await handleSetUpdate(questionSet);
    } else {
      questionSet.id = Number(questionSets.length + 1);
      sets = await handleSetCreate(questionSet);
      generateLeaderboardForCreatedSet(questionSet);
    }

    // Update state so new set appears in dropdown.
    const defaultSets = getDefaultSets();
    const totalSets = defaultSets.concat(sets);
    dispatch(gameActions.setConfiguration({ questionSets: totalSets }));

    toast.success(`Set ${id ? 'Updated' : 'Created'}`);
    navigate('/custom');
  }

  async function generateLeaderboardForCreatedSet(set) {
    let scores = await createHighScoreEntryForSet(set);
    dispatch(gameActions.setHighScores(scores));
  }

  function handle(set) {
    setQuestionSet(set);
  }

  return (
    <div>
      <h1 className='text-4xl my-4 text-primary text-center'>{id ? 'Manage' : 'Create'}Set</h1>
      <Link to={'/custom/guide'} className='underline text-primary'>
        View guide
      </Link>
      {questionSet && (
        <form className='mt-4'>
          <div className='controls grid grid-cols-12'>
            <div className='col-span-12 md:col-span-6 md:mr-2 mb-2'>
              <TextInput
                name='name'
                label='Name'
                value={questionSet.name}
                onChange={(event) => {
                  setQuestionSet(handleNameChange(event, questionSet));
                }}
                required
              />
            </div>
            <div className='col-span-12 md:col-span-6 md:ml-2 mb-2'>
              <NumberInput
                name='numberOfQuestions'
                label='Number of questions'
                value={questionSet.numberOfQuestions}
                onChange={(event) => {
                  setQuestionSet(handleQuestionNumberChange(event, questionSet));
                }}
                required
              />
            </div>
            <div className='col-span-12 mb-2'>
              <OperatorInput
                set={questionSet}
                onOperatorsChanged={(updatedSet) => {
                  handle(updatedSet);
                }}
              />
            </div>
            <div className='col-span-12'>
              <h2 className='text-xl text-primary'>Numbers:</h2>
            </div>
            <div className='col-span-12 md:col-span-6 md:mr-2 mb-2'>
              <MultiNumberInput
                numbers={questionSet.primaryNumbers}
                label='Primary numbers'
                onNumberAdded={(number) => {
                  setQuestionSet(handlePrimaryNumberAdded(number, questionSet));
                }}
                onNumberRemoved={(number) => {
                  setQuestionSet(handlePrimaryNumberRemoved(number, questionSet));
                }}
              />
            </div>
            <div className='col-span-12 md:col-span-6 md:ml-2 mb-2'>
              <MultiNumberInput
                numbers={questionSet.secondaryNumbers}
                label='Secondary numbers'
                onNumberAdded={(number) => {
                  setQuestionSet(handleSecondaryNumberAdded(number, questionSet));
                }}
                onNumberRemoved={(number) => {
                  setQuestionSet(handleSecondaryNumberRemoved(number, questionSet));
                }}
              />
            </div>
            <div className='col-span-12 justify-self-center mt-2'>
              <button
                onClick={handleSave}
                className='px-8 py-2 bg-primary rounded-full text-2xl text-white'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ManageCustomSet;
