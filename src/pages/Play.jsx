import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import configuration from "../configuration.json";
import { useEffect, useState, useRef } from "react";
import QuestionsService from "../services/questionService";
import Methods from "../services/methods.enum";
import VirtualKeyboard from "../components/VirtualKeyboard";
import AnswersService from "../services/answerService";
import gameStates from "../services/gameStates.enum";
import Summary from "../components/Summary";
import { setGameInProgress } from "../redux/actions/gameActions";

function Play({setGameInProgress, time}) {
    const { id } = useParams();
    const inputRef = useRef(null);
    const sets = configuration.questionSets;
    const questionService = new QuestionsService();
    const answersService = new AnswersService();
    const [gameState, setGameState] = useState(gameStates.Play);
    const [game, setGame] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(null);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [inputClass, setInputClass] = useState("");
    const [score, setScore] = useState(null);

    useEffect(() => {
        if (!game) {
            let g = sets.find((x) => x.id == id)
            setGame(g);
            generateQuestions(g);
        }
    }, [game]);

    useEffect(() => {
      if (questions) {
          console.log(questions);
          setGameInProgress(true);
          setQuestionIndex(0);
      }
  }, [questions]);

  useEffect(() => {
    if (questionIndex != null) {
      if(questionIndex == questions.length){
        handleQuizComplete();
        return;
      }
      setActiveQuestion(questions[questionIndex]);
    }
  }, [questionIndex]);

    function generateQuestions(set){
      let qs = questionService.generateQuestions(set.numberOfQuestions,
        set.includedNumbers,
        set.secondaryNumbers,
        set.operands)
      setQuestions(qs);
    }

    function onInputChange(event){
      console.log(event);
    }

    function getOperator(method){
      if (method == Methods.Multiplication) return "x";
      if (method == Methods.Division) return "÷";
      if (method == Methods.Addition) return "+";
      if (method == Methods.Subtraction) return "-";
    }

    function handleKeyClicked(key){
      setInputClass("");
      if (key == "enter") {
        submitCurrentAnswer();
        return;
      }

      if (key == "back") {
        handleBackButton();
        return;
      }

      if(currentAnswer == null || currentAnswer == 0){
        setCurrentAnswer(String(key));
        return;
      }

      if(currentAnswer.length >=3) return;

      setCurrentAnswer(currentAnswer + String(key));
    }

    function submitCurrentAnswer(){
      setInputClass("");
      const isCorrect = answersService.checkIfCorrect(
        currentAnswer,
        activeQuestion.firstNumber,
        activeQuestion.secondNumber,
        activeQuestion.method
      );

      isCorrect ? handleCorrectAnswer() : handleIncorrectAnswer();
      inputRef.current.focus();
    }

    function handleCorrectAnswer(){
      setCurrentAnswer(0);
      setQuestionIndex(questionIndex + 1);
    }

    function handleIncorrectAnswer(){
      setInputClass("incorrect");
    }

    function handleBackButton(){
      if(currentAnswer == null) return;
      setCurrentAnswer(currentAnswer.slice(0,-1));
    }

    function handleQuizComplete(){
      setGameInProgress(false);
      setScore(time);
      setGameState(gameStates.Summary);
    }

    return (
      <>
      {gameState == gameStates.Play && (
        <>
          {game && (
              <h1 className="text-center my-4 text-4xl text-primary">{game.name}</h1>
          )}
          {questions && (
            <div className="play">
              <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <h2 className="text-center my-2 text-2xl text-primary">Question {questionIndex + 1} of {questions.length}</h2>
                </div>
                {activeQuestion && (
                  <div className="col-span-12">
                    <p className="text-center text-xl text-primary">{activeQuestion.firstNumber} {getOperator(activeQuestion.method)} {activeQuestion.secondNumber}</p>
                  </div>
                )}
                <div className="col-span-12 justify-self-center my-4">
                <input
                    type="tel"
                    disabled
                    ref={inputRef}
                    value={currentAnswer}
                    onChange={onInputChange}
                    maxLength="4"
                    className={`play-input ${inputClass}`}
                  />
                </div>
                <div className="col-span-12">
                  <VirtualKeyboard onKeyClicked={handleKeyClicked} />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {gameState == gameStates.Summary && (
        <Summary game={game} score={score}/>
      )
      }
      </>
    )
}

Play.propTypes = {
  setGameInProgress: PropTypes.func.isRequired,
  time: PropTypes.number,
};


const mapStateToProps = (state) => {
  return {
      time: state.game.timer
  };
};

const mapDispatchToProps = {
    setGameInProgress
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
