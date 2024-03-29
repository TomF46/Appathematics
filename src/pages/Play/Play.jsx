import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, useCallback } from 'react';
import QuestionsService from '../../services/questionService';
import Methods from '../../services/methods.enum';
import VirtualKeyboard from '../../components/Inputs/VirtualKeyboard';
import AnswersService from '../../services/answerService';
import gameStates from '../../services/gameStates.enum';
import Summary from '../../components/Summary/Summary';
import gameActions from '../../redux/actions/gameActions';
import PowerQuestionFormat from '../../components/QuestionFormats/PowerQuestionFormat';
import RootQuestionFormat from '../../components/QuestionFormats/RootQuestionFormat';
import { useMemo } from 'react';

function Play() {
  const { id } = useParams();
  const inputRef = useRef(null);
  const time = useSelector((state) => state.game.timer);
  const questionSets = useSelector((state) => state.game.configuration.questionSets);
  const dispatch = useDispatch();
  const questionService = useMemo(() => new QuestionsService(), []);
  const answersService = new AnswersService();
  const [gameState, setGameState] = useState(gameStates.Play);
  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [inputClass, setInputClass] = useState('');
  const [score, setScore] = useState(null);

  const generateQuestions = useCallback(
    (set) => {
      let qs = questionService.generateQuestions(set);
      setQuestions(qs);
    },
    [questionService],
  );

  const handleQuizComplete = useCallback(() => {
    dispatch(gameActions.setGameInProgress(false));
    setScore(time);
    setGameState(gameStates.Summary);
  }, [time, dispatch]);

  useEffect(() => {
    let g = questionSets.find((x) => x.id == id);
    setGame(g);
    generateQuestions(g);
  }, [id, questionSets, generateQuestions]);

  useEffect(() => {
    if (questions) {
      dispatch(gameActions.setGameInProgress(true));
      setQuestionIndex(0);
    }
  }, [questions, dispatch]);

  useEffect(() => {
    if (questionIndex != null) {
      if (questionIndex == questions.length) {
        handleQuizComplete();
        return;
      }
      setActiveQuestion(questions[questionIndex]);
    }
  }, [questionIndex, questions, handleQuizComplete]);

  function getOperator(method) {
    if (method == Methods.Multiplication) return 'x';
    if (method == Methods.Division) return '÷';
    if (method == Methods.Addition) return '+';
    if (method == Methods.Subtraction) return '-';
    if (method == Methods.Power) return '^';
    if (method == Methods.Root) return `&#8730;`;
  }

  function handleKeyClicked(key) {
    setInputClass('');
    if (key == 'enter') {
      submitCurrentAnswer();
      return;
    }

    if (key == 'back') {
      handleBackButton();
      return;
    }

    if (currentAnswer == null || currentAnswer == 0) {
      setCurrentAnswer(String(key));
      return;
    }

    if (key == '-' && currentAnswer.includes('-')) return;

    if (key == '.' && currentAnswer.includes('.')) return;

    if (currentAnswer.length >= 4) return;

    setCurrentAnswer(currentAnswer + String(key));
  }

  function submitCurrentAnswer() {
    setInputClass('');
    const isCorrect = answersService.checkIfCorrect(
      currentAnswer,
      activeQuestion.firstNumber,
      activeQuestion.secondNumber,
      activeQuestion.method,
    );

    isCorrect ? handleCorrectAnswer() : handleIncorrectAnswer();
    inputRef.current.focus();
  }

  function handleCorrectAnswer() {
    setCurrentAnswer('');
    setQuestionIndex(questionIndex + 1);
  }

  function handleIncorrectAnswer() {
    setInputClass('incorrect');
  }

  function handleBackButton() {
    if (currentAnswer == null) return;
    setCurrentAnswer(currentAnswer.slice(0, -1));
  }

  function renderQuestion(question) {
    switch (question.method) {
      case Methods.Power:
        return <PowerQuestionFormat question={question} />;
      case Methods.Root:
        return <RootQuestionFormat question={question} />;
      default:
        return (
          <p className='text-center text-xl text-primary'>
            {question.firstNumber} {getOperator(question.method)} {question.secondNumber}
          </p>
        );
    }
  }

  return (
    <>
      {gameState == gameStates.Play && (
        <>
          {game && <h1 className='text-center my-4 text-4xl text-primary'>{game.name}</h1>}
          {questions && (
            <div className='play'>
              <div className='grid grid-cols-12'>
                <div className='col-span-12'>
                  <h2 className='text-center my-2 text-2xl text-primary'>
                    Question {questionIndex + 1} of {questions.length}
                  </h2>
                </div>
                {activeQuestion && (
                  <div className='col-span-12'>{renderQuestion(activeQuestion)}</div>
                )}
                <div className='col-span-12 justify-self-center my-4'>
                  <input
                    type='tel'
                    disabled
                    ref={inputRef}
                    value={currentAnswer}
                    maxLength='4'
                    className={`play-input ${inputClass}`}
                  />
                </div>
                <div className='col-span-12'>
                  <VirtualKeyboard onKeyClicked={handleKeyClicked} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {gameState == gameStates.Summary && <Summary game={game} score={score} />}
    </>
  );
}

export default Play;
